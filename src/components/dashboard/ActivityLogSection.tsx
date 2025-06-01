
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, User, Star, Camera, Calendar, Award, Filter } from 'lucide-react';

interface ActivityLogSectionProps {
  userId?: string;
}

const ActivityLogSection: React.FC<ActivityLogSectionProps> = ({ userId }) => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'profile',
      action: 'Updated profile information',
      description: 'Added bio and contact details',
      timestamp: '2024-01-15T10:30:00Z',
      icon: User,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'rating',
      action: 'Received new rating',
      description: '5-star review from Sarah Johnson',
      timestamp: '2024-01-14T15:45:00Z',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      id: 3,
      type: 'media',
      action: 'Uploaded new photos',
      description: 'Added 12 photos to Wedding album',
      timestamp: '2024-01-13T09:20:00Z',
      icon: Camera,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'event',
      action: 'Completed event',
      description: 'Wedding photography session',
      timestamp: '2024-01-12T18:00:00Z',
      icon: Calendar,
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      id: 5,
      type: 'achievement',
      action: 'Achievement unlocked',
      description: 'Earned "Top Rated User" badge',
      timestamp: '2024-01-11T12:15:00Z',
      icon: Award,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      id: 6,
      type: 'profile',
      action: 'Profile viewed',
      description: 'Your profile was viewed 25 times',
      timestamp: '2024-01-10T08:30:00Z',
      icon: User,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      id: 7,
      type: 'rating',
      action: 'Received new rating',
      description: '4-star review from Mike Chen',
      timestamp: '2024-01-09T16:20:00Z',
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50'
    },
    {
      id: 8,
      type: 'event',
      action: 'Event booked',
      description: 'Corporate event photography',
      timestamp: '2024-01-08T14:10:00Z',
      icon: Calendar,
      color: 'text-green-500',
      bg: 'bg-green-50'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'profile', label: 'Profile Updates' },
    { value: 'rating', label: 'Ratings & Reviews' },
    { value: 'media', label: 'Media Uploads' },
    { value: 'event', label: 'Event Activities' },
    { value: 'achievement', label: 'Achievements' }
  ];

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 3600);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getActivityStats = () => {
    const stats = {
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    activities.forEach(activity => {
      const activityDate = new Date(activity.timestamp);
      if (activityDate >= todayStart) stats.today++;
      if (activityDate >= weekStart) stats.thisWeek++;
      if (activityDate >= monthStart) stats.thisMonth++;
    });

    return stats;
  };

  const stats = getActivityStats();

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-green-100">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Activity className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-500" />
                Activity Log
              </CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${activity.bg}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No activities found for this filter</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogSection;
