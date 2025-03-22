
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold tracking-tight text-primary">Prime<span className="text-foreground">Estate</span></span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Discover your dream property with our premium real estate services, offering exceptional homes and personalized experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors duration-300">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Property Types</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties?type=House" className="text-muted-foreground hover:text-primary transition-colors duration-300">Houses</Link>
              </li>
              <li>
                <Link to="/properties?type=Apartment" className="text-muted-foreground hover:text-primary transition-colors duration-300">Apartments</Link>
              </li>
              <li>
                <Link to="/properties?type=Condo" className="text-muted-foreground hover:text-primary transition-colors duration-300">Condos</Link>
              </li>
              <li>
                <Link to="/properties?type=Townhouse" className="text-muted-foreground hover:text-primary transition-colors duration-300">Townhouses</Link>
              </li>
              <li>
                <Link to="/properties?status=For%20Sale" className="text-muted-foreground hover:text-primary transition-colors duration-300">For Sale</Link>
              </li>
              <li>
                <Link to="/properties?status=For%20Rent" className="text-muted-foreground hover:text-primary transition-colors duration-300">For Rent</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">123 Real Estate Blvd, Los Angeles, CA 90001, United States</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">+1 (310) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">info@primeestate.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} PrimeEstate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
