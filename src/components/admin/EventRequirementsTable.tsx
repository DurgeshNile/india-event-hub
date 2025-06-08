
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useEventRequirements } from '@/hooks/useEventRequirements';
import EventRequirementCard from './EventRequirementCard';

const EventRequirementsTable: React.FC = () => {
  const { requirements, loading, updateStatus } = useEventRequirements();

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
              <EventRequirementCard
                key={req.id}
                requirement={req}
                onStatusUpdate={updateStatus}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRequirementsTable;
