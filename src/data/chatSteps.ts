
import { ChatStep } from '@/types/chatbot';

export const chatSteps: ChatStep[] = [
  {
    message: "Hi! I'm your event planning assistant. What type of event are you planning?",
    options: ['Wedding', 'Birthday', 'Corporate', 'Other'],
    field: 'eventType'
  },
  {
    message: "Great choice! When would you like to host this event?",
    field: 'eventDate',
    isDateInput: true
  },
  {
    message: "Where would you like to host the event?",
    field: 'location',
    isTextInput: true
  },
  {
    message: "How many guests are you expecting?",
    options: ['<50', '50-100', '100-200', '200+'],
    field: 'guestCount'
  },
  {
    message: "What services do you need? (Select all that apply)",
    options: ['Organizer', 'Photographer', 'Venue', 'Caterer', 'Decorator', 'Entertainment'],
    field: 'services',
    multiSelect: true
  },
  {
    message: "What's your estimated budget for this event?",
    field: 'budget',
    isBudgetInput: true
  },
  {
    message: "Do you have any specific theme or style preferences?",
    field: 'theme',
    isTextInput: true
  },
  {
    message: "Great! Now I need your contact details. What's your full name?",
    field: 'name',
    isTextInput: true
  },
  {
    message: "What's your email address?",
    field: 'email',
    isTextInput: true
  },
  {
    message: "Finally, what's your phone number? (Optional)",
    field: 'phone',
    isTextInput: true,
    optional: true
  }
];
