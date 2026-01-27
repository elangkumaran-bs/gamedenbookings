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
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}
