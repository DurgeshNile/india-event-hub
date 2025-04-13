
import React from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, isTyping = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-2xl backdrop-blur-sm ${
          isBot
            ? 'bg-white/70 border border-gray-200/50 text-gray-800 rounded-tl-none shadow-sm'
            : 'bg-indigo-600/90 text-white rounded-tr-none shadow-sm'
        }`}
      >
        {isTyping ? (
          <div className="flex items-center space-x-1 h-6">
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          </div>
        ) : (
          <p className="text-sm">{message}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
