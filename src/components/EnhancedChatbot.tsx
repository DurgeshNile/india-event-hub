import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Move } from 'lucide-react';
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
  const [inputMessage, setInputMessage] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatbotRef = useRef<HTMLDivElement>(null);
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

  const handleResponse = (response: string, field?: keyof FormData) => {
    if (response === 'continue') {
      nextStep();
      return;
    }

    addUserMessage(response);
    
    if (field) {
      if (field === 'budget') {
        updateFormData(field, parseFloat(response) || 0);
      } else {
        updateFormData(field, response);
      }
    }
    
    nextStep();
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const step = chatSteps[currentStep];
    if (step.isDateInput) {
      const date = new Date(inputMessage);
      addUserMessage(date.toLocaleDateString());
      updateFormData(step.field, date);
    } else if (step.isBudgetInput) {
      addUserMessage(inputMessage);
      updateFormData(step.field, parseFloat(inputMessage) || 0);
    } else {
      addUserMessage(inputMessage);
      updateFormData(step.field, inputMessage);
    }
    
    setInputMessage('');
    nextStep();
  };

  const handleSkip = () => {
    addUserMessage('Skipped');
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
      }, 500);
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
          event_date: formData.eventDate?.toISOString().split('T')[0] || null,
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
      });

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatbotRef.current) return;
    
    setIsDragging(true);
    const rect = chatbotRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div
            ref={chatbotRef}
            className="fixed z-50 w-80 h-96"
            style={{
              left: position.x || 'auto',
              top: position.y || 'auto',
              right: position.x ? 'auto' : '1.5rem',
              bottom: position.y ? 'auto' : '1.5rem',
              cursor: isDragging ? 'grabbing' : 'default'
            }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-0">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex justify-between items-center cursor-grab"
                onMouseDown={handleMouseDown}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-pink-500 font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">Event Assistant</h5>
                    <p className="text-xs text-pink-100">Planning your perfect event</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Move className="h-4 w-4 text-white/70" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ChatbotProgressBar 
                currentStep={currentStep} 
                totalSteps={chatSteps.length} 
              />
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </CardContent>

              {currentStep < chatSteps.length && (
                <div className="p-4 border-t bg-white">
                  {chatSteps[currentStep].options ? (
                    <ChatOptions 
                      options={chatSteps[currentStep].options!}
                      formField={chatSteps[currentStep].field}
                      formData={formData}
                      isMultiSelect={chatSteps[currentStep].multiSelect}
                      onResponse={handleResponse}
                    />
                  ) : (
                    <ChatInput
                      inputMessage={inputMessage}
                      onInputChange={setInputMessage}
                      onSubmit={handleInputSubmit}
                      onSkip={handleSkip}
                      currentStep={chatSteps[currentStep]}
                    />
                  )}
                </div>
              )}
            </Card>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedChatbot;
