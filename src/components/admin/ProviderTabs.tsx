
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle } from 'lucide-react';
import ExpandableProviderCard from './ExpandableProviderCard';

interface Provider {
  id: string;
  business_name?: string;
  name?: string;
  email: string;
  service_type?: string;
  phone?: string;
  website?: string;
  location?: string;
  city?: string;
  description?: string;
  price_range?: string;
  rating?: number;
  review_count?: number;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ProviderTabsProps {
  pendingProviders: Provider[];
  approvedProviders: Provider[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ProviderTabs: React.FC<ProviderTabsProps> = ({
  pendingProviders,
  approvedProviders,
  onApprove,
  onReject
}) => {
  return (
    <TabsContent value="providers" className="space-y-6">
      <div className="grid gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-100">
              <Clock className="h-5 w-5 text-orange-500" />
              Pending Providers ({pendingProviders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingProviders.map((provider) => (
                <ExpandableProviderCard
                  key={provider.id}
                  provider={provider}
                  onApprove={onApprove}
                  onReject={onReject}
                  isPending={true}
                />
              ))}
              {pendingProviders.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-100 mb-2">No Pending Providers</h3>
                  <p className="text-gray-300">All provider applications have been processed.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-100">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Approved Providers ({approvedProviders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvedProviders.map((provider) => (
                <ExpandableProviderCard
                  key={provider.id}
                  provider={provider}
                  isPending={false}
                />
              ))}
              {approvedProviders.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-100 mb-2">No Approved Providers</h3>
                  <p className="text-gray-300">Approved providers will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default ProviderTabs;
