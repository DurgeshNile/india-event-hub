
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { categories, ServiceCategory as ServiceCategoryType } from '@/utils/data';

type ServiceCategoryProps = {
  category: ServiceCategoryType;
};

const ServiceCategoryCard = ({ category }: ServiceCategoryProps) => {
  const Icon = category.icon;
  
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group h-full">
        <div className="relative overflow-hidden h-48">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-india-orange/10 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-india-orange" />
            </div>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const ServiceCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Services</h2>
          <p className="text-gray-600">
            Find the perfect professionals for your events from these categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/categories" className="text-india-blue hover:text-india-darkblue font-medium">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
