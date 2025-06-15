
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EventCard from './EventCard';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  image_url?: string;
  registrations?: any[];
}

interface EventsTabProps {
  events: Event[];
  isLoading: boolean;
  onEditEvent?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

const EventsTab: React.FC<EventsTabProps> = ({ 
  events, 
  isLoading, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  if (isLoading) {
    return <p className="text-gray-300">Loading your events...</p>;
  }

  if (events.length === 0) {
    return (
      <div className="col-span-full">
        <Alert className="bg-gray-800 border-gray-700">
          <AlertTitle className="text-white">No events found</AlertTitle>
          <AlertDescription className="text-gray-300">
            You haven't created any events yet. Switch to the "Create Event" tab to get started.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      ))}
    </div>
  );
};

export default EventsTab;
