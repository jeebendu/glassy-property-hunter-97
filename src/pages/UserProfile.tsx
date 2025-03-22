
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Home, 
  Heart, 
  User, 
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

const UserProfile = () => {
  // Mock user data (in a real app, this would come from your auth system)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    joined: 'January 2023'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="glass p-6 rounded-xl">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">Premium Member</p>
              </div>
              
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <div>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <div>
                    <Home className="mr-2 h-4 w-4" />
                    My Properties
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <div>
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Properties
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <div>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </div>
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="md:col-span-2 lg:col-span-3">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="properties">My Properties</TabsTrigger>
                  <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center">
                          <Mail size={16} className="text-primary mr-2" />
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <div className="flex items-center">
                          <Phone size={16} className="text-primary mr-2" />
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Address</p>
                        <div className="flex items-center">
                          <MapPin size={16} className="text-primary mr-2" />
                          <p className="font-medium">{user.address}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <div className="flex items-center">
                          <Calendar size={16} className="text-primary mr-2" />
                          <p className="font-medium">{user.joined}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>Edit Profile</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="properties">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">My Properties</h3>
                    <p>You haven't posted any properties yet.</p>
                    <Button className="mt-4">Post a Property</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="saved">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Saved Properties</h3>
                    <p>You don't have any saved properties.</p>
                    <Button className="mt-4" variant="outline">Browse Properties</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                    <p>Account settings and preferences will appear here.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
