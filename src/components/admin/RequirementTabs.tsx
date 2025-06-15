
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import EventRequirementCard from './EventRequirementCard';
import { EventRequirement } from '@/hooks/useEventRequirements';

interface RequirementTabsProps {
  requirements: EventRequirement[];
  onStatusUpdate: (id: string, status: 'pending' | 'processed') => void;
}

const RequirementTabs: React.FC<RequirementTabsProps> = ({
  requirements,
  onStatusUpdate
}) => {
  return (
    <TabsContent value="requirements">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            Event Requirements ({requirements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirements.map((requirement) => (
              <EventRequirementCard
                key={requirement.id}
                requirement={requirement}
                onStatusUpdate={onStatusUpdate}
              />
            ))}
            {requirements.length === 0 && (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Event Requirements</h3>
                <p className="text-gray-500">Event requirements submitted through the chatbot will appear here.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default RequirementTabs;
