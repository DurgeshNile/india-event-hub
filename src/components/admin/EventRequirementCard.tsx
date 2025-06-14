
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, Mail, User } from 'lucide-react';
import { EventRequirement } from '@/hooks/useEventRequirements';

interface EventRequirementCardProps {
  requirement: EventRequirement;
  onStatusUpdate: (id: string, status: 'pending' | 'processed') => void;
}

const EventRequirementCard: React.FC<EventRequirementCardProps> = ({ 
  requirement, 
  onStatusUpdate 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {requirement.event_type} Event
            </h3>
            <p className="text-sm text-gray-500">
              Submitted {format(new Date(requirement.created_at), 'PPP')}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={`${getStatusColor(requirement.status)} text-white`}>
              {requirement.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">
                {requirement.event_date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{requirement.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{requirement.guest_count} guests</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">₹{requirement.budget?.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{requirement.contact_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              <a href={`mailto:${requirement.contact_email}`} className="text-blue-600 hover:underline">
                {requirement.contact_email}
              </a>
            </div>
          </div>
        </div>

        {requirement.description && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
            <p className="text-sm text-gray-600">{requirement.description}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {requirement.status === 'pending' && (
            <Button 
              size="sm" 
              onClick={() => onStatusUpdate(requirement.id, 'processed')}
              className="bg-green-500 hover:bg-green-600"
            >
              Mark as Processed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRequirementCard;
