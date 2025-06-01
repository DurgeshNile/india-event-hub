
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, Play, Plus, Grid3X3, List, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GallerySectionProps {
  userId?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ userId }) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Mock data for demonstration
  const [albums] = useState([
    { id: 'all', name: 'All Media', count: 24 },
    { id: 'weddings', name: 'Weddings', count: 12 },
    { id: 'parties', name: 'Parties', count: 8 },
    { id: 'corporate', name: 'Corporate Events', count: 4 }
  ]);

  const [mediaItems] = useState([
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      title: 'Wedding Ceremony',
      album: 'weddings',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
      title: 'Reception Highlights',
      album: 'weddings',
      date: '2024-01-15'
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
      title: 'Birthday Celebration',
      album: 'parties',
      date: '2024-01-10'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
      title: 'Corporate Meeting',
      album: 'corporate',
      date: '2024-01-05'
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400',
      title: 'Outdoor Party',
      album: 'parties',
      date: '2024-01-03'
    },
    {
      id: 6,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
      title: 'Event Timelapse',
      album: 'weddings',
      date: '2024-01-01'
    }
  ]);

  const filteredItems = mediaItems.filter(item => {
    const matchesAlbum = selectedAlbum === 'all' || item.album === selectedAlbum;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAlbum && matchesSearch;
  });

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your files are being uploaded...",
    });
    setShowUploadDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-purple-500" />
                Media Gallery
              </CardTitle>
              <CardDescription>Showcase your event photos and videos</CardDescription>
            </div>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Media</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="album">Album</Label>
                    <select
                      id="album"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {albums.filter(album => album.id !== 'all').map(album => (
                        <option key={album.id} value={album.id}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="files">Select Files</Label>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drag and drop files here</p>
                    <p className="text-sm text-gray-500 mt-2">Support for images and videos</p>
                  </div>
                  <Button onClick={handleUpload} className="w-full">
                    Upload Files
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search and Filter */}
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {albums.map(album => (
                  <option key={album.id} value={album.id}>
                    {album.name} ({album.count})
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-square"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <h3 className="text-white text-sm font-medium">{item.title}</h3>
                    <p className="text-white/80 text-xs">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {albums.find(a => a.id === item.album)?.name} • {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  {item.type === 'video' && (
                    <Play className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No media found</p>
              <Button onClick={() => setShowUploadDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Photo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GallerySection;
