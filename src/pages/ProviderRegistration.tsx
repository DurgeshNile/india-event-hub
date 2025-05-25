import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const providerSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category_id: z.string().min(1, 'Please select a category'),
  location: z.string().min(2, 'Location is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  website: z.string().url('Valid website URL is required').optional().or(z.literal('')),
  price_range: z.string().min(1, 'Please select a price range'),
});

type ProviderFormData = z.infer<typeof providerSchema>;

const ProviderRegistration = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
  });

  const categoryValue = watch('category_id');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchCategories();
  }, [isAuthenticated, navigate]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, description')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive",
      });
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (providerId: string) => {
    const uploadPromises = images.map(async (image, index) => {
      const fileExt = image.name.split('.').pop();
      const fileName = `${user?.id}/${providerId}/${Date.now()}-${index}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('provider-images')
        .upload(fileName, image);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('provider-images')
        .getPublicUrl(fileName);

      // Save image record to database
      const { error: dbError } = await supabase
        .from('service_provider_images')
        .insert({
          provider_id: providerId,
          image_url: publicUrl,
          is_primary: index === 0,
          caption: `Image ${index + 1}`,
        });

      if (dbError) throw dbError;

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: ProviderFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Create service provider record with approval status as pending
      const { data: provider, error: providerError } = await supabase
        .from('service_providers')
        .insert({
          user_id: user.id,
          business_name: data.business_name,
          description: data.description,
          category_id: data.category_id,
          location: data.location,
          city: data.city,
          phone: data.phone,
          email: data.email,
          website: data.website || null,
          price_range: data.price_range,
          approved: false, // Requires admin approval
          verified: false,
        })
        .select()
        .single();

      if (providerError) throw providerError;

      // Upload images if any
      if (images.length > 0) {
        await uploadImages(provider.id);
      }

      toast({
        title: "Registration Submitted",
        description: "Your service provider profile has been submitted for admin approval. You will be notified once it's reviewed.",
        variant: "default",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Register as Service Provider</h1>
            <p className="text-gray-600">
              Join our platform and showcase your services to potential clients. Your profile will be reviewed by our admin team before going live.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Provider Information</CardTitle>
              <CardDescription>
                Fill in your business details to create your provider profile. All submissions require admin approval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business_name">Business Name *</Label>
                    <Input
                      id="business_name"
                      {...register('business_name')}
                      placeholder="Your business name"
                    />
                    {errors.business_name && (
                      <p className="text-sm text-red-500 mt-1">{errors.business_name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category_id">Service Category *</Label>
                    <Select onValueChange={(value) => setValue('category_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your service category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-gray-500">{category.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.category_id.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="Your service area"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="Your city"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      {...register('website')}
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.website && (
                      <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="price_range">Price Range *</Label>
                    <Select onValueChange={(value) => setValue('price_range', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (₹5,000 - ₹15,000)</SelectItem>
                        <SelectItem value="mid-range">Mid-range (₹15,000 - ₹50,000)</SelectItem>
                        <SelectItem value="premium">Premium (₹50,000 - ₹1,50,000)</SelectItem>
                        <SelectItem value="luxury">Luxury (₹1,50,000+)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.price_range && (
                      <p className="text-sm text-red-500 mt-1">{errors.price_range.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe your services and what makes you unique..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label>Portfolio Images (Max 5)</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> portfolio images
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB each)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>

                    {imagePreview.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                        {imagePreview.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Registering...' : 'Register as Provider'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderRegistration;
