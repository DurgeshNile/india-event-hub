
import React from 'react';

interface ChatbotProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ChatbotProgressBar: React.FC<ChatbotProgressBarProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="px-4 py-2 bg-gray-50">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div 
          className="bg-gradient-to-r from-pink-500 to-purple-600 h-1 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ChatbotProgressBar;
