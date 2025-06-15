
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, Mail, User, ChevronDown, ChevronUp, Phone, Globe, Clock } from 'lucide-react';
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

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle clicked, current state:', isExpanded);
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div onClick={handleCardClick}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                {requirement.event_type} Event
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
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
                <a href={`mailto:${requirement.contact_email}`} className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                  {requirement.contact_email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Complete Event Requirements
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact Information</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.contact_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.contact_email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Event Details</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.event_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.event_date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Venue & Logistics</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{requirement.guest_count} guests</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Budget & Status</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">₹{requirement.budget?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(requirement.status)} text-white text-xs`}>
                          {requirement.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {requirement.description && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Detailed Description</label>
                  <p className="text-gray-900 mt-2 leading-relaxed">{requirement.description}</p>
                </div>
              )}
              
              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">System Information</label>
                <div className="mt-2 grid md:grid-cols-3 gap-4 text-xs text-gray-500">
                  <div>
                    <label className="font-medium block">User ID:</label>
                    <p className="font-mono text-gray-700 break-all">{requirement.user_id}</p>
                  </div>
                  <div>
                    <label className="font-medium block">Submission ID:</label>
                    <p className="font-mono text-gray-700 break-all">{requirement.id}</p>
                  </div>
                  <div>
                    <label className="font-medium block">Created At:</label>
                    <p className="font-mono text-gray-700">{format(new Date(requirement.created_at), 'PPpp')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t mt-4">
          {requirement.status === 'pending' && (
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onStatusUpdate(requirement.id, 'processed');
              }}
              className="bg-green-500 hover:bg-green-600"
            >
              Mark as Processed
            </Button>
          )}
          <Button 
            variant="outline"
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              window.open(`mailto:${requirement.contact_email}?subject=Regarding your ${requirement.event_type} event request`);
            }}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Mail className="h-4 w-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRequirementCard;
