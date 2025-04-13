
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Cake, Briefcase, Sparkles } from 'lucide-react';

type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Other';

interface EventTypeSelectorProps {
  onSelect: (type: EventType) => void;
  selected: EventType | null;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ onSelect, selected }) => {
  const eventTypes: { type: EventType; icon: React.ReactNode; color: string }[] = [
    { 
      type: 'Wedding', 
      icon: <Calendar className="h-6 w-6" />, 
      color: 'bg-pink-100 text-pink-600 border-pink-200'
    },
    { 
      type: 'Birthday', 
      icon: <Cake className="h-6 w-6" />, 
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    { 
      type: 'Corporate', 
      icon: <Briefcase className="h-6 w-6" />, 
      color: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    },
    { 
      type: 'Other', 
      icon: <Sparkles className="h-6 w-6" />, 
      color: 'bg-purple-100 text-purple-600 border-purple-200'
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
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
            ${selected === event.type 
              ? `${event.color} border-2` 
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
        >
          <div 
            className={`flex items-center justify-center w-12 h-12 rounded-full mb-2
              ${selected === event.type ? event.color : 'bg-white'}`}
          >
            {event.icon}
          </div>
          <span className="font-medium">{event.type}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default EventTypeSelector;
