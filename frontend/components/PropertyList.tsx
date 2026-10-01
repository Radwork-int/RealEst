import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';

interface EstateListProps {
  estates: Property[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ estates }) => {
  if (estates.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p className="text-xl">No estates found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {estates.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};