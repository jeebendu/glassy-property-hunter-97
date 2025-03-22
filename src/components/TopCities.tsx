
import React from 'react';
import { useAnimationOnScroll } from '@/lib/animations';
import { useNavigate } from 'react-router-dom';

const cities = [
  {
    name: "Bengaluru",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2069&auto=format&fit=crop",
    properties: 2500
  },
  {
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=2574&auto=format&fit=crop",
    properties: 3200
  },
  {
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2670&auto=format&fit=crop",
    properties: 2800
  },
  {
    name: "Hyderabad",
    image: "https://images.unsplash.com/photo-1605649461111-4a6c084b1343?q=80&w=2670&auto=format&fit=crop",
    properties: 1900
  },
  {
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop",
    properties: 1700
  },
  {
    name: "Pune",
    image: "https://images.unsplash.com/photo-1553616142-6d3d6cc3f6b2?q=80&w=2670&auto=format&fit=crop",
    properties: 1500
  }
];

const TopCities = () => {
  const animation = useAnimationOnScroll('up');
  const navigate = useNavigate();

  const handleCityClick = (cityName: string) => {
    navigate('/search', { state: { location: cityName } });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">Explore Properties by Top Cities</h2>
          <p className="section-subtitle">Discover the best properties in these popular locations</p>
        </div>

        <div 
          ref={animation.ref}
          className={`${animation.animationClass} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {cities.map((city, index) => (
            <div 
              key={city.name} 
              className={`${animation.animationClass} animate-delay-${index * 100} relative glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
              onClick={() => handleCityClick(city.name)}
            >
              <div className="h-64 relative">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold">{city.name}</h3>
                  <p className="text-white/80">{city.properties.toLocaleString()} properties</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCities;
