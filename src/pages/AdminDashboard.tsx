import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ServiceProvider {
  id: string;
  business_name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  city: string;
  price_range: string;
  category_id: string;
  user_id: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  approved: boolean;
  service_provider_images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    caption: string;
  }>;
}

const AdminDashboard = () => {
  const [pendingProviders, setPendingProviders] = useState<ServiceProvider[]>([]);
  const [approvedProviders, setApprovedProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('service_providers')
        .select(`
          *,
          service_provider_images(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to include the approved property
      const transformedData = data?.map(provider => ({
        ...provider,
        approved: provider.approved ?? false
      })) || [];

      const pending = transformedData.filter(p => !p.approved);
      const approved = transformedData.filter(p => p.approved);
      
      setPendingProviders(pending);
      setApprovedProviders(approved);
    } catch (error: any) {
      console.error('Error fetching providers:', error);
      toast({
        title: "Error",
        description: "Failed to load service providers",
        variant: "destructive",
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
        title: "Success",
        description: `Provider ${approved ? 'approved' : 'rejected'} successfully`,
      });

      fetchProviders();
    } catch (error: any) {
      console.error('Error updating provider:', error);
      toast({
        title: "Error",
        description: "Failed to update provider status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      {loading ? (
        <p>Loading service providers...</p>
      ) : (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Pending Approval</h2>
            <Table>
              <TableCaption>A list of service providers awaiting approval.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Category ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.id}</TableCell>
                    <TableCell>{provider.business_name}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.category_id}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleApproval(provider.id, true)}
                        className="mr-2"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleApproval(provider.id, false)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Approved Providers</h2>
            <Table>
              <TableCaption>List of approved service providers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Category ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.id}</TableCell>
                    <TableCell>{provider.business_name}</TableCell>
                    <TableCell>{provider.email}</TableCell>
                    <TableCell>{provider.category_id}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleApproval(provider.id, false)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
