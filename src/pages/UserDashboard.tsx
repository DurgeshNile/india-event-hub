
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, BookOpen, Settings, Star, Camera, Trophy, Activity, Moon, Sun, Instagram, Twitter, Linkedin } from 'lucide-react';
import ProfileSection from '@/components/dashboard/ProfileSection';
import RatingsSection from '@/components/dashboard/RatingsSection';
import SocialMediaSection from '@/components/dashboard/SocialMediaSection';
import GallerySection from '@/components/dashboard/GallerySection';
import AchievementsSection from '@/components/dashboard/AchievementsSection';
import ActivityLogSection from '@/components/dashboard/ActivityLogSection';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
    fetchUserProfile();
  }, []);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: registrationsData, error: regError } = await supabase
        .from('registrations')
        .select(`
          *,
          events(*)
        `)
        .eq('user_id', user.id);

      if (regError) throw regError;
      setBookings(registrationsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {profile?.first_name || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your profile and activities</p>
            </div>
          </div>
          
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="ratings" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Ratings</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection profile={profile} onProfileUpdate={fetchUserProfile} />
          </TabsContent>

          <TabsContent value="ratings">
            <RatingsSection userId={user?.id} />
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaSection profile={profile} onUpdate={fetchUserProfile} />
          </TabsContent>

          <TabsContent value="gallery">
            <GallerySection userId={user?.id} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsSection userId={user?.id} />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLogSection userId={user?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
