
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Star, User, BookOpen, Settings } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [favoriteProviders, setFavoriteProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Fetch user's bookings/registrations
      const { data: registrationsData, error: regError } = await supabase
        .from('registrations')
        .select(`
          *,
          events(*)
        `)
        .eq('user_id', user.id);

      if (regError) throw regError;
      setBookings(registrationsData || []);

      // Fetch favorite service providers (mock data for now)
      // You can implement a favorites system later
      setFavoriteProviders([]);

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <User className="mr-3 h-8 w-8" />
        <h1 className="text-3xl font-bold">My Dashboard</h1>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Event Bookings
              </CardTitle>
              <CardDescription>
                View and manage your event registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading your bookings...</p>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No bookings yet</p>
                  <p className="text-sm text-gray-400">Book an event to see it here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{booking.events?.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="mr-1 h-4 w-4" />
                              {booking.events?.start_date && new Date(booking.events.start_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="mr-1 h-4 w-4" />
                              {booking.events?.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Favorite Providers
              </CardTitle>
              <CardDescription>
                Your saved service providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No favorites yet</p>
                <p className="text-sm text-gray-400">Save providers you like to see them here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <p className="text-gray-700">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Member Since</label>
                  <p className="text-gray-700">
                    {user?.created_at && new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
