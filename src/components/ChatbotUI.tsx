
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, MapPin, Calendar, Users, Camera, Utensils, Music } from "lucide-react"

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
}

const getBotResponse = (message: string): { content: string; options?: string[] } => {
  message = message.toLowerCase();
  
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message === "start") {
    return {
      content: "Hello! I'm your event planning assistant. How can I help you today?",
      options: [
        "Find service providers",
        "Plan an event",
        "Get pricing information",
        "Browse categories",
        "Contact support"
      ]
    };
  } else if (message.includes("find") || message.includes("service") || message.includes("provider")) {
    return {
      content: "I can help you find the perfect service providers! What type of service are you looking for?",
      options: [
        "Photography",
        "Catering",
        "Music & Entertainment",
        "Decoration",
        "Venue",
        "View all categories"
      ]
    };
  } else if (message.includes("plan") || message.includes("event")) {
    return {
      content: "Great! Let's plan your event. What type of event are you organizing?",
      options: [
        "Wedding",
        "Birthday Party",
        "Corporate Event",
        "Festival",
        "Conference",
        "Other"
      ]
    };
  } else if (message.includes("pricing") || message.includes("cost") || message.includes("budget")) {
    return {
      content: "I can help you understand pricing. What's your budget range?",
      options: [
        "Under ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000 - ₹5,00,000",
        "Above ₹5,00,000",
        "Get custom quote"
      ]
    };
  } else if (message.includes("photography")) {
    return {
      content: "Excellent choice! We have many talented photographers. What style are you looking for?",
      options: [
        "Wedding Photography",
        "Portrait Photography",
        "Event Photography",
        "Commercial Photography",
        "Browse all photographers"
      ]
    };
  } else if (message.includes("catering")) {
    return {
      content: "We work with amazing caterers! What type of cuisine interests you?",
      options: [
        "Indian Cuisine",
        "Continental",
        "Chinese",
        "Italian",
        "Multi-cuisine",
        "View all caterers"
      ]
    };
  } else if (message.includes("music") || message.includes("entertainment")) {
    return {
      content: "Let's make your event memorable! What kind of entertainment do you need?",
      options: [
        "Live Band",
        "DJ Services",
        "Classical Music",
        "Folk Performers",
        "Dance Performers",
        "Browse all"
      ]
    };
  } else if (message.includes("contact") || message.includes("support")) {
    return {
      content: "You can reach our support team:",
      options: [
        "Call: +91-9876543210",
        "Email: support@letseventify.com",
        "Live Chat",
        "WhatsApp Support",
        "Back to main menu"
      ]
    };
  } else if (message.includes("categories") || message.includes("browse")) {
    return {
      content: "Here are all our service categories:",
      options: [
        "Photography",
        "Catering",
        "Decoration",
        "Music & Entertainment",
        "Venue",
        "Planning Services"
      ]
    };
  } else {
    return {
      content: "I'm here to help with your event planning needs! Try asking about:",
      options: [
        "Find service providers",
        "Plan an event",
        "Get pricing information",
        "Browse categories",
        "Contact support"
      ]
    };
  }
};

const ChatbotUI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '0',
        type: 'bot',
        content: "Welcome to LetsEventify! I'm here to help you plan your perfect event.",
        timestamp: new Date(),
        options: [
          "Find service providers",
          "Plan an event",
          "Get pricing information",
          "Browse categories",
          "Contact support"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (messageText?: string) => {
    const messageToSend = messageText || inputMessage.trim();
    if (messageToSend) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: messageToSend,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      
      setTimeout(() => {
        const response = getBotResponse(messageToSend);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.content,
          timestamp: new Date(),
          options: response.options
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-indigo-600 hover:bg-indigo-700 shadow-lg"
        >
          <Users className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 rounded-lg shadow-xl overflow-hidden bg-white border">
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h5 className="font-semibold">Event Planning Assistant</h5>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-indigo-700"
        >
          ×
        </Button>
      </div>
      
      <div className="h-80 p-4 overflow-y-auto bg-gray-50" ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'bot' && (
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-800 border'
              }`}>
                {message.content}
              </div>
              {message.type === 'user' && (
                <Avatar className="w-8 h-8 ml-2">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/8888607?v=4" />
                </Avatar>
              )}
            </div>
            
            {message.type === 'bot' && message.options && (
              <div className="mt-2 ml-10 space-y-1">
                {message.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    className="block w-full text-left text-sm hover:bg-indigo-50"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={() => handleSendMessage()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
