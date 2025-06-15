
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface CreateEventTabProps {
  categories: Category[];
  onSubmit: (formData: any, date: Date | undefined, endDate: Date | undefined) => Promise<void>;
  isSubmitting: boolean;
}

const CreateEventTab: React.FC<CreateEventTabProps> = ({ 
  categories, 
  onSubmit, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    venue: '',
    location: '',
    price: '',
    image_url: '',
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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
    await onSubmit(formData, date, endDate);
    
    // Reset form after successful submission
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
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Create New Event</CardTitle>
        <CardDescription className="text-gray-300">
          Fill out the form below to create a new event
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Event Title</Label>
            <Input 
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea 
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your event"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category_id" className="text-white">Category</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => handleSelectChange('category_id', value)}
              >
                <SelectTrigger id="category_id" className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="text-white">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
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
              <Label htmlFor="venue" className="text-white">Venue</Label>
              <Input 
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Event venue"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price</Label>
              <Input 
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Event price (optional)"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image_url" className="text-white">Image URL</Label>
              <Input 
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="URL of event image"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
  );
};

export default CreateEventTab;
