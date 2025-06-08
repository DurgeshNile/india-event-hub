
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';

interface ChatbotHeaderProps {
  onClose: () => void;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8 border-2 border-white">
          <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face" />
        </Avatar>
        <div>
          <h5 className="font-semibold">Event Assistant</h5>
          <p className="text-xs text-pink-100">Planning your perfect event</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClose}
        className="text-white hover:bg-white/20 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatbotHeader;
