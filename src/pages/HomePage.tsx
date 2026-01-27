import Hero from '../components/Hero';
import GameLibrary from '../components/GameLibrary';
import GamingWheel from '../components/GamingWheel';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <GameLibrary />
      <GamingWheel />
      <Pricing />
      <Footer />
    </div>
  );
}
