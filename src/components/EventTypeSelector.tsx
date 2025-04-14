
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Cake, Briefcase, Sparkles } from 'lucide-react';

type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Other';

interface EventTypeSelectorProps {
  onSelect: (type: EventType) => void;
  selected: EventType | null;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ onSelect, selected }) => {
  const eventTypes: { 
    type: EventType; 
    icon: React.ReactNode; 
    color: string;
    imageSrc: string;
  }[] = [
    { 
      type: 'Wedding', 
      icon: <Heart className="h-6 w-6" />, 
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      imageSrc: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3'
    },
    { 
      type: 'Birthday', 
      icon: <Cake className="h-6 w-6" />, 
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      imageSrc: 'https://images.unsplash.com/photo-1530735038726-a73fd6e6c31c?ixlib=rb-4.0.3'
    },
    { 
      type: 'Corporate', 
      icon: <Briefcase className="h-6 w-6" />, 
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      imageSrc: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3'
    },
    { 
      type: 'Other', 
      icon: <Sparkles className="h-6 w-6" />, 
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      imageSrc: 'https://images.unsplash.com/photo-1610851467855-4ecfc3c975e4?ixlib=rb-4.0.3'
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 overflow-visible">
      {eventTypes.map((event) => (
        <motion.button
          key={event.type}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(event.type)}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all relative overflow-hidden
            ${selected === event.type 
              ? `${event.color} border-2` 
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${selected === event.type ? 'bg-opacity-40' : 'bg-opacity-70'} ${selected === event.type ? event.color.split(' ')[0] : 'bg-gray-800'} z-10`}></div>
            <img 
              src={event.imageSrc}
              alt={`${event.type} event`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="z-10 relative">
            <div 
              className={`flex items-center justify-center w-12 h-12 rounded-full mb-2
                ${selected === event.type ? 'bg-white bg-opacity-90' : 'bg-white bg-opacity-90'}`}
            >
              {event.icon}
            </div>
            <span className={`font-medium ${selected === event.type ? 'text-white' : 'text-white'}`}>{event.type}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default EventTypeSelector;
