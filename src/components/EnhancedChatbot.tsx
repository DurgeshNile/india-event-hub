import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle, X, Calendar, MapPin, Users, DollarSign, Camera, Utensils, Music, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ChatbotSummary from './ChatbotSummary';

type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Other';
type GuestCount = '<50' | '50-100' | '100-200' | '200+';
type Service = 'Organizer' | 'Photographer' | 'Venue' | 'Caterer' | 'Decorator' | 'Entertainment';

interface FormData {
  eventType: EventType | null;
  eventDate: Date | null;
  location: string;
  guestCount: GuestCount | null;
  services: Service[];
  budget: number;
  theme: string;
  name: string;
  email: string;
  phone: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  formField?: keyof FormData;
}

const EnhancedChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    eventType: null,
    eventDate: null,
    location: '',
    guestCount: null,
    services: [],
    budget: 50000,
    theme: '',
    name: '',
    email: '',
    phone: ''
  });

  const chatSteps = [
    {
      message: "Hi! I'm your event planning assistant. What type of event are you planning?",
      options: ['Wedding', 'Birthday', 'Corporate', 'Other'],
      field: 'eventType' as keyof FormData
    },
    {
      message: "Great choice! When would you like to host this event?",
      field: 'eventDate' as keyof FormData,
      isDateInput: true
    },
    {
      message: "Where would you like to host the event?",
      field: 'location' as keyof FormData,
      isTextInput: true
    },
    {
      message: "How many guests are you expecting?",
      options: ['<50', '50-100', '100-200', '200+'],
      field: 'guestCount' as keyof FormData
    },
    {
      message: "What services do you need? (Select all that apply)",
      options: ['Organizer', 'Photographer', 'Venue', 'Caterer', 'Decorator', 'Entertainment'],
      field: 'services' as keyof FormData,
      multiSelect: true
    },
    {
      message: "What's your estimated budget for this event?",
      field: 'budget' as keyof FormData,
      isBudgetInput: true
    },
    {
      message: "Do you have any specific theme or style preferences?",
      field: 'theme' as keyof FormData,
      isTextInput: true
    },
    {
      message: "Great! Now I need your contact details. What's your full name?",
      field: 'name' as keyof FormData,
      isTextInput: true
    },
    {
      message: "What's your email address?",
      field: 'email' as keyof FormData,
      isTextInput: true
    },
    {
      message: "Finally, what's your phone number? (Optional)",
      field: 'phone' as keyof FormData,
      isTextInput: true,
      optional: true
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '0',
        type: 'bot',
        content: chatSteps[0].message,
        timestamp: new Date(),
        options: chatSteps[0].options,
        formField: chatSteps[0].field
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleResponse = (response: string, field?: keyof FormData) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Update form data
    if (field) {
      setFormData(prev => {
        if (field === 'services') {
          const currentServices = prev.services || [];
          const service = response as Service;
          const updatedServices = currentServices.includes(service)
            ? currentServices.filter(s => s !== service)
            : [...currentServices, service];
          return { ...prev, [field]: updatedServices };
        } else if (field === 'eventDate') {
          return { ...prev, [field]: new Date(response) };
        } else if (field === 'budget') {
          return { ...prev, [field]: parseInt(response) };
        } else {
          return { ...prev, [field]: response };
        }
      });
    }

    // Move to next step
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < chatSteps.length) {
        setCurrentStep(nextStep);
        const nextMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: chatSteps[nextStep].message,
          timestamp: new Date(),
          options: chatSteps[nextStep].options,
          formField: chatSteps[nextStep].field
        };
        setMessages(prev => [...prev, nextMessage]);
      } else {
        // Show summary
        setIsCompleted(true);
        const summaryMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "Perfect! I've collected all your event details. Please review the summary below:",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
      }
    }, 1000);
  };

  const handleTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const currentField = chatSteps[currentStep]?.field;
      handleResponse(inputMessage.trim(), currentField);
      setInputMessage('');
    }
  };

  const handleSubmitRequirement = async () => {
    try {
      const { error } = await supabase
        .from('event_requirements')
        .insert([
          {
            user_id: user?.id,
            event_type: formData.eventType,
            event_date: formData.eventDate?.toISOString(),
            location: formData.location,
            guest_count: formData.guestCount,
            services: formData.services,
            budget: formData.budget,
            theme: formData.theme,
            contact_name: formData.name,
            contact_email: formData.email,
            contact_phone: formData.phone,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Requirement Submitted!",
        description: "Our team will contact you within 24 hours with suitable recommendations.",
      });

      // Reset chatbot
      setMessages([]);
      setCurrentStep(0);
      setIsCompleted(false);
      setFormData({
        eventType: null,
        eventDate: null,
        location: '',
        guestCount: null,
        services: [],
        budget: 50000,
        theme: '',
        name: '',
        email: '',
        phone: ''
      });
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit requirement. Please try again.",
        variant: "default",
      });
    }
  };

  const currentStepData = chatSteps[currentStep];
  const isMultiSelect = currentStepData?.multiSelect;
  const isTextInput = currentStepData?.isTextInput;
  const isBudgetInput = currentStepData?.isBudgetInput;
  const isDateInput = currentStepData?.isDateInput;

  if (!isOpen) {
    return (
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-xl shadow-2xl border overflow-hidden"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
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
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      {!isCompleted && (
        <div className="px-4 py-2 bg-gray-50">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Step {currentStep + 1} of {chatSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / chatSteps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / chatSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Chat Messages */}
      <div className="h-80 p-4 overflow-y-auto bg-gray-50" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div 
              key={message.id} 
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
              
              {/* Options */}
              {message.type === 'bot' && message.options && !isCompleted && (
                <div className="mt-2 ml-10 space-y-1">
                  {message.options.map((option, index) => {
                    const isSelected = isMultiSelect && formData.services?.includes(option as Service);
                    return (
                      <Button
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleResponse(option, message.formField)}
                        className={`block w-full text-left text-sm transition-all duration-200 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                            : 'hover:bg-pink-50 hover:border-pink-300'
                        }`}
                      >
                        {option}
                        {isSelected && <Badge className="ml-2 bg-white text-pink-600">Selected</Badge>}
                      </Button>
                    );
                  })}
                  
                  {isMultiSelect && formData.services && formData.services.length > 0 && (
                    <Button
                      onClick={() => handleResponse('continue', message.formField)}
                      className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      Continue with {formData.services.length} service(s)
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Summary Component */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChatbotSummary 
              formData={formData} 
              onSubmit={handleSubmitRequirement}
            />
          </motion.div>
        )}
      </div>
      
      {/* Input Area */}
      {(isTextInput || isBudgetInput || isDateInput) && !isCompleted && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleTextInput} className="flex items-center space-x-2">
            <Input
              type={isDateInput ? "date" : isBudgetInput ? "number" : "text"}
              placeholder={
                isDateInput ? "Select date" : 
                isBudgetInput ? "Enter budget amount" : 
                currentStepData?.optional ? "Enter your response (optional)" : "Enter your response"
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow border-pink-200 focus:ring-pink-500"
              min={isBudgetInput ? "1000" : undefined}
              step={isBudgetInput ? "1000" : undefined}
            />
            <Button 
              type="submit" 
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          {currentStepData?.optional && (
            <Button
              onClick={() => handleResponse('', currentStepData.field)}
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-gray-500 hover:text-gray-700"
            >
              Skip this step
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedChatbot;
