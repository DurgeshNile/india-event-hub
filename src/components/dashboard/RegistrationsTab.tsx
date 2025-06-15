
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from 'date-fns';

interface Registration {
  id: string;
  created_at: string;
  status: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

interface RegistrationsTabProps {
  registrations: Registration[];
  isLoading: boolean;
}

const RegistrationsTab: React.FC<RegistrationsTabProps> = ({ 
  registrations, 
  isLoading 
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Event Registrations</CardTitle>
        <CardDescription className="text-gray-300">
          View and manage registrations for your events
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-300">Loading registrations...</p>
        ) : registrations.length === 0 ? (
          <Alert className="bg-gray-700 border-gray-600">
            <AlertTitle className="text-white">No registrations yet</AlertTitle>
            <AlertDescription className="text-gray-300">
              No one has registered for your events yet.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="divide-y divide-gray-700">
            {registrations.map((reg) => (
              <div key={reg.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">
                      {reg.profiles?.first_name} {reg.profiles?.last_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      Registered on {format(new Date(reg.created_at), 'PPP')}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {reg.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationsTab;
