import { useState } from 'react';
import { X, User, Phone, Mail, Loader2 } from 'lucide-react';
import LiquidGlassButton, { LiquidGlassCard, LiquidGlassInput } from './LiquidGlassButton';

interface CustomerInfoModalProps {
  onClose: () => void;
  onSubmit: (info: { name: string; phone: string; email: string }) => void;
  loading: boolean;
}

export default function CustomerInfoModal({ onClose, onSubmit, loading }: CustomerInfoModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const validateForm = () => {
    const newErrors = { name: '', phone: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
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
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name, phone, email });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <LiquidGlassCard className="max-w-md w-full p-6 md:p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Customer Information</h3>
        <p className="text-gray-600 mb-6">Please provide your details to complete the booking</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <User className="w-4 h-4 text-blue-600" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <LiquidGlassInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Phone className="w-4 h-4 text-blue-600" />
              Phone Number <span className="text-red-500">*</span>
            </label>
            <LiquidGlassInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className={errors.phone ? 'border-red-500' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <LiquidGlassInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <LiquidGlassButton
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full transform hover:scale-105 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </LiquidGlassButton>
        </form>
      </LiquidGlassCard>
    </div>
  );
}
