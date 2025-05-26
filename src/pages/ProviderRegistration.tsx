
import React, { useState } from 'react';
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

  const categories = [
    { id: 'category1', name: 'Photography' },
    { id: 'category2', name: 'Catering' },
    { id: 'category3', name: 'Decoration' },
    { id: 'category4', name: 'Music & Entertainment' },
    { id: 'category5', name: 'Venue' },
  ];

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
      const fileName = `${providerId}/${Date.now()}_${file.name}`;

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

        if (error) throw error;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to register as a provider",
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: provider, error: providerError } = await supabase
        .from('service_providers')
        .insert({
          ...formData,
          user_id: user.id,
          verified: false,
          featured: false,
          rating: 0,
          review_count: 0,
        })
        .select()
        .single();

      if (providerError) throw providerError;

      if (provider) {
        await uploadImages(provider.id);
      }

      toast({
        title: "Success",
        description: "Your provider registration has been submitted for review",
        variant: "success",
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error registering provider:', error);
      toast({
        title: "Error",
        description: "Failed to register as provider. Please try again.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Register as Service Provider</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Business Name *</label>
          <Input
            value={formData.business_name}
            onChange={(e) => handleInputChange('business_name', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Website</label>
          <Input
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <Input
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <Select onValueChange={(value) => handleInputChange('price_range', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">$ - Budget Friendly</SelectItem>
              <SelectItem value="moderate">$$ - Moderate</SelectItem>
              <SelectItem value="premium">$$$ - Premium</SelectItem>
              <SelectItem value="luxury">$$$$ - Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <Select onValueChange={(value) => handleInputChange('category_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </form>
    </div>
  );
};

export default ProviderRegistration;
