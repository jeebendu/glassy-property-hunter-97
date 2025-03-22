
import React from 'react';
import { Phone, MessageCircle, Heart, Share2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ShareButton from './ShareButton';
import { toast } from "@/components/ui/use-toast";

interface MobileContactBarProps {
  agent: {
    phone: string;
    name: string;
  };
  propertyId: string;
  propertyTitle: string;
  openAuthDialog: () => void;
}

const MobileContactBar = ({ agent, propertyId, propertyTitle, openAuthDialog }: MobileContactBarProps) => {
  const { user } = useAuth();
  
  const handleContact = (action: 'call' | 'whatsapp') => {
    if (!user) {
      openAuthDialog();
      toast({
        title: "Login Required",
        description: "Please login to contact the agent",
      });
      return;
    }
    
    if (action === 'call') {
      window.location.href = `tel:${agent.phone}`;
    } else if (action === 'whatsapp') {
      const message = `Hi ${agent.name}, I'm interested in the property: ${propertyTitle}`;
      window.open(`https://wa.me/${agent.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
      <div className="flex justify-between items-center px-4 py-3">
        <button 
          onClick={() => handleContact('call')}
          className="flex flex-col items-center space-y-1 flex-1"
        >
          <Phone size={22} className="text-green-600" />
          <span className="text-xs font-medium">Call</span>
        </button>
        
        <button 
          onClick={() => handleContact('whatsapp')}
          className="flex flex-col items-center space-y-1 flex-1"
        >
          <MessageCircle size={22} className="text-green-500" />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>
        
        <ShareButton 
          url={window.location.href}
          title={propertyTitle}
          iconOnly
        />
      </div>
    </div>
  );
};

export default MobileContactBar;
