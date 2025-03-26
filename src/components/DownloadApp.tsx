
import React from 'react';
import { Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DownloadApp = () => {
  return (
    <div className="bg-primary/5 py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
            <p className="text-muted-foreground mb-6">
              Get the full experience on your mobile device. Search properties, save favorites, and receive instant notifications about new listings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white">
                <Apple size={24} />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-medium">App Store</span>
                </div>
              </Button>
              <Button className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white">
                <Play size={24} />
                <div className="flex flex-col items-start">
                  <span className="text-xs">GET IT ON</span>
                  <span className="text-base font-medium">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative h-[400px] w-[300px] glass rounded-3xl overflow-hidden shadow-xl mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="Proptify Mobile App" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-xl"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
