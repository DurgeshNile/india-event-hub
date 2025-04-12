
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

type GuestCount = '<50' | '50-100' | '100-200' | '200+';

interface GuestCountSelectorProps {
  onSelect: (count: GuestCount) => void;
  selected: GuestCount | null;
}

const GuestCountSelector: React.FC<GuestCountSelectorProps> = ({ onSelect, selected }) => {
  const guestCounts: GuestCount[] = ['<50', '50-100', '100-200', '200+'];

  return (
    <div className="space-y-3">
      {guestCounts.map((count) => (
        <motion.button
          key={count}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(count)}
          className={`flex items-center w-full p-3 rounded-lg border transition-all
            ${selected === count 
              ? 'bg-pink-50 border-pink-200 text-pink-700' 
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`}
        >
          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3
            ${selected === count ? 'bg-pink-200 text-pink-700' : 'bg-gray-200 text-gray-600'}`}
          >
            <Users size={16} />
          </div>
          <span className="font-medium">{count} guests</span>
        </motion.button>
      ))}
    </div>
  );
};

export default GuestCountSelector;
