
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon, Users, Edit, Trash2, Calendar as CalendarIcon2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  image_url?: string;
  registrations?: any[];
}

interface EventCardProps {
  event: Event;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700">
      {event.image_url ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-700 flex items-center justify-center">
          <CalendarIcon2 size={48} className="text-gray-400" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-white">{event.title}</CardTitle>
        <CardDescription className="text-gray-300">
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
        <p className="line-clamp-3 text-gray-200">{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-600 text-gray-200 hover:bg-gray-700"
          onClick={() => onEdit?.(event.id)}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete?.(event.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
