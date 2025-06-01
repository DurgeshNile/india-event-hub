
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Instagram, Twitter, Linkedin, Youtube, Facebook, Globe, Plus, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaSectionProps {
  profile: any;
  onUpdate: () => void;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ profile, onUpdate }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    facebook: '',
    website: ''
  });

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-50' },
    { key: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-50' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-50' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'website', label: 'Website', icon: Globe, color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Social media links updated successfully!",
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleInputChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Instagram className="mr-2 h-5 w-5 text-pink-500" />
                Social Media
              </CardTitle>
              <CardDescription>Connect your social media accounts to showcase your presence</CardDescription>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
            >
              {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              {socialPlatforms.map((platform) => (
                <div key={platform.key}>
                  <Label htmlFor={platform.key} className="flex items-center space-x-2 mb-2">
                    <platform.icon className={`h-4 w-4 ${platform.color}`} />
                    <span>{platform.label}</span>
                  </Label>
                  <Input
                    id={platform.key}
                    placeholder={`Your ${platform.label} profile URL`}
                    value={socialLinks[platform.key as keyof typeof socialLinks]}
                    onChange={(e) => handleInputChange(platform.key, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialPlatforms.map((platform) => {
                const hasLink = socialLinks[platform.key as keyof typeof socialLinks];
                return (
                  <div
                    key={platform.key}
                    className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
                      hasLink 
                        ? `${platform.bg} border-transparent shadow-sm hover:shadow-md` 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${hasLink ? 'bg-white' : 'bg-gray-100'}`}>
                        <platform.icon className={`h-5 w-5 ${hasLink ? platform.color : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{platform.label}</h3>
                        {hasLink ? (
                          <a 
                            href={socialLinks[platform.key as keyof typeof socialLinks]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-sm ${platform.color} hover:underline`}
                          >
                            View Profile
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500">Not connected</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Feed Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Instagram className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Connect your social accounts to see your latest posts here</p>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Social Links
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaSection;
