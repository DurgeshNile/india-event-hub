
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  Clock
} from 'lucide-react';

interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  category_id: string;
  location: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  price_range: string;
  approved: boolean;
  created_at: string;
  user_id: string;
  categories?: {
    name: string;
  };
  service_provider_images: {
    image_url: string;
    is_primary: boolean;
  }[];
}

const AdminDashboard = () => {
  const [pendingProviders, setPendingProviders] = useState<ServiceProvider[]>([]);
  const [approvedProviders, setApprovedProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const { toast } = useToast();
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (userType !== 'admin') {
      navigate('/');
      return;
    }
    fetchProviders();
  }, [userType, navigate]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      
      const { data: providers, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          categories(name),
          service_provider_images(image_url, is_primary)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const pending = providers?.filter(p => !p.approved) || [];
      const approved = providers?.filter(p => p.approved) || [];
      
      setPendingProviders(pending);
      setApprovedProviders(approved);
    } catch (error: any) {
      console.error('Error fetching providers:', error);
      toast({
        title: "Error",
        description: "Failed to load service providers",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (providerId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('service_providers')
        .update({ approved })
        .eq('id', providerId);

      if (error) throw error;

      toast({
        title: approved ? "Provider Approved" : "Provider Rejected",
        description: `The service provider has been ${approved ? 'approved' : 'rejected'} successfully.`,
      });

      // Refresh the data
      fetchProviders();
      setSelectedProvider(null);
    } catch (error: any) {
      console.error('Error updating provider:', error);
      toast({
        title: "Error",
        description: "Failed to update provider status",
      });
    }
  };

  const ProviderDetailsModal = ({ provider }: { provider: ServiceProvider }) => {
    const primaryImage = provider.service_provider_images?.find(img => img.is_primary)?.image_url ||
                        provider.service_provider_images?.[0]?.image_url;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Provider Details</h2>
              <Button variant="outline" onClick={() => setSelectedProvider(null)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  {primaryImage && (
                    <img 
                      src={primaryImage} 
                      alt={provider.business_name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{provider.business_name}</h3>
                <p className="text-gray-600 mb-4">{provider.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{provider.location}, {provider.city}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{provider.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{provider.email}</span>
                  </div>
                  
                  {provider.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {provider.website}
                      </a>
                    </div>
                  )}
                </div>

                <Badge variant="outline" className="mb-4">
                  {provider.categories?.name || 'Unknown Category'}
                </Badge>

                <div className="mb-4">
                  <span className="text-sm font-medium">Price Range: </span>
                  <span className="text-sm capitalize">{provider.price_range}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Portfolio Images</h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {provider.service_provider_images?.map((image, index) => (
                    <img
                      key={index}
                      src={image.image_url}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  ))}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Submitted: {new Date(provider.created_at).toLocaleDateString()}</span>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => handleApproval(provider.id, true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Provider
                  </Button>
                  
                  <Button 
                    onClick={() => handleApproval(provider.id, false)}
                    variant="destructive"
                    className="w-full"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Provider
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (userType !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage service provider registrations</p>
          </div>

          <div className="flex gap-4 mb-6">
            <Button 
              onClick={() => setActiveTab('pending')}
              variant={activeTab === 'pending' ? 'default' : 'outline'}
            >
              Pending Approvals ({pendingProviders.length})
            </Button>
            <Button 
              onClick={() => setActiveTab('approved')}
              variant={activeTab === 'approved' ? 'default' : 'outline'}
            >
              Approved Providers ({approvedProviders.length})
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'pending' ? 'Pending Provider Registrations' : 'Approved Service Providers'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading providers...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(activeTab === 'pending' ? pendingProviders : approvedProviders).map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">
                          {provider.business_name}
                        </TableCell>
                        <TableCell>
                          {provider.categories?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {provider.city}
                        </TableCell>
                        <TableCell>
                          {provider.phone}
                        </TableCell>
                        <TableCell>
                          {new Date(provider.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={provider.approved ? "default" : "secondary"}>
                            {provider.approved ? 'Approved' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedProvider(provider)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            {!provider.approved && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(provider.id, true)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleApproval(provider.id, false)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {!loading && (activeTab === 'pending' ? pendingProviders : approvedProviders).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {activeTab === 'pending' 
                      ? 'No pending registrations found.' 
                      : 'No approved providers found.'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {selectedProvider && (
        <ProviderDetailsModal provider={selectedProvider} />
      )}
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
