import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Settings, User, Heart, Home } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Props {
  openAuthDialog: () => void;
}

const Navbar = ({ openAuthDialog }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10;
      setScrolled(!isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`font-bold text-xl md:text-2xl ${scrolled || isMobile ? 'text-primary' : 'text-white'}`}>
              <span className="hidden md:inline">Prime Estate</span>
              <span className="md:hidden">PE</span>
            </span>
          </Link>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <Link 
              to="/post-property"
              className={`${scrolled ? 'text-foreground' : 'text-white'} flex items-center`}
            >
              <Plus size={22} />
            </Link>
            <button
              onClick={toggleNav}
              className={`ml-1 ${scrolled ? 'text-foreground' : 'text-white'}`}
            >
              {navOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${scrolled ? 'text-foreground' : 'text-white'}`}>Home</Link>
            <Link to="/search" className={`nav-link ${scrolled ? 'text-foreground' : 'text-white'}`}>Properties</Link>
            <Link to="/blog" className={`nav-link ${scrolled ? 'text-foreground' : 'text-white'}`}>Blog</Link>
            <Link to="/contact" className={`nav-link ${scrolled ? 'text-foreground' : 'text-white'}`}>Contact</Link>
            <Link to="/post-property" className="btn-primary">Post Property</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.jpg" alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Home className="mr-2 h-4 w-4" />
                      <span>My Properties</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                className={`hover:bg-white/10 ${scrolled ? 'text-foreground' : 'text-white hover:text-white'}`}
                onClick={openAuthDialog}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Button>
            )}
          </nav>
          
          {/* Mobile Menu */}
          <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${navOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center" onClick={closeNav}>
                  <span className="font-bold text-xl text-primary">Prime Estate</span>
                </Link>
                <button onClick={toggleNav}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="nav-link" onClick={closeNav}>Home</Link>
                <Link to="/search" className="nav-link" onClick={closeNav}>Properties</Link>
                <Link to="/blog" className="nav-link" onClick={closeNav}>Blog</Link>
                <Link to="/contact" className="nav-link" onClick={closeNav}>Contact</Link>
                <Link to="/post-property" className="btn-primary" onClick={closeNav}>Post Property</Link>
                
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.jpg" alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Link to="/profile" className="nav-link" onClick={closeNav}>Profile</Link>
                    <button className="btn-outline w-full" onClick={() => { handleLogout(); closeNav(); }}>Logout</button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => { openAuthDialog(); closeNav(); }}>Login</Button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
