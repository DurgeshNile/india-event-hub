
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageDownloader from '@/components/ImageDownloader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImage, Github, Download, FolderTree } from 'lucide-react';

const ImageManager = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Asset Manager</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download and organize all images from the website for GitHub repository management
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="w-5 h-5 mr-2 text-blue-600" />
                    Bulk Image Download
                  </CardTitle>
                  <CardDescription>
                    Download all images from the website automatically categorized into folders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Automatically categorizes images by content type</li>
                    <li>• Downloads with organized filenames</li>
                    <li>• Supports JPG, PNG, WebP formats</li>
                    <li>• Progress tracking during download</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Github className="w-5 h-5 mr-2 text-gray-800" />
                    GitHub Structure
                  </CardTitle>
                  <CardDescription>
                    Generate folder structure and documentation for GitHub repository
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Creates README with folder structure</li>
                    <li>• JSON file with image metadata</li>
                    <li>• Category-based organization</li>
                    <li>• Ready for repository integration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <ImageDownloader />
            </div>
            
            <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FolderTree className="w-6 h-6 mr-2 text-green-600" />
                Recommended GitHub Structure
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-700">{`assets/
└── images/
    ├── weddings/
    │   ├── traditional_indian_wedding_1.jpg
    │   └── royal_rajasthani_wedding_4.jpg
    ├── corporate/
    │   └── corporate_event_mumbai_3.jpg
    ├── festivals/
    │   ├── colorful_holi_party_2.jpg
    │   └── diwali_celebration_5.jpg
    ├── photography/
    │   └── photographer_1.jpg
    ├── catering/
    │   └── caterer_2.jpg
    ├── music/
    │   └── musician_4.jpg
    ├── decoration/
    │   └── decorator_3.jpg
    └── miscellaneous/
        └── other_images.jpg`}</pre>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Integration Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
                  <li>Download all images using the tool above</li>
                  <li>Create an <code className="bg-blue-100 px-1 rounded">assets/images/</code> folder in your GitHub repository</li>
                  <li>Upload images to their respective category folders</li>
                  <li>Add the generated README file to document the structure</li>
                  <li>Update image paths in your code to reference the new structure</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageManager;
