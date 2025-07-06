
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProviderRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    business_name: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    city: '',
    price_range: '',
    category_id: '',
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Warning",
        description: "Could not load categories. You can still submit without selecting a category.",
        variant: "default",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files);
  };

  const uploadImages = async (providerId: string) => {
    if (!images || images.length === 0) return;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      
      try {
        const imageUrl = URL.createObjectURL(file);

        const { error } = await supabase
          .from('service_provider_images')
          .insert({
            provider_id: providerId,
            image_url: imageUrl,
            is_primary: i === 0,
            caption: file.name,
          });

        if (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      } catch (error) {
        console.error('Error processing image:', error);
        throw error;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Starting provider registration...');
    console.log('User:', user);
    console.log('Form data:', formData);
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to register as a provider",
        variant: "error",
      });
      return;
    }

    // Validate required fields
    if (!formData.business_name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Business Name and Email)",
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Inserting provider data...');
      
      // Insert into service_providers table with verified: false (pending approval)
      const { data: provider, error: providerError } = await supabase
        .from('service_providers')
        .insert({
          ...formData,
          user_id: user.id,
          verified: false, // This is key - request goes to admin for approval
          featured: false,
          rating: 0,
          review_count: 0,
        })
        .select()
        .single();

      console.log('Provider insert result:', { provider, providerError });

      if (providerError) {
        console.error('Provider insert error:', providerError);
        throw providerError;
      }

      if (provider) {
        console.log('Uploading images...');
        await uploadImages(provider.id);
      }

      toast({
        title: "Registration Submitted Successfully!",
        description: "Your provider registration has been submitted to the admin for review. You will be notified once it's approved.",
        variant: "default",
      });

      // Redirect to dashboard after successful submission
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error registering provider:', error);
      toast({
        title: "Registration Failed",
        description: `Failed to submit registration: ${error.message || 'Please try again.'}`,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <div className="container mx-auto py-10 max-w-2xl px-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Register as Service Provider
            </CardTitle>
            <CardDescription className="text-gray-300">
              Fill out this form to request registration as a service provider. 
              Your application will be reviewed by our admin team.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Business Name *</label>
                <Input
                  value={formData.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  required
                  placeholder="Enter your business name"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Describe your services"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="Enter your website URL"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter your location"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">City</label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Price Range</label>
                <Select onValueChange={(value) => handleInputChange('price_range', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="budget">$ - Budget Friendly</SelectItem>
                    <SelectItem value="moderate">$$ - Moderate</SelectItem>
                    <SelectItem value="premium">$$$ - Premium</SelectItem>
                    <SelectItem value="luxury">$$$$ - Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {categories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200">Category</label>
                  <Select onValueChange={(value) => handleInputChange('category_id', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200">Images</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-none file:rounded"
                />
                <p className="text-xs text-gray-400 mt-1">Upload images of your work or business</p>
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {loading ? 'Submitting Request...' : 'Submit Registration Request'}
              </Button>
              
              <p className="text-xs text-gray-400 text-center">
                * Your registration will be reviewed by our admin team. You will receive a notification once approved.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProviderRegistration;
