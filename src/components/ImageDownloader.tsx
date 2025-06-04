
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FolderOpen, CheckCircle } from 'lucide-react';
import { downloadAllImages, printDownloadInstructions, getImageList } from '@/utils/imageDownloader';
import { useToast } from '@/hooks/use-toast';

const ImageDownloader = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const imageList = getImageList();

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await downloadAllImages();
      toast({
        title: "Download Started",
        description: "All images are being downloaded. Check your Downloads folder.",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Some images failed to download. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintInstructions = () => {
    printDownloadInstructions();
    toast({
      title: "Instructions Printed",
      description: "Check the browser console for detailed instructions.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Image Download Utility
        </CardTitle>
        <CardDescription>
          Download all external images used in the project to local directories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={handleDownloadAll}
            disabled={isDownloading}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download All Images'}
          </Button>
          
          <Button 
            onClick={handlePrintInstructions}
            variant="outline"
            className="w-full"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Show Instructions
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Images to Download ({imageList.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {imageList.map((image, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{image.filename}</p>
                  <p className="text-xs text-gray-500 truncate">{image.localPath}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">After Download:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Create these folders in your project: <code>public/images/events/</code>, <code>public/images/gallery/</code>, <code>public/images/hero/</code>, <code>public/images/providers/</code></li>
            <li>2. Move each downloaded image to its corresponding folder</li>
            <li>3. The website will automatically use the local images</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDownloader;
