import { Star, Users } from 'lucide-react';
import { LiquidGlassCard } from './LiquidGlassButton';

interface Game {
  title: string;
  genre: string;
  rating: number;
  players: string;
  featured: boolean;
  proOnly?: boolean;
  image: string;
}

const games: Game[] = [
  {
    title: 'Grand Theft Auto V',
    genre: 'Action/Adventure',
    rating: 4.8,
    players: 'Single Player',
    featured: false,
    image: 'https://i.pinimg.com/1200x/0f/5c/50/0f5c508a1cfe821a530e6fd54d605ca3.jpg'
  },
  {
    title: 'WWE 2K SmackDown',
    genre: 'Sports/Wrestling',
    rating: 4.6,
    players: 'Up to 4 Players',
    featured: true,
    image: 'https://4kwallpapers.com/images/walls/thumbs_3t/21045.jpg'
  },
  {
    title: 'Mortal Kombat 11',
    genre: 'Fighting',
    rating: 4.7,
    players: '2 Players',
    featured: true,
    image: 'https://www.psu.com/wp/wp-content/uploads/2020/10/Mortal-Kombat-11-PS4-Wallpapers-04.jpg'
  },
  {
    title: 'Red Dead Redemption 2',
    genre: 'Action/Adventure',
    rating: 4.9,
    players: 'Single Player',
    featured: false,
    image: 'https://4kwallpapers.com/images/walls/thumbs_3t/10632.jpeg'
  },
  {
    title: 'FIFA 24',
    genre: 'Sports/Football',
    rating: 4.5,
    players: 'Up to 4 Players',
    featured: false,
    image: 'https://i0.wp.com/xboxera.com/wp-content/uploads/2025/09/fc-26-big.jpg?fit=1920%2C1080&ssl=1'
  },
  {
    title: 'Spider-Man',
    genre: 'Action/Adventure',
    rating: 4.8,
    players: 'Single Player',
    featured: true,
    proOnly: true,
    image: 'https://cdn1.epicgames.com/offer/4bc43145bb8245a5b5cc9ea262ffbe0e/EGS_MarvelsSpiderManRemastered_InsomniacGamesNixxesSoftware_S1_2560x1440-73702d11161b29a0b7c40a8b489b1808'
  }
];

export default function GameLibrary() {
  return (
    <section id="games" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl px-4">
            Premium Game <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Library</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg px-4">
            Choose from our extensive collection of the latest and most popular PlayStation titles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {games.map((game, index) => (
            <LiquidGlassCard
              key={index}
              className="overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {game.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}
                {game.proOnly && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PS4 Pro Only
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{game.title}</h3>
                <p className="text-gray-200 mb-4 drop-shadow">{game.genre}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-white drop-shadow">{game.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <Users className="w-5 h-5" />
                    <span className="text-sm drop-shadow">{game.players}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>
                  <span className="drop-shadow">PS4 & PS4 Pro Compatible</span>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
