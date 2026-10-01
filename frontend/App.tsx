import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { PropertyList } from './components/PropertyList';
import { sampleEstates } from './data/sampleEstates';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter properties based on the search query
  const filteredEstates = useMemo(() => {
    return sampleEstates.filter((property) =>
      property.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white py-6 shadow-md mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-center">React Property Finder</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <PropertyList estates={filteredEstates} />
      </main>
    </div>
  );
}

export default App;