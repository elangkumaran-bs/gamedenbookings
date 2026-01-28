import { useNavigate } from 'react-router-dom';
import { Check, Zap, Crown, Gauge } from 'lucide-react';
import LiquidGlassButton, { LiquidGlassCard } from './LiquidGlassButton';

interface PricingTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  racing?: boolean;
  icon: any;
  savings?: string;
  bonus?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Per Hour',
    price: '₹100',
    duration: 'per hour',
    icon: Zap,
    features: [
      'Access to Full Game Library',
      'PlayStation 4 & PS4 Pro',
      'Comfortable Gaming Setup',
      'DualShock 4 Controller'
    ]
  },
  {
    name: '3 Hours Package',
    price: '₹280',
    duration: 'for 3 hours',
    icon: Crown,
    popular: true,
    savings: 'Save ₹20',
    bonus: '15 mins free!',
    features: [
      'All features from Per Hour',
      'Extended Gaming Session',
      'Better Value for Money',
      'Bonus: 15 mins free!'
    ]
  },
  {
    name: '5 Hours Day Pass',
    price: '₹450',
    duration: 'for 5 hours',
    icon: Crown,
    premium: true,
    savings: 'Save ₹50',
    bonus: '30 mins free!',
    features: [
      'Full Day Gaming Access',
      'PlayStation 4 & PS4 Pro',
      'Premium Gaming Setup',
      'Priority Booking',
      'Bonus: 30 mins free!'
    ]
  },
  {
    name: 'Racing Wheel',
    price: '₹250',
    duration: 'per hour',
    icon: Gauge,
    racing: true,
    features: [
      'Professional Racing Wheel & Pedals',
      'Premium Racing Games',
      'Immersive Racing Experience',
      'PS4 Pro Console',
      'Extendable in 30-min increments'
    ]
  }
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl px-4">
            Simple & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Affordable Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg px-4">
            Choose the perfect gaming package for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <LiquidGlassCard
                key={index}
                className={`p-8 ${
                  tier.popular
                    ? 'ring-4 ring-blue-400/50'
                    : tier.premium
                    ? 'ring-4 ring-purple-400/50'
                    : tier.racing
                    ? 'ring-4 ring-orange-400/50'
                    : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                {tier.premium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Best Value
                  </div>
                )}

                <div className="mb-6">
                  <LiquidGlassCard
                    hover={false}
                    className={`inline-flex p-3 mb-4 w-fit ${
                      tier.popular
                        ? 'bg-blue-100/50'
                        : tier.premium
                        ? 'bg-purple-100/50'
                        : tier.racing
                        ? 'bg-orange-100/50'
                        : 'bg-gray-100/50'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        tier.popular
                          ? 'text-blue-600'
                          : tier.premium
                          ? 'text-purple-600'
                          : tier.racing
                          ? 'text-orange-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </LiquidGlassCard>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white drop-shadow-lg">{tier.price}</span>
                  </div>
                  <p className="text-gray-200 drop-shadow">{tier.duration}</p>
                  {tier.savings && (
                    <div className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {tier.savings}
                    </div>
                  )}
                  {tier.bonus && (
                    <div className="mt-2 flex items-center gap-1 text-orange-400 font-bold text-sm drop-shadow">
                      <Zap className="w-4 h-4 fill-orange-400" />
                      {tier.bonus}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.popular
                            ? 'text-blue-400'
                            : tier.premium
                            ? 'text-purple-400'
                            : tier.racing
                            ? 'text-orange-400'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="text-gray-200 drop-shadow">{feature}</span>
                    </li>
                  ))}
                </ul>

                <LiquidGlassButton
                  onClick={() => navigate('/booking')}
                  variant={
                    tier.popular
                      ? 'primary'
                      : tier.premium
                      ? 'secondary'
                      : tier.racing
                      ? 'success'
                      : 'default'
                  }
                  className="w-full transform hover:scale-105"
                >
                  Book Now
                </LiquidGlassButton>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
