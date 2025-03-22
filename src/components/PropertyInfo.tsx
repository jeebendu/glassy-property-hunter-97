
import React from 'react';
import { Property } from '@/lib/data';
import { 
  Bed, 
  Bath, 
  Home, 
  Maximize, 
  Calendar, 
  CheckCircle2, 
  Building, 
  Car, 
  DollarSign, 
  CircleDollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Compass,
  Building2,
  Clock,
  Users,
  User,
  BadgeCheck,
  Check,
  Wifi,
  Tv,
  Swimming,
  ShieldCheck,
  Flower2,
  Dumbbell,
  Waves,
  Utensils,
  Gamepad2,
  ParkingSquare,
  Sofa
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

interface PropertyInfoProps {
  property: Property;
}

// Map for amenity icons
const amenityIcons: {[key: string]: React.ReactNode} = {
  'Air Conditioning': <Wifi size={16} className="text-primary" />,
  'Wifi': <Wifi size={16} className="text-primary" />,
  'TV': <Tv size={16} className="text-primary" />,
  'Swimming Pool': <Swimming size={16} className="text-primary" />,
  '24/7 Security': <ShieldCheck size={16} className="text-primary" />,
  'Garden': <Flower2 size={16} className="text-primary" />,
  'Gym': <Dumbbell size={16} className="text-primary" />,
  'Water Supply': <Waves size={16} className="text-primary" />,
  'Kitchen': <Utensils size={16} className="text-primary" />,
  'Game Room': <Gamepad2 size={16} className="text-primary" />,
  'Parking': <ParkingSquare size={16} className="text-primary" />,
  'Power Backup': <Check size={16} className="text-primary" />,
  'Lift': <ArrowUpRight size={16} className="text-primary" />,
  'Furnished': <Sofa size={16} className="text-primary" />,
};

// Function to get icon for amenity
const getAmenityIcon = (amenity: string) => {
  return amenityIcons[amenity] || <Check size={16} className="text-primary" />;
};

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="about">
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="about">ABOUT</TabsTrigger>
          <TabsTrigger value="features">FEATURES</TabsTrigger>
          <TabsTrigger value="gallery">GALLERY</TabsTrigger>
          <TabsTrigger value="location">LOCATION</TabsTrigger>
          <TabsTrigger value="nearby">NEAR BY</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground">
                {property.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Property Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Bed className="h-5 w-5 text-primary" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Bath className="h-5 w-5 text-primary" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5 text-primary" />
                  <span>{property.bhk || `${property.bedrooms} BHK`}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Maximize className="h-5 w-5 text-primary" />
                  <span>{property.builtUpArea || `${property.squareFeet} Sq. ft.`} Built-up Area</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Built in {property.yearBuilt}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-primary" />
                  <span>{property.type}</span>
                </div>
                {property.balcony && (
                  <div className="flex items-center space-x-3">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                    <span>{property.balcony} Balcony</span>
                  </div>
                )}
                {property.furnishType && (
                  <div className="flex items-center space-x-3">
                    <Sofa className="h-5 w-5 text-primary" />
                    <span>{property.furnishType}</span>
                  </div>
                )}
                {property.floorNo && (
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Floor {property.floorNo}</span>
                  </div>
                )}
                {property.coveredParking && (
                  <div className="flex items-center space-x-3">
                    <Car className="h-5 w-5 text-primary" />
                    <span>{property.coveredParking} Parking</span>
                  </div>
                )}
                {property.carpetArea && (
                  <div className="flex items-center space-x-3">
                    <Maximize className="h-5 w-5 text-primary" />
                    <span>{property.carpetArea} Carpet Area</span>
                  </div>
                )}
                {property.facing && (
                  <div className="flex items-center space-x-3">
                    <Compass className="h-5 w-5 text-primary" />
                    <span>{property.facing} Facing</span>
                  </div>
                )}
              </div>
            </div>
            
            {property.status === "For Rent" && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Rental Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.monthlyRent && (
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span>Rent: {property.monthlyRent}</span>
                    </div>
                  )}
                  {property.securityDeposit && (
                    <div className="flex items-center space-x-3">
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                      <span>Security: {property.securityDeposit}</span>
                    </div>
                  )}
                  {property.maintenanceCharges && (
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Maintenance: {property.maintenanceCharges}</span>
                    </div>
                  )}
                  {property.parkingCharges && (
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-primary" />
                      <span>Parking: {property.parkingCharges}</span>
                    </div>
                  )}
                  {property.availableFrom && (
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Available: {property.availableFrom}</span>
                    </div>
                  )}
                  {property.preferredTenantType && (
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Preferred: {property.preferredTenantType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Property Owner/Agent</h3>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <span>
                  {property.agencyName ? (
                    <>{property.agencyName} <BadgeCheck className="inline h-4 w-4 text-blue-500" /></>
                  ) : 'Owner'}
                </span>
              </div>
              {property.brokerNegotiable && (
                <div className="flex items-center space-x-3 mt-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Broker Negotiable: {property.brokerNegotiable}</span>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {[...property.amenities, 'Air Conditioning', '24/7 Security', 'Garden', 'Gym', 'Swimming Pool'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    {getAmenityIcon(feature)}
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gallery" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`Property ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="location" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Location</h3>
            <p className="text-muted-foreground">{property.address}</p>
            <div className="h-[300px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Map will be displayed here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nearby" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Nearby Landmarks</h3>
            <p className="text-muted-foreground">{property.nearbyLandmarks || 'Information not available'}</p>
            <div className="space-y-3">
              <div className="flex justify-between p-3 border-b">
                <span>Schools</span>
                <span className="text-muted-foreground">1.2 km</span>
              </div>
              <div className="flex justify-between p-3 border-b">
                <span>Hospital</span>
                <span className="text-muted-foreground">2.5 km</span>
              </div>
              <div className="flex justify-between p-3 border-b">
                <span>Shopping Mall</span>
                <span className="text-muted-foreground">3.1 km</span>
              </div>
              <div className="flex justify-between p-3 border-b">
                <span>Metro Station</span>
                <span className="text-muted-foreground">0.8 km</span>
              </div>
              <div className="flex justify-between p-3 border-b">
                <span>Airport</span>
                <span className="text-muted-foreground">15.6 km</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyInfo;
