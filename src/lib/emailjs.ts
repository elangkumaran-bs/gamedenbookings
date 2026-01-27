import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_bkpzdtp',
  publicKey: 'BgW_77sYF0GCf324B',
  privateKey: 'LmpYLJdz65kOCMnRfuQJZ'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

export interface BookingEmailData {
  gamingType: string;
  date: string;
  timeSlot: string;
  duration: number;
  numberOfPlayers: number;
  customerName: string;
  phone: string;
  email: string;
  totalPrice: number;
}

export const sendBookingEmail = async (bookingData: BookingEmailData): Promise<boolean> => {
  try {
    console.log('📧 Preparing to send email with data:', bookingData);

    // Format the date nicely
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Prepare email template parameters
    const templateParams = {
      to_email: 'gamedenoffiz@gmail.com', // Admin email (note: you mentioned gamedenoffiz.com, using .gmail.com)
      customer_name: bookingData.customerName,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      gaming_type: bookingData.gamingType,
      booking_date: formattedDate,
      time_slot: bookingData.timeSlot,
      duration: bookingData.gamingType.includes('Racing Wheel') 
        ? `${bookingData.duration} minutes` 
        : `${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}`,
      number_of_players: bookingData.numberOfPlayers,
      total_price: `₹${bookingData.totalPrice}`,
      booking_summary: `
        Console: ${bookingData.gamingType}
        Date: ${formattedDate}
        Time: ${bookingData.timeSlot}
        Duration: ${bookingData.gamingType.includes('Racing Wheel') ? `${bookingData.duration} minutes` : `${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}`}
        Players: ${bookingData.numberOfPlayers}
        Total: ₹${bookingData.totalPrice}
      `
    };

    console.log('📤 Sending email with template params:', templateParams);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_ycggzo9', // EmailJS template ID
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Email sent successfully!', response);
    return true;
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', error.text || error.message);
    // Don't throw error - booking should still succeed even if email fails
    return false;
  }
};

export const sendCustomerConfirmationEmail = async (bookingData: BookingEmailData): Promise<boolean> => {
  try {
    console.log('📧 Sending confirmation email to customer:', bookingData.email);

    // Format the date nicely
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Prepare email template parameters for customer
    const templateParams = {
      to_email: bookingData.email, // Customer email
      customer_name: bookingData.customerName,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      gaming_type: bookingData.gamingType,
      booking_date: formattedDate,
      time_slot: bookingData.timeSlot,
      duration: bookingData.gamingType.includes('Racing Wheel') 
        ? `${bookingData.duration} minutes` 
        : `${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}`,
      number_of_players: bookingData.numberOfPlayers,
      total_price: `₹${bookingData.totalPrice}`,
      booking_summary: `
        Console: ${bookingData.gamingType}
        Date: ${formattedDate}
        Time: ${bookingData.timeSlot}
        Duration: ${bookingData.gamingType.includes('Racing Wheel') ? `${bookingData.duration} minutes` : `${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}`}
        Players: ${bookingData.numberOfPlayers}
        Total: ₹${bookingData.totalPrice}
      `
    };

    console.log('📤 Sending customer confirmation email...');

    // Send email using EmailJS with customer confirmation template
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_nsud4g1', // Customer confirmation template ID
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Customer confirmation email sent successfully!', response);
    return true;
  } catch (error: any) {
    console.error('❌ Error sending customer confirmation email:', error);
    console.error('Error details:', error.text || error.message);
    return false;
  }
};

export default emailjs;
