
export interface Provider {
  id: string;
  name: string;
  category: string;
  reviewCount: number;
  image: string;
  rating: number;
  price_range?: string;
  location?: string;
  description?: string;
  city?: string;
  verified?: boolean;
  featured?: boolean;
}

export interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  city: string;
  price_range: string;
  category_id: string;
  user_id: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  service_provider_images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    caption: string;
  }>;
}

export const transformServiceProviderToProvider = (serviceProvider: ServiceProvider): Provider => {
  return {
    id: serviceProvider.id,
    name: serviceProvider.business_name,
    category: serviceProvider.category_id,
    reviewCount: serviceProvider.review_count,
    image: serviceProvider.service_provider_images?.[0]?.image_url || '',
    rating: serviceProvider.rating,
    price_range: serviceProvider.price_range,
    location: serviceProvider.location,
    description: serviceProvider.description,
    city: serviceProvider.city,
    verified: serviceProvider.verified,
    featured: serviceProvider.featured,
  };
};
