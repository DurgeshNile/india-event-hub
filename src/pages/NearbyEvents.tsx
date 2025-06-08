
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationSearchForm from '@/components/LocationSearchForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeEvents } from '@/hooks/useRealtimeEvents';

interface SearchParams {
  category: string;
  location: string;
  city: string;
  radius: string;
}

const NearbyEvents = () => {
  const { events: realtimeEvents, loading: realtimeLoading } = useRealtimeEvents();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bookingStates, setBookingStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const searchEvents = async (params: SearchParams) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('events')
        .select('*, categories(name)')
        .gte('start_date', new Date().toISOString());

      // Filter by location if provided
      if (params.location) {
        query = query.or(
          `location.ilike.%${params.location}%,venue.ilike.%${params.location}%`
        );
      }

      const { data, error } = await query
        .order('start_date', { ascending: true })
        .limit(20);

      if (error) throw error;

      setSearchResults(data || []);
      setHasSearched(true);
    } catch (error: any) {
      console.error('Error searching events:', error);
      toast({
        title: "Error",
        description: "Failed to search events",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = async (eventId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an event",
        variant: "default",
      });
      return;
    }

    setBookingStates(prev => ({ ...prev, [eventId]: true }));

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
          variant: "default",
        });
        return;
      }
      
      // Create registration
      const { error } = await supabase
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
        title: "Registration Successful!",
        description: "You have successfully registered for this event",
      });
      
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "default",
      });
    } finally {
      setBookingStates(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const displayEvents = hasSearched ? searchResults : realtimeEvents;
  const displayLoading = hasSearched ? loading : realtimeLoading;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-4xl font-bold mb-4 text-white">Discover Events Near You</h1>
              <p className="text-xl text-purple-100">
                Find exciting events happening in your area - workshops, conferences, festivals, and more
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-100">Live updates enabled</span>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <LocationSearchForm onSearch={searchEvents} />
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {displayLoading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-lg text-gray-900">Loading events...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {hasSearched ? `Search Results (${displayEvents.length} events found)` : `Live Events (${displayEvents.length})`}
                  </h2>
                  {!hasSearched && (
                    <Badge variant="outline" className="ml-2 border-green-500 text-green-600">
                      Real-time
                    </Badge>
                  )}
                </div>
                
                {displayEvents.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="max-w-md mx-auto">
                      <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2 text-gray-900">
                        {hasSearched ? "No events found" : "No events available"}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {hasSearched 
                          ? "Try adjusting your search criteria or location"
                          : "New events will appear here automatically"
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
                        {event.image_url ? (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title} 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                            <h3 className="text-white text-xl font-bold text-center px-4">{event.title}</h3>
                          </div>
                        )}
                        
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="line-clamp-2 mb-2 text-gray-900">{event.title}</CardTitle>
                              <div className="flex gap-2 flex-wrap">
                                {event.categories && (
                                  <Badge variant="outline" className="text-gray-700">
                                    {event.categories.name}
                                  </Badge>
                                )}
                                {event.is_featured && (
                                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                    Featured
                                  </Badge>
                                )}
                              </div>
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
                          <p className="line-clamp-3 text-gray-600">{event.description}</p>
                          
                          <div className="space-y-2">
                            {event.start_date && (
                              <div className="flex items-center text-gray-500">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span className="text-sm">
                                  {format(new Date(event.start_date), 'PPP')}
                                  {event.end_date && event.start_date !== event.end_date && (
                                    <> - {format(new Date(event.end_date), 'PPP')}</>
                                  )}
                                </span>
                              </div>
                            )}
                            
                            {event.venue && (
                              <div className="flex items-center text-gray-500">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="text-sm">{event.venue}</span>
                              </div>
                            )}

                            {event.location && event.location !== event.venue && (
                              <div className="flex items-center text-gray-500">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        
                        <CardFooter>
                          <Button 
                            onClick={() => handleBookEvent(event.id)} 
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                            disabled={bookingStates[event.id]}
                          >
                            {bookingStates[event.id] ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Booking...
                              </>
                            ) : (
                              <>
                                <Users className="mr-2 h-4 w-4" />
                                Register for Event
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NearbyEvents;
