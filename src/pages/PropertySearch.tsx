
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyFilters from '@/components/PropertyFilters';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocationSelector from '@/components/LocationSelector';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const PropertySearch = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [activeTab, setActiveTab] = useState('buy');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Load search params from navigation state if available
  useEffect(() => {
    if (location.state) {
      if (location.state.searchTerm) setSearchTerm(location.state.searchTerm);
      if (location.state.location) setSelectedLocation(location.state.location);
      if (location.state.type) setActiveTab(location.state.type);
    }
  }, [location.state]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      setShowLocationDialog(true);
      return;
    }
    console.log({ searchTerm, location: selectedLocation, type: activeTab });
    // Implement search functionality
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24">
        {/* Search Header */}
        <div className="bg-primary/5 py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-6">Property Search</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {['buy', 'rent', 'commercial', 'pg/co-living', 'plots'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
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

              {/* Search Inputs */}
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
          </div>
        </div>

        {/* Search Results */}
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="mb-4 w-full flex justify-between">
                    <span>Filters</span>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                      4 applied
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <h2 className="text-xl font-bold mb-6">Filters</h2>
                  <PropertyFilters />
                </SheetContent>
              </Sheet>
            ) : (
              <div className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
                <PropertyFilters />
              </div>
            )}
            
            {/* Results */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">245 Properties Found</h2>
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
                {/* Property cards would be rendered here */}
                <div className="h-64 rounded-xl bg-gray-100 flex items-center justify-center">
                  <p className="text-muted-foreground">Property listing</p>
                </div>
                <div className="h-64 rounded-xl bg-gray-100 flex items-center justify-center">
                  <p className="text-muted-foreground">Property listing</p>
                </div>
                <div className="h-64 rounded-xl bg-gray-100 flex items-center justify-center">
                  <p className="text-muted-foreground">Property listing</p>
                </div>
                <div className="h-64 rounded-xl bg-gray-100 flex items-center justify-center">
                  <p className="text-muted-foreground">Property listing</p>
                </div>
              </div>
              
              {/* Pagination */}
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertySearch;
