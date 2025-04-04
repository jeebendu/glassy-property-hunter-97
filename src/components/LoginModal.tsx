
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from "@/components/ui/input-otp";

interface LoginModalProps {
  trigger: React.ReactNode;
}

const LoginModal = ({ trigger }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  
  const { 
    login, 
    register, 
    googleLogin, 
    isOtpSent, 
    isLoading,
    sendOtp,
    verifyOtp,
    resetOtpState
  } = useAuth();

  // Reset OTP state when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetOtpState();
      setOtp('');
    }
  }, [isOpen, resetOtpState]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (loginMethod === 'email') {
        await sendOtp(email);
      } else {
        // Phone-based OTP not implemented yet
        console.log('Phone-based OTP not implemented yet');
      }
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await verifyOtp(otp);
      setIsOpen(false);
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ email, password });
      }
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      await googleLogin(response);
      setIsOpen(false);
    } catch (error) {
      // Error is handled in the auth context
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isOtpSent 
              ? "OTP Verification" 
              : isLogin 
                ? "Login" 
                : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        
        {isOtpSent ? (
          <div className="space-y-4 pt-4">
            <p className="text-center text-muted-foreground">
              Please enter the OTP sent to your {loginMethod === 'email' ? 'email' : 'phone'}
            </p>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetOtpState}
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  <ArrowLeft size={16} />
                  Go Back
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div>
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
            
            <form onSubmit={handleSendOtp} className="space-y-4 pt-4">
              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    placeholder="your@email.com"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Your phone number"
                  />
                </div>
              )}
              
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || (loginMethod === 'email' ? !email : !phone)}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
                
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    useOneTap
                  />
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    className="text-primary hover:underline" 
                    onClick={() => setIsLogin(false)}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    className="text-primary hover:underline" 
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
