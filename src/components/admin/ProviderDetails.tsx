
import React from 'react';
import { User, Mail, Phone, Globe, MapPin, Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Provider {
  id: string;
  business_name?: string;
  name?: string;
  email: string;
  phone?: string;
  website?: string;
  location?: string;
  city?: string;
  description?: string;
  price_range?: string;
  rating?: number;
  review_count?: number;
  service_type?: string;
  created_at?: string;
}

interface ProviderDetailsProps {
  provider: Provider;
  onEmailClick: (email: string, e: React.MouseEvent) => void;
  onPhoneClick: (phone: string, e: React.MouseEvent) => void;
}

const ProviderDetails: React.FC<ProviderDetailsProps> = ({
  provider,
  onEmailClick,
  onPhoneClick
}) => {
  return (
    <div className="bg-gray-600 p-6 rounded-lg border border-gray-500">
      <h4 className="font-semibold text-gray-100 mb-4 text-lg flex items-center gap-2">
        <User className="h-5 w-5 text-blue-400" />
        Provider Details
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Contact Information</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-100">{provider.business_name || provider.name || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <button
                  onClick={(e) => onEmailClick(provider.email, e)}
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  {provider.email}
                </button>
              </div>
              {provider.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <button
                    onClick={(e) => onPhoneClick(provider.phone!, e)}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {provider.phone}
                  </button>
                </div>
              )}
              {provider.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline" onClick={(e) => e.stopPropagation()}>
                    {provider.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Business Information</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Service Type:</span>
                <span className="text-gray-100">{provider.service_type || 'Not specified'}</span>
              </div>
              {provider.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-100">{provider.location}{provider.city ? `, ${provider.city}` : ''}</span>
                </div>
              )}
              {provider.price_range && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Price Range:</span>
                  <span className="text-gray-100">{provider.price_range}</span>
                </div>
              )}
              {provider.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-gray-100">{provider.rating}/5 ({provider.review_count || 0} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {provider.description && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
          <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Description</label>
          <p className="text-gray-100 mt-2 leading-relaxed">{provider.description}</p>
        </div>
      )}
      
      <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
        <label className="text-sm font-semibold text-gray-200 uppercase tracking-wide">System Information</label>
        <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs text-gray-400">
          <div>
            <label className="font-medium block text-gray-300">Provider ID:</label>
            <p className="font-mono text-gray-200 break-all">{provider.id}</p>
          </div>
          {provider.created_at && (
            <div>
              <label className="font-medium block text-gray-300">Registered:</label>
              <p className="font-mono text-gray-200">{format(new Date(provider.created_at), 'PPpp')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
