
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, Mail, User, ChevronDown, ChevronUp } from 'lucide-react';
import { EventRequirement } from '@/hooks/useEventRequirements';

interface EventRequirementCardProps {
  requirement: EventRequirement;
  onStatusUpdate: (id: string, status: 'pending' | 'processed') => void;
}

const EventRequirementCard: React.FC<EventRequirementCardProps> = ({ 
  requirement, 
  onStatusUpdate 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

        {/* Summary View */}
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

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-center mb-4 text-gray-600 hover:text-gray-900"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Show All Details
            </>
          )}
        </Button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Complete Event Requirements</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Name:</label>
                    <p className="text-sm text-gray-900">{requirement.contact_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contact Email:</label>
                    <p className="text-sm text-gray-900">{requirement.contact_email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Event Type:</label>
                    <p className="text-sm text-gray-900">{requirement.event_type}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Event Date:</label>
                    <p className="text-sm text-gray-900">{requirement.event_date}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location:</label>
                    <p className="text-sm text-gray-900">{requirement.location}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Guest Count:</label>
                    <p className="text-sm text-gray-900">{requirement.guest_count} guests</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Budget:</label>
                    <p className="text-sm text-gray-900">₹{requirement.budget?.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <Badge className={`${getStatusColor(requirement.status)} text-white text-xs`}>
                      {requirement.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {requirement.description && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">Detailed Description:</label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-white border rounded">{requirement.description}</p>
                </div>
              )}
              
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <label className="font-medium">User ID:</label>
                  <p className="font-mono">{requirement.user_id}</p>
                </div>
                <div>
                  <label className="font-medium">Submission ID:</label>
                  <p className="font-mono">{requirement.id}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
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
