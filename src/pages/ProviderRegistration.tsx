import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ImageIcon } from "lucide-react";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  website: z.string().url({
    message: "Invalid website URL.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  priceRange: z.string().min(1, {
    message: "Price range must be selected.",
  }),
  categoryId: z.string().min(1, {
    message: "Category must be selected.",
  }),
});

const ProviderRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      description: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      city: "",
      priceRange: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const isValid = form.trigger();

    if (!isValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "error",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const imageUrls: string[] = [];
      for (const image of images) {
        const file = await fetch(image)
          .then(res => res.blob())
          .then(blob => new File([blob], 'image.jpg', { type: 'image/jpeg' }));

        const imagePath = await uploadImage(file);
        imageUrls.push(imagePath);
      }

      const { data: provider, error } = await supabase
        .from('service_providers')
        .insert({
          business_name: data.businessName,
          description: data.description,
          email: data.email,
          phone: data.phone,
          website: data.website,
          location: data.location,
          city: data.city,
          price_range: data.priceRange,
          category_id: data.categoryId,
          user_id: user?.id,
          verified: false,
          featured: false,
          rating: 0,
          review_count: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting provider:', error);
        toast({
          title: "Error",
          description: "Failed to register service provider",
          variant: "error",
        });
        return;
      }

      if (provider && imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          await supabase
            .from('service_provider_images')
            .insert({
              service_provider_id: provider.id,
              image_url: imageUrl,
              is_primary: false,
              caption: ''
            });
        }
      }

      toast({
        title: "Success",
        description: "Service provider registered successfully! Your registration is pending approval.",
        variant: "success",
      });

      reset();
      setImages([]);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to register service provider",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('service-provider-images')
      .upload(`${user?.id}/${Date.now()}-${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "error",
      });
      throw error;
    }

    return data.path;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length + images.length > 5) {
      toast({
        title: "Error",
        description: "You can upload a maximum of 5 images",
        variant: "error",
      });
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImages(prevImages => [...prevImages, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { reset } = form;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Service Provider Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your services"
                    className="resize-none"
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
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your website URL" type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Range</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a price range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Mid-Range">Mid-Range</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Photographer</SelectItem>
                    <SelectItem value="2">Caterer</SelectItem>
                    <SelectItem value="3">Decorator</SelectItem>
                    <SelectItem value="4">Musician</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Upload Images (Max 5)</FormLabel>
            <Input type="file" multiple onChange={handleImageUpload} />
            <div className="flex mt-4 space-x-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-32 h-32 rounded-md overflow-hidden">
                  <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProviderRegistration;
