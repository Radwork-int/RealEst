import React from 'react';
import { property } from '../types/property';

interface PropertyCardPtops {
    property: Property;
}

export const PropertyCard: React.FC<PropertyCardPtops> = ({property}) => {
  console.log('Property:', property);
  console.log('Address:', property.address);
return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img 
        src={property.source} 
        alt={property.id } 
        className="w-full h-64 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{Property.source}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
            ⭐ {property.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{property.listedDate}</p>
        <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
          {property.description} +{"Hello"}
        </p>
        <p>
          {property.address}
        </p>
      </div>
    </div>
  );
};