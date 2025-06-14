
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEventRequirements } from '@/hooks/useEventRequirements';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'error';
  message: string;
  timestamp: Date;
}

interface UserRequirements {
  contact_name: string;
  contact_email: string;
  event_type: string;
  event_date: string;
  location: string;
  guest_count: number;
  budget: number;
  description: string;
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userRequirements, setUserRequirements] = useState<Partial<UserRequirements>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addRequirement } = useEventRequirements();
  const { user } = useAuth();

  const chatSteps = [
    { question: "Hi! I'm here to help you plan your event. What's your name?", field: 'contact_name' },
    { question: "Great! What's your email address?", field: 'contact_email' },
    { question: "What type of event are you planning? (e.g., Wedding, Birthday, Corporate)", field: 'event_type' },
    { question: "When is your event date? (Please use YYYY-MM-DD format)", field: 'event_date' },
    { question: "Where will the event take place?", field: 'location' },
    { question: "How many guests are you expecting?", field: 'guest_count' },
    { question: "What's your budget for this event? (in ₹)", field: 'budget' },
    { question: "Please describe any specific requirements or preferences for your event.", field: 'description' }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello! Welcome to LetsEventify. I'm here to help you plan your perfect event. Let's get started!");
      setTimeout(() => {
        addBotMessage(chatSteps[0].question);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addErrorMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'error',
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDate = (date: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const parsedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return !isNaN(parsedDate.getTime()) && parsedDate >= today;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue('');

    if (currentStep < chatSteps.length) {
      const currentField = chatSteps[currentStep].field as keyof UserRequirements;
      
      // Validation logic
      if (currentField === 'contact_email' && !validateEmail(userInput)) {
        addErrorMessage("Please enter a valid email address (e.g., user@example.com)");
        setTimeout(() => {
          addBotMessage("Let's try again. What's your email address?");
        }, 1000);
        return;
      }

      if (currentField === 'event_date' && !validateDate(userInput)) {
        addErrorMessage("Please enter a valid future date in YYYY-MM-DD format (e.g., 2024-12-25)");
        setTimeout(() => {
          addBotMessage("When is your event date? (Please use YYYY-MM-DD format)");
        }, 1000);
        return;
      }

      if ((currentField === 'guest_count' || currentField === 'budget') && (isNaN(Number(userInput)) || Number(userInput) <= 0)) {
        addErrorMessage(`Please enter a valid ${currentField === 'guest_count' ? 'number of guests' : 'budget amount'}`);
        setTimeout(() => {
          addBotMessage(chatSteps[currentStep].question);
        }, 1000);
        return;
      }

      let processedValue: any = userInput;
      if (currentField === 'guest_count' || currentField === 'budget') {
        processedValue = parseInt(userInput);
      }

      setUserRequirements(prev => ({
        ...prev,
        [currentField]: processedValue
      }));

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      setTimeout(() => {
        if (nextStep < chatSteps.length) {
          addBotMessage(chatSteps[nextStep].question);
        } else {
          submitRequirements({
            ...userRequirements,
            [currentField]: processedValue
          } as UserRequirements);
        }
      }, 1000);
    }
  };

  const submitRequirements = async (requirements: UserRequirements) => {
    try {
      await addRequirement({
        user_id: user?.id || 'anonymous',
        ...requirements
      });

      addBotMessage("Perfect! I've collected all your event requirements and sent them to our admin team. They will review your request and get back to you soon. Thank you for choosing LetsEventify!");
      
      setTimeout(() => {
        addBotMessage("Is there anything else I can help you with? Feel free to start a new conversation anytime!");
      }, 2000);

    } catch (error) {
      addErrorMessage("I apologize, but there was an error submitting your requirements. Please try again or contact our support team directly.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-96 h-[500px] shadow-2xl border-2 border-indigo-200 bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Event Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'bot' 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : message.type === 'error'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.type === 'bot' ? <Bot className="h-4 w-4" /> : 
                         message.type === 'error' ? <AlertCircle className="h-4 w-4" /> :
                         <User className="h-4 w-4" />}
                      </div>
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                        message.type === 'bot'
                          ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                          : message.type === 'error'
                          ? 'bg-red-100 text-red-800 rounded-tl-none'
                          : 'bg-indigo-500 text-white rounded-tr-none'
                      }`}>
                        {message.message}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 border-gray-300 focus:border-indigo-500"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-600 px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ zIndex: 9999 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingChatbot;
