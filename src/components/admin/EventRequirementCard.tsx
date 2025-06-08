
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, Mail, Phone, User } from 'lucide-react';

interface EventRequirement {
  id: string;
  event_type: string;
  event_date: string;
  location: string;
  guest_count: string;
  services: string[];
  budget: number;
  theme: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
}

interface EventRequirementCardProps {
  requirement: EventRequirement;
  onStatusUpdate: (id: string, status: string) => void;
}

const EventRequirementCard: React.FC<EventRequirementCardProps> = ({ 
  requirement, 
  onStatusUpdate 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
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
              {requirement.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">
                {requirement.event_date ? format(new Date(requirement.event_date), 'PPP') : 'Not specified'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{requirement.location || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">{requirement.guest_count} guests</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">${requirement.budget?.toLocaleString()}</span>
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
            {requirement.contact_phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href={`tel:${requirement.contact_phone}`} className="text-blue-600 hover:underline">
                  {requirement.contact_phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {requirement.services && requirement.services.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Required Services:</p>
            <div className="flex flex-wrap gap-1">
              {requirement.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {requirement.theme && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Theme/Style:</p>
            <p className="text-sm text-gray-600">{requirement.theme}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {requirement.status === 'pending' && (
            <Button 
              size="sm" 
              onClick={() => onStatusUpdate(requirement.id, 'in_progress')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Start Processing
            </Button>
          )}
          {requirement.status === 'in_progress' && (
            <Button 
              size="sm" 
              onClick={() => onStatusUpdate(requirement.id, 'completed')}
              className="bg-green-500 hover:bg-green-600"
            >
              Mark Complete
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onStatusUpdate(requirement.id, 'cancelled')}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRequirementCard;
