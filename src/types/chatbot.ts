
export type EventType = 'Wedding' | 'Birthday' | 'Corporate' | 'Other';
export type GuestCount = '<50' | '50-100' | '100-200' | '200+';
export type Service = 'Organizer' | 'Photographer' | 'Venue' | 'Caterer' | 'Decorator' | 'Entertainment';

export interface FormData {
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

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  formField?: keyof FormData;
}

export interface ChatStep {
  message: string;
  options?: string[];
  field: keyof FormData;
  isDateInput?: boolean;
  isTextInput?: boolean;
  isBudgetInput?: boolean;
  multiSelect?: boolean;
  optional?: boolean;
}
