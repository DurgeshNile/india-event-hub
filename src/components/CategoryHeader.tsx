
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const CategoryHeader = ({ title, description, imageUrl }: CategoryHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="text-india-blue hover:text-india-darkblue mr-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {imageUrl && (
            <div className="w-20 h-20 bg-india-orange/10 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
