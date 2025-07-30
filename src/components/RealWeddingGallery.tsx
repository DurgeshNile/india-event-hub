import React, { useState } from 'react';
import { Heart, Eye, Share2, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WeddingStory {
  id: string;
  title: string;
  couple: string;
  location: string;
  date: string;
  guestCount: number;
  budget: string;
  coverImage: string;
  images: string[];
  description: string;
  tags: string[];
  likes: number;
  views: number;
  featured: boolean;
}

const weddingStories: WeddingStory[] = [
  {
    id: '1',
    title: 'A Dreamy Beach Wedding in Goa',
    couple: 'Priya & Arjun',
    location: 'Goa, India',
    date: 'March 2024',
    guestCount: 150,
    budget: '₹8-12 Lakhs',
    coverImage: 'https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3'
    ],
    description: 'A magical sunset ceremony with ocean views and traditional elements',
    tags: ['Beach Wedding', 'Destination', 'Outdoor'],
    likes: 234,
    views: 1560,
    featured: true
  },
  {
    id: '2',
    title: 'Royal Palace Wedding in Rajasthan',
    couple: 'Kavya & Rohan',
    location: 'Udaipur, Rajasthan',
    date: 'February 2024',
    guestCount: 300,
    budget: '₹15-20 Lakhs',
    coverImage: 'https://images.unsplash.com/photo-1583039979082-9e5b51fa8e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583039979082-9e5b51fa8e46?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1594736797933-d0a9c3d3b4b3?ixlib=rb-4.0.3'
    ],
    description: 'A grand celebration in the heritage palace with traditional Rajasthani decor',
    tags: ['Palace Wedding', 'Traditional', 'Luxury'],
    likes: 456,
    views: 2340,
    featured: true
  },
  {
    id: '3',
    title: 'Intimate Garden Wedding in Kerala',
    couple: 'Meera & Arun',
    location: 'Kochi, Kerala',
    date: 'January 2024',
    guestCount: 80,
    budget: '₹5-8 Lakhs',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3'
    ],
    description: 'A beautiful ceremony surrounded by lush greenery and traditional Kerala elements',
    tags: ['Garden Wedding', 'Intimate', 'Traditional'],
    likes: 189,
    views: 987,
    featured: false
  },
  {
    id: '4',
    title: 'Modern City Wedding in Mumbai',
    couple: 'Ananya & Karan',
    location: 'Mumbai, Maharashtra',
    date: 'April 2024',
    guestCount: 200,
    budget: '₹12-15 Lakhs',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3'
    ],
    description: 'A chic rooftop celebration with city skyline views and contemporary decor',
    tags: ['Rooftop Wedding', 'Modern', 'City'],
    likes: 312,
    views: 1890,
    featured: false
  }
];

const RealWeddingGallery = () => {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId);
      } else {
        newLiked.add(storyId);
      }
      return newLiked;
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Wedding Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by real couples and their beautiful wedding celebrations across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {weddingStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-gray-200">
              <div className="relative">
                <img 
                  src={story.coverImage} 
                  alt={story.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {story.featured && (
                  <Badge className="absolute top-4 left-4 bg-pink-500 text-white">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white p-2"
                    onClick={() => handleLike(story.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedStories.has(story.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white p-2"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {story.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-pink-200 text-pink-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {story.title}
                </h3>
                
                <p className="text-lg text-pink-600 font-medium mb-2">{story.couple}</p>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{story.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{story.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{story.guestCount} guests</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    {story.budget}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{story.views}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-pink-600 border-pink-200 hover:bg-pink-50">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
            View All Wedding Stories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RealWeddingGallery;