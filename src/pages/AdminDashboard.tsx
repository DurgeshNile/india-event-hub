
import React from 'react';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import PendingProvidersTable from '@/components/admin/PendingProvidersTable';
import ApprovedProvidersTable from '@/components/admin/ApprovedProvidersTable';

const AdminDashboard = () => {
  const { 
    pendingProviders, 
    approvedProviders, 
    loading, 
    handleApproval 
  } = useAdminProviders();

  const handleReject = (providerId: string) => {
    handleApproval(providerId, false);
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
            <PendingProvidersTable 
              providers={pendingProviders}
              onApproval={handleApproval}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Approved Providers</h2>
            <ApprovedProvidersTable 
              providers={approvedProviders}
              onReject={handleReject}
            />
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
