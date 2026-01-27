import { useState } from 'react';
import { X, User, Phone, Mail, Loader2 } from 'lucide-react';

interface CompleteBookingModalProps {
  onClose: () => void;
  onConfirm: (userInfo: { name: string; phone: string; email: string }) => void;
  loading: boolean;
}

export default function CompleteBookingModal({ onClose, onConfirm, loading }: CompleteBookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const validateForm = () => {
    const newErrors = { name: '', phone: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm({ name, phone, email });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-700">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-3xl font-bold text-white mb-3">Complete Your Booking</h3>
        <p className="text-gray-300 mb-6">
          Please provide your contact information to confirm your gaming session.
        </p>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-gray-200 font-semibold mb-2">
              <User className="w-4 h-4 text-blue-400" />
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 transition-all text-white placeholder-gray-500 ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-200 font-semibold mb-2">
              <Phone className="w-4 h-4 text-blue-400" />
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 transition-all text-white placeholder-gray-500 ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-200 font-semibold mb-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 bg-gray-800 border-2 rounded-lg focus:ring-2 transition-all text-white placeholder-gray-500 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
