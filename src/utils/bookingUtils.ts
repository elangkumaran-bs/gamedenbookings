import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Booking } from '../types/booking';

export const TIME_SLOTS = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
];

export const calculatePrice = (duration: number, gamingType: string): number => {
  if (gamingType.includes('Racing Wheel')) {
    return (duration / 30) * 250;
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
    const q = query(
      bookingsRef,
      where('gamingType', '==', gamingType),
      where('date', '==', date)
    );

    const querySnapshot = await getDocs(q);
    const bookedSlots: string[] = [];

    querySnapshot.forEach((doc) => {
      const booking = doc.data();
      const startIndex = TIME_SLOTS.indexOf(booking.timeSlot);

      if (startIndex !== -1) {
        if (gamingType.includes('Racing Wheel')) {
          // Racing Wheel bookings are in minutes (30, 60, 90, 120)
          // Each time slot is 1 hour, so we need to calculate slots
          const slotsNeeded = Math.ceil(booking.duration / 60);
          for (let i = 0; i < slotsNeeded; i++) {
            if (TIME_SLOTS[startIndex + i]) {
              bookedSlots.push(TIME_SLOTS[startIndex + i]);
            }
          }
        } else {
          // PS4/PS4 Pro bookings are in hours
          const hours = booking.duration;
          for (let i = 0; i < hours; i++) {
            if (TIME_SLOTS[startIndex + i]) {
              bookedSlots.push(TIME_SLOTS[startIndex + i]);
            }
          }
        }
      }
    });

    return bookedSlots;
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return [];
  }
};

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<string> => {
  try {
    const bookingsRef = collection(db, 'bookings');
    const docRef = await addDoc(bookingsRef, {
      ...booking,
      createdAt: new Date(),
      status: 'confirmed'
    });
    
    return docRef.id;
  } catch (error: any) {
    console.error('❌ Error creating booking:', error);
    throw new Error(`Failed to create booking: ${error?.message || 'Unknown error'}`);
  }
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await deleteDoc(bookingRef);
    console.log('Booking cancelled successfully:', bookingId);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw new Error('Failed to cancel booking. Please try again.');
  }
};
