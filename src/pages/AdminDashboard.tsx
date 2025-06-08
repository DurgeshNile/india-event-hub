
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PendingProvidersTable from '@/components/admin/PendingProvidersTable';
import ApprovedProvidersTable from '@/components/admin/ApprovedProvidersTable';
import EventRequirementsTable from '@/components/admin/EventRequirementsTable';
import { Shield, Users, Calendar, CheckCircle } from 'lucide-react';
import { useAdminProviders } from '@/hooks/useAdminProviders';

const AdminDashboard = () => {
  const { 
    pendingProviders, 
    approvedProviders, 
    loading, 
    approveProvider, 
    rejectProvider 
  } = useAdminProviders();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-purple-100">Manage service providers and event requirements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="event-requirements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="event-requirements" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Requirements
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Pending Providers
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved Providers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="event-requirements">
              <EventRequirementsTable />
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Pending Service Providers</CardTitle>
                  <CardDescription className="text-gray-600">
                    Review and approve new service provider applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PendingProvidersTable 
                    providers={pendingProviders} 
                    onApproval={approveProvider}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Approved Service Providers</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage active service providers on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApprovedProvidersTable 
                    providers={approvedProviders} 
                    onReject={rejectProvider}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
