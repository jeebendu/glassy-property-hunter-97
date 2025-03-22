import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Upload, Plus, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import LocationSelector from '@/components/LocationSelector';
import DownloadApp from '@/components/DownloadApp';

// Property Types and other options
const PropertyTypes = [
  "Apartment", "House", "Villa", "Plot", "Commercial", "PG/Co-living"
];

const propertyCategories = [
  "Residential", "Commercial"
];

const propertyForOptions = [
  "Sell", "Rent", "PG"
];

const furnishingOptions = [
  "Fully Furnished", "Semi Furnished", "Unfurnished"
];

const constructionOptions = [
  "Ready To Move", "Under Construction"
];

const bedroomOptions = ["1", "2", "3", "4", "5+"];
const bathroomOptions = ["1", "2", "3", "4+"];
const balconyOptions = ["0", "1", "2", "3+"];
const floorOptions = Array.from({ length: 50 }, (_, i) => (i + 1).toString());

const PostProperty = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyCategory: 'Residential',
    propertyFor: 'Sell',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    balcony: '',
    furnishType: 'Unfurnished',
    price: '',
    totalFloors: '',
    description: '',
    location: '',
    address: '',
    landmark: '',
    society: '',
    floorNo: '',
    coveredParking: '',
    monthlyRent: '',
    maintenanceCharges: '',
    securityDeposit: '',
    builtUpArea: '',
    carpetArea: '',
    parkingCharges: '',
    facing: '',
    servantRoom: 'No',
    agencyName: '',
    brokerNegotiable: 'Yes',
    availableFrom: '',
    preferredTenantType: 'Family',
    flatFurnishings: '',
    lockInPeriod: '',
    nearbyLandmarks: '',
    bhk: '',
    termsAccepted: false
  });
  
  const { toast } = useToast();
  
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    handleChange('location', location);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const completeData = {
      ...formData,
      images,
    };
    
    console.log("Form submitted:", completeData);
    
    toast({
      title: "Success!",
      description: "Your property has been submitted for review",
    });
  };

  const StepIndicator = ({ step, title, subtitle, completed, active }: { 
    step: number, 
    title: string, 
    subtitle: string,
    completed: boolean,
    active: boolean
  }) => (
    <div className="flex items-start space-x-3">
      <div className={`rounded-full w-12 h-12 flex items-center justify-center font-medium ${
        completed ? 'bg-emerald-500 text-white' : 
        active ? 'bg-primary text-white' : 
        'bg-gray-100 text-gray-400'
      }`}>
        {completed ? <Check size={20} /> : step}
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{title}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
              <p className="text-muted-foreground">
                Fill in the details below to list your property for sale or rent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="glass rounded-xl p-6 space-y-8">
                  <StepIndicator 
                    step={1} 
                    title="General" 
                    subtitle="Basic information"
                    completed={currentStep > 1}
                    active={currentStep === 1}
                  />
                  <StepIndicator 
                    step={2} 
                    title="Address" 
                    subtitle="Add your place"
                    completed={currentStep > 2}
                    active={currentStep === 2}
                  />
                  <StepIndicator 
                    step={3} 
                    title="Gallery" 
                    subtitle="Add your media"
                    completed={currentStep > 3}
                    active={currentStep === 3}
                  />
                  <StepIndicator 
                    step={4} 
                    title="Confirmation" 
                    subtitle="Complete details"
                    completed={currentStep > 4}
                    active={currentStep === 4}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="glass rounded-xl p-6 md:p-8">
                      <h2 className="text-xl font-semibold mb-2">General</h2>
                      <p className="text-muted-foreground text-sm mb-6">Basic information about property</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Property Category*</label>
                          <div className="flex space-x-4">
                            {propertyCategories.map((category) => (
                              <Button
                                key={category}
                                type="button"
                                variant={formData.propertyCategory === category ? "default" : "outline"}
                                className={formData.propertyCategory === category ? "bg-primary" : ""}
                                onClick={() => handleChange('propertyCategory', category)}
                              >
                                {category}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Looking For*</label>
                          <div className="flex space-x-4">
                            {propertyForOptions.map((option) => (
                              <Button
                                key={option}
                                type="button"
                                variant={formData.propertyFor === option ? "default" : "outline"}
                                className={formData.propertyFor === option ? "bg-primary" : ""}
                                onClick={() => handleChange('propertyFor', option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Property Type*</label>
                          <Select 
                            value={formData.propertyType} 
                            onValueChange={(value) => handleChange('propertyType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent>
                              {PropertyTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Bed Rooms*</label>
                            <Select 
                              value={formData.bedrooms} 
                              onValueChange={(value) => handleChange('bedrooms', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select bedrooms" />
                              </SelectTrigger>
                              <SelectContent>
                                {bedroomOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Bath Rooms*</label>
                            <Select 
                              value={formData.bathrooms} 
                              onValueChange={(value) => handleChange('bathrooms', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select bathrooms" />
                              </SelectTrigger>
                              <SelectContent>
                                {bathroomOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Balcony*</label>
                          <Select 
                            value={formData.balcony} 
                            onValueChange={(value) => handleChange('balcony', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select balcony" />
                            </SelectTrigger>
                            <SelectContent>
                              {balconyOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Furnish Type*</label>
                          <div className="flex space-x-4">
                            {furnishingOptions.map((option) => (
                              <Button
                                key={option}
                                type="button"
                                variant={formData.furnishType === option ? "default" : "outline"}
                                className={formData.furnishType === option ? "bg-primary" : ""}
                                onClick={() => handleChange('furnishType', option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Price*</label>
                            <Input 
                              placeholder="Property Price" 
                              value={formData.price}
                              onChange={(e) => handleChange('price', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Total Floors*</label>
                            <Select 
                              value={formData.totalFloors} 
                              onValueChange={(value) => handleChange('totalFloors', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select total floors" />
                              </SelectTrigger>
                              <SelectContent>
                                {floorOptions.map((option) => (
                                  <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <Textarea
                            placeholder="Describe your property in detail..."
                            className="min-h-32"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button className="w-full" onClick={nextStep} type="button">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="glass rounded-xl p-6 md:p-8">
                      <h2 className="text-xl font-semibold mb-2">Address</h2>
                      <p className="text-muted-foreground text-sm mb-6">Add your property location</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">City*</label>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                                <MapPin size={20} className="text-gray-400 mr-3" />
                                <span>{selectedLocation || 'Select Location'}</span>
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
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Search your location*</label>
                          <Input 
                            placeholder="Search your location" 
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Building Society*</label>
                          <Input 
                            placeholder="Building Society" 
                            value={formData.society}
                            onChange={(e) => handleChange('society', e.target.value)}
                          />
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden h-64 bg-gray-100">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Google Map will be integrated here</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button variant="outline" onClick={prevStep} type="button">
                            Previous
                          </Button>
                          <Button onClick={nextStep} type="button">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="glass rounded-xl p-6 md:p-8">
                      <h2 className="text-xl font-semibold mb-2">Gallery</h2>
                      <p className="text-muted-foreground text-sm mb-6">Add your property images</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Upload Photos</label>
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*" 
                              className="hidden" 
                              id="property-images" 
                              onChange={handleImageUpload}
                            />
                            <label htmlFor="property-images" className="cursor-pointer">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">
                                Drop files here or click to upload
                              </p>
                              <p className="text-xs text-gray-400">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </label>
                          </div>
                          
                          {images.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {images.map((img, index) => (
                                <div key={index} className="relative group">
                                  <img 
                                    src={img} 
                                    alt={`Property ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <button 
                                    type="button"
                                    className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
                                    onClick={() => removeImage(index)}
                                  >
                                    <X size={14} className="text-white" />
                                  </button>
                                </div>
                              ))}
                              <label 
                                htmlFor="property-images" 
                                className="border-2 border-dashed rounded-lg flex items-center justify-center h-24 cursor-pointer"
                              >
                                <Plus size={24} className="text-gray-400" />
                              </label>
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button variant="outline" onClick={prevStep} type="button">
                            Previous
                          </Button>
                          <Button onClick={nextStep} type="button">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="glass rounded-xl p-6 md:p-8">
                      <h2 className="text-xl font-semibold mb-2">Confirmation</h2>
                      <p className="text-muted-foreground text-sm mb-6">Review and submit your property listing</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Property Address</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {formData.society ? `${formData.society}, ` : ''}
                            {formData.address ? `${formData.address}, ` : ''}
                            {selectedLocation ? `${selectedLocation}, ` : ''}
                            {formData.landmark ? `${formData.landmark}, ` : ''}
                            Maharashtra
                          </p>
                          
                          <div className="flex flex-wrap gap-6 mb-6">
                            <div className="flex items-center">
                              <span className="font-semibold">{formData.bedrooms || '2'} Bedrooms</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold">{formData.bathrooms || '2'} Bathrooms</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold">{formData.bhk || `${formData.bedrooms || '2'} BHK`}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold">{formData.builtUpArea || '1007'} BuiltUpArea Sq ft</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold mb-4">Property Details</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Property Type :</span>
                              <span className="font-medium">{formData.propertyType || 'Apartment'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Looking For :</span>
                              <span className="font-medium">{formData.propertyFor === 'Rent' ? 'Rent' : 'Sale'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Category :</span>
                              <span className="font-medium">{formData.propertyCategory}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Balcony :</span>
                              <span className="font-medium">{formData.balcony || '1'} Balcony</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Bedrooms :</span>
                              <span className="font-medium">{formData.bedrooms || '2'} Bedroom</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Bathrooms :</span>
                              <span className="font-medium">{formData.bathrooms || '2'} Bathroom</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Preferred Tenant Type :</span>
                              <span className="font-medium">{formData.preferredTenantType}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Furnishing :</span>
                              <span className="font-medium">{formData.furnishType}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">BHK :</span>
                              <span className="font-medium">{formData.bhk || `${formData.bedrooms || '2'} BHK`}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Floor No :</span>
                              <span className="font-medium">{formData.floorNo || '3'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Covered Parking :</span>
                              <span className="font-medium">{formData.coveredParking || '1'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Monthly Rent :</span>
                              <span className="font-medium">{formData.monthlyRent || '₹20,000.00'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Maintenance Charges :</span>
                              <span className="font-medium">{formData.maintenanceCharges || '₹0'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Security Deposit :</span>
                              <span className="font-medium">{formData.securityDeposit || '₹2'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Built Up Area :</span>
                              <span className="font-medium">{formData.builtUpArea || '1007'} Sq. ft.</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Carpet Area :</span>
                              <span className="font-medium">{formData.carpetArea || '805'} Sq. ft.</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Parking Charges :</span>
                              <span className="font-medium">{formData.parkingCharges || '₹0'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Total Floors :</span>
                              <span className="font-medium">{formData.totalFloors || '14'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Nearby Landmarks :</span>
                              <span className="font-medium">{formData.nearbyLandmarks || 'TCS'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Facing :</span>
                              <span className="font-medium">{formData.facing || 'East'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Servant Room :</span>
                              <span className="font-medium">{formData.servantRoom}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Agency Name :</span>
                              <span className="font-medium">{formData.agencyName || 'Navnath'}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Broker Negotiable :</span>
                              <span className="font-medium">{formData.brokerNegotiable}</span>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-muted-foreground">Available From :</span>
                              <span className="font-medium">{formData.availableFrom || '09-01-2025'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <input 
                            type="checkbox" 
                            className="mt-1" 
                            checked={formData.termsAccepted as boolean}
                            onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                          />
                          <div>
                            <label className="text-sm font-medium">
                              I agree to the terms and conditions
                            </label>
                          </div>
                        </div>
                        
                        <div className="pt-4 flex justify-between">
                          <Button variant="outline" onClick={prevStep} type="button">
                            Previous
                          </Button>
                          <Button type="submit">
                            Submit Property
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <DownloadApp />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostProperty;
