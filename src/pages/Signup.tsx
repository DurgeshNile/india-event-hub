
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { states, cities } from "@/utils/data";

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

// Service provider form schema
const providerFormSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  otherBusinessType: z.string().optional(),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  alternatePhone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(5, "Please provide your business address"),
  pincode: z.string().min(3, "Please enter a valid PIN code/ZIP"),
  description: z.string().min(20, "Please provide at least 20 characters about your services"),
});

type FormValues = z.infer<typeof formSchema>;
type ProviderFormValues = z.infer<typeof providerFormSchema>;

const businessTypes = [
  "Photographer",
  "Videographer",
  "Event Planner",
  "Venue Provider",
  "Caterer",
  "Decorator",
  "Entertainment / Artist",
  "Other"
];

const countries = ["India", "United States", "United Kingdom", "Canada", "Australia"];

const Signup = () => {
  const navigate = useNavigate();
  const [showProviderDialog, setShowProviderDialog] = useState(false);
  const [businessType, setBusinessType] = useState("");
  
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

  const providerForm = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      otherBusinessType: "",
      phoneNumber: "",
      alternatePhone: "",
      country: "India",
      state: "",
      city: "",
      address: "",
      pincode: "",
      description: "",
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

  const onProviderSubmit = (values: ProviderFormValues) => {
    console.log("Service provider details:", values);
    
    // In a real app, you would combine the basic user data with the provider data
    const combinedData = {
      ...form.getValues(),
      providerDetails: values
    };
    
    console.log("Combined registration data:", combinedData);
    setShowProviderDialog(false);
    
    completeSignup(form.getValues(), values);
  };

  const completeSignup = (values: FormValues, providerValues?: ProviderFormValues) => {
    toast({
      title: "Account Created!",
      description: values.isServiceProvider 
        ? `Your service provider account has been created for ${providerValues?.businessName || "your business"}.`
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
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Service Provider Registration</DialogTitle>
            <DialogDescription>
              Please provide details about your business to complete registration as a service provider.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...providerForm}>
            <form onSubmit={providerForm.handleSubmit(onProviderSubmit)} className="space-y-6 py-4">
              {/* Section 1: Personal/Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal / Business Information</h3>
                
                <FormField
                  control={providerForm.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Business Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setBusinessType(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {businessType === "Other" && (
                  <FormField
                    control={providerForm.control}
                    name="otherBusinessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Business Type</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Florist, Wedding Planner, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              {/* Section 2: Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Location Details</h3>
                
                <FormField
                  control={providerForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Full address of your business" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={providerForm.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code / ZIP</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., 400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Section 3: Service Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Service Information</h3>
                
                <FormField
                  control={providerForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us about your services</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the services you offer, your experience, pricing range, etc."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowProviderDialog(false);
                    form.setValue("isServiceProvider", false);
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-pink-500 hover:bg-pink-600"
                  type="submit"
                >
                  Complete Registration
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Signup;
