import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Gamepad2, Loader2 } from 'lucide-react';
import { getBookedSlots, TIME_SLOTS } from '../utils/bookingUtils';

interface BookingDetailsSectionProps {
  onProceed: (details: {
    console: string;
    date: string;
    timeSlot: string;
    duration: number;
    players: number;
    basePrice: number;
    totalCost: number;
  }) => void;
}

const DURATION_OPTIONS = [
  { hours: 1, price: 100 },
  { hours: 2, price: 200 },
  { hours: 3, price: 280 },
  { hours: 4, price: 400 },
  { hours: 5, price: 450 }
];

const RACING_WHEEL_DURATION_OPTIONS = [
  { minutes: 30, price: 250 },
  { minutes: 60, price: 500 },
  { minutes: 90, price: 750 },
  { minutes: 120, price: 1000 }
];

export default function BookingDetailsSection({ onProceed }: BookingDetailsSectionProps) {
  const [console, setConsole] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [duration, setDuration] = useState(1);
  const [players, setPlayers] = useState(1);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isRacingWheel = console === 'Racing Wheel';
  
  const basePrice = isRacingWheel 
    ? RACING_WHEEL_DURATION_OPTIONS.find(d => d.minutes === duration)?.price || (duration / 30) * 250
    : DURATION_OPTIONS.find(d => d.hours === duration)?.price || duration * 100;
  const totalCost = isRacingWheel ? basePrice : basePrice * players;

  useEffect(() => {
    if (console && date) {
      fetchBookedSlots();
    }
  }, [console, date]);

  useEffect(() => {
    // Reset duration when console changes
    if (isRacingWheel) {
      setDuration(30); // Default to 30 minutes for Racing Wheel
      setPlayers(1); // Always 1 player for Racing Wheel
    } else {
      setDuration(1); // Default to 1 hour for PS4
    }
  }, [console]);

  const fetchBookedSlots = async () => {
    setLoading(true);
    try {
      const slots = await getBookedSlots(console, date);
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = () => {
    if (!console || !date || !timeSlot || !duration) {
      alert('Please fill in all required fields');
      return;
    }

    onProceed({
      console,
      date,
      timeSlot,
      duration,
      players,
      basePrice,
      totalCost
    });
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
        <Gamepad2 className="w-8 h-8 text-blue-400" />
        Booking Details
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-semibold mb-3 drop-shadow">
            Console Selection <span className="text-red-400">*</span>
          </label>
          <select
            value={console}
            onChange={(e) => setConsole(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white"
            required
          >
            <option value="">Select Console</option>
            <option value="PlayStation 4">PlayStation 4 – Standard gaming experience</option>
            <option value="PlayStation 4 Pro">PlayStation 4 Pro – Enhanced 4K gaming</option>
            <option value="Racing Wheel">Racing Wheel Experience - ₹250 per 30 min</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white font-semibold mb-3 drop-shadow">
            <Calendar className="w-5 h-5 text-blue-400" />
            Date Selection <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getTodayDate()}
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm"
            required
          />
          {date && (
            <p className="text-sm text-gray-300 mt-2 drop-shadow">
              Selected: {formatDateForDisplay(date)}
            </p>
          )}
        </div>

        {console && date && (
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-3 drop-shadow">
              <Clock className="w-5 h-5 text-blue-400" />
              Time Slot Selection <span className="text-red-400">*</span>
            </label>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isBooked && setTimeSlot(slot)}
                      disabled={isBooked}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        isBooked
                          ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed backdrop-blur-sm'
                          : timeSlot === slot
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105 backdrop-blur-xl'
                          : 'bg-white/10 border-2 border-white/30 text-white hover:border-blue-400 hover:bg-white/20 backdrop-blur-sm'
                      }`}
                    >
                      {slot}
                      {isBooked && <div className="text-xs mt-1">Booked</div>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-white font-semibold mb-3 drop-shadow">
            Duration Dropdown <span className="text-red-400">*</span>
          </label>
          {isRacingWheel ? (
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white"
              required
            >
              {RACING_WHEEL_DURATION_OPTIONS.map((option) => (
                <option key={option.minutes} value={option.minutes}>
                  {option.minutes} Minutes – ₹{option.price}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white"
              required
            >
              {DURATION_OPTIONS.map((option) => (
                <option key={option.hours} value={option.hours}>
                  {option.hours} Hour{option.hours > 1 ? 's' : ''} – ₹{option.price}
                </option>
              ))}
            </select>
          )}
        </div>

        {!isRacingWheel && (
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-3 drop-shadow">
              <Users className="w-5 h-5 text-blue-400" />
              Players Dropdown <span className="text-red-400">*</span>
            </label>
            <select
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white"
              required
            >
              <option value={1}>1 player</option>
              <option value={2}>2 players</option>
              <option value={3}>3 players</option>
              <option value={4}>4 players</option>
            </select>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl border-2 border-blue-400/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 drop-shadow-lg">Cost Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-200">
              <span>Base Price ({isRacingWheel ? `${duration} minutes` : `${duration} hour${duration > 1 ? 's' : ''}`}):</span>
              <span className="font-semibold">₹{basePrice}</span>
            </div>
            {!isRacingWheel && (
              <div className="flex justify-between text-gray-200">
                <span>Players:</span>
                <span className="font-semibold">{players}x</span>
              </div>
            )}
            {isRacingWheel && (
              <div className="flex justify-between text-gray-200">
                <span>Players:</span>
                <span className="font-semibold">1 player only</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t-2 border-blue-400/30">
              <span className="text-xl font-bold text-white drop-shadow-lg">Total Cost:</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
                ₹{totalCost}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={!timeSlot || loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-xl"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
