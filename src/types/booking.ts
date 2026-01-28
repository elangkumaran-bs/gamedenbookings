export interface Booking {
  id?: string;
  gamingType: string;
  date: string;
  timeSlot: string;
  duration: number;
  numberOfPlayers: number;
  customerName: string;
  phone: string;
  email: string;
  totalPrice: number;
  status?: string;
  createdAt: Date;
  linkedBookingId?: string; // For Racing Wheel <-> PS4 Standard linking
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}
