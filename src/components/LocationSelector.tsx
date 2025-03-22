
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LocationSelectorProps {
  onSelect: (location: string) => void;
}

const popularCities = [
  "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", 
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"
];

const LocationSelector = ({ onSelect }: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(popularCities);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCities(popularCities);
    } else {
      const filtered = popularCities.filter(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchQuery]);

  return (
    <div className="p-1">
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search for a city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Popular Cities</h3>
        <div className="grid grid-cols-2 gap-2">
          {filteredCities.map(city => (
            <button
              key={city}
              className="px-4 py-3 text-left hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => onSelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
