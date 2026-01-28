import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LiquidGlassButton from './LiquidGlassButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleBookNow = () => {
    navigate('/booking');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Dynamic Island Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out w-[95%] sm:w-auto max-w-6xl animate-navbarAppear">
        <nav className={`
          relative overflow-hidden rounded-full
          backdrop-blur-xl bg-white/70 dark:bg-gray-900/70
          border border-white/20 shadow-2xl
          transition-all duration-500 ease-out
          ${scrolled ? 'shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]' : 'shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]'}
          ${isMenuOpen ? 'rounded-3xl' : 'rounded-full'}
        `}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>
          
          <div className="relative px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3 z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/image-removebg-preview (1).png"
                    alt="GameDen Logo"
                    className="h-8 sm:h-10 w-auto relative z-10 drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                <LiquidGlassButton onClick={() => scrollToSection('games')}>
                  Games
                </LiquidGlassButton>
                <LiquidGlassButton onClick={handleBookNow} variant="primary">
                  Book Now
                </LiquidGlassButton>
                <LiquidGlassButton onClick={() => scrollToSection('pricing')}>
                  Pricing
                </LiquidGlassButton>
                <LiquidGlassButton onClick={() => scrollToSection('contact')}>
                  Contact
                </LiquidGlassButton>
              </div>

              {/* Mobile Menu Button */}
              <LiquidGlassButton
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden !p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </LiquidGlassButton>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-white/20 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <LiquidGlassButton 
                    onClick={() => scrollToSection('games')}
                    className="w-full justify-start"
                  >
                    Games
                  </LiquidGlassButton>
                  <LiquidGlassButton 
                    onClick={handleBookNow}
                    variant="primary"
                    className="w-full justify-start"
                  >
                    Book Now
                  </LiquidGlassButton>
                  <LiquidGlassButton 
                    onClick={() => scrollToSection('pricing')}
                    className="w-full justify-start"
                  >
                    Pricing
                  </LiquidGlassButton>
                  <LiquidGlassButton 
                    onClick={() => scrollToSection('contact')}
                    className="w-full justify-start"
                  >
                    Contact
                  </LiquidGlassButton>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
}
