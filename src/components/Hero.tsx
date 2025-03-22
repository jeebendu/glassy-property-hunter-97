
import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { propertyTypes, statusOptions } from '@/lib/data';
import { useAnimationOnScroll } from '@/lib/animations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [propertyType, setPropertyType] = useState('all');
  const [activeTab, setActiveTab] = useState('buy');
  
  const titleAnimation = useAnimationOnScroll('up');
  const subtitleAnimation = useAnimationOnScroll('up', 0.1, 200);
  const searchAnimation = useAnimationOnScroll('up', 0.1, 400);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchTerm, propertyType, location: selectedLocation, type: activeTab });
    // Implement search functionality
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundPosition: "center 30%" 
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 pt-20 md:pt-0">
        <div className="max-w-4xl text-white">
          <h4 
            ref={titleAnimation.ref}
            className={`${titleAnimation.animationClass} text-lg md:text-xl font-medium mb-3 flex items-center`}
          >
            <span className="inline-block h-1 w-6 bg-primary mr-3"></span>
            Find Your Dream Home
          </h4>
          
          <h1 
            ref={subtitleAnimation.ref}
            className={`${subtitleAnimation.animationClass} text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight`}
          >
            Properties to buy in {selectedLocation}
          </h1>
          
          <p 
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} text-lg md:text-xl text-white/80 mb-4 max-w-2xl`}
          >
            10K+ listings added daily and 63K+ total verified
          </p>

          {/* Search Form */}
          <div
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mt-10`}
          >
            {/* Tabs */}
            <div className="flex border-b">
              {['buy', 'rent', 'commercial', 'pg/co-living', 'plots'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 font-medium transition-colors ${
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
              <div className="flex items-center border-r border-gray-200 px-4 py-3 w-full md:w-1/3">
                <div className="relative w-full cursor-pointer">
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-400 mr-3" />
                    <div className="flex-1">{selectedLocation}</div>
                    <ChevronDown size={18} className="text-gray-400 ml-2" />
                  </div>
                </div>
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

          {/* Continue last search */}
          <div className="mt-4 flex items-center space-x-4">
            <button className="text-white hover:text-primary transition-colors">
              Continue last search
            </button>
            
            <div className="bg-blue-400/30 text-white px-6 py-2 rounded-full flex items-center">
              <span>Bengaluru, Karnataka,...</span>
              <ChevronDown size={18} className="ml-2" />
            </div>
          </div>

          {/* Stats (Hidden on mobile for cleaner UI) */}
          <div 
            className="hidden md:flex items-center space-x-12 mt-16"
            ref={searchAnimation.ref}
          >
            <div className={`${searchAnimation.animationClass} animate-delay-300`}>
              <p className="text-4xl font-bold">500+</p>
              <p className="text-white/70">Properties</p>
            </div>
            <div className={`${searchAnimation.animationClass} animate-delay-400`}>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-white/70">Happy Clients</p>
            </div>
            <div className={`${searchAnimation.animationClass} animate-delay-500`}>
              <p className="text-4xl font-bold">20+</p>
              <p className="text-white/70">Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
