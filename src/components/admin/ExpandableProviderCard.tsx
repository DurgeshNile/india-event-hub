
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ProviderHeader from './ProviderHeader';
import ProviderContactInfo from './ProviderContactInfo';
import ProviderDetails from './ProviderDetails';
import ProviderActionButtons from './ProviderActionButtons';

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
        <ProviderHeader
          provider={provider}
          isPending={isPending}
          isExpanded={isExpanded}
          onToggle={handleCardClick}
        />

        <ProviderContactInfo
          email={provider.email}
          rating={provider.rating}
          reviewCount={provider.review_count}
          onEmailClick={handleEmailClick}
        />

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-600 pt-4 mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <ProviderDetails
              provider={provider}
              onEmailClick={handleEmailClick}
              onPhoneClick={handlePhoneClick}
            />
          </div>
        )}

        {/* Action Buttons */}
        {isPending && (
          <ProviderActionButtons
            providerId={provider.id}
            providerEmail={provider.email}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ExpandableProviderCard;
