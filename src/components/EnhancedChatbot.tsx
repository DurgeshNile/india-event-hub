
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ChatbotSummary from './ChatbotSummary';
import ChatbotHeader from './chatbot/ChatbotHeader';
import ChatbotProgressBar from './chatbot/ChatbotProgressBar';
import ChatMessage from './chatbot/ChatMessage';
import ChatOptions from './chatbot/ChatOptions';
import ChatInput from './chatbot/ChatInput';
import { FormData, ChatMessage as ChatMessageType, Service } from '@/types/chatbot';
import { chatSteps } from '@/data/chatSteps';

const EnhancedChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
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
    const userMessage: ChatMessageType = {
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
        const nextMessage: ChatMessageType = {
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
        const summaryMessage: ChatMessageType = {
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

  const handleSkip = () => {
    const currentField = chatSteps[currentStep]?.field;
    handleResponse('', currentField);
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
        variant: "destructive",
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
      <ChatbotHeader onClose={() => setIsOpen(false)} />

      {!isCompleted && (
        <ChatbotProgressBar 
          currentStep={currentStep} 
          totalSteps={chatSteps.length} 
        />
      )}
      
      {/* Chat Messages */}
      <div className="h-80 p-4 overflow-y-auto bg-gray-50" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              
              {/* Options */}
              {message.type === 'bot' && message.options && !isCompleted && (
                <ChatOptions
                  options={message.options}
                  formField={message.formField!}
                  formData={formData}
                  isMultiSelect={isMultiSelect}
                  onResponse={handleResponse}
                />
              )}
            </div>
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
        <ChatInput
          inputMessage={inputMessage}
          onInputChange={setInputMessage}
          onSubmit={handleTextInput}
          onSkip={handleSkip}
          currentStep={currentStepData}
        />
      )}
    </motion.div>
  );
};

export default EnhancedChatbot;
