
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LocationSelector from './LocationSelector';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication state

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
        scrolled ? "glass py-3" : isHomePage ? "bg-transparent py-5" : "glass py-3"
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-primary">Prime<span className={cn(
              "transition-colors",
              (!scrolled && isHomePage) ? "text-white" : "text-foreground"
            )}>Estate</span></span>
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
          <Link to="/" className={cn(
            "nav-link", 
            (!scrolled && isHomePage) ? "text-white hover:text-white/80" : ""
          )}>Home</Link>
          <Link to="/search" className={cn(
            "nav-link", 
            (!scrolled && isHomePage) ? "text-white hover:text-white/80" : ""
          )}>Properties</Link>
          <Link to="/blog" className={cn(
            "nav-link", 
            (!scrolled && isHomePage) ? "text-white hover:text-white/80" : ""
          )}>Blog</Link>
          <Link to="/about" className={cn(
            "nav-link", 
            (!scrolled && isHomePage) ? "text-white hover:text-white/80" : ""
          )}>About</Link>
          <Link to="/contact" className={cn(
            "nav-link", 
            (!scrolled && isHomePage) ? "text-white hover:text-white/80" : ""
          )}>Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className={cn(
            "btn-ghost flex items-center space-x-2",
            (!scrolled && isHomePage) ? "text-white hover:bg-white/10" : ""
          )}>
            <Search size={18} />
            <span>Search</span>
          </Link>
          <Link to="/post-property" className="btn-primary">Post Property</Link>
          
          {/* User Profile Dropdown */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className={cn(
                    "hidden md:inline-block text-sm font-medium",
                    (!scrolled && isHomePage) ? "text-white" : ""
                  )}>John Doe</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-properties" className="cursor-pointer">My Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved-properties" className="cursor-pointer">Saved Properties</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)} className="cursor-pointer">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  "flex items-center space-x-2 p-2 rounded-full",
                  (!scrolled && isHomePage) ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
                )}>
                  <User size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsLoggedIn(true)} className="cursor-pointer">
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="cursor-pointer">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
