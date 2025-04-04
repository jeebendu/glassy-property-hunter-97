
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LocationSelector from "./LocationSelector";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Bengaluru");
  const [activeTab, setActiveTab] = useState("buy");
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        searchTerm,
        location: selectedLocation,
        type: activeTab,
      },
    });
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDialog(false);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-2xl text-center mx-auto mb-12 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Property with Ease
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Discover thousands of properties for sale and rent across the
            country. Start your search today!
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex border-b overflow-x-auto scrollbar-hide">
              {["buy", "rent", "commercial", "pg", "plots"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search Inputs */}
            <form onSubmit={handleSearch} className={cn(
              "flex flex-col md:flex-row",
              isMobile ? "p-4" : ""
            )}>
              <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-4 py-3 w-full md:w-1/3">
                <Dialog
                  open={showLocationDialog}
                  onOpenChange={setShowLocationDialog}
                >
                  <DialogTrigger asChild>
                    <div className="relative w-full cursor-pointer">
                      <div className="flex items-center">
                        <MapPin size={20} className="text-gray-400 mr-3" />
                        <div className="flex-1">
                          {selectedLocation || "Select Location"}
                        </div>
                        <ChevronDown
                          size={18}
                          className="text-gray-400 ml-2"
                        />
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
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 w-full md:w-auto"
                >
                  <Search size={18} className="mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-1">15,000+</p>
            <p className="text-sm text-white/70">Properties</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-1">10,000+</p>
            <p className="text-sm text-white/70">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-1">500+</p>
            <p className="text-sm text-white/70">Cities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-1">1,000+</p>
            <p className="text-sm text-white/70">Agents</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
