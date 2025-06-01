import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Facebook, Apple, Shield, User, Store } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'user' | 'provider' | 'admin';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isContributor, setIsContributor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, signUp } = useAuth();
  
  // Get the intended destination from location state, or default to '/'
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
  
  // If user is authenticated, redirect to the intended destination
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleRoleBasedRedirect = (email: string, role: UserRole) => {
    if (email === '1234durgeshnile@gmail.com') {
      navigate('/admin');
    } else if (role === 'provider') {
      navigate('/provider-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to LetsEventify!",
          variant: "default",
        });
        
        // Role-based redirect after successful login
        setTimeout(() => {
          handleRoleBasedRedirect(email, selectedRole);
        }, 100);
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Invalid email or password. Please try again.",
          variant: "error",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (password.length < 8) {
        toast({
          title: "Signup Failed",
          description: "Password must be at least 8 characters long.",
          variant: "error",
        });
        setIsLoading(false);
        return;
      }
      
      const metadata = {
        first_name: name.split(' ')[0],
        last_name: name.includes(' ') ? name.split(' ').slice(1).join(' ') : '',
        user_type: selectedRole === 'provider' ? 'contributor' : selectedRole,
      };
      
      const result = await signUp(email, password, metadata);
      
      if (result.success) {
        toast({
          title: "Account Created",
          description: selectedRole === 'provider' 
            ? "Welcome to LetsEventify! Your service provider account has been created."
            : "Welcome to LetsEventify! Your account has been successfully created.",
          variant: "default",
        });
        
        // Role-based redirect after successful signup
        setTimeout(() => {
          handleRoleBasedRedirect(email, selectedRole);
        }, 100);
      } else {
        toast({
          title: "Signup Failed",
          description: result.message || "There was an error creating your account. Please try again.",
          variant: "error",
        });
      }
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login is not available yet. Please use email login.`,
      variant: "default",
    });
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'provider': return <Store className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Manage the platform';
      case 'provider': return 'Offer event services';
      case 'user': return 'Book event services';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/90 shadow-xl border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">LetsEventify</CardTitle>
            <CardDescription className="text-center">
              Your one-stop destination for event services
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label>Login as</Label>
                    <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Customer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="provider">
                          <div className="flex items-center space-x-2">
                            <Store className="w-4 h-4" />
                            <span>Service Provider</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4" />
                            <span>Admin</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {getRoleDescription(selectedRole)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : `Login as ${selectedRole === 'user' ? 'Customer' : selectedRole === 'provider' ? 'Service Provider' : 'Admin'}`}
                  </Button>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-300"></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <Mail className="mr-2" />
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('Facebook')}
                    >
                      <Facebook className="mr-2" />
                      Facebook
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label>Sign up as</Label>
                    <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Customer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="provider">
                          <div className="flex items-center space-x-2">
                            <Store className="w-4 h-4" />
                            <span>Service Provider</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {getRoleDescription(selectedRole)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a password (min. 8 characters)" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : `Create ${selectedRole === 'user' ? 'Customer' : 'Service Provider'} Account`}
                  </Button>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-300"></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <Mail className="mr-2" />
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleSocialLogin('Apple')}
                    >
                      <Apple className="mr-2" />
                      Apple
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
