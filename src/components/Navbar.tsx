
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        scrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-primary">Prime<span className="text-foreground">Estate</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/properties" className="nav-link">Properties</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="btn-ghost flex items-center space-x-2">
            <Search size={18} />
            <span>Search</span>
          </button>
          <button className="btn-primary">List Property</button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            <Link to="/properties" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Properties</Link>
            <Link to="/about" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <button className="btn-primary mt-4 w-40">List Property</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
