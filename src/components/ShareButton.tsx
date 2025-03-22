
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface ShareButtonProps {
  url?: string;
  title?: string;
  className?: string;
  iconOnly?: boolean;
}

const ShareButton = ({
  url = window.location.href,
  title = "Check out this property",
  className = "",
  iconOnly = false
}: ShareButtonProps) => {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this link with others",
      });
    }
  };
  
  const socialPlatforms = [
    { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, color: "bg-green-500" },
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "bg-blue-600" },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, color: "bg-blue-400" },
    { name: "Email", url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this link: ${url}`)}`, color: "bg-gray-600" }
  ];
  
  return (
    <>
      {/* For devices with navigator.share API (mostly mobile) */}
      {navigator.share ? (
        <Button
          onClick={handleShare}
          variant="outline"
          size={iconOnly ? "icon" : "default"}
          className={`flex flex-col items-center space-y-1 ${iconOnly ? "" : "mr-2"} ${className}`}
        >
          <Share2 className={iconOnly ? "" : "mr-2"} size={18} />
          {!iconOnly && "Share"}
        </Button>
      ) : (
        /* For devices without navigator.share API */
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size={iconOnly ? "icon" : "default"}
              className={`flex flex-col items-center space-y-1 ${iconOnly ? "" : "mr-2"} ${className}`}
            >
              <Share2 className={iconOnly ? "" : "mr-2"} size={18} />
              {!iconOnly && "Share"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share this property</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {socialPlatforms.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${platform.color} text-white py-2 px-4 rounded-md flex items-center justify-center hover:opacity-90 transition-opacity`}
                >
                  {platform.name}
                </a>
              ))}
              
              <Button
                variant="outline"
                className="col-span-2"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toast({
                    title: "Link copied to clipboard",
                    description: "You can now share this link with others",
                  });
                }}
              >
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ShareButton;
