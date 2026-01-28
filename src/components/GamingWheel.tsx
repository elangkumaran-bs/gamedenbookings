import { useNavigate } from 'react-router-dom';
import { Gauge, Zap, Trophy, Clock } from 'lucide-react';
import LiquidGlassButton, { LiquidGlassCard } from './LiquidGlassButton';

export default function GamingWheel() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-white">
            <LiquidGlassCard className="inline-block px-3 sm:px-4 py-2 mb-4 sm:mb-6 w-fit" hover={false}>
              <span className="text-xs sm:text-sm font-bold text-blue-300">Premium Racing Experience</span>
            </LiquidGlassCard>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
              Racing Wheel <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300">Experience</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 drop-shadow-lg">
              Feel the thrill of professional racing with our premium gaming wheel setup. Complete with steering wheel, pedals, and shifters for the ultimate immersive racing experience.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <LiquidGlassCard className="p-4" hover={false}>
                <Gauge className="w-8 h-8 mb-2 text-orange-400" />
                <h4 className="font-bold mb-1 text-white">Professional Wheel</h4>
                <p className="text-sm text-gray-300">With force feedback</p>
              </LiquidGlassCard>

              <LiquidGlassCard className="p-4" hover={false}>
                <Zap className="w-8 h-8 mb-2 text-yellow-400" />
                <h4 className="font-bold mb-1 text-white">Racing Pedals</h4>
                <p className="text-sm text-gray-300">Gas, brake & clutch</p>
              </LiquidGlassCard>

              <LiquidGlassCard className="p-4" hover={false}>
                <Trophy className="w-8 h-8 mb-2 text-orange-400" />
                <h4 className="font-bold mb-1 text-white">Premium Games</h4>
                <p className="text-sm text-gray-300">Gran Turismo, NFS & more</p>
              </LiquidGlassCard>

              <LiquidGlassCard className="p-4" hover={false}>
                <Clock className="w-8 h-8 mb-2 text-red-400" />
                <h4 className="font-bold mb-1 text-white">PS4 Pro Console</h4>
                <p className="text-sm text-gray-300">Best performance</p>
              </LiquidGlassCard>
            </div>

            <LiquidGlassCard className="p-6 mb-8" hover={false}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white">₹250</span>
                <span className="text-gray-300">per 60 minutes</span>
              </div>
              <p className="text-sm text-gray-300">Extendable in 30-minute increments</p>
            </LiquidGlassCard>

            <LiquidGlassButton
              onClick={() => navigate('/booking')}
              variant="success"
              size="lg"
              className="w-full md:w-auto transform hover:scale-105 shadow-xl"
            >
              Book Racing Session
            </LiquidGlassButton>
          </div>

          <div className="relative">
            <LiquidGlassCard className="p-8">
              <img
                src="./IMG_4989.png"
                alt="Gaming Wheel Setup"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl transform rotate-3">
                <div className="text-3xl font-bold">60 min</div>
                <div className="text-sm">Session</div>
              </div>
            </LiquidGlassCard>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <LiquidGlassCard className="p-4 text-center" hover={false}>
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-xs text-gray-300">Setup Available</div>
              </LiquidGlassCard>
              <LiquidGlassCard className="p-4 text-center" hover={false}>
                <div className="text-2xl font-bold text-white mb-1">10+</div>
                <div className="text-xs text-gray-300">Racing Games</div>
              </LiquidGlassCard>
              <LiquidGlassCard className="p-4 text-center" hover={false}>
                <div className="text-2xl font-bold text-white mb-1">4K</div>
                <div className="text-xs text-gray-300">Graphics</div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
