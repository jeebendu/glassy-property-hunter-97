
import React, { useState } from 'react';
import { propertyTypes, priceRanges, bedroomOptions, bathroomOptions, statusOptions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Sliders, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: any) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    price: "all",
    bedrooms: "all",
    bathrooms: "all",
    status: "all"
  });

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      type: "all",
      price: "all",
      bedrooms: "all",
      bathrooms: "all",
      status: "all"
    };
    
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const renderFilterOptions = (options: FilterOption[], filterType: string) => {
    return options.map(option => (
      <button
        key={option.value}
        className={cn(
          "filter-pill",
          activeFilters[filterType as keyof typeof activeFilters] === option.value && "filter-pill-active"
        )}
        onClick={() => handleFilterChange(filterType, option.value)}
      >
        {option.label}
      </button>
    ));
  };

  return (
    <div className="mb-12">
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <button 
          className="btn-outline flex items-center space-x-2"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Sliders size={18} />
          <span>Filters</span>
        </button>
        
        {Object.values(activeFilters).some(value => value !== "all") && (
          <button 
            className="text-sm text-primary flex items-center"
            onClick={clearFilters}
          >
            <X size={16} className="mr-1" />
            Clear filters
          </button>
        )}
      </div>

      {/* Filters Container */}
      <div className={cn(
        "glass rounded-xl overflow-hidden transition-all duration-500 ease-in-out",
        filtersOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100"
      )}>
        <div className="p-6">
          {/* Desktop Header with Clear Button */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Filter Properties</h3>
            {Object.values(activeFilters).some(value => value !== "all") && (
              <button 
                className="text-sm text-primary flex items-center"
                onClick={clearFilters}
              >
                <X size={16} className="mr-1" />
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Property Type Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Property Type</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(propertyTypes, "type")}
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Price Range</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(priceRanges, "price")}
            </div>
          </div>
          
          {/* Bedroom Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Bedrooms</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(bedroomOptions, "bedrooms")}
            </div>
          </div>
          
          {/* Bathroom Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Bathrooms</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(bathroomOptions, "bathrooms")}
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(statusOptions, "status")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
