
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyInfoProps {
  property: {
    id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    type: string;
    status: string;
    bhk?: string;
    balcony?: string;
    furnishType?: string;
    floorNo?: string;
    coveredParking?: string;
    monthlyRent?: string;
    maintenanceCharges?: string;
    securityDeposit?: string;
    builtUpArea?: string;
    carpetArea?: string;
    parkingCharges?: string;
    totalFloors?: string;
    nearbyLandmarks?: string;
    facing?: string;
    servantRoom?: string;
    agencyName?: string;
    brokerNegotiable?: string;
    availableFrom?: string;
    preferredTenantType?: string;
    category?: string;
    flatFurnishings?: string;
    lockInPeriod?: string;
    chargeBrokerage?: string;
    rearId?: string;
    images: string[];
    description: string;
    agent: {
      name: string;
      phone: string;
      email: string;
      image: string;
    };
    amenities: string[];
    yearBuilt: number;
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
    <div className="mt-6">
      {/* Property Address & BHK */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
        <p className="text-muted-foreground mb-4">{property.address}</p>
        
        {/* Key Info */}
        <div className="flex flex-wrap gap-6 mb-4">
          <div className="flex items-center">
            <span className="font-semibold">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">{property.bhk || `${property.bedrooms} BHK`}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">{property.builtUpArea || property.squareFeet} BuiltUpArea Sq ft</span>
          </div>
        </div>
        
        {/* Share & Print Buttons */}
        <div className="flex gap-3 mb-6">
          <Button className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600">
            <Share size={18} />
            <span>Share</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={18} />
            <span>Print</span>
          </Button>
        </div>
      </div>
      
      {/* Property Tabs */}
      <Tabs defaultValue="about" className="mb-10">
        <TabsList className="border-b mb-6 w-full justify-start">
          <TabsTrigger value="about" className="text-base">ABOUT</TabsTrigger>
          <TabsTrigger value="feature" className="text-base">FEATURE</TabsTrigger>
          <TabsTrigger value="gallery" className="text-base">GALLERY</TabsTrigger>
          <TabsTrigger value="location" className="text-base">LOCATION</TabsTrigger>
          <TabsTrigger value="nearby" className="text-base">NEAR BY</TabsTrigger>
        </TabsList>
        
        {/* About Tab */}
        <TabsContent value="about" className="pt-2">
          <h2 className="text-2xl font-bold mb-6">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Property Type :</span>
              <span className="font-medium">{property.type}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Looking For :</span>
              <span className="font-medium">{property.status === "For Rent" ? "Rent" : "Sale"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Category :</span>
              <span className="font-medium">{property.category || "Residential"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Balcony :</span>
              <span className="font-medium">{property.balcony || "1 Balcony"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Bedrooms :</span>
              <span className="font-medium">{property.bedrooms} Bedroom</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Bathrooms :</span>
              <span className="font-medium">{property.bathrooms} Bathroom</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Preferred Tenant Type :</span>
              <span className="font-medium">{property.preferredTenantType || "Family"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Furnishing :</span>
              <span className="font-medium">{property.furnishType || "Semi Furnished"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">BHK :</span>
              <span className="font-medium">{property.bhk || `${property.bedrooms} BHK`}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Floor No :</span>
              <span className="font-medium">{property.floorNo || "3"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Covered Parking :</span>
              <span className="font-medium">{property.coveredParking || "1"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Monthly Rent :</span>
              <span className="font-medium">{property.monthlyRent || "₹20,000.00"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Maintenance Charges :</span>
              <span className="font-medium">{property.maintenanceCharges || "₹0"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Security Deposit :</span>
              <span className="font-medium">{property.securityDeposit || "₹2"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Built Up Area :</span>
              <span className="font-medium">{property.builtUpArea || `${property.squareFeet} Sq. ft.`}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Carpet Area :</span>
              <span className="font-medium">{property.carpetArea || "805 Sq. ft."}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Parking Charges :</span>
              <span className="font-medium">{property.parkingCharges || "₹0"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Total Floors :</span>
              <span className="font-medium">{property.totalFloors || "14"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Nearby Landmarks :</span>
              <span className="font-medium">{property.nearbyLandmarks || "TCS"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Facing :</span>
              <span className="font-medium">{property.facing || "East"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Servant Room :</span>
              <span className="font-medium">{property.servantRoom || "No"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Agency Name :</span>
              <span className="font-medium">{property.agencyName || "Navnath"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Broker Negotiable :</span>
              <span className="font-medium">{property.brokerNegotiable || "Yes"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Available From :</span>
              <span className="font-medium">{property.availableFrom || "09-01-2025"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Charge Brokerage :</span>
              <span className="font-medium">{property.chargeBrokerage || "-"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">LockIn Period :</span>
              <span className="font-medium">{property.lockInPeriod || "-"}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Flat Furnishings :</span>
              <span className="font-medium">{property.flatFurnishings || "-"}</span>
            </div>
            
            {property.rearId && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Rear ID :</span>
                <span className="font-medium">{property.rearId}</span>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Feature Tab */}
        <TabsContent value="feature">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Gallery Tab */}
        <TabsContent value="gallery">
          <h2 className="text-2xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </TabsContent>
        
        {/* Location Tab */}
        <TabsContent value="location">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="border rounded-lg overflow-hidden h-64 bg-gray-100">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map will be displayed here</p>
            </div>
          </div>
        </TabsContent>
        
        {/* Nearby Tab */}
        <TabsContent value="nearby">
          <h2 className="text-2xl font-bold mb-6">Nearby Places</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-primary mr-2 mt-2"></div>
              <div>
                <h3 className="font-medium">TCS</h3>
                <p className="text-sm text-muted-foreground">1.2 km away</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-primary mr-2 mt-2"></div>
              <div>
                <h3 className="font-medium">Rajiv Gandhi Infotech Park</h3>
                <p className="text-sm text-muted-foreground">0.5 km away</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-primary mr-2 mt-2"></div>
              <div>
                <h3 className="font-medium">Megapolis Shopping Mall</h3>
                <p className="text-sm text-muted-foreground">1.5 km away</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyInfo;
