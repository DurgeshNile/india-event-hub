
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Plus, Edit, Trash2, Users, Calendar as CalendarIcon2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ContributorDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    venue: '',
    location: '',
    price: '',
    image_url: '',
  });
  
  useEffect(() => {
    if (userType !== 'contributor' && userType !== 'admin') {
      navigate('/');
      toast({
        title: "Unauthorized Access",
        description: "You need to be a contributor to access this page.",
        variant: "destructive",
      });
    } else {
      fetchEvents();
      fetchCategories();
    }
  }, [userType, navigate]);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('events')
        .select('*, registrations(*)')
        .eq('organizer_id', user.id);
        
      if (error) throw error;
      
      setEvents(data || []);
      
      // Fetch all registrations for the events
      const eventIds = data?.map(event => event.id) || [];
      if (eventIds.length > 0) {
        const { data: regsData, error: regsError } = await supabase
          .from('registrations')
          .select('*, profiles(first_name, last_name)')
          .in('event_id', eventIds);
          
        if (regsError) throw regsError;
        
        setRegistrations(regsData || []);
      }
      
    } catch (error: any) {
      toast({
        title: "Error Fetching Events",
        description: error.message,
        variant: "destructive",
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
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error("You must be logged in to create an event");
      }
      
      if (!date) {
        throw new Error("Event date is required");
      }
      
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
        
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            category_id: formData.category_id || null,
            venue: formData.venue,
            location: formData.location,
            price: formData.price ? parseFloat(formData.price) : null,
            image_url: formData.image_url,
            start_date: date.toISOString(),
            end_date: endDate ? endDate.toISOString() : null,
            organizer_id: user.id,
            slug,
          }
        ])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
        variant: "success",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category_id: '',
        venue: '',
        location: '',
        price: '',
        image_url: '',
      });
      setDate(undefined);
      setEndDate(undefined);
      
      // Refresh events list
      fetchEvents();
      
    } catch (error: any) {
      toast({
        title: "Error Creating Event",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contributor Dashboard</h1>
      
      <Tabs defaultValue="events">
        <TabsList className="mb-6">
          <TabsTrigger value="events">Your Events</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p>Loading your events...</p>
            ) : events.length === 0 ? (
              <div className="col-span-full">
                <Alert>
                  <AlertTitle>No events found</AlertTitle>
                  <AlertDescription>
                    You haven't created any events yet. Switch to the "Create Event" tab to get started.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              events.map((event) => (
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
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <CalendarIcon2 size={48} className="text-gray-400" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {event.start_date && (
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>{format(new Date(event.start_date), 'PPP')}</span>
                        </div>
                      )}
                      <div className="flex items-center mt-1">
                        <Users className="mr-2 h-4 w-4" />
                        <span>{(event.registrations || []).length} registrations</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>
                Fill out the form below to create a new event
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select 
                      value={formData.category_id} 
                      onValueChange={(value) => handleSelectChange('category_id', value)}
                    >
                      <SelectTrigger id="category_id">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Input 
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Event venue"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input 
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Event price (optional)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input 
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      placeholder="URL of event image"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>Event Registrations</CardTitle>
              <CardDescription>
                View and manage registrations for your events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading registrations...</p>
              ) : registrations.length === 0 ? (
                <Alert>
                  <AlertTitle>No registrations yet</AlertTitle>
                  <AlertDescription>
                    No one has registered for your events yet.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="divide-y">
                  {registrations.map((reg) => (
                    <div key={reg.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {reg.profiles?.first_name} {reg.profiles?.last_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Registered on {format(new Date(reg.created_at), 'PPP')}
                          </p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {reg.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContributorDashboard;
