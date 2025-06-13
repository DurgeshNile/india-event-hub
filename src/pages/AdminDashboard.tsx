
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, CheckCircle, Clock, Mail } from 'lucide-react';
import PendingProvidersTable from '@/components/admin/PendingProvidersTable';
import ApprovedProvidersTable from '@/components/admin/ApprovedProvidersTable';
import EventRequirementsTable from '@/components/admin/EventRequirementsTable';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import { useEventRequirements } from '@/hooks/useEventRequirements';

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

  // Convert Provider interface to ServiceProvider interface for table components
  const convertedPendingProviders = pendingProviders.map(provider => ({
    ...provider,
    website: '',
    city: provider.location || '',
    price_range: '',
    category_id: '',
    rating: 0,
    review_count: 0,
    featured: false,
    updated_at: provider.created_at,
    user_id: ''
  }));

  const convertedApprovedProviders = approvedProviders.map(provider => ({
    ...provider,
    website: '',
    city: provider.location || '',
    price_range: '',
    category_id: '',
    rating: 0,
    review_count: 0,
    featured: false,
    updated_at: provider.created_at,
    user_id: ''
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Providers</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProviders.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Providers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedProviders.length}</div>
              <p className="text-xs text-muted-foreground">
                Active providers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Requirements</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requirements.length}</div>
              <p className="text-xs text-muted-foreground">
                Total submissions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProviders.length + approvedProviders.length}</div>
              <p className="text-xs text-muted-foreground">
                Platform users
              </p>
            </CardContent>
          </Card>
        </div>

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

          <TabsContent value="providers" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Pending Providers ({pendingProviders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PendingProvidersTable 
                    providers={convertedPendingProviders}
                    onApprove={approveProvider}
                    onReject={rejectProvider}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Approved Providers ({approvedProviders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ApprovedProvidersTable 
                    providers={convertedApprovedProviders}
                    onStatusChange={rejectProvider}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  Event Requirements ({requirements.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventRequirementsTable 
                  requirements={requirements}
                  onUpdateStatus={updateStatus}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
