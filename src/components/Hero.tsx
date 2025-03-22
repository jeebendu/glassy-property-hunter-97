
import React, { useState } from 'react';
import { Search, MapPin, Home, ArrowRight } from 'lucide-react';
import { propertyTypes, statusOptions } from '@/lib/data';
import { useAnimationOnScroll } from '@/lib/animations';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [status, setStatus] = useState('all');
  
  const titleAnimation = useAnimationOnScroll('up');
  const subtitleAnimation = useAnimationOnScroll('up', 0.1, 200);
  const searchAnimation = useAnimationOnScroll('up', 0.1, 400);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchTerm, propertyType, status });
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
            Discover the Perfect Property for Your Lifestyle
          </h1>
          
          <p 
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} text-lg md:text-xl text-white/80 mb-10 max-w-2xl`}
          >
            Explore our curated selection of premium properties, from urban apartments to luxurious estates, tailored to your unique preferences.
          </p>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className={`${searchAnimation.animationClass} hero-search flex flex-col md:flex-row items-center p-2 mb-8 md:mb-0`}
          >
            <div className="flex items-center flex-1 px-4 py-2">
              <MapPin size={20} className="text-primary mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter location, neighborhood, or address"
                className="search-input text-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center md:border-l border-gray-200 px-4 py-2">
              <Home size={20} className="text-primary mr-2 flex-shrink-0" />
              <select
                className="search-input bg-transparent text-foreground"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center md:border-l border-gray-200 px-4 py-2">
              <select
                className="search-input bg-transparent text-foreground"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2 px-6 py-3 m-2"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </form>

          {/* Stats */}
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

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-10 animate-pulse">
        <p className="text-sm mb-2">Scroll Down</p>
        <ArrowRight size={20} className="rotate-90" />
      </div>
    </section>
  );
};

export default Hero;
