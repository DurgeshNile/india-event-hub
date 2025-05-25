
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProviderCard from './ProviderCard';

interface Provider {
  id: string;
  name: string;
  category: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  price_range?: string;
  image: string;
}

interface ProvidersSectionProps {
  providers: Provider[];
  loading: boolean;
}

const ProvidersSection = ({ providers, loading }: ProvidersSectionProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {loading ? 'Loading...' : `Approved Service Providers (${providers.length})`}
          </h2>
          <Link to="/register-provider">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Become a Provider
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading service providers...</p>
          </div>
        ) : providers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">No approved providers found</h3>
            <p className="text-gray-500 mb-4">
              Be the first to register as a service provider in this category!
            </p>
            <Link to="/register-provider">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Register Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProvidersSection;
