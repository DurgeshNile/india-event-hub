
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormData, Service } from '@/types/chatbot';

interface ChatOptionsProps {
  options: string[];
  formField: keyof FormData;
  formData: FormData;
  isMultiSelect?: boolean;
  onResponse: (response: string, field?: keyof FormData) => void;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({ 
  options, 
  formField, 
  formData, 
  isMultiSelect, 
  onResponse 
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => {
        const isSelected = isMultiSelect && formData.services?.includes(option as Service);
        return (
          <Button
            key={index}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onResponse(option, formField)}
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
          onClick={() => onResponse('continue', formField)}
          className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
          size="sm"
        >
          Continue with {formData.services.length} service(s)
        </Button>
      )}
    </div>
  );
};

export default ChatOptions;
