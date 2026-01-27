import { useState } from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';
import { cancelBooking } from '../utils/bookingUtils';

interface BookingConfirmationModalProps {
  bookingId: string;
  gamingType: string;
  date: string;
  timeSlot: string;
  duration: number;
  numberOfPlayers: number;
  customerName: string;
  totalPrice: number;
  onClose: () => void;
}

export default function BookingConfirmationModal({
  bookingId,
  gamingType,
  date,
  timeSlot,
  duration,
  numberOfPlayers,
  customerName,
  totalPrice,
  onClose
}: BookingConfirmationModalProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await cancelBooking(bookingId);
      alert('Booking cancelled successfully');
      onClose();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const isRacingWheel = gamingType.includes('Racing Wheel');
  const durationText = isRacingWheel ? `${duration} minutes` : `${duration} hour${duration > 1 ? 's' : ''}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-fade-in">
        {!showCancelConfirm ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Your gaming session has been successfully booked
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-bold text-gray-900">{bookingId.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-900">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gaming Type:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[200px]">{gamingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-900">{timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{durationText}</span>
                </div>
                {!isRacingWheel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Players:</span>
                    <span className="font-semibold text-gray-900">{numberOfPlayers}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t-2 border-blue-200">
                  <span className="text-gray-900 font-bold">Total Price:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Done
              </button>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full bg-white border-2 border-red-500 text-red-500 py-3 rounded-lg font-bold hover:bg-red-50 transition-all"
              >
                Cancel Booking
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Cancel Booking?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel Booking'}
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={cancelling}
                className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                No, Keep Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
