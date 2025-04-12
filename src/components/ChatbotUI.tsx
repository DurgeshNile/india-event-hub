
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { X, Send, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import ChatMessage from './ChatMessage';
import EventTypeSelector from './EventTypeSelector';
import GuestCountSelector from './GuestCountSelector';
import ServiceSelector from './ServiceSelector';
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

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    eventType: null,
    eventDate: null,
    location: '',
    guestCount: null,
    services: [],
    budget: 5000,
    theme: '',
    name: '',
    email: '',
    phone: '',
  });

  // Bot messages for each step
  const botMessages = [
    "Hi there! 👋 I'm your event planning assistant. What type of event are you planning?",
    "Great choice! When is your event date?",
    "Excellent! Where will your event take place? (city or area)",
    "How many guests are you expecting?",
    "What services do you need for your event? (select all that apply)",
    `Let's talk budget. What's your estimated budget? Current: $${formData.budget}`,
    "Do you have a specific theme or style in mind? (optional)",
    "We're almost done! Could you share your name and contact information?",
    "Perfect! Here's a summary of your event details.",
  ];

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [step, isOpen, typing]);

  // Simulate typing effect for bot messages
  useEffect(() => {
    if (isOpen && step < botMessages.length) {
      setTyping(true);
      const timer = setTimeout(() => {
        setTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen]);

  const handleEventTypeSelect = (type: EventType) => {
    setFormData({ ...formData, eventType: type });
    setStep(1);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, eventDate: date });
      setShowDatePicker(false);
      setStep(2);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.location.trim()) {
      setStep(3);
    } else {
      toast({
        title: "Location required",
        description: "Please enter a location for your event",
        variant: "warning",
      });
    }
  };

  const handleGuestCountSelect = (count: GuestCount) => {
    setFormData({ ...formData, guestCount: count });
    setStep(4);
  };

  const handleServicesSelect = (services: Service[]) => {
    setFormData({ ...formData, services });
    setStep(5);
  };

  const handleBudgetChange = (value: number[]) => {
    setFormData({ ...formData, budget: value[0] });
  };

  const handleBudgetSubmit = () => {
    setStep(6);
  };

  const handleThemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(7);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep(8);
    } else {
      toast({
        title: "Information required",
        description: "Please provide your name and at least an email address",
        variant: "warning",
      });
    }
  };

  const handleSubmitRequest = () => {
    // Here you would typically send the data to your backend
    toast({
      title: "Request Submitted!",
      description: "We'll be in touch with you soon about your event planning.",
      variant: "success",
    });
    setIsOpen(false);
    setStep(0);
    setFormData({
      eventType: null,
      eventDate: null,
      location: '',
      guestCount: null,
      services: [],
      budget: 5000,
      theme: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[450px] h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Event Planning Assistant</h3>
                  <p className="text-xs opacity-75">LetsEventify</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full">
                <X size={18} />
              </button>
            </div>

            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white"
            >
              {/* Render messages for current and previous steps */}
              {Array.from({ length: step + 1 }).map((_, index) => (
                <React.Fragment key={index}>
                  {/* Bot message */}
                  <ChatMessage
                    isBot
                    message={botMessages[index]}
                    isTyping={typing && index === step}
                  />

                  {/* User response for completed steps */}
                  {index < step && (
                    <ChatMessage
                      isBot={false}
                      message={renderUserResponse(index)}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Input area based on current step */}
            <div className="border-t p-4 bg-white">
              {renderInputForStep()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function renderUserResponse(index: number): string {
    switch (index) {
      case 0:
        return `I'm planning a ${formData.eventType}`;
      case 1:
        return formData.eventDate ? `Event date: ${format(formData.eventDate, 'PPP')}` : '';
      case 2:
        return `Location: ${formData.location}`;
      case 3:
        return `Expected guests: ${formData.guestCount}`;
      case 4:
        return `Services needed: ${formData.services.join(', ')}`;
      case 5:
        return `Budget: $${formData.budget}`;
      case 6:
        return formData.theme ? `Theme: ${formData.theme}` : 'No specific theme';
      case 7:
        return `Name: ${formData.name}, Email: ${formData.email}${formData.phone ? `, Phone: ${formData.phone}` : ''}`;
      default:
        return '';
    }
  }

  function renderInputForStep() {
    switch (step) {
      case 0: // Event Type
        return (
          <EventTypeSelector 
            onSelect={handleEventTypeSelect} 
            selected={formData.eventType}
          />
        );
      case 1: // Event Date
        return (
          <div className="space-y-4">
            {showDatePicker ? (
              <Card>
                <CardContent className="p-3">
                  <Calendar
                    mode="single"
                    selected={formData.eventDate || undefined}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col space-y-3">
                {formData.eventDate && (
                  <div className="text-center p-2 bg-gray-100 rounded-md">
                    Selected: {format(formData.eventDate, 'PPP')}
                  </div>
                )}
                <Button 
                  onClick={() => setShowDatePicker(true)}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.eventDate ? 'Change Date' : 'Select Date'}
                </Button>
              </div>
            )}
          </div>
        );
      case 2: // Location
        return (
          <form onSubmit={handleLocationSubmit} className="flex gap-2">
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter city or area"
              className="flex-grow"
            />
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              <ChevronRight size={18} />
            </Button>
          </form>
        );
      case 3: // Guest Count
        return (
          <GuestCountSelector
            onSelect={handleGuestCountSelect}
            selected={formData.guestCount}
          />
        );
      case 4: // Services
        return (
          <ServiceSelector
            onSelect={handleServicesSelect}
            selected={formData.services}
          />
        );
      case 5: // Budget
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Estimated Budget</Label>
                <span className="font-medium text-pink-600">${formData.budget}</span>
              </div>
              <Slider
                defaultValue={[formData.budget]}
                min={1000}
                max={50000}
                step={1000}
                onValueChange={handleBudgetChange}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$1,000</span>
                <span>$50,000+</span>
              </div>
            </div>
            <Button 
              onClick={handleBudgetSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Continue
            </Button>
          </div>
        );
      case 6: // Theme
        return (
          <form onSubmit={handleThemeSubmit} className="space-y-3">
            <Textarea
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              placeholder="Describe your event theme/style (optional)"
              className="resize-none"
            />
            <Button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              {formData.theme ? 'Continue' : 'Skip this step'}
            </Button>
          </form>
        );
      case 7: // Contact Info
        return (
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Continue
            </Button>
          </form>
        );
      case 8: // Summary
        return (
          <ChatbotSummary 
            formData={formData} 
            onSubmit={handleSubmitRequest} 
          />
        );
      default:
        return null;
    }
  }
};

export default ChatbotUI;
