import { 
  Camera, 
  Utensils, 
  Brush, 
  Music, 
  Sparkles, 
  MapPin, 
  UsersRound, 
  PenLine, 
  Tent 
} from "lucide-react";

export type ServiceCategory = {
  id: number;
  name: string;
  icon: any;
  description: string;
  image: string;
};

export type ServiceProvider = {
  id: number;
  name: string;
  category: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  image: string;
  featured: boolean;
  verified: boolean;
};

export const categories: ServiceCategory[] = [
  {
    id: 1,
    name: "Photographers",
    icon: Camera,
    description: "Capture your special moments with professional photographers",
    image: "/images/providers/photographer-1.jpg",
  },
  {
    id: 2,
    name: "Caterers",
    icon: Utensils,
    description: "Delicious food and beverage services for your events",
    image: "/images/providers/caterer-1.jpg",
  },
  {
    id: 3,
    name: "Decorators",
    icon: Brush,
    description: "Transform your venue with beautiful decorations",
    image: "/images/providers/decorator-1.jpg",
  },
  {
    id: 4,
    name: "Musicians",
    icon: Music,
    description: "Live music performers for a memorable experience",
    image: "/images/providers/musician-1.jpg",
  },
  {
    id: 5,
    name: "Event Planners",
    icon: Sparkles,
    description: "Professional planners to organize your perfect event",
    image: "/images/gallery/luxury-wedding.jpg",
  },
  {
    id: 6,
    name: "Venues",
    icon: MapPin,
    description: "Beautiful locations to host your special events",
    image: "/images/gallery/corporate-event.jpg",
  },
  {
    id: 7,
    name: "Wedding Planners",
    icon: UsersRound,
    description: "Specialists in planning your perfect wedding day",
    image: "/images/events/indian-wedding-1.jpg",
  },
  {
    id: 8,
    name: "Invitation Designers",
    icon: PenLine,
    description: "Create beautiful custom invitations for your event",
    image: "/images/gallery/traditional-ceremony.jpg",
  },
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "Sharma Photography",
    category: "Photographers",
    location: "Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    rating: 4.8,
    reviewCount: 127,
    image: "/images/providers/photographer-1.jpg",
    featured: true,
    verified: true
  },
  {
    id: 2,
    name: "Taste of India Caterers",
    category: "Caterers",
    location: "Juhu",
    city: "Mumbai",
    state: "Maharashtra",
    rating: 4.7,
    reviewCount: 89,
    image: "/images/providers/caterer-1.jpg",
    featured: true,
    verified: true
  },
  {
    id: 3,
    name: "Royal Decorations",
    category: "Decorators",
    location: "Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    rating: 4.5,
    reviewCount: 76,
    image: "/images/providers/decorator-1.jpg",
    featured: true,
    verified: false
  },
  {
    id: 4,
    name: "Melody Makers",
    category: "Musicians",
    location: "Salt Lake City",
    city: "Kolkata",
    state: "West Bengal",
    rating: 4.9,
    reviewCount: 112,
    image: "/images/providers/musician-1.jpg",
    featured: true,
    verified: true
  },
  {
    id: 5,
    name: "Perfect Day Planners",
    category: "Event Planners",
    location: "Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    rating: 4.6,
    reviewCount: 94,
    image: "/images/gallery/luxury-wedding.jpg",
    featured: false,
    verified: true
  },
  {
    id: 6,
    name: "Grand Palace Venue",
    category: "Venues",
    location: "Alkapuri",
    city: "Vadodara",
    state: "Gujarat",
    rating: 4.7,
    reviewCount: 143,
    image: "/images/gallery/corporate-event.jpg",
    featured: true,
    verified: true
  },
  {
    id: 7,
    name: "Wedding Bells",
    category: "Wedding Planners",
    location: "Aundh",
    city: "Pune",
    state: "Maharashtra",
    rating: 4.8,
    reviewCount: 87,
    image: "/images/events/indian-wedding-1.jpg",
    featured: false,
    verified: true
  },
  {
    id: 8,
    name: "Creative Invites",
    category: "Invitation Designers",
    location: "Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    rating: 4.5,
    reviewCount: 65,
    image: "/images/gallery/traditional-ceremony.jpg",
    featured: false,
    verified: false
  },
];

export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
  "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Vadodara", "Ghaziabad", "Ludhiana", "Agra"
];

export const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
];
