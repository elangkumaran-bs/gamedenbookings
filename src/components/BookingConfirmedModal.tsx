import { CheckCircle2 } from 'lucide-react';

interface BookingConfirmedModalProps {
  bookingDetails: {
    console: string;
    date: string;
    timeSlot: string;
    duration: number;
    players: number;
    name: string;
    totalCost: number;
  };
  onClose: () => void;
}

export default function BookingConfirmedModal({ bookingDetails, onClose }: BookingConfirmedModalProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500/20 rounded-full p-3">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-3">
          Booking Confirmed!
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700">
          <p className="text-gray-200 text-center text-sm mb-2">
            Thank you for booking with GameDen. Your session has been successfully reserved.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-4 mb-4 border border-blue-700/50">
          <h3 className="text-lg font-bold text-white mb-3 text-center">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Console:</span>
              <span className="text-white font-semibold text-sm">{bookingDetails.console}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Date:</span>
              <span className="text-white font-semibold text-sm">{formatDate(bookingDetails.date)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Time:</span>
              <span className="text-white font-semibold text-sm">{bookingDetails.timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Duration:</span>
              <span className="text-white font-semibold text-sm">{bookingDetails.duration} hour{bookingDetails.duration > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Players:</span>
              <span className="text-white font-semibold text-sm">{bookingDetails.players}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-300 text-sm">Name:</span>
              <span className="text-white font-semibold text-sm">{bookingDetails.name}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-bold text-white">Total:</span>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                ₹{bookingDetails.totalCost}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-3 mb-4">
          <p className="text-yellow-200 text-xs leading-relaxed">
            ⚠️ Please arrive 10 minutes early. Bring a valid ID for verification.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
}
