
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <StatCards
          pendingProvidersCount={pendingProviders.length}
          approvedProvidersCount={approvedProviders.length}
          requirementsCount={requirements.length}
          totalUsersCount={pendingProviders.length + approvedProviders.length}
        />

        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="providers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Service Providers
              {pendingProviders.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingProviders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Event Requirements
              {requirements.filter(r => r.status === 'pending').length > 0 && (
                <Badge variant="secondary" className="ml-2">
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
