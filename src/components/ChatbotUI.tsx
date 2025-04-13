import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { X, Send, Calendar as CalendarIcon, ChevronRight, MessageSquare, Move } from 'lucide-react';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
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
    "Hello and welcome to LetsEventify! I'm your personal event planning assistant. What type of event are you planning?",
    "Excellent choice! When would you like to hold your event?",
    "Thank you. Where will your event take place? (city or area)",
    "Approximately how many guests are you expecting?",
    "Which services would you require for your event? (select all that apply)",
    `Let's discuss your budget. What's your estimated budget for this event? Current: ₹${formData.budget}`,
    "Do you have a specific theme or style in mind for your event? (optional)",
    "We're almost done! Please share your contact information so our team can get in touch with you.",
    "Thank you for providing all the details. Our team will connect with you shortly to discuss your event requirements.",
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
      description: "Our team will connect with you shortly about your event planning requirements.",
      variant: "success",
    });
    
    // Keep the chatbot open to show the final thank you message
    // Reset after 5 seconds
    setTimeout(() => {
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
    }, 5000);
  };

  function startDrag(event: React.PointerEvent) {
    setIsDragging(true);
    dragControls.start(event);
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: position.x, y: position.y }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onUpdate={(latest) => {
              if (latest.x !== undefined && latest.y !== undefined) {
                setPosition({ x: latest.x as number, y: latest.y as number });
              }
            }}
            className="fixed top-20 right-6 w-[90vw] md:w-[450px] h-[600px] bg-white rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Chat header with drag handle */}
            <div 
              onPointerDown={startDrag}
              className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4 cursor-move"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">Event Planning Assistant</h3>
                  <p className="text-xs opacity-75">LetsEventify</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Move size={16} className="text-white/70" />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="hover:bg-white/10 p-2 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
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
        return `Budget: ₹${formData.budget}`;
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
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
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
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
                <span className="font-medium text-indigo-600">₹{formData.budget}</span>
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
                <span>₹1,000</span>
                <span>₹50,000+</span>
              </div>
            </div>
            <Button 
              onClick={handleBudgetSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700"
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
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Continue
            </Button>
          </form>
        );
      case 8: // Summary and final message
        return (
          <div className="space-y-4">
            <ChatbotSummary 
              formData={formData} 
              onSubmit={handleSubmitRequest} 
            />
            <p className="text-center text-sm text-gray-500 mt-4">
              Our team will connect with you shortly to discuss your event requirements.
            </p>
          </div>
        );
      default:
        return null;
    }
  }
};

export default ChatbotUI;
