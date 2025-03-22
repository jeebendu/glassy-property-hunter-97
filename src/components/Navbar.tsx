
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LocationSelector from './LocationSelector';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-primary">Prime<span className="text-foreground">Estate</span></span>
          </Link>

          {/* Mobile Location Selector */}
          {isMobile && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="ml-3 flex items-center text-sm text-white/80">
                  <MapPin size={16} className="mr-1" />
                  <span className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">{selectedLocation}</span>
                  <ChevronDown size={14} className="ml-1" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select a Location</DialogTitle>
                </DialogHeader>
                <LocationSelector onSelect={handleLocationSelect} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Properties</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="btn-ghost flex items-center space-x-2">
            <Search size={18} />
            <span>Search</span>
          </Link>
          <Link to="/post-property" className="btn-primary">List Property</Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div 
          className={cn(
            "fixed inset-0 glass-dark md:hidden flex flex-col justify-center items-center transition-all duration-500 ease-in-out",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center space-y-8 text-white">
            <Link to="/" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/search" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Properties</Link>
            <Link to="/blog" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/post-property" className="btn-primary mt-4 w-40" onClick={() => setIsMenuOpen(false)}>
              List Property
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
