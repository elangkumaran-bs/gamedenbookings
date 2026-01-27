import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-6">
              <img
                src="/image-removebg-preview (1).png"
                alt="GameDen Logo"
                className="h-8 sm:h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-blue-200 mb-4 sm:mb-6 text-sm sm:text-base">
              Premium gaming lounge offering the best PlayStation experience with cutting-edge technology and comfort.
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/game_den__?igsh=MXMyOXJwemF6OHNhZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-1" />
                <p className="text-blue-200 text-sm sm:text-base text-left">
                  1E Shanthi Nagar, PB Complex,<br />
                  Sathy Main Road,<br />
                  Gobichettipalayam
                </p>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+919344407141" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  +91 9344407141
                </a>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:gamedenoffiz@gmail.com" className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base break-all">
                  gamedenoffiz@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Opening Hours</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 justify-center sm:justify-start">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-blue-200 mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-white">Website:</span> 24/7
                  </p>
                  <p className="text-blue-200 mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-white">Shop Hours:</span>
                  </p>
                  <p className="text-blue-200 text-sm sm:text-base">
                    Monday - Sunday<br />
                    11:00 AM - 11:00 PM
                  </p>
                  <p className="text-blue-300 mt-2 sm:mt-3 text-xs sm:text-sm italic">
                    Open daily for your gaming needs!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3 inline-block text-left">
              <li>
                <button
                  onClick={() => scrollToSection('games')}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Game Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Book Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('games')}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Group Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('games')}
                  className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Tournaments
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8">
          <p className="text-center text-blue-200 text-xs sm:text-sm md:text-base px-4">
            © 2024 GameDen. All rights reserved. | Built with passion for gaming
          </p>
          <p className="text-center text-blue-300/70 text-xs mt-2 px-4">
            Developed by Elangkumaran BS
          </p>
        </div>
      </div>
    </footer>
  );
}
