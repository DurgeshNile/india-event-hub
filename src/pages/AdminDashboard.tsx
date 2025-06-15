
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, Mail } from 'lucide-react';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import { useEventRequirements } from '@/hooks/useEventRequirements';
import StatCards from '@/components/admin/StatCards';
import ProviderTabs from '@/components/admin/ProviderTabs';
import RequirementTabs from '@/components/admin/RequirementTabs';

const AdminDashboard: React.FC = () => {
  const { 
    pendingProviders, 
    approvedProviders, 
    loading: providersLoading,
    approveProvider,
    rejectProvider 
  } = useAdminProviders();

  const { 
    requirements, 
    loading: requirementsLoading,
    updateStatus 
  } = useEventRequirements();

  if (providersLoading || requirementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <StatCards
          pendingProvidersCount={pendingProviders.length}
          approvedProvidersCount={approvedProviders.length}
          requirementsCount={requirements.length}
          totalUsersCount={pendingProviders.length + approvedProviders.length}
        />

        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
            <TabsTrigger value="providers" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              <Users className="h-4 w-4" />
              Service Providers
              {pendingProviders.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-orange-600 text-orange-100">
                  {pendingProviders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">
              <Mail className="h-4 w-4" />
              Event Requirements
              {requirements.filter(r => r.status === 'pending').length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-600 text-blue-100">
                  {requirements.filter(r => r.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <ProviderTabs
            pendingProviders={pendingProviders}
            approvedProviders={approvedProviders}
            onApprove={approveProvider}
            onReject={rejectProvider}
          />

          <RequirementTabs
            requirements={requirements}
            onStatusUpdate={updateStatus}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
