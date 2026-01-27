import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingDetailsSection from '../components/BookingDetailsSection';
import CompleteBookingModal from '../components/CompleteBookingModal';
import BookingConfirmedModal from '../components/BookingConfirmedModal';
import { createBooking } from '../utils/bookingUtils';
import { sendBookingEmail, sendCustomerConfirmationEmail } from '../lib/emailjs';
import { Booking } from '../types/booking';

export default function BookingPage() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const handleProceed = (details: any) => {
    setBookingDetails(details);
    setShowCompleteModal(true);
  };

  const handleConfirmBooking = async (userInfo: { name: string; phone: string; email: string }) => {
    setLoading(true);
    try {
      const booking: Omit<Booking, 'id'> = {
        gamingType: bookingDetails.console,
        date: bookingDetails.date,
        timeSlot: bookingDetails.timeSlot,
        duration: bookingDetails.duration,
        numberOfPlayers: bookingDetails.players,
        customerName: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email,
        totalPrice: bookingDetails.totalCost,
        status: 'confirmed',
        createdAt: new Date()
      };

      console.log('📝 Saving booking to Firebase:', {
        ...booking,
        createdAt: booking.createdAt.toISOString()
      });

      const bookingId = await createBooking(booking);
      
      console.log('✅ Booking saved successfully with ID:', bookingId);

      const emailData = {
        gamingType: booking.gamingType,
        date: booking.date,
        timeSlot: booking.timeSlot,
        duration: booking.duration,
        numberOfPlayers: booking.numberOfPlayers,
        customerName: booking.customerName,
        phone: booking.phone,
        email: booking.email,
        totalPrice: booking.totalPrice
      };

      // Send email notification to admin
      console.log('📧 Sending email notification to admin...');
      const adminEmailSent = await sendBookingEmail(emailData);

      if (adminEmailSent) {
        console.log('✅ Admin email sent successfully!');
      } else {
        console.warn('⚠️ Admin email failed to send');
      }

      // Send confirmation email to customer
      console.log('📧 Sending confirmation email to customer...');
      const customerEmailSent = await sendCustomerConfirmationEmail(emailData);

      if (customerEmailSent) {
        console.log('✅ Customer confirmation email sent successfully!');
      } else {
        console.warn('⚠️ Customer email failed to send');
      }

      setConfirmedBooking({
        console: bookingDetails.console,
        date: bookingDetails.date,
        timeSlot: bookingDetails.timeSlot,
        duration: bookingDetails.duration,
        players: bookingDetails.players,
        name: userInfo.name,
        totalCost: bookingDetails.totalCost
      });

      setShowCompleteModal(false);
      setShowConfirmedModal(true);
    } catch (error: any) {
      console.error('❌ Error creating booking:', error);
      const errorMessage = error?.message || 'Failed to create booking. Please try again.';
      alert(`Booking Error: ${errorMessage}\n\nPlease check:\n1. Internet connection\n2. Firebase Firestore is enabled\n3. Browser console for details`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmed = () => {
    setShowConfirmedModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-6 transition-colors drop-shadow-lg"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gaming Session</span>
          </h1>
          <p className="text-xl text-gray-200 drop-shadow-lg">
            Reserve your console and get ready for an amazing experience
          </p>
        </div>

        <BookingDetailsSection onProceed={handleProceed} />
      </div>

      {showCompleteModal && (
        <CompleteBookingModal
          onClose={() => setShowCompleteModal(false)}
          onConfirm={handleConfirmBooking}
          loading={loading}
        />
      )}

      {showConfirmedModal && confirmedBooking && (
        <BookingConfirmedModal
          bookingDetails={confirmedBooking}
          onClose={handleCloseConfirmed}
        />
      )}
    </div>
  );
}
