
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface LoginModalProps {
  trigger: React.ReactNode;
}

const LoginModal = ({ trigger }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { login, register, googleLogin, otpSent, verifyOtp, sendOtp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (otpSent) {
        // Verify OTP
        await verifyOtp(email, otp);
        setIsOpen(false); // Close dialog on success
      } else if (isLogin) {
        // Send OTP for login
        await sendOtp(email);
      } else {
        // Registration flow
        await register({ email, password });
        setIsOpen(false); // Close dialog on success
      }
    } catch (error) {
      // Error is handled in the auth context
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    setIsOpen(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setOtp('');
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {otpSent ? 'Enter OTP' : (isLogin ? 'Login' : 'Create Account')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {otpSent ? (
            <>
              <div className="text-center text-sm text-muted-foreground">
                We've sent a one-time password to <span className="font-medium">{email}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <InputOTP 
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              
              <div className="text-center text-sm">
                <button 
                  type="button"
                  className="text-primary hover:underline" 
                  onClick={() => sendOtp(email)}
                >
                  Resend OTP
                </button>
              </div>
            </>
          ) : (
            <>
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
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              )}
            </>
          )}
          
          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full">
              {otpSent ? 'Verify OTP' : (isLogin ? 'Continue with Email' : 'Create Account')}
            </Button>
            
            {!otpSent && (
              <>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FaGoogle />
                  Google
                </Button>
              </>
            )}
          </div>
        </form>
        
        {!otpSent && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
