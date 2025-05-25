import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const getBotResponse = (message: string): string => {
  message = message.toLowerCase();
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "Hello there! How can I assist you today?";
  } else if (message.includes("how are you")) {
    return "I am doing well, thank you for asking! How can I help you?";
  } else if (message.includes("services") || message.includes("what do you offer")) {
    return "We offer a variety of services including event planning, catering, photography, and venue selection.";
  } else if (message.includes("pricing") || message.includes("cost")) {
    return "Our pricing varies depending on the service and specific requirements. Please provide more details so I can give you an accurate estimate.";
  } else if (message.includes("contact") || message.includes("reach you")) {
    return "You can contact us via email at support@example.com or call us at 555-1234.";
  } else {
    return "I'm sorry, I didn't understand your question. Please ask something else!";
  }
};

const ChatbotUI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on message change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: getBotResponse(inputMessage),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4 w-96 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="bg-india-blue text-white p-4">
        <h5 className="font-semibold">Event Planner Chatbot</h5>
      </div>
      <div className="h-80 p-4 overflow-y-auto" ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' && (
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            )}
            <div className={`rounded-lg p-2 ${message.type === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
              {message.content}
            </div>
            {message.type === 'user' && (
              <Avatar className="w-8 h-8 ml-2">
                <AvatarImage src="https://avatars.githubusercontent.com/u/8888607?v=4" />
              </Avatar>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            className="flex-grow mr-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}><Send className="h-4 w-4 mr-2" />Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
