
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { format } from 'date-fns';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import ChatMessage from './ChatMessage';

interface ChatMessageType {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

interface Position {
  x: number;
  y: number;
}

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const timestamp = format(new Date(), 'h:mm a');
      const userMessage: ChatMessageType = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: timestamp,
        isUser: true,
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: ChatMessageType = {
          id: Date.now().toString() + '-bot',
          text: `Bot response to: ${newMessage}`,
          timestamp: format(new Date(), 'h:mm a'),
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="toggle-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="chat-interface"
            drag={isDragging}
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-20 right-6 w-[90vw] md:w-[450px] h-[600px] bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden z-50 flex flex-col border border-white/20"
            style={{ x: position.x, y: position.y }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-lg font-semibold text-gray-800">
                Eventify AI Assistant
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => {}}>
                  <Minimize2 className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                </Button>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-2">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            <div className="p-4 border-t border-white/20">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow rounded-full py-2 px-4 bg-white/50 border-none shadow-inner focus:ring-0 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="ml-3 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg flex items-center justify-center"
                >
                  <Send className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotUI;
