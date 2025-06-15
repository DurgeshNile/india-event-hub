
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, Mail, Users } from 'lucide-react';

interface StatCardsProps {
  pendingProvidersCount: number;
  approvedProvidersCount: number;
  requirementsCount: number;
  totalUsersCount: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  pendingProvidersCount,
  approvedProvidersCount,
  requirementsCount,
  totalUsersCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-100">Pending Providers</CardTitle>
          <Clock className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{pendingProvidersCount}</div>
          <p className="text-xs text-gray-300">
            Awaiting approval
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-100">Approved Providers</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{approvedProvidersCount}</div>
          <p className="text-xs text-gray-300">
            Active providers
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-100">Event Requirements</CardTitle>
          <Mail className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{requirementsCount}</div>
          <p className="text-xs text-gray-300">
            Total submissions
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-100">Total Users</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalUsersCount}</div>
          <p className="text-xs text-gray-300">
            Platform users
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
