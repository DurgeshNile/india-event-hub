
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Utensils, Brush, Music, Users } from 'lucide-react';

type Service = 'Organizer' | 'Photographer' | 'Venue' | 'Caterer' | 'Decorator' | 'Entertainment';

interface ServiceSelectorProps {
  onSelect: (services: Service[]) => void;
  selected: Service[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ onSelect, selected }) => {
  const services: { type: Service; icon: React.ReactNode; color: string }[] = [
    { 
      type: 'Organizer', 
      icon: <Users className="h-5 w-5" />, 
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    { 
      type: 'Photographer', 
      icon: <Camera className="h-5 w-5" />, 
      color: 'bg-purple-100 text-purple-600 border-purple-200' 
    },
    { 
      type: 'Venue', 
      icon: <MapPin className="h-5 w-5" />, 
      color: 'bg-green-100 text-green-600 border-green-200' 
    },
    { 
      type: 'Caterer', 
      icon: <Utensils className="h-5 w-5" />, 
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200' 
    },
    { 
      type: 'Decorator', 
      icon: <Brush className="h-5 w-5" />, 
      color: 'bg-pink-100 text-pink-600 border-pink-200' 
    },
    { 
      type: 'Entertainment', 
      icon: <Music className="h-5 w-5" />, 
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200' 
    },
  ];

  const toggleService = (service: Service) => {
    if (selected.includes(service)) {
      onSelect(selected.filter(s => s !== service));
    } else {
      onSelect([...selected, service]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <motion.button
            key={service.type}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleService(service.type)}
            className={`flex items-center p-3 rounded-lg border transition-all
              ${selected.includes(service.type) 
                ? service.color
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2
              ${selected.includes(service.type) 
                ? 'bg-white bg-opacity-50' 
                : 'bg-white'}`}
            >
              {service.icon}
            </div>
            <span className="text-sm font-medium">{service.type}</span>
          </motion.button>
        ))}
      </div>
      
      <Button 
        onClick={() => onSelect(selected)}
        disabled={selected.length === 0}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300"
      >
        Continue {selected.length > 0 ? `(${selected.length} selected)` : ''}
      </Button>
    </div>
  );
};

export default ServiceSelector;
