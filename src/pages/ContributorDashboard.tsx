
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  Award,
  Camera,
  MessageSquare,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsTab from '@/components/dashboard/EventsTab';
import CreateEventTab from '@/components/dashboard/CreateEventTab';
import RegistrationsTab from '@/components/dashboard/RegistrationsTab';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_date: string;
  location: string;
  attendees: number;
  status: string;
  image: string;
}

interface Registration {
  id: string;
  eventTitle: string;
  clientName: string;
  date: string;
  status: string;
  amount: string;
  created_at: string;
}

const ContributorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - in a real app, this would come from your backend
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Summer Music Festival",
      description: "A vibrant summer music festival with amazing artists",
      date: "2024-07-15",
      start_date: "2024-07-15T18:00:00Z",
      location: "Central Park, Mumbai",
      attendees: 150,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3"
    },
    {
      id: "2",
      title: "Tech Conference 2024",
      description: "Annual technology conference showcasing latest innovations",
      date: "2024-06-20",
      start_date: "2024-06-20T09:00:00Z",
      location: "Convention Center, Bangalore",
      attendees: 300,
      status: "ongoing",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3"
    }
  ]);

  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: "1",
      eventTitle: "Wedding Photography Package",
      clientName: "Priya & Rahul",
      date: "2024-06-25",
      status: "confirmed",
      amount: "₹25,000",
      created_at: "2024-06-01T10:00:00Z"
    },
    {
      id: "2",
      eventTitle: "Corporate Event Coverage",
      clientName: "Tech Solutions Ltd",
      date: "2024-07-10",
      status: "pending",
      amount: "₹15,000",
      created_at: "2024-06-05T14:00:00Z"
    }
  ]);

  const stats = {
    totalEvents: events.length,
    totalAttendees: events.reduce((sum, event) => sum + event.attendees, 0),
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    rating: 4.8,
    totalEarnings: "₹1,25,000"
  };

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    toast({
      title: "Tab Changed",
      description: `Navigated to ${tab} tab.`,
    });
  };

  const handleEventUpdate = (eventId: string, updatedEvent: Event) => {
    setEvents(events.map(event => event.id === eventId ? updatedEvent : event));
    toast({
      title: "Event Updated",
      description: `${updatedEvent.title} has been updated successfully.`,
    });
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been deleted successfully.",
      variant: "error",
    });
  };

  const handleRegistrationUpdate = (registrationId: string, updatedRegistration: Registration) => {
    setRegistrations(registrations.map(reg => reg.id === registrationId ? updatedRegistration : reg));
    toast({
      title: "Registration Updated",
      description: `Registration for ${updatedRegistration.eventTitle} has been updated.`,
    });
  };

  const handleRegistrationDelete = (registrationId: string) => {
    setRegistrations(registrations.filter(reg => reg.id !== registrationId));
    toast({
      title: "Registration Deleted",
      description: "Registration has been deleted successfully.",
      variant: "error",
    });
  };

  const handleCreateEvent = async (eventData: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEvent: Event = {
        id: (events.length + 1).toString(),
        title: eventData.title,
        description: eventData.description || "Event description",
        date: eventData.date,
        start_date: `${eventData.date}T${eventData.time || '10:00'}:00Z`,
        location: eventData.location,
        attendees: 0,
        status: 'upcoming',
        image: eventData.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3"
      };
      
      setEvents([...events, newEvent]);
      
      toast({
        title: "Event Created Successfully!",
        description: `${eventData.title} has been added to your events.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.email?.split('@')[0] || 'Contributor'}!
              </h1>
              <p className="text-gray-300">
                Manage your events and grow your business with LetsEventify
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Events</p>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-none text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Attendees</p>
                    <p className="text-2xl font-bold">{stats.totalAttendees}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-none text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Upcoming Events</p>
                    <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-none text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Rating</p>
                    <p className="text-2xl font-bold">{stats.rating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-600 to-pink-700 border-none text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Total Earnings</p>
                    <p className="text-2xl font-bold">{stats.totalEarnings}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-pink-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-pink-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-pink-600">
              My Events
            </TabsTrigger>
            <TabsTrigger value="create" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-pink-600">
              Create Event
            </TabsTrigger>
            <TabsTrigger value="registrations" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-pink-600">
              Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your latest event activities and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: CheckCircle, text: "Event 'Summer Music Festival' was approved", time: "2 hours ago", color: "text-green-400" },
                      { icon: Users, text: "25 new attendees registered for Tech Conference", time: "5 hours ago", color: "text-blue-400" },
                      { icon: MessageSquare, text: "New review received for Wedding Photography", time: "1 day ago", color: "text-purple-400" },
                      { icon: Camera, text: "Photos uploaded for Corporate Event", time: "2 days ago", color: "text-pink-400" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700">
                        <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-gray-200 text-sm">{activity.text}</p>
                          <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={() => setActiveTab("create")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Create New Event
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Manage Reviews
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <EventsTab 
              events={events} 
              isLoading={isLoading}
              onEditEvent={handleEventUpdate}
              onDeleteEvent={handleEventDelete}
            />
          </TabsContent>

          <TabsContent value="create">
            <CreateEventTab onCreateEvent={handleCreateEvent} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsTab 
              registrations={registrations} 
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContributorDashboard;
