
import React from 'react';
import { Link } from 'react-router-dom';
import { BathIcon, BedIcon, HomeIcon, RulerIcon, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ShareButton from './ShareButton';

interface PropertyCardProps {
  property: any;
  className?: string;
  index?: number; 
}

const PropertyCard = ({ property, className, index }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const getPropertyTypeIcon = () => {
    switch (property.type) {
      case 'Apartment':
        return <HomeIcon size={16} />;
      case 'Villa':
        return <HomeIcon size={16} />;
      case 'Commercial':
        return <HomeIcon size={16} />;
      default:
        return <HomeIcon size={16} />;
    }
  };

  return (
    <div className={cn("property-card flex flex-col h-full overflow-hidden", className)}>
      {/* Image container */}
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          <img src={property.images[0]} alt={property.title} className="property-image" />
          
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <div className={cn(
              "badge px-3 py-1 font-medium text-xs",
              property.status === "For Sale" ? "bg-white text-primary" : 
              property.status === "For Rent" ? "bg-green-100 text-green-600" : 
              property.status === "Pending" ? "bg-amber-100 text-amber-600" : 
              "bg-gray-100 text-gray-600"
            )}>
              {property.status}
            </div>
          </div>
        </Link>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 glass rounded-full"
            onClick={handleFavorite}
          >
            <Heart 
              size={16} 
              className={cn("transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-gray-700")} 
            />
          </Button>
          
          <ShareButton 
            url={`${window.location.origin}/property/${property.id}`}
            title={property.title}
            iconOnly
            className="h-8 w-8 glass rounded-full"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Price */}
        <div className="mb-2">
          <p className="text-xl font-bold text-primary">
            {property.status === "For Rent" ? `₹${property.price}/mo` : new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(property.price)}
          </p>
        </div>
        
        {/* Title */}
        <Link to={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>
        
        {/* Address */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {property.address}
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center">
              <BedIcon size={16} className="mr-1" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
          )}
          
          {property.bathrooms && (
            <div className="flex items-center">
              <BathIcon size={16} className="mr-1" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
          )}
          
          {(property.squareFeet || property.builtUpArea) && (
            <div className="flex items-center">
              <RulerIcon size={16} className="mr-1" />
              <span>{property.squareFeet || property.builtUpArea} sq.ft</span>
            </div>
          )}
          
          {property.type && (
            <div className="flex items-center">
              {getPropertyTypeIcon()}
              <span className="ml-1">{property.type}</span>
            </div>
          )}
        </div>
        
        {/* Agent/View details */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <img 
              src={property.agent.image} 
              alt={property.agent.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium">{property.agent.name}</span>
          </div>
          
          <Link 
            to={`/property/${property.id}`}
            className="text-xs text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
