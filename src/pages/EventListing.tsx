
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, MapPin, DollarSign, User, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

const EventListing = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, [selectedCategory]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('events').select('*, categories(name)');
      
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setEvents(data || []);
    } catch (error: any) {
      toast({
        title: "Error Fetching Events",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error Fetching Categories",
        description: error.message,
        variant: "error",
      });
    }
  };
  
  const handleBookEvent = async (eventId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an event",
        variant: "warning",
      });
      navigate('/auth', { state: { from: location } });
      return;
    }
    
    setIsBooking(prev => ({ ...prev, [eventId]: true }));
    
    try {
      // Check if user has already registered
      const { data: existingReg, error: checkError } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user?.id);
        
      if (checkError) throw checkError;
      
      if (existingReg && existingReg.length > 0) {
        toast({
          title: "Already Registered",
          description: "You have already registered for this event",
          variant: "warning",
        });
        return;
      }
      
      // Create registration
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            event_id: eventId,
            user_id: user?.id,
            status: 'registered'
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Registration Successful",
        description: "You have successfully registered for this event",
        variant: "success",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "error",
      });
    } finally {
      setIsBooking(prev => ({ ...prev, [eventId]: false }));
    }
  };
  
  const filteredEvents = events.filter(event => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.venue?.toLowerCase().includes(searchLower) ||
      event.location?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Events</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search events by title, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Select 
          value={selectedCategory || 'all'} 
          onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-lg">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium">No events found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm 
              ? "Try adjusting your search terms or filters"
              : "There are no events available at the moment"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              {event.image_url ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{event.title}</h3>
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    {event.categories && (
                      <Badge variant="outline" className="mt-1">
                        {event.categories.name}
                      </Badge>
                    )}
                  </div>
                  {event.price && (
                    <div className="text-right">
                      <span className="inline-flex items-center text-green-600 font-bold">
                        <DollarSign className="h-4 w-4" />
                        {event.price}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="line-clamp-3">{event.description}</p>
                
                <div className="space-y-2">
                  {event.start_date && (
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{format(new Date(event.start_date), 'PPP')}</span>
                    </div>
                  )}
                  
                  {event.venue && (
                    <div className="flex items-center text-gray-500">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => handleBookEvent(event.id)} 
                  disabled={isBooking[event.id]} 
                  className="w-full"
                >
                  {isBooking[event.id] ? "Processing..." : "Register for Event"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;
