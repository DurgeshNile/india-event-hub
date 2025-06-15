
import React from 'react';
import { Mail, Star } from 'lucide-react';

interface ProviderContactInfoProps {
  email: string;
  rating?: number;
  reviewCount?: number;
  onEmailClick: (email: string, e: React.MouseEvent) => void;
}

const ProviderContactInfo: React.FC<ProviderContactInfoProps> = ({
  email,
  rating,
  reviewCount,
  onEmailClick
}) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-300">
      <div className="flex items-center gap-1">
        <Mail className="h-3 w-3" />
        <button
          onClick={(e) => onEmailClick(email, e)}
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          {email}
        </button>
      </div>
      {rating && (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span>{rating} ({reviewCount || 0})</span>
        </div>
      )}
    </div>
  );
};

export default ProviderContactInfo;
