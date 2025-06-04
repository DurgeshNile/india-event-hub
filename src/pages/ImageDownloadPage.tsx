
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageDownloader from '@/components/ImageDownloader';

const ImageDownloadPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Download Project Images
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use this utility to download all external images used in the project 
              and save them locally for better performance and reliability.
            </p>
          </div>
          
          <ImageDownloader />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageDownloadPage;
