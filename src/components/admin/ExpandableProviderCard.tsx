
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

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div onClick={handleCardClick}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {(provider.business_name || provider.name || 'U')[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {provider.business_name || provider.name || 'Unknown'}
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </h3>
                <p className="text-sm text-gray-500">{provider.service_type || 'Service Provider'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {provider.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
              {isPending ? (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              ) : (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{provider.email}</span>
            </div>
            {provider.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span>{provider.rating} ({provider.review_count || 0})</span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t pt-4 mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Provider Details
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{provider.business_name || provider.name || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{provider.email}</span>
                      </div>
                      {provider.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{provider.phone}</span>
                        </div>
                      )}
                      {provider.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                            {provider.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Business Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Service Type:</span>
                        <span className="text-gray-900">{provider.service_type || 'Not specified'}</span>
                      </div>
                      {provider.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{provider.location}{provider.city ? `, ${provider.city}` : ''}</span>
                        </div>
                      )}
                      {provider.price_range && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Price Range:</span>
                          <span className="text-gray-900">{provider.price_range}</span>
                        </div>
                      )}
                      {provider.rating && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-gray-900">{provider.rating}/5 ({provider.review_count || 0} reviews)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {provider.description && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Description</label>
                  <p className="text-gray-900 mt-2 leading-relaxed">{provider.description}</p>
                </div>
              )}
              
              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">System Information</label>
                <div className="mt-2 grid md:grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <label className="font-medium block">Provider ID:</label>
                    <p className="font-mono text-gray-700 break-all">{provider.id}</p>
                  </div>
                  {provider.created_at && (
                    <div>
                      <label className="font-medium block">Registered:</label>
                      <p className="font-mono text-gray-700">{format(new Date(provider.created_at), 'PPpp')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-2 pt-4 border-t mt-4">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onApprove?.(provider.id);
              }}
              className="bg-green-500 hover:bg-green-600"
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
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
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
