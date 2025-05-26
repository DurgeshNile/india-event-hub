
import React from 'react';
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
} from "@/components/ui/table";

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

interface PendingProvidersTableProps {
  providers: ServiceProvider[];
  onApproval: (providerId: string, approved: boolean) => void;
}

const PendingProvidersTable = ({ providers, onApproval }: PendingProvidersTableProps) => {
  return (
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
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell className="font-medium">{provider.id}</TableCell>
            <TableCell>{provider.business_name}</TableCell>
            <TableCell>{provider.email}</TableCell>
            <TableCell>{provider.category_id}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onApproval(provider.id, true)}
                className="mr-2"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onApproval(provider.id, false)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PendingProvidersTable;
