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
  { minutes: 60, price: 250 },
  { minutes: 120, price: 500 },
  { minutes: 180, price: 750 },
  { minutes: 240, price: 1000 }
];

export default function BookingDetailsSection({ onProceed }: BookingDetailsSectionProps) {
  const [gamingType, setGamingType] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [duration, setDuration] = useState(1);
  const [players, setPlayers] = useState(1);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isRacingWheel = gamingType.includes('Racing Wheel');
  
  // Calculate duration based on selected slots
  const calculatedDuration = isRacingWheel ? selectedSlots.length * 60 : selectedSlots.length;
  const effectiveDuration = selectedSlots.length > 0 ? calculatedDuration : duration;
  
  const basePrice = isRacingWheel 
    ? RACING_WHEEL_DURATION_OPTIONS.find(d => d.minutes === effectiveDuration)?.price || (effectiveDuration / 60) * 250
    : DURATION_OPTIONS.find(d => d.hours === effectiveDuration)?.price || effectiveDuration * 100;
  const totalCost = isRacingWheel ? basePrice : basePrice * players;

  const timeSlot = selectedSlots[0] || ''; // First selected slot is the start time

  useEffect(() => {
    if (gamingType && date) {
      fetchBookedSlots();
    }
  }, [gamingType, date]);

  useEffect(() => {
    // Reset duration when gaming type changes
    if (isRacingWheel) {
      setDuration(60); // Default to 60 minutes for Racing Wheel
      setPlayers(1); // Always 1 player for Racing Wheel
    } else {
      setDuration(1); // Default to 1 hour for PS4
    }
    setSelectedSlots([]); // Reset selected slots when gaming type changes
  }, [gamingType, isRacingWheel]);

  // Update duration when selected slots change
  useEffect(() => {
    if (selectedSlots.length > 0) {
      const newDuration = isRacingWheel ? selectedSlots.length * 60 : selectedSlots.length;
      setDuration(newDuration);
    }
  }, [selectedSlots, isRacingWheel]);

  const fetchBookedSlots = async () => {
    setLoading(true);
    try {
      const slots = await getBookedSlots(gamingType, date);
      setBookedSlots(slots);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching booked slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot: string) => {
    const slotIndex = TIME_SLOTS.indexOf(slot);
    
    if (selectedSlots.includes(slot)) {
      // Deselect slot
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      // Select slot - add to consecutive selection
      if (selectedSlots.length === 0) {
        // First slot selected
        setSelectedSlots([slot]);
      } else {
        // Check if slot is consecutive
        const currentIndices = selectedSlots.map(s => TIME_SLOTS.indexOf(s)).sort((a, b) => a - b);
        const minIndex = Math.min(...currentIndices);
        const maxIndex = Math.max(...currentIndices);
        
        if (slotIndex === maxIndex + 1) {
          // Extending forward
          setSelectedSlots([...selectedSlots, slot]);
        } else if (slotIndex === minIndex - 1) {
          // Extending backward
          setSelectedSlots([slot, ...selectedSlots]);
        } else {
          // Non-consecutive, start new selection
          setSelectedSlots([slot]);
        }
      }
    }
  };

  const handleConfirmBooking = () => {
    if (!gamingType || !date || selectedSlots.length === 0) {
      alert('Please fill in all required fields and select at least one time slot');
      return;
    }

    onProceed({
      console: gamingType,
      date,
      timeSlot: selectedSlots[0], // Use first slot as start time
      duration: effectiveDuration,
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
            value={gamingType}
            onChange={(e) => setGamingType(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border-2 border-white/30 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white"
            required
          >
            <option value="">Select Console</option>
            <option value="Console Gaming (PlayStation 4)">PlayStation 4 – Standard gaming experience</option>
            <option value="Console Gaming (PlayStation 4 Pro)">PlayStation 4 Pro – Enhanced 4K gaming</option>
            <option value="Racing Wheel Experience (Wheel & Pedals & Shifters)">Racing Wheel Experience - ₹250 per 60 min</option>
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

        {gamingType && date && (
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
                  const isSelected = selectedSlots.includes(slot);
                  const slotPosition = selectedSlots.indexOf(slot);
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isBooked && handleSlotClick(slot)}
                      disabled={isBooked}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all relative ${
                        isBooked
                          ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed backdrop-blur-sm'
                          : isSelected
                          ? slotPosition === 0
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105 backdrop-blur-xl ring-2 ring-white/50'
                            : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md backdrop-blur-xl'
                          : 'bg-white/10 border-2 border-white/30 text-white hover:border-blue-400 hover:bg-white/20 backdrop-blur-sm hover:scale-105'
                      }`}
                    >
                      {slot}
                      {isBooked && <div className="text-xs mt-1">Booked</div>}
                      {isSelected && slotPosition === 0 && <div className="text-xs mt-1">Start</div>}
                      {isSelected && slotPosition > 0 && <div className="text-xs mt-1">+{slotPosition}hr</div>}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedSlots.length > 0 && (
              <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg">
                <p className="text-sm text-blue-200 drop-shadow">
                  📅 Selected {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''}: {selectedSlots.join(', ')}
                </p>
                <p className="text-xs text-blue-300 mt-1">
                  Duration: {isRacingWheel ? `${effectiveDuration} minutes` : `${effectiveDuration} hour${effectiveDuration > 1 ? 's' : ''}`} • Price: ₹{basePrice}
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-white font-semibold mb-3 drop-shadow">
            Duration {selectedSlots.length > 0 && <span className="text-blue-300 text-sm">(Auto-calculated from selected slots)</span>}
          </label>
          {isRacingWheel ? (
            <select
              value={effectiveDuration}
              disabled
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white opacity-75"
            >
              <option value={effectiveDuration}>
                {effectiveDuration} Minutes – ₹{basePrice}
              </option>
            </select>
          ) : (
            <select
              value={effectiveDuration}
              disabled
              className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white backdrop-blur-sm [&>option]:text-gray-900 [&>option]:bg-white opacity-75"
            >
              <option value={effectiveDuration}>
                {effectiveDuration} Hour{effectiveDuration > 1 ? 's' : ''} – ₹{basePrice}
              </option>
            </select>
          )}
          <p className="text-xs text-gray-300 mt-2">
            💡 Click time slots above to select your booking duration
          </p>
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
