import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ChatbotHeader from './chatbot/ChatbotHeader';
import ChatbotProgressBar from './chatbot/ChatbotProgressBar';
import ChatMessage from './chatbot/ChatMessage';
import ChatOptions from './chatbot/ChatOptions';
import ChatInput from './chatbot/ChatInput';
import { chatSteps } from '@/data/chatSteps';
import { FormData, ChatMessage as ChatMessageType } from '@/types/chatbot';

const EnhancedChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [formData, setFormData] = useState<FormData>({
    eventType: null,
    eventDate: null,
    location: '',
    guestCount: null,
    services: [],
    budget: 0,
    theme: '',
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(chatSteps[0].message, chatSteps[0].options);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, options?: string[]) => {
    const message: ChatMessageType = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      options,
      formField: chatSteps[currentStep]?.field
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleOptionSelect = (option: string) => {
    addUserMessage(option);
    
    const step = chatSteps[currentStep];
    if (step.field) {
      updateFormData(step.field, option);
    }
    
    nextStep();
  };

  const handleTextInput = (text: string) => {
    addUserMessage(text);
    
    const step = chatSteps[currentStep];
    if (step.field) {
      if (step.field === 'budget') {
        updateFormData(step.field, parseFloat(text) || 0);
      } else {
        updateFormData(step.field, text);
      }
    }
    
    nextStep();
  };

  const handleDateInput = (date: Date) => {
    const dateString = date.toLocaleDateString();
    addUserMessage(dateString);
    
    const step = chatSteps[currentStep];
    if (step.field) {
      updateFormData(step.field, date);
    }
    
    nextStep();
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'services' && Array.isArray(prev.services) 
        ? prev.services.includes(value)
          ? prev.services.filter(s => s !== value)
          : [...prev.services, value]
        : value
    }));
  };

  const nextStep = () => {
    if (currentStep < chatSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      
      setTimeout(() => {
        addBotMessage(chatSteps[nextStepIndex].message, chatSteps[nextStepIndex].options);
      }, 1000);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      const { error } = await supabase
        .from('event_requirements')
        .insert({
          event_type: formData.eventType,
          event_date: formData.eventDate,
          location: formData.location,
          guest_count: formData.guestCount,
          services: formData.services,
          budget: formData.budget,
          theme: formData.theme,
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phone: formData.phone,
          status: 'pending'
        });

      if (error) throw error;

      addBotMessage("Perfect! I've received all your event details. Our team will review your requirements and get back to you within 24 hours with personalized recommendations and quotes from our verified service providers. Thank you for choosing our platform!");
      
      toast({
        title: "Requirements Submitted!",
        description: "We'll get back to you within 24 hours with personalized recommendations.",
        variant: "default",
      });

      // Reset form after successful submission
      setTimeout(() => {
        setIsOpen(false);
        setCurrentStep(0);
        setMessages([]);
        setFormData({
          eventType: null,
          eventDate: null,
          location: '',
          guestCount: null,
          services: [],
          budget: 0,
          theme: '',
          name: '',
          email: '',
          phone: ''
        });
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your requirements. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-96"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0">
              <ChatbotHeader onClose={() => setIsOpen(false)} />
              
              <ChatbotProgressBar 
                currentStep={currentStep} 
                totalSteps={chatSteps.length} 
              />
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </CardContent>

              {currentStep < chatSteps.length && (
                <div className="p-4 border-t bg-gray-50">
                  {chatSteps[currentStep].options ? (
                    <ChatOptions 
                      options={chatSteps[currentStep].options!}
                      onSelect={handleOptionSelect}
                      multiSelect={chatSteps[currentStep].multiSelect}
                      selectedServices={formData.services}
                    />
                  ) : (
                    <ChatInput
                      onSubmit={chatSteps[currentStep].isDateInput ? handleDateInput : handleTextInput}
                      isDateInput={chatSteps[currentStep].isDateInput}
                      isBudgetInput={chatSteps[currentStep].isBudgetInput}
                      placeholder={
                        chatSteps[currentStep].isDateInput ? "Select date..." :
                        chatSteps[currentStep].isBudgetInput ? "Enter your budget..." :
                        "Type your message..."
                      }
                    />
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedChatbot;
