
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Image, Clock, IndianRupee } from "lucide-react";

interface CreateEventTabProps {
  onCreateEvent: (eventData: any) => Promise<void>;
  isLoading: boolean;
}

const CreateEventTab = ({ onCreateEvent, isLoading }: CreateEventTabProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxAttendees: '',
    ticketPrice: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateEvent(formData);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      maxAttendees: '',
      ticketPrice: '',
      image: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Create New Event
        </CardTitle>
        <CardDescription className="text-gray-400">
          Fill in the details to create your new event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Event Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="concert">Concert</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your event"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300">Event Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-300">Event Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-300">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="Enter event location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxAttendees" className="text-gray-300">Max Attendees</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder="Enter max attendees"
                  value={formData.maxAttendees}
                  onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketPrice" className="text-gray-300">Ticket Price (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="ticketPrice"
                  type="number"
                  placeholder="Enter ticket price"
                  value={formData.ticketPrice}
                  onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-300">Event Image URL (Optional)</Label>
            <div className="relative">
              <Image className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="image"
                type="url"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEventTab;
