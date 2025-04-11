
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  isServiceProvider: z.boolean().default(false),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [showProviderDialog, setShowProviderDialog] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isServiceProvider: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Signup attempt:", values);
    
    if (values.isServiceProvider) {
      setShowProviderDialog(true);
    } else {
      // Mock signup - In a real app, this would call an authentication service
      completeSignup(values);
    }
  };

  const completeSignup = (values: FormValues) => {
    toast({
      title: "Account Created!",
      description: values.isServiceProvider 
        ? "Your service provider account has been created."
        : "Your account has been created successfully.",
    });
    
    // Redirect to home page after signup
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-white to-pink-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join LetsEventify to find or offer event services</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isServiceProvider"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I am a service provider</FormLabel>
                        <FormDescription>
                          Check this if you want to offer event services
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                  Create Account
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-pink-500 hover:text-pink-600">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showProviderDialog} onOpenChange={setShowProviderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Become a Service Provider</DialogTitle>
            <DialogDescription>
              As a service provider, you'll be able to list your services and receive booking requests.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Please tell us about your business:</p>
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <Input placeholder="Your Business Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Category</label>
                  <Input placeholder="e.g., Photography, Catering, Venue" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your services</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]" 
                    placeholder="Briefly describe the services you offer..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowProviderDialog(false);
                  form.setValue("isServiceProvider", false);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-pink-500 hover:bg-pink-600"
                onClick={() => {
                  setShowProviderDialog(false);
                  completeSignup(form.getValues());
                }}
              >
                Complete Registration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Signup;
