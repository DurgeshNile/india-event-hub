import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const schema = yup.object({
  business_name: yup.string().required('Business Name is required'),
  description: yup.string().required('Description is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  website: yup.string().url('Invalid URL format').notRequired(),
  location: yup.string().required('Location is required'),
  city: yup.string().required('City is required'),
  price_range: yup.string().required('Price Range is required').oneOf(['low', 'medium', 'high']),
  category_id: yup.string().required('Category is required'),
}).required();

const ProviderRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      business_name: '',
      description: '',
      email: '',
      phone: '',
      website: '',
      location: '',
      city: '',
      price_range: 'medium',
      category_id: '',
    },
  });

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCategories();
  }, [user, navigate]);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `provider-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('provider-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('provider-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const onSubmit = async (data: any) => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const imageUrl = await uploadImage(image);

      const { error } = await supabase
        .from('service_providers')
        .insert({
          ...data,
          user_id: user.id,
          image_url: imageUrl,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Registration submitted successfully! Awaiting approval.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
      toast({
        title: "Error",
        description: error.message || "Failed to submit registration",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Service Provider Registration</CardTitle>
            <CardDescription>
              Fill out the form below to register as a service provider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="business_name">Business Name</Label>
                <Controller
                  name="business_name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="business_name" placeholder="Your Business Name" />
                  )}
                />
                {errors.business_name && <p className="text-red-500 text-sm">{errors.business_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} id="description" placeholder="A brief description of your services" />
                  )}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="email" id="email" placeholder="Your Email" />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="tel" id="phone" placeholder="Your Phone Number" />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="url" id="website" placeholder="Your Website (optional)" />
                  )}
                />
                {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="location" placeholder="Your Location" />
                  )}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="city" placeholder="Your City" />
                  )}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>

              <div>
                <Label htmlFor="price_range">Price Range</Label>
                <Controller
                  name="price_range"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.price_range && <p className="text-red-500 text-sm">{errors.price_range.message}</p>}
              </div>

              <div>
                <Label htmlFor="category_id">Category</Label>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
              </div>

              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
                {image ? (
                  <p className="text-green-500 text-sm">Image selected: {image.name}</p>
                ) : (
                  <p className="text-gray-500 text-sm">Please upload an image for your service.</p>
                )}
              </div>

              <CardFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderRegistration;
