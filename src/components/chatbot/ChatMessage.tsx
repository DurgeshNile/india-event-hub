
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChatMessage as ChatMessageType } from '@/types/chatbot';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.type === 'bot' && (
          <Avatar className="w-8 h-8 mr-2 border">
            <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face" />
          </Avatar>
        )}
        <Card className={`max-w-[80%] ${
          message.type === 'user' 
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
            : 'bg-white border-gray-200'
        }`}>
          <CardContent className="p-3">
            <p className="text-sm">{message.content}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
