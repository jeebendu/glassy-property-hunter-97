
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { properties } from '@/lib/data';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import PropertyInfo from '@/components/PropertyInfo';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  const property = properties.find(p => p.id === id);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const headerHeight = 80; // Approximate height of the header
        const tabsPosition = tabsRef.current.getBoundingClientRect().top;
        setIsTabsSticky(tabsPosition <= headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">•</span>
            <Link to="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <span className="mx-2">•</span>
            <span className="text-foreground truncate max-w-[200px]">{property.title}</span>
          </div>
          
          {/* Property Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="text-muted-foreground">
                <p>{property.address}</p>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">
                {property.status === "For Rent" ? `₹${property.price}/mo` : new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(property.price)}
              </span>
              <button
                className={cn(
                  "h-10 w-10 glass rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white",
                  isFavorite && "bg-red-50"
                )}
                onClick={toggleFavorite}
              >
                <Heart 
                  size={20} 
                  className={cn(
                    "transition-colors duration-300",
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                  )} 
                />
              </button>
            </div>
          </div>
          
          {/* Property Gallery */}
          <div className="mb-12">
            <div className="relative h-[500px] rounded-2xl overflow-hidden glass">
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover animate-fade-in"
              />
              
              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 glass rounded-full flex items-center justify-center"
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 glass rounded-full flex items-center justify-center"
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span 
                  className={cn(
                    "glass px-3 py-1 rounded-full text-sm font-medium",
                    property.status === "For Sale" ? "text-primary" : 
                    property.status === "For Rent" ? "text-green-600" : 
                    property.status === "Pending" ? "text-amber-600" : "text-gray-700"
                  )}
                >
                  {property.status}
                </span>
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex mt-4 space-x-2 overflow-x-auto scrollbar-hide">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex-shrink-0 h-20 w-32 rounded-lg overflow-hidden transition-all duration-300",
                    currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} - image ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Property Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Sticky Tabs Container */}
              <div 
                ref={tabsRef}
                className={cn(
                  "transition-all duration-300",
                  isTabsSticky && "sticky top-[76px] z-30 bg-white/95 backdrop-blur-sm shadow-sm -mx-4 px-4 py-2"
                )}
              >
                {/* Detailed Property Info */}
                <PropertyInfo property={property} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Agent Card */}
              <div className="glass p-6 rounded-xl mb-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={property.agent.image} 
                    alt={property.agent.name} 
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{property.agent.name}</h4>
                    <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{property.agent.email}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="btn-primary w-full">Contact Agent</button>
                  <button className="btn-outline w-full">Schedule Viewing</button>
                </div>
              </div>
              
              {/* Similar Properties Teaser */}
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {properties
                    .filter(p => p.id !== property.id && p.type === property.type)
                    .slice(0, 2)
                    .map(p => (
                      <Link key={p.id} to={`/property/${p.id}`} className="block group">
                        <div className="flex">
                          <img 
                            src={p.images[0]} 
                            alt={p.title} 
                            className="h-20 w-20 rounded-lg object-cover flex-shrink-0 mr-4 transition-transform duration-300 group-hover:scale-105"
                          />
                          <div>
                            <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{p.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{p.address}</p>
                            <p className="text-sm font-semibold text-primary">
                              {p.status === "For Rent" ? `₹${p.price}/mo` : new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 0,
                              }).format(p.price)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                <div className="mt-4">
                  <Link to="/search" className="text-primary text-sm font-medium hover:underline">
                    View all similar properties
                  </Link>
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

export default PropertyDetails;
