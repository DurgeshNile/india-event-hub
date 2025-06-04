
interface ImageDownload {
  url: string;
  localPath: string;
  filename: string;
}

const imageDownloads: ImageDownload[] = [
  // Event images
  {
    url: "https://cosmopolitanevents.com.au/wp-content/uploads/2021/08/Indian-Wedding.jpg",
    localPath: "public/images/events/",
    filename: "indian-wedding-1.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1530735038726-a73fd6e6c31c?ixlib=rb-4.0.3",
    localPath: "public/images/events/",
    filename: "holi-celebration.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    localPath: "public/images/events/",
    filename: "corporate-mumbai.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1610851467855-4ecfc3c975e4?ixlib=rb-4.0.3",
    localPath: "public/images/events/",
    filename: "rajasthani-wedding.jpg"
  },
  {
    url: "https://im.indiatimes.in/content/2022/Sep/bccl2_632962740b592.jpg?w=725&h=483&cc=1",
    localPath: "public/images/events/",
    filename: "diwali-celebration.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1625232736929-a1671d4fe8c7?ixlib=rb-4.0.3",
    localPath: "public/images/events/",
    filename: "festival-event.jpg"
  },
  // Gallery images
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "luxury-wedding.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "corporate-event.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "birthday-celebration.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "music-festival.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "exhibition-setup.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3",
    localPath: "public/images/gallery/",
    filename: "traditional-ceremony.jpg"
  },
  // Hero images
  {
    url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3",
    localPath: "public/images/hero/",
    filename: "event-atmosphere.jpg"
  },
  // Provider images
  {
    url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3",
    localPath: "public/images/providers/",
    filename: "photographer-1.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3",
    localPath: "public/images/providers/",
    filename: "caterer-1.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3",
    localPath: "public/images/providers/",
    filename: "decorator-1.jpg"
  },
  {
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3",
    localPath: "public/images/providers/",
    filename: "musician-1.jpg"
  }
];

export const downloadImage = async (url: string, filename: string): Promise<Blob> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    console.log(`Successfully downloaded: ${filename} (${blob.size} bytes)`);
    return blob;
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    throw error;
  }
};

export const downloadAndSaveImage = async (imageDownload: ImageDownload): Promise<void> => {
  try {
    const blob = await downloadImage(imageDownload.url, imageDownload.filename);
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = imageDownload.filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    console.log(`✅ Downloaded: ${imageDownload.filename}`);
  } catch (error) {
    console.error(`❌ Failed to download ${imageDownload.filename}:`, error);
  }
};

export const downloadAllImages = async (): Promise<void> => {
  console.log('🚀 Starting image download process...');
  console.log(`📥 Downloading ${imageDownloads.length} images...`);
  
  for (let i = 0; i < imageDownloads.length; i++) {
    const imageDownload = imageDownloads[i];
    console.log(`📸 Downloading ${i + 1}/${imageDownloads.length}: ${imageDownload.filename}`);
    
    try {
      await downloadAndSaveImage(imageDownload);
      // Add a small delay to avoid overwhelming the servers
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to download ${imageDownload.filename}:`, error);
    }
  }
  
  console.log('✨ Image download process completed!');
  console.log('📁 Please organize the downloaded files into the following structure:');
  console.log('public/');
  console.log('├── images/');
  console.log('│   ├── events/');
  console.log('│   ├── gallery/');
  console.log('│   ├── hero/');
  console.log('│   └── providers/');
};

export const getImageList = (): ImageDownload[] => {
  return imageDownloads;
};

export const printDownloadInstructions = (): void => {
  console.log('🔧 Image Download Instructions:');
  console.log('');
  console.log('1. Open browser console (F12)');
  console.log('2. Run: downloadAllImages()');
  console.log('3. Browser will download all images automatically');
  console.log('4. Create the following folder structure in your project:');
  console.log('   public/images/events/');
  console.log('   public/images/gallery/');
  console.log('   public/images/hero/');
  console.log('   public/images/providers/');
  console.log('5. Move downloaded images to their respective folders');
  console.log('');
  console.log('Image mapping:');
  imageDownloads.forEach(img => {
    console.log(`   ${img.filename} → ${img.localPath}${img.filename}`);
  });
};

// Make functions available globally for browser console
if (typeof window !== 'undefined') {
  (window as any).downloadAllImages = downloadAllImages;
  (window as any).downloadImage = downloadImage;
  (window as any).printDownloadInstructions = printDownloadInstructions;
  (window as any).getImageList = getImageList;
}
