
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, CheckCircle, Clock, Mail } from 'lucide-react';
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
                  <div className="space-y-4">
                    {pendingProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{provider.business_name || provider.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-500">{provider.email}</p>
                          <p className="text-sm text-gray-500">{provider.service_type || 'Service Provider'}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveProvider(provider.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectProvider(provider.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingProviders.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No pending providers</p>
                    )}
                  </div>
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
                  <div className="space-y-4">
                    {approvedProviders.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{provider.business_name || provider.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-500">{provider.email}</p>
                          <p className="text-sm text-gray-500">{provider.service_type || 'Service Provider'}</p>
                        </div>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Approved
                        </Badge>
                      </div>
                    ))}
                    {approvedProviders.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No approved providers</p>
                    )}
                  </div>
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
                <div className="space-y-4">
                  {requirements.map((requirement) => (
                    <div key={requirement.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{requirement.event_type}</h3>
                        <p className="text-sm text-gray-500">{requirement.contact_name} - {requirement.contact_email}</p>
                        <p className="text-sm text-gray-500">Budget: ₹{requirement.budget}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={requirement.status === 'pending' ? 'secondary' : 'default'}
                          className={requirement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                        >
                          {requirement.status}
                        </Badge>
                        {requirement.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(requirement.id, 'processed')}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Mark Processed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {requirements.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No event requirements</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
