import React, { useState, useMemo } from 'react';
import { Film, Search, Star, Clock, PlayCircle } from 'lucide-react';

// Define the data model for a Movie
interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  imageUrl: string;
  synopsis: string;
}

// Mock Data to populate the application
const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Neon Skyline',
    year: 2024,
    rating: 8.7,
    duration: '2h 15m',
    genre: ['Sci-Fi', 'Action'],
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'In a cyberpunk future, a rogue detective uncovers a conspiracy that goes all the way to the top of the megacorporations.'
  },
  {
    id: '2',
    title: 'The Silent Horizon',
    year: 2025,
    rating: 9.1,
    duration: '1h 58m',
    genre: ['Drama', 'Mystery'],
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'A lone astronaut discovers an anomaly at the edge of the solar system that challenges everything we know about physics.'
  },
  {
    id: '3',
    title: 'Midnight Heist',
    year: 2023,
    rating: 7.8,
    duration: '2h 05m',
    genre: ['Thriller', 'Crime'],
    imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'An elite crew plans the ultimate casino robbery during a city-wide blackout.'
  },
  {
    id: '4',
    title: 'Whispering Woods',
    year: 2024,
    rating: 6.5,
    duration: '1h 45m',
    genre: ['Horror', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'A group of friends stumble upon an ancient secret hidden deep within an uncharted forest.'
  },
  {
    id: '5',
    title: 'Quantum Paradox',
    year: 2026,
    rating: 8.9,
    duration: '2h 30m',
    genre: ['Sci-Fi', 'Adventure'],
    imageUrl: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'Time travelers attempt to fix a broken timeline, only to realize they are the cause of the fracture.'
  },
  {
    id: '6',
    title: 'Laughing Matter',
    year: 2023,
    rating: 7.2,
    duration: '1h 35m',
    genre: ['Comedy'],
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600&h=900',
    synopsis: 'A struggling stand-up comedian accidentally becomes the mayor of a small town.'
  }
];

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-700">
        <img 
          src={movie.imageUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle size={48} className="text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all" />
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-gray-600/50">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{movie.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white line-clamp-1 mb-1 group-hover:text-indigo-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
          <span>{movie.year}</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{movie.duration}</span>
          </div>
        </div>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {movie.genre.map((g) => (
            <span key={g} className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-indigo-300 bg-indigo-900/40 rounded-full border border-indigo-500/20">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6 h-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-indigo-500">
          <Film size={32} strokeWidth={2.5} />
          <span className="text-2xl font-black tracking-tighter text-white">
            Reel<span className="text-indigo-500">Stream</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-400 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search movies by title or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Navigation/Profile placeholder */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Movies</a>
          <a href="#" className="hover:text-white transition-colors">TV Shows</a>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-gray-800 cursor-pointer"></div>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter movies based on the search query (title or genre)
  const filteredMovies = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (!lowerCaseQuery) return MOCK_MOVIES;

    return MOCK_MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(lowerCaseQuery) ||
      movie.genre.some(g => g.toLowerCase().includes(lowerCaseQuery))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {searchQuery ? 'Search Results' : 'Trending Now'}
            </h2>
            <p className="text-gray-400">
              {searchQuery 
                ? `Found ${filteredMovies.length} movies for "${searchQuery}"`
                : 'Discover the most popular movies this week'}
            </p>
          </div>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-900/50 rounded-2xl border border-gray-800 border-dashed">
            <Film size={64} className="text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No movies found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any movies matching "{searchQuery}". Try searching for a different title or genre.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-gray-900 mt-12 py-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} ReelStream Movie App Skeleton. Built with React + TypeScript.</p>
      </footer>
    </div>
  );
}