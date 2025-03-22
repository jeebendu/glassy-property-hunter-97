
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Upload, Plus, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import LocationSelector from '@/components/LocationSelector';

// Property form schema with validation
const formSchema = z.object({
  // Step 1: Basic Information
  propertyTitle: z.string().min(5, { message: "Property title must be at least 5 characters" }),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  location: z.string().min(1, { message: "Please select a location" }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  landmark: z.string().optional(),
  pincode: z.string().min(6, { message: "Please enter a valid pincode" }),
  
  // Step 2: Property Details
  bedrooms: z.string().min(1, { message: "Please select number of bedrooms" }),
  bathrooms: z.string().min(1, { message: "Please select number of bathrooms" }),
  area: z.string().min(1, { message: "Please enter property area" }),
  furnishing: z.string().min(1, { message: "Please select furnishing status" }),
  availableFrom: z.string().min(1, { message: "Please select availability date" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  
  // Step 3: Photos & Pricing
  price: z.string().min(1, { message: "Please enter property price" }),
  priceNegotiable: z.boolean().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

const PropertyTypes = [
  "Apartment", "House", "Villa", "Plot", "Commercial", "PG/Co-living"
];

// Extend with properties shown in the screenshots
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

const PostProperty = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  // Form states shown in screenshots
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [propertyFor, setPropertyFor] = useState('Sell');
  const [furnishType, setFurnishType] = useState('');
  const [brokerage, setBrokerage] = useState('No');
  const [servantRoom, setServantRoom] = useState('No');
  
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyTitle: "",
      propertyType: "",
      location: "",
      streetAddress: "",
      landmark: "",
      pincode: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      furnishing: "",
      availableFrom: "",
      description: "",
      price: "",
      priceNegotiable: false,
      termsAccepted: false,
    }
  });

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    form.setValue('location', location);
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

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    
    // Determine which fields to validate based on current step
    if (currentStep === 1) {
      fieldsToValidate = ['propertyTitle', 'propertyType', 'location', 'streetAddress', 'pincode'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['bedrooms', 'bathrooms', 'area', 'furnishing', 'availableFrom', 'description'];
    }
    
    // Validate only the fields for the current step
    const result = await form.trigger(fieldsToValidate as any);
    
    if (result) {
      // Get the data for the current step
      const stepData = form.getValues();
      setFormData({ ...formData, ...stepData });
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Show error toast
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one property image",
        variant: "destructive",
      });
      return;
    }
    
    // Combine form data with images
    const completeData = {
      ...data,
      images,
      propertyCategory,
      propertyFor,
      furnishType,
      brokerage,
      servantRoom
    };
    
    console.log("Form submitted:", completeData);
    
    toast({
      title: "Success!",
      description: "Your property has been submitted for review",
    });
    
    // Reset form after submission
    // form.reset();
    // setImages([]);
    // setCurrentStep(1);
  };

  // Step indicator component (based on screenshots)
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
              {/* Left sidebar with steps */}
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

              {/* Main content - Form steps */}
              <div className="md:col-span-3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="glass rounded-xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-2">General</h2>
                        <p className="text-muted-foreground text-sm mb-6">Basic information about property</p>
                        
                        <div className="space-y-6">
                          {/* Property Category */}
                          <div>
                            <FormLabel className="block text-sm font-medium mb-2">Property Category*</FormLabel>
                            <div className="flex space-x-4">
                              {propertyCategories.map((category) => (
                                <Button
                                  key={category}
                                  type="button"
                                  variant={propertyCategory === category ? "default" : "outline"}
                                  className={propertyCategory === category ? "bg-primary" : ""}
                                  onClick={() => setPropertyCategory(category)}
                                >
                                  {category}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Looking For */}
                          <div>
                            <FormLabel className="block text-sm font-medium mb-2">Looking For*</FormLabel>
                            <div className="flex space-x-4">
                              {propertyForOptions.map((option) => (
                                <Button
                                  key={option}
                                  type="button"
                                  variant={propertyFor === option ? "default" : "outline"}
                                  className={propertyFor === option ? "bg-primary" : ""}
                                  onClick={() => setPropertyFor(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Property Type*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Apartment" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="bedrooms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bed Rooms*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bed Room" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="bathrooms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bath Rooms*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Bath Room" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="propertyTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Balcony*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Balcony" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div>
                            <FormLabel className="block text-sm font-medium mb-2">Furnish Type*</FormLabel>
                            <div className="flex space-x-4">
                              {furnishingOptions.map((option) => (
                                <Button
                                  key={option}
                                  type="button"
                                  variant={furnishType === option ? "default" : "outline"}
                                  className={furnishType === option ? "bg-primary" : ""}
                                  onClick={() => setFurnishType(option)}
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Property Price" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="area"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Total Floors*</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Example: 12" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your property in detail..."
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4">
                            <Button className="w-full" onClick={nextStep}>
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Location & Address */}
                    {currentStep === 2 && (
                      <div className="glass rounded-xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-2">Address</h2>
                        <p className="text-muted-foreground text-sm mb-6">Add your property location</p>
                        
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City*</FormLabel>
                                <FormControl>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <div className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <MapPin size={20} className="text-gray-400 mr-3" />
                                        <span>{field.value || 'Select Location'}</span>
                                      </div>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                      <DialogHeader>
                                        <DialogTitle>Select a Location</DialogTitle>
                                      </DialogHeader>
                                      <LocationSelector onSelect={(loc) => {
                                        field.onChange(loc);
                                        setSelectedLocation(loc);
                                      }} />
                                    </DialogContent>
                                  </Dialog>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="streetAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Search your location*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Search your location" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="landmark"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Building Society*</FormLabel>
                                <FormControl>
                                  <Input placeholder="Building Society" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          {/* Google Map */}
                          <div className="border rounded-lg overflow-hidden h-64 bg-gray-100">
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <p className="text-gray-500">Google Map will be integrated here</p>
                            </div>
                          </div>
                          
                          <div className="pt-4 flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                              Previous
                            </Button>
                            <Button onClick={nextStep}>
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Photos */}
                    {currentStep === 3 && (
                      <div className="glass rounded-xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-2">Gallery</h2>
                        <p className="text-muted-foreground text-sm mb-6">Add your property images</p>
                        
                        <div className="space-y-6">
                          <div>
                            <FormLabel className="block text-sm font-medium mb-2">Upload Photos</FormLabel>
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
                            <Button variant="outline" onClick={prevStep}>
                              Previous
                            </Button>
                            <Button onClick={nextStep}>
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {currentStep === 4 && (
                      <div className="glass rounded-xl p-6 md:p-8">
                        <h2 className="text-xl font-semibold mb-2">Confirmation</h2>
                        <p className="text-muted-foreground text-sm mb-6">Review and submit your property listing</p>
                        
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                            <h3 className="font-semibold">Property Summary</h3>
                            
                            <div className="grid grid-cols-2 gap-y-2">
                              <div className="text-sm text-gray-500">Property Type:</div>
                              <div className="text-sm">{form.getValues().propertyType || '-'}</div>
                              
                              <div className="text-sm text-gray-500">Location:</div>
                              <div className="text-sm">{selectedLocation || '-'}</div>
                              
                              <div className="text-sm text-gray-500">Price:</div>
                              <div className="text-sm">₹{form.getValues().price || '-'}</div>
                              
                              <div className="text-sm text-gray-500">Bedrooms:</div>
                              <div className="text-sm">{form.getValues().bedrooms || '-'}</div>
                              
                              <div className="text-sm text-gray-500">Bathrooms:</div>
                              <div className="text-sm">{form.getValues().bathrooms || '-'}</div>
                              
                              <div className="text-sm text-gray-500">Area:</div>
                              <div className="text-sm">{form.getValues().area || '-'} sq ft</div>
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <input 
                                    type="checkbox" 
                                    className="mt-1" 
                                    checked={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I agree to the terms and conditions
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <div className="pt-4 flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostProperty;
