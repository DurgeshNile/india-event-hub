
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import EventRequirementsTable from '@/components/admin/EventRequirementsTable';
import PendingProvidersTable from '@/components/admin/PendingProvidersTable';
import ApprovedProvidersTable from '@/components/admin/ApprovedProvidersTable';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import { useEventRequirements } from '@/hooks/useEventRequirements';

const AdminDashboard: React.FC = () => {
  const { pendingProviders, approvedProviders, loading: providersLoading } = useAdminProviders();
  const { requirements, loading: requirementsLoading } = useEventRequirements();

  const stats = [
    {
      title: "Total Requirements",
      value: requirements.length,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Pending Providers",
      value: pendingProviders.length,
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Approved Providers", 
      value: approvedProviders.length,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Total Users",
      value: requirements.length + pendingProviders.length + approvedProviders.length,
      icon: Users,
      color: "text-purple-600"
    }
  ];

  if (providersLoading || requirementsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requirements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requirements">Event Requirements</TabsTrigger>
            <TabsTrigger value="pending">Pending Providers</TabsTrigger>
            <TabsTrigger value="approved">Approved Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements">
            <EventRequirementsTable />
          </TabsContent>

          <TabsContent value="pending">
            <PendingProvidersTable 
              providers={pendingProviders}
              loading={providersLoading}
            />
          </TabsContent>

          <TabsContent value="approved">
            <ApprovedProvidersTable 
              providers={approvedProviders}
              loading={providersLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
