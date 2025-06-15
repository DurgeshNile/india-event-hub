
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';

interface ProviderHeaderProps {
  provider: {
    id: string;
    business_name?: string;
    name?: string;
    service_type?: string;
    verified?: boolean;
  };
  isPending: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  provider,
  isPending,
  isExpanded,
  onToggle
}) => {
  return (
    <div onClick={onToggle}>
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
    </div>
  );
};

export default ProviderHeader;
