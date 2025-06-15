
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail } from 'lucide-react';

interface ProviderActionButtonsProps {
  providerId: string;
  providerEmail: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ProviderActionButtons: React.FC<ProviderActionButtonsProps> = ({
  providerId,
  providerEmail,
  onApprove,
  onReject
}) => {
  return (
    <div className="flex gap-2 pt-4 border-t border-gray-600 mt-4">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onApprove?.(providerId);
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
          onReject?.(providerId);
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
          window.open(`mailto:${providerEmail}?subject=Regarding your service provider application`);
        }}
        className="text-blue-400 border-blue-400 hover:bg-blue-600 hover:text-white"
      >
        <Mail className="h-4 w-4 mr-1" />
        Contact
      </Button>
    </div>
  );
};

export default ProviderActionButtons;
