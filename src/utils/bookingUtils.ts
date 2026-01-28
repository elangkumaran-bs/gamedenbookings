import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Booking } from '../types/booking';

export const TIME_SLOTS = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

export const calculatePrice = (duration: number, gamingType: string): number => {
  if (gamingType.includes('Racing Wheel')) {
    // Duration is in minutes (60, 120, 180, 240)
    // Price is ₹250 per 60 minutes
    return (duration / 60) * 250;
  }

  if (duration === 3) return 280;
  if (duration === 5) return 450;
  return duration * 100;
};

export const getBookedSlots = async (
  gamingType: string,
  date: string
): Promise<string[]> => {
  try {
    const bookingsRef = collection(db, 'bookings');
    
    // BIDIRECTIONAL: Racing Wheel and PS4 Standard share the same console
    const gamingTypes = gamingType.includes('Racing Wheel') 
      ? [gamingType, 'Console Gaming (PlayStation 4)'] // Racing Wheel checks PS4 Standard
      : gamingType === 'Console Gaming (PlayStation 4)'
      ? [gamingType, 'Racing Wheel Experience (Wheel & Pedals & Shifters)'] // PS4 Standard checks Racing Wheel
      : [gamingType]; // PS4 Pro is independent
    
    const bookedSlots: string[] = [];

    // Query for each gaming type
    for (const gType of gamingTypes) {
      const q = query(
        bookingsRef,
        where('gamingType', '==', gType),
        where('date', '==', date)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const booking = doc.data();
        const startIndex = TIME_SLOTS.indexOf(booking.timeSlot);

        if (startIndex !== -1) {
          // Check if this booking is a reserved one (has special status)
          const isReservedForRacingWheel = booking.status === 'reserved_for_racing_wheel';
          const isReservedForPS4 = booking.status === 'reserved_for_ps4';
          
          // Racing Wheel bookings OR PS4 bookings reserved for Racing Wheel use minutes
          if (gType.includes('Racing Wheel') || isReservedForPS4) {
            const slotsNeeded = Math.ceil(booking.duration / 60);
            for (let i = 0; i < slotsNeeded; i++) {
              if (TIME_SLOTS[startIndex + i]) {
                bookedSlots.push(TIME_SLOTS[startIndex + i]);
              }
            }
          } 
          // PS4 bookings reserved for Racing Wheel also use minutes
          else if (isReservedForRacingWheel) {
            const slotsNeeded = Math.ceil(booking.duration / 60);
            for (let i = 0; i < slotsNeeded; i++) {
              if (TIME_SLOTS[startIndex + i]) {
                bookedSlots.push(TIME_SLOTS[startIndex + i]);
              }
            }
          }
          // Normal PS4/PS4 Pro bookings use hours
          else {
            const hours = booking.duration;
            for (let i = 0; i < hours; i++) {
              if (TIME_SLOTS[startIndex + i]) {
                bookedSlots.push(TIME_SLOTS[startIndex + i]);
              }
            }
          }
        }
      });
    }

    return bookedSlots;
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return [];
  }
};

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<string> => {
  try {
    const bookingsRef = collection(db, 'bookings');
    
    // BIDIRECTIONAL LINKING: Racing Wheel and PS4 Standard share the same console
    
    // Case 1: Racing Wheel booked → Block PS4 Standard
    if (booking.gamingType.includes('Racing Wheel')) {
      const racingWheelDocRef = await addDoc(bookingsRef, {
        ...booking,
        createdAt: new Date(),
        status: 'confirmed'
      });
      
      const ps4Booking = {
        ...booking,
        gamingType: 'Console Gaming (PlayStation 4)',
        createdAt: new Date(),
        status: 'reserved_for_racing_wheel',
        linkedBookingId: racingWheelDocRef.id,
        totalPrice: 0,
        numberOfPlayers: 1
      };
      const ps4DocRef = await addDoc(bookingsRef, ps4Booking);
      
      await updateDoc(doc(db, 'bookings', racingWheelDocRef.id), {
        linkedBookingId: ps4DocRef.id
      });
      
      return racingWheelDocRef.id;
    } 
    // Case 2: PS4 Standard booked → Block Racing Wheel
    else if (booking.gamingType === 'Console Gaming (PlayStation 4)') {
      const ps4DocRef = await addDoc(bookingsRef, {
        ...booking,
        createdAt: new Date(),
        status: 'confirmed'
      });
      
      const wheelBooking = {
        ...booking,
        gamingType: 'Racing Wheel Experience (Wheel & Pedals & Shifters)',
        createdAt: new Date(),
        status: 'reserved_for_ps4',
        linkedBookingId: ps4DocRef.id,
        duration: booking.duration * 60, // Convert hours to minutes
        totalPrice: 0,
        numberOfPlayers: 1
      };
      const wheelDocRef = await addDoc(bookingsRef, wheelBooking);
      
      await updateDoc(doc(db, 'bookings', ps4DocRef.id), {
        linkedBookingId: wheelDocRef.id
      });
      
      return ps4DocRef.id;
    } 
    // Case 3: PS4 Pro (independent)
    else {
      const docRef = await addDoc(bookingsRef, {
        ...booking,
        createdAt: new Date(),
        status: 'confirmed'
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    throw new Error(`Failed to create booking: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Helper function to filter out reserved bookings (for displaying only user bookings)
export const isReservedBooking = (booking: Booking): boolean => {
  return booking.status === 'reserved_for_racing_wheel' || booking.status === 'reserved_for_ps4';
};

// Helper function to get only user-created bookings (excludes auto-reserved ones)
export const getUserBookings = async (filters?: { gamingType?: string; date?: string }): Promise<Booking[]> => {
  try {
    const bookingsRef = collection(db, 'bookings');
    let q = query(bookingsRef);

    // Apply filters if provided
    if (filters?.gamingType) {
      q = query(q, where('gamingType', '==', filters.gamingType));
    }
    if (filters?.date) {
      q = query(q, where('date', '==', filters.date));
    }

    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const booking: Booking = { 
        id: doc.id, 
        gamingType: data.gamingType,
        date: data.date,
        timeSlot: data.timeSlot,
        duration: data.duration,
        numberOfPlayers: data.numberOfPlayers,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        totalPrice: data.totalPrice,
        status: data.status,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        linkedBookingId: data.linkedBookingId
      };
      // Only include bookings with 'confirmed' status (exclude reserved bookings)
      if (booking.status === 'confirmed') {
        bookings.push(booking);
      }
    });

    return bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingDoc = await getDocs(query(collection(db, 'bookings'), where('__name__', '==', bookingId)));
    
    // Check if this booking has a linked booking (Racing Wheel <-> PS4 Standard)
    if (!bookingDoc.empty) {
      const bookingData = bookingDoc.docs[0].data();
      if (bookingData.linkedBookingId) {
        // Delete the linked booking first
        const linkedBookingRef = doc(db, 'bookings', bookingData.linkedBookingId);
        await deleteDoc(linkedBookingRef);
        console.log('Linked booking cancelled:', bookingData.linkedBookingId);
      }
    }
    
    // Delete the main booking
    await deleteDoc(bookingRef);
    console.log('Booking cancelled successfully:', bookingId);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking. Please try again.');
  }
};
