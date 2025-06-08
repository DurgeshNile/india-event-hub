
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, UsersIcon, PackageIcon, DollarSignIcon, PaletteIcon, UserIcon, MailIcon, PhoneIcon, CheckCircle2 } from 'lucide-react';
import { FormData } from '@/types/chatbot';

interface ChatbotSummaryProps {
  formData: FormData;
  onSubmit: () => void;
}

const ChatbotSummary: React.FC<ChatbotSummaryProps> = ({ formData, onSubmit }) => {
  const summaryItems = [
    {
      icon: <CalendarIcon size={16} />,
      label: 'Event Type & Date',
      value: `${formData.eventType} • ${formData.eventDate ? format(formData.eventDate, 'PPP') : 'Not specified'}`,
    },
    {
      icon: <MapPinIcon size={16} />,
      label: 'Location',
      value: formData.location,
    },
    {
      icon: <UsersIcon size={16} />,
      label: 'Expected Guests',
      value: formData.guestCount,
    },
    {
      icon: <PackageIcon size={16} />,
      label: 'Services Needed',
      value: formData.services.join(', ') || 'None selected',
    },
    {
      icon: <DollarSignIcon size={16} />,
      label: 'Estimated Budget',
      value: `₹${formData.budget.toLocaleString()}`,
    },
    {
      icon: <PaletteIcon size={16} />,
      label: 'Theme/Style',
      value: formData.theme || 'Not specified',
    },
    {
      icon: <UserIcon size={16} />,
      label: 'Name',
      value: formData.name,
    },
    {
      icon: <MailIcon size={16} />,
      label: 'Email',
      value: formData.email,
    },
  ];

  if (formData.phone) {
    summaryItems.push({
      icon: <PhoneIcon size={16} />,
      label: 'Phone',
      value: formData.phone,
    });
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-lg p-4"
      >
        <h3 className="text-center text-lg font-semibold mb-4 text-pink-700">
          Event Planning Summary
        </h3>
        
        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-center"
      >
        <div className="bg-indigo-100 p-2 rounded-full mr-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-indigo-700">
            Our team will connect with you shortly!
          </p>
          <p className="text-xs text-indigo-600">
            We'll reach out to discuss your event requirements within 24 hours.
          </p>
        </div>
      </motion.div>
      
      <Button
        onClick={onSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600"
      >
        Submit Request
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        By submitting, you agree to be contacted by our event planning team.
      </p>
    </div>
  );
};

export default ChatbotSummary;
