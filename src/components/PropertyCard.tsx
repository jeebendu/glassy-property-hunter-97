
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/lib/animations';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index = 0 }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { imageSrc, imageLoaded } = useLazyImage(property.images[0]);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className={cn(
        "property-card overflow-hidden block",
        "opacity-0 animate-fade-in",
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <div 
          className={cn(
            "property-image bg-gray-200",
            !imageLoaded && "animate-pulse"
          )}
          style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span 
            className={cn(
              "glass px-3 py-1 rounded-full text-xs font-medium",
              property.status === "For Sale" ? "text-primary" : 
              property.status === "For Rent" ? "text-green-600" : 
              property.status === "Pending" ? "text-amber-600" : "text-gray-700"
            )}
          >
            {property.status}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-4 right-4 h-8 w-8 glass rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/90"
          onClick={toggleFavorite}
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors duration-300",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
            )} 
          />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full">
          <span className="font-bold text-primary">{formatPrice(property.price)}</span>
          {property.status === "For Rent" && <span className="text-sm text-gray-600">/month</span>}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 truncate">{property.title}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed size={18} className="text-primary mr-2" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath size={18} className="text-primary mr-2" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square size={18} className="text-primary mr-2" />
              <span className="text-sm">{property.squareFeet} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
