
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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

const EventRequirementsTable: React.FC = () => {
  const [requirements, setRequirements] = useState<EventRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    try {
      const { data, error } = await supabase
        .from('event_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequirements(data || []);
    } catch (error: any) {
      console.error('Error loading requirements:', error);
      toast({
        title: "Error",
        description: "Failed to load event requirements",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('event_requirements')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setRequirements(prev => 
        prev.map(req => req.id === id ? { ...req, status } : req)
      );

      toast({
        title: "Status Updated",
        description: `Requirement status changed to ${status}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "default",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading event requirements...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Event Requirements ({requirements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {requirements.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Requirements Yet</h3>
            <p className="text-gray-500">Event requirements will appear here when users submit them through the chatbot.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requirements.map((req) => (
              <Card key={req.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {req.event_type} Event
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted {format(new Date(req.created_at), 'PPP')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(req.status)} text-white`}>
                        {req.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {req.event_date ? format(new Date(req.event_date), 'PPP') : 'Not specified'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{req.location || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{req.guest_count} guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">${req.budget?.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">{req.contact_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${req.contact_email}`} className="text-blue-600 hover:underline">
                          {req.contact_email}
                        </a>
                      </div>
                      {req.contact_phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a href={`tel:${req.contact_phone}`} className="text-blue-600 hover:underline">
                            {req.contact_phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {req.services && req.services.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Required Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {req.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {req.theme && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700">Theme/Style:</p>
                      <p className="text-sm text-gray-600">{req.theme}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {req.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateStatus(req.id, 'in_progress')}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Start Processing
                      </Button>
                    )}
                    {req.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        onClick={() => updateStatus(req.id, 'completed')}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateStatus(req.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRequirementsTable;
