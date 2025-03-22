
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
  onFilterChange: (filters: any) => void;
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

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
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

  const handleFilterChange = (filterType: string, value: string | number[]) => {
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
      newFilters[key as keyof typeof newFilters] = "all";
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
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
        
        {/* Selected filters display */}
        {Object.keys(selectedFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(selectedFilters).map(([key, value]) => (
              <div 
                key={key} 
                className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1.5 flex items-center"
              >
                <span className="capitalize mr-1">
                  {key === "priceRange" 
                    ? `Price: ${formatPrice((value as number[])[0])} - ${formatPrice((value as number[])[1])}` 
                    : key === "carpetArea"
                      ? `Area: ${formatArea((value as number[])[0])} - ${formatArea((value as number[])[1])}`
                      : `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`}
                </span>
                <button 
                  onClick={() => removeFilter(key)}
                  className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
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
          
          {/* Selected filters display - desktop */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="hidden lg:flex flex-wrap gap-2 mb-6">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <div 
                  key={key} 
                  className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1.5 flex items-center"
                >
                  <span className="capitalize mr-1">
                    {key === "priceRange" 
                      ? `Price: ${formatPrice((value as number[])[0])} - ${formatPrice((value as number[])[1])}` 
                      : key === "carpetArea"
                        ? `Area: ${formatArea((value as number[])[0])} - ${formatArea((value as number[])[1])}`
                        : `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`}
                  </span>
                  <button 
                    onClick={() => removeFilter(key)}
                    className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
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
                value={activeFilters.priceRange as number[]}
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
                value={activeFilters.carpetArea as number[]}
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
