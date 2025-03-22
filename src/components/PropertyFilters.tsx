import React, { useState, useEffect } from 'react';
import { propertyTypes, priceRanges, bedroomOptions, bathroomOptions, statusOptions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Sliders, X, Filter, Check } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  value: string;
  label: string;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: ActiveFilters) => void;
}

// Define additional filter options
const balconyOptions = [
  { value: "all", label: "Any" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" }
];

const readyToMoveOptions = [
  { value: "all", label: "Any" },
  { value: "ready", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" }
];

const furnishingOptions = [
  { value: "all", label: "Any" },
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "fully-furnished", label: "Fully-Furnished" }
];

// Define the filter state type for better type safety
interface ActiveFilters {
  type: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  status: string;
  balcony: string;
  readyToMove: string;
  furnishing: string;
  carpetArea: number[];
  priceRange: number[];
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    type: "all",
    price: "all",
    bedrooms: "all",
    bathrooms: "all",
    status: "all",
    balcony: "all",
    readyToMove: "all",
    furnishing: "all",
    carpetArea: [0, 10000],
    priceRange: [0, 10000000]
  });
  
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string | number[]}>({});

  useEffect(() => {
    // Convert activeFilters to selectedFilters for display
    const newSelectedFilters: {[key: string]: string | number[]} = {};
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== "all" && key !== "priceRange" && key !== "carpetArea") {
        newSelectedFilters[key] = value;
      } else if ((key === "priceRange" || key === "carpetArea") && 
                 (Array.isArray(value) && 
                  (value[0] > 0 || value[1] < (key === "priceRange" ? 10000000 : 10000)))) {
        newSelectedFilters[key] = value;
      }
    });
    
    setSelectedFilters(newSelectedFilters);
  }, [activeFilters]);

  const handleFilterChange = (filterType: keyof ActiveFilters, value: string | number[]) => {
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
      status: "all",
      balcony: "all",
      readyToMove: "all",
      furnishing: "all",
      carpetArea: [0, 10000],
      priceRange: [0, 10000000]
    };
    
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  const removeFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    if (key === "carpetArea") {
      newFilters.carpetArea = [0, 10000];
    } else if (key === "priceRange") {
      newFilters.priceRange = [0, 10000000];
    } else {
      (newFilters as any)[key] = "all";
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderFilterOptions = (options: FilterOption[], filterType: keyof ActiveFilters) => {
    return options.map(option => (
      <button
        key={option.value}
        className={cn(
          "filter-pill",
          activeFilters[filterType] === option.value && "filter-pill-active"
        )}
        onClick={() => handleFilterChange(filterType, option.value)}
      >
        {option.label}
      </button>
    ));
  };
  
  const formatPrice = (value: number) => {
    if (value >= 10000000) return "₹1Cr+";
    if (value >= 100000) return `₹${(value/100000).toFixed(1)}L`;
    return `₹${value}`;
  };
  
  const formatArea = (value: number) => {
    return `${value} sq.ft`;
  };

  return (
    <div className="mb-8">
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <button 
            className="btn-outline flex items-center space-x-2"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Sliders size={18} />
            <span>Filters</span>
          </button>
          
          {Object.keys(selectedFilters).length > 0 && (
            <button 
              className="text-sm text-primary flex items-center"
              onClick={clearFilters}
            >
              <X size={16} className="mr-1" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Filters Container */}
      <div className={cn(
        "glass rounded-xl overflow-hidden transition-all duration-500 ease-in-out",
        filtersOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-[2000px] lg:opacity-100"
      )}>
        <div className="p-6">
          {/* Desktop Header with Clear Button */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Filter Properties</h3>
            {Object.keys(selectedFilters).length > 0 && (
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
          
          {/* Price Range Filter - Now with Slider */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Price Range</h4>
            <div className="px-2 mb-4">
              <Slider 
                defaultValue={[0, 10000000]} 
                max={10000000} 
                step={100000} 
                value={activeFilters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                className="mt-6"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{formatPrice(activeFilters.priceRange[0])}</span>
                <span>{formatPrice(activeFilters.priceRange[1])}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {renderFilterOptions(priceRanges, "price")}
            </div>
          </div>
          
          {/* Carpet/Plot Area Slider */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Carpet/Plot Area</h4>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 10000]} 
                max={10000} 
                step={100} 
                value={activeFilters.carpetArea}
                onValueChange={(value) => handleFilterChange("carpetArea", value)}
                className="mt-6"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{formatArea(activeFilters.carpetArea[0])}</span>
                <span>{formatArea(activeFilters.carpetArea[1])}</span>
              </div>
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
          
          {/* Balcony Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Balcony</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(balconyOptions, "balcony")}
            </div>
          </div>
          
          {/* Ready To Move Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Availability</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(readyToMoveOptions, "readyToMove")}
            </div>
          </div>
          
          {/* Furnishing Status */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Furnishing</h4>
            <div className="flex flex-wrap gap-2">
              {renderFilterOptions(furnishingOptions, "furnishing")}
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
