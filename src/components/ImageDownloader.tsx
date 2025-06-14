
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FolderOpen, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageInfo {
  src: string;
  alt: string;
  category: string;
  filename: string;
}

const ImageDownloader: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const { toast } = useToast();

  const categorizeImage = (src: string, alt: string): string => {
    const lowerSrc = src.toLowerCase();
    const lowerAlt = alt.toLowerCase();
    
    if (lowerSrc.includes('wedding') || lowerAlt.includes('wedding')) return 'weddings';
    if (lowerSrc.includes('corporate') || lowerAlt.includes('corporate')) return 'corporate';
    if (lowerSrc.includes('birthday') || lowerAlt.includes('birthday')) return 'birthdays';
    if (lowerSrc.includes('festival') || lowerAlt.includes('festival') || lowerAlt.includes('holi') || lowerAlt.includes('diwali')) return 'festivals';
    if (lowerSrc.includes('photo') || lowerAlt.includes('photo') || lowerAlt.includes('camera')) return 'photography';
    if (lowerSrc.includes('food') || lowerAlt.includes('cater') || lowerAlt.includes('food')) return 'catering';
    if (lowerSrc.includes('music') || lowerAlt.includes('music') || lowerAlt.includes('band')) return 'music';
    if (lowerSrc.includes('decor') || lowerAlt.includes('decor') || lowerAlt.includes('decoration')) return 'decoration';
    if (lowerSrc.includes('event') || lowerAlt.includes('event')) return 'events';
    return 'miscellaneous';
  };

  const generateFilename = (src: string, alt: string, index: number): string => {
    const cleanAlt = alt.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
    const extension = src.includes('.jpg') ? '.jpg' : 
                     src.includes('.jpeg') ? '.jpeg' : 
                     src.includes('.png') ? '.png' : 
                     src.includes('.webp') ? '.webp' : '.jpg';
    
    return cleanAlt ? `${cleanAlt}_${index}${extension}` : `image_${index}${extension}`;
  };

  const collectAllImages = (): ImageInfo[] => {
    const images = Array.from(document.querySelectorAll('img'));
    const imageInfos: ImageInfo[] = [];
    
    console.log(`Found ${images.length} images on the page`);
    
    images.forEach((img, index) => {
      console.log(`Processing image ${index + 1}: ${img.src}`);
      
      if (img.src && !img.src.startsWith('data:')) {
        const category = categorizeImage(img.src, img.alt || '');
        const filename = generateFilename(img.src, img.alt || '', index + 1);
        
        imageInfos.push({
          src: img.src,
          alt: img.alt || `Image ${index + 1}`,
          category,
          filename
        });
      }
    });
    
    console.log(`Collected ${imageInfos.length} valid images for download`);
    return imageInfos;
  };

  const downloadImageBlob = async (imageInfo: ImageInfo): Promise<Blob | null> => {
    try {
      console.log(`Attempting to download: ${imageInfo.src}`);
      
      const response = await fetch(imageInfo.src, { 
        mode: 'cors',
        headers: {
          'Accept': 'image/*',
        }
      });
      
      if (!response.ok) {
        console.warn(`Failed to fetch ${imageInfo.src}: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.warn(`Failed to download image ${imageInfo.src}:`, error);
      return null;
    }
  };

  const downloadAllImages = async () => {
    setIsDownloading(true);
    setDownloadedCount(0);
    
    try {
      const imageInfos = collectAllImages();
      
      if (imageInfos.length === 0) {
        toast({
          title: "No Images Found",
          description: "No downloadable images found on the current page",
          variant: "error",
        });
        return;
      }
      
      // Group images by category
      const categorizedImages = imageInfos.reduce((acc, imageInfo) => {
        if (!acc[imageInfo.category]) {
          acc[imageInfo.category] = [];
        }
        acc[imageInfo.category].push(imageInfo);
        return acc;
      }, {} as Record<string, ImageInfo[]>);
      
      let successCount = 0;
      let failedCount = 0;
      
      // Download images category by category
      for (const [category, images] of Object.entries(categorizedImages)) {
        console.log(`Downloading ${images.length} images from category: ${category}`);
        
        for (const imageInfo of images) {
          const blob = await downloadImageBlob(imageInfo);
          
          if (blob) {
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = `${category}/${imageInfo.filename}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobURL);
            
            successCount++;
            setDownloadedCount(successCount);
            
            // Small delay to prevent overwhelming the browser
            await new Promise(resolve => setTimeout(resolve, 100));
          } else {
            failedCount++;
          }
        }
      }
      
      // Create category structure info file
      const categoryStructure = Object.entries(categorizedImages).map(([category, images]) => ({
        category,
        count: images.length,
        files: images.map(img => img.filename),
        failedDownloads: images.filter((_, index) => !images[index]).length
      }));
      
      const structureBlob = new Blob([JSON.stringify(categoryStructure, null, 2)], {
        type: 'application/json'
      });
      const structureURL = URL.createObjectURL(structureBlob);
      const structureLink = document.createElement('a');
      structureLink.href = structureURL;
      structureLink.download = 'image_structure.json';
      document.body.appendChild(structureLink);
      structureLink.click();
      document.body.removeChild(structureLink);
      URL.revokeObjectURL(structureURL);
      
      const message = failedCount > 0 
        ? `Downloaded ${successCount} images successfully, ${failedCount} failed due to CORS or network issues`
        : `Successfully downloaded ${successCount} images organized by categories`;
      
      toast({
        title: "Download Complete",
        description: message,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Error during batch download:', error);
      toast({
        title: "Download Error",
        description: "An error occurred while downloading images",
        variant: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const createGitHubStructure = () => {
    const imageInfos = collectAllImages();
    const categorizedImages = imageInfos.reduce((acc, imageInfo) => {
      if (!acc[imageInfo.category]) {
        acc[imageInfo.category] = [];
      }
      acc[imageInfo.category].push(imageInfo);
      return acc;
    }, {} as Record<string, ImageInfo[]>);

    let readmeContent = `# Image Assets\n\nThis folder contains all images from the LetsEventify website, organized by categories.\n\n`;
    
    // Generate folder structure
    readmeContent += `## Folder Structure\n\n\`\`\`\nassets/images/\n`;
    
    Object.entries(categorizedImages).forEach(([category, images]) => {
      readmeContent += `├── ${category}/\n`;
      images.forEach((img, index) => {
        const isLast = index === images.length - 1;
        readmeContent += `│   ${isLast ? '└──' : '├──'} ${img.filename}\n`;
      });
    });
    
    readmeContent += `\`\`\`\n\n`;
    
    // Add category descriptions
    readmeContent += `## Categories\n\n`;
    Object.entries(categorizedImages).forEach(([category, images]) => {
      readmeContent += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      readmeContent += `- **Count**: ${images.length} images\n`;
      readmeContent += `- **Description**: Images related to ${category} services and events\n\n`;
    });
    
    // Add troubleshooting section
    readmeContent += `## Troubleshooting Image Display Issues\n\n`;
    readmeContent += `If some images are not displaying on your site, check:\n\n`;
    readmeContent += `1. **CORS Issues**: External images from unsplash.com or other domains may be blocked\n`;
    readmeContent += `2. **Network Issues**: Some image URLs may be broken or inaccessible\n`;
    readmeContent += `3. **Image Paths**: Verify that image paths in your code match the downloaded structure\n`;
    readmeContent += `4. **Loading Issues**: Large images may take time to load\n\n`;
    readmeContent += `### Recommended Solutions:\n`;
    readmeContent += `- Host images locally in your repository\n`;
    readmeContent += `- Use image optimization services\n`;
    readmeContent += `- Implement proper error handling for failed image loads\n`;
    readmeContent += `- Add loading placeholders for better user experience\n`;
    
    // Create and download README
    const readmeBlob = new Blob([readmeContent], { type: 'text/markdown' });
    const readmeURL = URL.createObjectURL(readmeBlob);
    const readmeLink = document.createElement('a');
    readmeLink.href = readmeURL;
    readmeLink.download = 'README_Images.md';
    document.body.appendChild(readmeLink);
    readmeLink.click();
    document.body.removeChild(readmeLink);
    URL.revokeObjectURL(readmeURL);
    
    toast({
      title: "GitHub Structure Created",
      description: "README file with folder structure and troubleshooting guide has been generated",
      variant: "default",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <ImageIcon className="w-12 h-12 mx-auto mb-3 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Image Downloader</h2>
        <p className="text-gray-600">Download and organize all images from the website</p>
      </div>
      
      <div className="space-y-4">
        <Button
          onClick={downloadAllImages}
          disabled={isDownloading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          {isDownloading ? `Downloading... (${downloadedCount})` : 'Download All Images'}
        </Button>
        
        <Button
          onClick={createGitHubStructure}
          variant="outline"
          className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          size="lg"
        >
          <FolderOpen className="w-5 h-5 mr-2" />
          Generate GitHub Structure
        </Button>
      </div>
      
      {isDownloading && (
        <div className="mt-4 text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((downloadedCount / 20) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Downloaded {downloadedCount} images</p>
        </div>
      )}
      
      <div className="mt-6 text-xs text-gray-500">
        <p><strong>Categories:</strong> weddings, corporate, birthdays, festivals, photography, catering, music, decoration, events, miscellaneous</p>
        <p className="mt-2"><strong>Output:</strong> Images will be downloaded with category prefixes and a structure file will be generated</p>
        <p className="mt-2"><strong>Note:</strong> Some images may fail to download due to CORS restrictions or network issues</p>
      </div>
    </div>
  );
};

export default ImageDownloader;
