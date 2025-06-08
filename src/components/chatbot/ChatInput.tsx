
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { ChatStep } from '@/types/chatbot';

interface ChatInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
  currentStep: ChatStep;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  inputMessage, 
  onInputChange, 
  onSubmit, 
  onSkip, 
  currentStep 
}) => {
  const { isDateInput, isBudgetInput, isTextInput, optional } = currentStep;

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={onSubmit} className="flex items-center space-x-2">
        <Input
          type={isDateInput ? "date" : isBudgetInput ? "number" : "text"}
          placeholder={
            isDateInput ? "Select date" : 
            isBudgetInput ? "Enter budget amount" : 
            optional ? "Enter your response (optional)" : "Enter your response"
          }
          value={inputMessage}
          onChange={(e) => onInputChange(e.target.value)}
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
      
      {optional && (
        <Button
          onClick={onSkip}
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-gray-500 hover:text-gray-700"
        >
          Skip this step
        </Button>
      )}
    </div>
  );
};

export default ChatInput;
