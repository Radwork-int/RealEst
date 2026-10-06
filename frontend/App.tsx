import { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { PropertyList } from './components/PropertyList';
import { sampleEstates } from './data/sampleEstates';

const addressAliases: Record<string, string> = {
  apartment: 'unit',
  apt: 'unit',
  ave: 'avenue',
  avenue: 'avenue',
  blvd: 'boulevard',
  boulevard: 'boulevard',
  court: 'court',
  ct: 'court',
  drive: 'drive',
  dr: 'drive',
  lane: 'lane',
  ln: 'lane',
  rd: 'road',
  road: 'road',
  st: 'street',
  street: 'street',
  unit: 'unit',
};

const getAddressKey = (address: string, city: string, state: string) => {
  const normalizedAddress = address
    .toLowerCase()
    .replace(/#/g, ' unit ')
    .replace(/[.,]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => addressAliases[part] ?? part)
    .join(' ');

  return `${normalizedAddress}, ${city.toLowerCase()}, ${state.toLowerCase()}`;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEstates = useMemo(() => {
    const matches = sampleEstates.filter((property) =>
      property.address.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    const uniqueEstates = new Map<string, (typeof sampleEstates)[number]>();

    matches.forEach((property) => {
      const addressKey = getAddressKey(property.address, property.city, property.state);
      if (!uniqueEstates.has(addressKey)) {
        uniqueEstates.set(addressKey, property);
      }
    });

    return Array.from(uniqueEstates.values());
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