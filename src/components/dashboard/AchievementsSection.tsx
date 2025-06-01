
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Award, Users, Calendar, Camera, Target, Crown } from 'lucide-react';

interface AchievementsSectionProps {
  userId?: string;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ userId }) => {
  const achievements = [
    {
      id: 1,
      title: "Top Rated User",
      description: "Maintained 4.8+ star rating for 6 months",
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Event Master",
      description: "Successfully organized 50+ events",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      earned: true,
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Community Favorite",
      description: "Received 100+ positive reviews",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-200",
      earned: true,
      date: "2024-01-05"
    },
    {
      id: 4,
      title: "Photography Pro",
      description: "Upload 500+ high-quality photos",
      icon: Camera,
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
      earned: false,
      progress: 75
    },
    {
      id: 5,
      title: "Perfectionist",
      description: "Complete 100% of bookings without issues",
      icon: Target,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      earned: false,
      progress: 89
    },
    {
      id: 6,
      title: "Elite Member",
      description: "Be in top 1% of all users",
      icon: Crown,
      color: "text-gold-500",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      earned: false,
      progress: 45
    }
  ];

  const stats = [
    {
      label: "Total Achievements",
      value: achievements.filter(a => a.earned).length,
      total: achievements.length,
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      label: "Community Rank",
      value: "Top 10%",
      icon: Award,
      color: "text-purple-500"
    },
    {
      label: "Points Earned",
      value: "2,450",
      icon: Star,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
            Achievements & Badges
          </CardTitle>
          <CardDescription>Your milestones and accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-6 rounded-lg border-2 transition-all duration-200 ${
                  achievement.earned
                    ? `${achievement.bg} ${achievement.border} shadow-sm`
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {/* Badge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    achievement.earned ? 'bg-white' : 'bg-gray-200'
                  }`}>
                    <achievement.icon className={`h-6 w-6 ${
                      achievement.earned ? achievement.color : 'text-gray-400'
                    }`} />
                  </div>
                  {achievement.earned && (
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Earned
                    </div>
                  )}
                </div>

                {/* Achievement Info */}
                <div className="space-y-2">
                  <h3 className={`font-semibold ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>

                  {/* Progress Bar for Unearned Achievements */}
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Earned Date */}
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-gray-500 mt-2">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Shine Effect for Earned Achievements */}
                {achievement.earned && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Next Milestones</CardTitle>
          <CardDescription>Keep going to unlock these achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.filter(a => !a.earned).slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-2 rounded-full bg-gray-200">
                  <achievement.icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.progress && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {achievement.progress && (
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{achievement.progress}%</span>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsSection;
