
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
    image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Caterers",
    icon: Utensils,
    description: "Delicious food and beverage services for your events",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Decorators",
    icon: Brush,
    description: "Transform your venue with beautiful decorations",
    image: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "Musicians",
    icon: Music,
    description: "Live music performers for a memorable experience",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3",
  },
  {
    id: 5,
    name: "Event Planners",
    icon: Sparkles,
    description: "Professional planners to organize your perfect event",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3",
  },
  {
    id: 6,
    name: "Venues",
    icon: MapPin,
    description: "Beautiful locations to host your special events",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3",
  },
  {
    id: 7,
    name: "Wedding Planners",
    icon: UsersRound,
    description: "Specialists in planning your perfect wedding day",
    image: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
  },
  {
    id: 8,
    name: "Invitation Designers",
    icon: PenLine,
    description: "Create beautiful custom invitations for your event",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
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
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3",
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
