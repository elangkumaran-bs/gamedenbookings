import { useNavigate } from 'react-router-dom';
import { Gamepad2, Star, Clock, Gauge } from 'lucide-react';
import LiquidGlassButton, { LiquidGlassCard } from './LiquidGlassButton';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-6 sm:mb-8 flex justify-center animate-slideDown">
          <img src="/gameden-logo.png" alt="GameDen Logo" className="w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] drop-shadow-lg" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl animate-slideUp animation-delay-100 animation-fill-backwards">
          Welcome to  <img src="/image-removebg-preview (1).png" alt="GameDen Logo" className="w-200 h-180 inline-block" />   {/*<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">GameDen</span>*/}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-blue-100 max-w-3xl mx-auto drop-shadow-lg px-4 animate-slideUp animation-delay-200 animation-fill-backwards">
          Experience premium gaming with PlayStation 4 & PS4 Pro consoles. Dive into the latest games with crystal-clear graphics and immersive gameplay.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 animate-scaleIn animation-delay-300 animation-fill-backwards">
          <LiquidGlassButton
            onClick={() => navigate('/booking')}
            variant="primary"
            size="lg"
            className="transform hover:scale-105 shadow-2xl w-full sm:w-auto"
          >
            Book Now
          </LiquidGlassButton>
          <LiquidGlassButton
            onClick={() => navigate('/booking')}
            variant="default"
            size="lg"
            className="transform hover:scale-105 !text-white w-full sm:w-auto"
          >
            View Availability
          </LiquidGlassButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          <LiquidGlassCard className="p-6 animate-slideUp animation-delay-400 animation-fill-backwards">
            <Gamepad2 className="w-10 h-10 mx-auto mb-3 text-blue-300 drop-shadow-lg" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">PS4 & PS4 Pro</h3>
            <p className="text-blue-100">Premium Consoles Available</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 animate-slideUp animation-delay-500 animation-fill-backwards">
            <Gauge className="w-10 h-10 mx-auto mb-3 text-orange-300 drop-shadow-lg" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Racing Wheel</h3>
            <p className="text-blue-100">Pro Wheel & Pedals Setup</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 animate-slideUp animation-delay-600 animation-fill-backwards">
            <Star className="w-10 h-10 mx-auto mb-3 text-purple-300 drop-shadow-lg" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">30+ Games</h3>
            <p className="text-blue-100">Premium Game Library</p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 animate-slideUp animation-delay-700 animation-fill-backwards">
            <Clock className="w-10 h-10 mx-auto mb-3 text-pink-300 drop-shadow-lg" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Open Daily</h3>
            <p className="text-blue-100">Mon-Sun 11 AM - 11 PM</p>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
}
