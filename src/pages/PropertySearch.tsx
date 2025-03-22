import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyCard from '@/components/PropertyCard';
import { Search, MapPin, ChevronDown, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import LocationSelector from '@/components/LocationSelector';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { properties } from '@/lib/data';
import DownloadApp from '@/components/DownloadApp';

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

const PropertySearch = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [activeTab, setActiveTab] = useState('buy');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(properties);
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
    if (location.state) {
      if (location.state.searchTerm) setSearchTerm(location.state.searchTerm);
      if (location.state.location) setSelectedLocation(location.state.location);
      if (location.state.type) setActiveTab(location.state.type);
    }
  }, [location.state]);
  
  useEffect(() => {
    filterProperties();
  }, [activeFilters, searchTerm, activeTab, selectedLocation]);
  
  useEffect(() => {
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

  const filterProperties = () => {
    let filtered = [...properties];
    
    if (searchTerm) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilters.type !== "all") {
      filtered = filtered.filter(property => property.type === activeFilters.type);
    }
    
    if (activeFilters.price !== "all") {
      const [min, max] = activeFilters.price.split('-').map(Number);
      filtered = filtered.filter(property => 
        property.price >= min && (max ? property.price <= max : true)
      );
    }
    
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 10000000) {
      filtered = filtered.filter(property => 
        property.price >= activeFilters.priceRange[0] && property.price <= activeFilters.priceRange[1]
      );
    }
    
    if (activeFilters.carpetArea[0] > 0 || activeFilters.carpetArea[1] < 10000) {
      filtered = filtered.filter(property => {
        const area = property.squareFeet || (property.builtUpArea ? parseInt(property.builtUpArea) : 0);
        return area >= activeFilters.carpetArea[0] && area <= activeFilters.carpetArea[1];
      });
    }
    
    if (activeFilters.bedrooms !== "all") {
      if (activeFilters.bedrooms === "4+") {
        filtered = filtered.filter(property => property.bedrooms >= 4);
      } else {
        filtered = filtered.filter(property => property.bedrooms === Number(activeFilters.bedrooms));
      }
    }
    
    if (activeFilters.bathrooms !== "all") {
      if (activeFilters.bathrooms === "3+") {
        filtered = filtered.filter(property => property.bathrooms >= 3);
      } else {
        filtered = filtered.filter(property => property.bathrooms === Number(activeFilters.bathrooms));
      }
    }
    
    if (activeFilters.balcony !== "all") {
      if (activeFilters.balcony === "3+") {
        filtered = filtered.filter(property => 
          property.balcony && parseInt(property.balcony.toString()) >= 3
        );
      } else {
        filtered = filtered.filter(property => 
          property.balcony && property.balcony.toString() === activeFilters.balcony
        );
      }
    }
    
    if (activeFilters.readyToMove !== "all") {
      filtered = filtered.filter(property => 
        activeFilters.readyToMove === "ready" 
          ? property.availableFrom === "Immediate" 
          : property.availableFrom !== "Immediate"
      );
    }
    
    if (activeFilters.furnishing !== "all") {
      filtered = filtered.filter(property => 
        property.furnishType && property.furnishType.toLowerCase() === activeFilters.furnishing
      );
    }
    
    if (activeFilters.status !== "all") {
      filtered = filtered.filter(property => property.status === activeFilters.status);
    }
    
    setFilteredProperties(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      setShowLocationDialog(true);
      return;
    }
    filterProperties();
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDialog(false);
  };
  
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };
  
  const removeFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    if (key === "carpetArea") {
      newFilters.carpetArea = [0, 10000];
    } else if (key === "priceRange") {
      newFilters.priceRange = [0, 10000000];
    } else {
      newFilters[key as keyof ActiveFilters] = "all";
    }
    
    setActiveFilters(newFilters);
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        <div className="bg-primary/5 py-4">
          <div className="container-custom">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {['buy', 'rent', 'pg', 'commercial', 'plots'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 font-medium whitespace-nowrap transition-colors min-w-16 ${
                      activeTab === tab 
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
                <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-4 py-3 w-full md:w-1/3">
                  <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
                    <DialogTrigger asChild>
                      <div className="relative w-full cursor-pointer">
                        <div className="flex items-center">
                          <MapPin size={20} className="text-gray-400 mr-3" />
                          <div className="flex-1">{selectedLocation || 'Select Location'}</div>
                          <ChevronDown size={18} className="text-gray-400 ml-2" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Select a Location</DialogTitle>
                      </DialogHeader>
                      <LocationSelector onSelect={handleLocationSelect} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex-1 px-4 py-3">
                  <Input
                    type="text"
                    placeholder="Search for locality, landmark, project, or builder"
                    className="border-none focus:ring-0 text-foreground h-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="px-4 py-3">
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full px-8"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
            
            {Object.keys(selectedFilters).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="bg-white text-primary text-xs rounded-full px-3 py-1.5 flex items-center shadow-sm"
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
                
                {Object.keys(selectedFilters).length > 1 && (
                  <button 
                    onClick={() => setActiveFilters({
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
                    })}
                    className="bg-white text-primary text-xs rounded-full px-3 py-1.5 flex items-center shadow-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="mb-4 w-full flex justify-between">
                    <div className="flex items-center">
                      <Filter size={16} className="mr-2" />
                      <span>Filters</span>
                    </div>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                      {Object.keys(selectedFilters).length} applied
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <h2 className="text-xl font-bold mb-6">Filters</h2>
                  <PropertyFilters onFilterChange={handleFilterChange} />
                </SheetContent>
              </Sheet>
            ) : (
              <div className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
                <PropertyFilters onFilterChange={handleFilterChange} />
              </div>
            )}
            
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">{filteredProperties.length} Properties Found</h2>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                  <select className="text-sm border-none bg-transparent focus:ring-0">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground text-lg">No properties found matching your criteria</p>
                    <button 
                      onClick={() => setActiveFilters({
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
                      })} 
                      className="mt-4 px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary/5"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
              
              {filteredProperties.length > 0 && (
                <div className="mt-10 flex justify-center">
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      &laquo;
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      3
                    </button>
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      &raquo;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DownloadApp />
      </div>

      <Footer />
    </div>
  );
};

export default PropertySearch;
