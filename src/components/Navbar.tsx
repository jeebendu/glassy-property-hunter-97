
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, ChevronDown, User, Menu, Home, X, Mail, Phone, LogIn } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LocationSelector from './LocationSelector';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["agent", "owner"]),
});

const otpSchema = z.object({
  otp: z.string().min(4, "Please enter a valid OTP"),
});

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Registration form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      userType: "owner",
    },
  });

  // OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

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

  const handleLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    setShowOtpVerification(true);
  };

  const handleRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    setShowOtpVerification(true);
  };

  const handleOtpSubmit = (data: z.infer<typeof otpSchema>) => {
    console.log("OTP:", data);
    setShowOtpVerification(false);
    setIsLoginModalOpen(false);
    setIsLoggedIn(true);
    
    toast({
      title: "Success!",
      description: "You have been logged in successfully",
    });
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
    // Simulate successful login
    setIsLoginModalOpen(false);
    setIsLoggedIn(true);
    
    toast({
      title: "Success!",
      description: "You have been logged in with Google",
    });
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

        <div className="flex items-center space-x-4">
          {/* Post Property Link/Icon */}
          {isMobile ? (
            <Link to="/post-property" className={cn(
              "p-2 rounded-full",
              (!scrolled && isHomePage) ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
            )}>
              <Home size={20} />
            </Link>
          ) : (
            <Link to="/post-property" className="btn-primary">Post Property</Link>
          )}
          
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
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
              <DialogTrigger asChild>
                <button className={cn(
                  "flex items-center space-x-2 p-2 rounded-full",
                  (!scrolled && isHomePage) ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
                )}>
                  <User size={20} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {showOtpVerification ? "OTP Verification" : activeTab === "login" ? "Login" : "Register"}
                  </DialogTitle>
                </DialogHeader>
                
                {showOtpVerification ? (
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">
                      Please enter the OTP sent to your {loginMethod === 'email' ? 'email' : 'phone'}
                    </p>
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
                        <FormField
                          control={otpForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OTP</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter OTP" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex flex-col space-y-2">
                          <Button type="submit">Verify OTP</Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowOtpVerification(false)}
                          >
                            Go Back
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                ) : (
                  <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <div className="flex justify-center space-x-4 my-4">
                        <Button 
                          type="button" 
                          variant={loginMethod === 'email' ? "default" : "outline"} 
                          className="flex-1"
                          onClick={() => setLoginMethod('email')}
                        >
                          <Mail size={16} className="mr-2" />
                          Email
                        </Button>
                        <Button 
                          type="button" 
                          variant={loginMethod === 'phone' ? "default" : "outline"} 
                          className="flex-1"
                          onClick={() => setLoginMethod('phone')}
                        >
                          <Phone size={16} className="mr-2" />
                          Phone
                        </Button>
                      </div>
                      
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                          {loginMethod === 'email' ? (
                            <FormField
                              control={loginForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Enter your phone number" />
                              </FormControl>
                            </FormItem>
                          )}
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full">Login</Button>
                        </form>
                      </Form>
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleGoogleLogin}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="First name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Create a password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registerForm.control}
                            name="userType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>I am a</FormLabel>
                                <div className="flex space-x-4">
                                  <Button
                                    type="button"
                                    variant={field.value === "owner" ? "default" : "outline"}
                                    className={field.value === "owner" ? "bg-primary" : ""}
                                    onClick={() => field.onChange("owner")}
                                  >
                                    Owner
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={field.value === "agent" ? "default" : "outline"}
                                    className={field.value === "agent" ? "bg-primary" : ""}
                                    onClick={() => field.onChange("agent")}
                                  >
                                    Agent
                                  </Button>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full">Register</Button>
                        </form>
                      </Form>
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleGoogleLogin}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <button className={cn(
                  "p-2 rounded-full",
                  (!scrolled && isHomePage) ? "text-white hover:bg-white/10" : "hover:bg-gray-100"
                )}>
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="py-4">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <nav className="space-y-4">
                      <Link to="/" className="block py-2 hover:text-primary transition-colors">Home</Link>
                      <Link to="/search" className="block py-2 hover:text-primary transition-colors">Properties</Link>
                      <Link to="/post-property" className="block py-2 hover:text-primary transition-colors">Post Property</Link>
                      <Link to="/profile" className="block py-2 hover:text-primary transition-colors">My Profile</Link>
                      <Link to="/blog" className="block py-2 hover:text-primary transition-colors">Blog</Link>
                      <Link to="/about" className="block py-2 hover:text-primary transition-colors">About</Link>
                      <Link to="/contact" className="block py-2 hover:text-primary transition-colors">Contact</Link>
                    </nav>
                  </div>
                  {!isLoggedIn ? (
                    <div className="space-y-2">
                      <button 
                        onClick={() => setIsLoginModalOpen(true)} 
                        className="w-full btn-primary"
                      >
                        Login
                      </button>
                      <Link to="/register" className="block w-full btn-outline text-center">
                        Register
                      </Link>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsLoggedIn(false)} 
                      className="w-full btn-outline"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
