import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Gamepad2, Loader2 } from 'lucide-react';
import { TIME_SLOTS, calculatePrice, getBookedSlots } from '../utils/bookingUtils';
import CustomerInfoModal from './CustomerInfoModal';
import BookingConfirmationModal from './BookingConfirmationModal';
import { createBooking } from '../utils/bookingUtils';
import { Booking } from '../types/booking';
import LiquidGlassButton, { LiquidGlassCard, LiquidGlassSelect, LiquidGlassInput } from './LiquidGlassButton';

export default function BookingForm() {
  const [gamingType, setGamingType] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [duration, setDuration] = useState(1);
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });

  const isRacingWheel = gamingType.includes('Racing Wheel');
  const totalPrice = calculatePrice(duration, gamingType) * (isRacingWheel ? 1 : numberOfPlayers);

  useEffect(() => {
    if (gamingType && date) {
      fetchBookedSlots();
    }
  }, [gamingType, date]);

  const fetchBookedSlots = async () => {
    setLoading(true);
    try {
      const slots = await getBookedSlots(gamingType, date);
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gamingType || !date || !timeSlot || !duration) {
      alert('Please fill in all required fields');
      return;
    }
    setShowCustomerModal(true);
  };

  const handleCustomerInfoSubmit = async (info: { name: string; phone: string; email: string }) => {
    setCustomerInfo(info);
    setLoading(true);

    try {
      const booking: Omit<Booking, 'id'> = {
        gamingType,
        date,
        timeSlot,
        duration,
        numberOfPlayers: isRacingWheel ? 1 : numberOfPlayers,
        customerName: info.name,
        phone: info.phone,
        email: info.email,
        totalPrice,
        createdAt: new Date()
      };

      const id = await createBooking(booking);
      setBookingId(id);
      setShowCustomerModal(false);
      setShowConfirmationModal(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
    setGamingType('');
    setDate('');
    setTimeSlot('');
    setDuration(1);
    setNumberOfPlayers(1);
    setBookingId('');
    fetchBookedSlots();
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <section id="booking" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl px-4">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gaming Session</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 drop-shadow-lg px-4">
            Reserve your spot and get ready for an amazing gaming experience
          </p>
        </div>

        <LiquidGlassCard className="p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <Gamepad2 className="w-5 h-5 text-blue-600" />
                  Gaming Type <span className="text-red-500">*</span>
                </label>
                <LiquidGlassSelect
                  value={gamingType}
                  onChange={(e) => setGamingType(e.target.value)}
                  required
                >
                  <option value="">Select gaming type</option>
                  <option value="Console Gaming (PlayStation 4)">Console Gaming (PlayStation 4)</option>
                  <option value="Console Gaming (PlayStation 4 Pro)">Console Gaming (PlayStation 4 Pro)</option>
                  <option value="Racing Wheel Experience (Wheel & Pedals & Shifters)">Racing Wheel Experience - ₹250 per 60 min</option>
                </LiquidGlassSelect>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Date <span className="text-red-500">*</span>
                  </label>
                  <LiquidGlassInput
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTodayDate()}
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Duration <span className="text-red-500">*</span>
                  </label>
                  {isRacingWheel ? (
                    <LiquidGlassSelect
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      required
                    >
                      <option value={60}>60 minutes - ₹250</option>
                      <option value={120}>120 minutes - ₹500</option>
                      <option value={180}>180 minutes - ₹750</option>
                      <option value={240}>240 minutes - ₹1000</option>
                    </LiquidGlassSelect>
                  ) : (
                    <LiquidGlassInput
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min="1"
                      max="5"
                      required
                    />
                  )}
                </div>
              </div>

              {!isRacingWheel && (
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    Number of Players <span className="text-red-500">*</span>
                  </label>
                  <LiquidGlassInput
                    type="number"
                    value={numberOfPlayers}
                    onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                    min="1"
                    max="4"
                    required
                  />
                </div>
              )}

              {gamingType && date && (
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <LiquidGlassButton
                            key={slot}
                            type="button"
                            onClick={() => !isBooked && setTimeSlot(slot)}
                            disabled={isBooked}
                            variant={timeSlot === slot ? 'primary' : 'default'}
                            size="sm"
                            className={`${
                              isBooked
                                ? '!bg-gray-100/50 !text-gray-400 cursor-not-allowed'
                                : ''
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <span>{slot}</span>
                              {isBooked && <span className="text-xs mt-0.5">Booked</span>}
                            </div>
                          </LiquidGlassButton>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {totalPrice > 0 && (
                <LiquidGlassCard className="p-6" hover={false}>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-700">Total Price:</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      ₹{totalPrice}
                    </span>
                  </div>
                  {!isRacingWheel && numberOfPlayers > 1 && (
                    <p className="text-sm text-gray-600 mt-2">
                      ₹{calculatePrice(duration, gamingType)} × {numberOfPlayers} players
                    </p>
                  )}
                </LiquidGlassCard>
              )}

              <LiquidGlassButton
                type="submit"
                disabled={loading || !timeSlot}
                variant="primary"
                size="lg"
                className="w-full transform hover:scale-105 shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Book Session'
                )}
              </LiquidGlassButton>
            </div>
          </form>
        </LiquidGlassCard>
      </div>

      {showCustomerModal && (
        <CustomerInfoModal
          onClose={() => setShowCustomerModal(false)}
          onSubmit={handleCustomerInfoSubmit}
          loading={loading}
        />
      )}

      {showConfirmationModal && (
        <BookingConfirmationModal
          bookingId={bookingId}
          gamingType={gamingType}
          date={date}
          timeSlot={timeSlot}
          duration={duration}
          numberOfPlayers={numberOfPlayers}
          customerName={customerInfo.name}
          totalPrice={totalPrice}
          onClose={handleConfirmationClose}
        />
      )}
    </section>
  );
}
