
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import PropertySearch from "./components/PropertySearch";
import Blog from "./pages/Blog";
import PostProperty from "./pages/PostProperty";
import UserProfile from "./pages/UserProfile";
import AuthDialog from "./components/AuthDialog";

const queryClient = new QueryClient();

const App = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const openAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
          <Routes>
            <Route path="/" element={<Index openAuthDialog={openAuthDialog} />} />
            <Route path="/property/:id" element={<PropertyDetails openAuthDialog={openAuthDialog} />} />
            <Route path="/search" element={<PropertySearch openAuthDialog={openAuthDialog} />} />
            <Route path="/blog" element={<Blog openAuthDialog={openAuthDialog} />} />
            <Route path="/post-property" element={<PostProperty openAuthDialog={openAuthDialog} />} />
            <Route path="/profile" element={<UserProfile openAuthDialog={openAuthDialog} />} />
            <Route path="/my-properties" element={<UserProfile openAuthDialog={openAuthDialog} />} />
            <Route path="/saved-properties" element={<UserProfile openAuthDialog={openAuthDialog} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
