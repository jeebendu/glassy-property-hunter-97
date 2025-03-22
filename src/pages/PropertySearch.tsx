import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Grid3X3, LayoutGrid, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import PropertyFilters from '@/components/PropertyFilters';
import { properties, cities } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PropertySearchProps {
  openAuthDialog?: () => void;
}

interface ActiveFilters {
  type: string;
  status: string;
  beds: string;
  baths: string;
  priceRange: number[];
}

const PropertySearch = ({ openAuthDialog }: PropertySearchProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        type: '',
        status: '',
        beds: '',
        baths: '',
        priceRange: [0, 1000000],
    });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

    useEffect(() => {
        let results = properties;

        if (searchQuery) {
            results = results.filter(property =>
                property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.city.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilters.type) {
            results = results.filter(property => property.type === activeFilters.type);
        }

        if (activeFilters.status) {
            results = results.filter(property => property.status === activeFilters.status);
        }

        if (activeFilters.beds) {
            results = results.filter(property => property.beds === parseInt(activeFilters.beds));
        }

        if (activeFilters.baths) {
            results = results.filter(property => property.baths === parseInt(activeFilters.baths));
        }

        if (activeFilters.priceRange) {
            results = results.filter(property => property.price >= activeFilters.priceRange[0] && property.price <= activeFilters.priceRange[1]);
        }

        setFilteredProperties(results);
    }, [searchQuery, activeFilters]);

    const handleFiltersChange = (newFilters: Partial<ActiveFilters>) => {
        setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

  return (
    <div className="min-h-screen bg-background">
      <Navbar openAuthDialog={openAuthDialog} />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-primary/5 py-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Properties for Sale & Rent
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of properties and find the perfect place
              for you.
            </p>
          </div>
        </div>

        <div className="container-custom mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by location, address, or property ID..."
                className="w-full px-4 py-2 rounded-full border border-gray-200 focus:ring-primary focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>

            {/* View Toggle & Filter Button */}
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              {/* View Toggle */}
              <button
                className={cn(
                  'p-2 rounded-md transition-colors',
                  isGridView ? 'bg-primary text-white' : 'bg-gray-100'
                )}
                onClick={() => setIsGridView(true)}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                className={cn(
                  'p-2 rounded-md transition-colors',
                  !isGridView ? 'bg-primary text-white' : 'bg-gray-100'
                )}
                onClick={() => setIsGridView(false)}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>

              {/* Filter Button (Mobile Only) */}
              {isMobile && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="pt-6">
                    <PropertyFilters onChange={handleFiltersChange} />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>

          {/* Filters (Desktop) */}
          {!isMobile && (
            <div className="mb-6">
              <PropertyFilters onChange={handleFiltersChange} />
            </div>
          )}

          {/* Property Listings */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-6',
                isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              )}
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertySearch;
