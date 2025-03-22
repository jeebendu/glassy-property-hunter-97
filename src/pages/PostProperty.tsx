
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Upload, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LocationSelector from '@/components/LocationSelector';

const PropertyTypes = [
  "Apartment", "House", "Villa", "Plot", "Commercial", "PG/Co-living"
];

const PostProperty = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
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

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
              <p className="text-muted-foreground">
                Fill in the details below to list your property for sale or rent
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep >= step ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step}
                    </div>
                    <span className="text-sm mt-2 text-muted-foreground">
                      {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Photos & Pricing'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-5 right-5 h-1 bg-gray-200">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${(currentStep - 1) * 50}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="glass rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Title</label>
                    <Input placeholder="e.g., Spacious 3BHK Apartment in Whitefield" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {PropertyTypes.map((type) => (
                        <button
                          key={type}
                          className={`px-4 py-3 border rounded-lg text-center transition-colors ${
                            selectedType === type 
                              ? 'bg-primary/10 border-primary text-primary' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedType(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
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
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input placeholder="Street address" className="mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input placeholder="Landmark" />
                      <Input placeholder="Pincode" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full" onClick={nextStep}>
                      Continue to Property Details
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <div className="glass rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6">Property Details</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bedrooms</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bathrooms</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Area (sq.ft)</label>
                      <Input type="number" placeholder="e.g., 1200" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Furnishing</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                        <option value="">Select</option>
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully-Furnished">Fully-Furnished</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Available From</label>
                    <Input type="date" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-32"
                      placeholder="Describe your property in detail..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Continue to Photos & Pricing
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos & Pricing */}
            {currentStep === 3 && (
              <div className="glass rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6">Photos & Pricing</h2>
                
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
                          Click to upload or drag and drop
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
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Details</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Price (₹)</label>
                        <Input type="number" placeholder="e.g., 25,00,000" />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Price is</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                          <option value="Fixed">Fixed</option>
                          <option value="Negotiable">Negotiable</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">I agree to the terms and conditions</span>
                    </label>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button>
                      Submit Property
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostProperty;
