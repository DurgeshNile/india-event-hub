
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, User, Mail, Globe, MapPin, Phone, Calendar, Star, CheckCircle, Clock } from 'lucide-react';

interface Provider {
  id: string;
  business_name?: string;
  name?: string;
  email: string;
  service_type?: string;
  phone?: string;
  website?: string;
  location?: string;
  city?: string;
  description?: string;
  price_range?: string;
  rating?: number;
  review_count?: number;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ExpandableProviderCardProps {
  provider: Provider;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  isPending?: boolean;
}

const ExpandableProviderCard: React.FC<ExpandableProviderCardProps> = ({ 
  provider, 
  onApprove,
  onReject,
  isPending = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePhoneClick = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${phone}`);
  };

  const handleEmailClick = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`mailto:${email}`);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-all duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div onClick={handleCardClick}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {(provider.business_name || provider.name || 'U')[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-100 flex items-center gap-2">
                  {provider.business_name || provider.name || 'Unknown'}
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-300" /> : <ChevronDown className="h-4 w-4 text-gray-300" />}
                </h3>
                <p className="text-sm text-gray-300">{provider.service_type || 'Service Provider'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {provider.verified && <CheckCircle className="h-4 w-4 text-green-400" />}
              {isPending ? (
                <Badge variant="secondary" className="bg-yellow-600 text-yellow-100 border-yellow-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              ) : (
                <Badge variant="default" className="bg-green-600 text-green-100 border-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <button
                onClick={(e) => handleEmailClick(provider.email, e)}
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                {provider.email}
              </button>
            </div>
            {provider.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span>{provider.rating} ({provider.review_count || 0})</span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-600 pt-4 mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
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
                          onClick={(e) => handleEmailClick(provider.email, e)}
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          {provider.email}
                        </button>
                      </div>
                      {provider.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <button
                            onClick={(e) => handlePhoneClick(provider.phone!, e)}
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
          </div>
        )}

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-2 pt-4 border-t border-gray-600 mt-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onApprove?.(provider.id);
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onReject?.(provider.id);
              }}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              Reject
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${provider.email}?subject=Regarding your service provider application`);
              }}
              className="text-blue-400 border-blue-400 hover:bg-blue-600 hover:text-white"
            >
              <Mail className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpandableProviderCard;

