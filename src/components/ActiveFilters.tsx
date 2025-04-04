
import React from 'react';
import { X } from 'lucide-react';
import { propertyTypes, priceRanges, bedroomOptions, bathroomOptions, statusOptions } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ActiveFiltersProps {
  filters: {
    type: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    status: string;
  };
  onRemoveFilter: (filterType: string) => void;
}

const ActiveFilters = ({ filters, onRemoveFilter }: ActiveFiltersProps) => {
  // Helper function to get label from value
  const getFilterLabel = (type: string, value: string) => {
    const filterMap = {
      type: propertyTypes,
      price: priceRanges,
      bedrooms: bedroomOptions,
      bathrooms: bathroomOptions,
      status: statusOptions,
    };

    const filterArray = filterMap[type as keyof typeof filterMap];
    const item = filterArray.find(item => item.value === value);
    return item ? item.label : value;
  };

  // Check if we have any active filters
  const hasActiveFilters = Object.values(filters).some(value => value !== "all");

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([type, value]) => {
          if (value === "all") return null;
          
          return (
            <div 
              key={`${type}-${value}`}
              className={cn(
                "bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium",
                "flex items-center gap-1"
              )}
            >
              <span>{getFilterLabel(type, value)}</span>
              <button 
                onClick={() => onRemoveFilter(type)} 
                className="ml-1 p-0.5 rounded-full hover:bg-primary/20"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveFilters;
