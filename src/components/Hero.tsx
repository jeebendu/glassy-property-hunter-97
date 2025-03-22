
import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, AppleIcon, PlayCircle, Plus } from 'lucide-react';
import { useAnimationOnScroll } from '@/lib/animations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import LocationSelector from './LocationSelector';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [activeTab, setActiveTab] = useState('buy');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  
  const titleAnimation = useAnimationOnScroll('up');
  const subtitleAnimation = useAnimationOnScroll('up', 0.1, 200);
  const searchAnimation = useAnimationOnScroll('up', 0.1, 400);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      setShowLocationDialog(true);
      return;
    }
    console.log({ searchTerm, location: selectedLocation, type: activeTab });
    navigate('/search', { 
      state: { searchTerm, location: selectedLocation, type: activeTab } 
    });
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDialog(false);
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
      <div className="container-custom relative z-10 pt-28 md:pt-0">
        <div className="max-w-4xl mx-auto text-white text-center md:text-left">
          <h4 
            ref={titleAnimation.ref}
            className={`${titleAnimation.animationClass} text-lg md:text-xl font-medium mb-2 flex items-center justify-center md:justify-start`}
          >
            <span className="inline-block h-1 w-6 bg-primary mr-3"></span>
            Find Your Dream Home
          </h4>
          
          <h1 
            ref={subtitleAnimation.ref}
            className={`${subtitleAnimation.animationClass} text-xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight`}
          >
            Properties to {activeTab} in {selectedLocation}
          </h1>

          {/* Location Selector Dialog */}
          <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Select a Location</DialogTitle>
              </DialogHeader>
              <LocationSelector onSelect={handleLocationSelect} />
            </DialogContent>
          </Dialog>

          {/* Mobile Tabs - Vertical Display */}
          <div className="md:hidden flex justify-center overflow-x-auto mt-4 mb-4">
            <div className="flex space-x-2">
              {['buy', 'rent', 'pg', 'commercial', 'plots'].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 font-medium rounded-full transition-colors whitespace-nowrap min-w-[70px] ${
                    activeTab === tab 
                      ? 'bg-primary text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form - Desktop */}
          <div
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mt-10 mx-auto md:mx-0 hidden md:block`}
          >
            {/* Tabs - Center on mobile and desktop */}
            <div className="flex justify-start overflow-x-auto scrollbar-hide">
              {['buy', 'rent', 'commercial', 'pg/co-living', 'plots'].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 md:px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative w-full cursor-pointer">
                      <div className="flex items-center">
                        <MapPin size={20} className="text-gray-400 mr-3" />
                        <div className="flex-1">{selectedLocation || 'Select Location'}</div>
                        <ChevronDown size={18} className="text-gray-400 ml-2" />
                      </div>
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
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Search Form - Mobile */}
          <div
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} md:hidden px-4`}
          >
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for properties..."
                className="border rounded-full py-6 pl-6 pr-14 bg-white/90 backdrop-blur-md shadow-lg text-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-full bg-primary hover:bg-primary/90 aspect-square p-0 min-w-12"
              >
                <Search size={20} />
              </Button>
            </form>
          </div>

          {/* Continue last search */}
          <div className="mt-4 flex items-center justify-center md:justify-start space-x-4">
            <button className="text-white hover:text-primary transition-colors">
              Continue last search
            </button>
            
            <div className="bg-blue-400/30 text-white px-6 py-2 rounded-full flex items-center">
              <span className="md:inline hidden">Bengaluru, Karnataka,...</span>
              <span className="md:hidden">Bengaluru...</span>
              <ChevronDown size={18} className="ml-2" />
            </div>
          </div>

          {/* Stats text moved up before app download section */}
          <p 
            ref={searchAnimation.ref}
            className={`${searchAnimation.animationClass} text-base md:text-xl text-white/80 mt-8 mx-auto md:mx-0 max-w-2xl`}
          >
            10K+ listings added daily and 63K+ total verified
          </p>

          {/* App Download Section */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <p className="text-white/90 font-medium">Download our app:</p>
            <div className="flex space-x-4">
              <a href="#" className="flex items-center bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-lg transition-colors">
                <AppleIcon className="mr-2" size={20} />
                <span className="text-sm">App Store</span>
              </a>
              <a href="#" className="flex items-center bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-lg transition-colors">
                <PlayCircle className="mr-2" size={20} />
                <span className="text-sm">Google Play</span>
              </a>
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
