import React from 'react';

const ImageDownloader: React.FC = () => {
  const downloadAllImages = async () => {
    const images = Array.from(document.querySelectorAll('img'));

    for (let [index, img] of images.entries()) {
      const imageURL = img.src;

      try {
        const response = await fetch(imageURL, { mode: 'cors' });
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobURL;
        a.download = `image_${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(blobURL);
      } catch (error) {
        console.warn(`Failed to download image ${imageURL}`, error);
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={downloadAllImages}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download All Images
      </button>
    </div>
  );
};

export default ImageDownloader;