
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryHeader from '@/components/CategoryHeader';
import ProvidersSection from '@/components/ProvidersSection';
import { categories } from '@/utils/data';
import { useProviders } from '@/hooks/useProviders';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    if (categoryId) {
      // Find the category from static data
      const categoryData = categories.find(cat => cat.id === parseInt(categoryId));
      setCategory(categoryData);
    }
  }, [categoryId]);

  const { providers, loading } = useProviders(category?.name || '');

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <p>Category not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <CategoryHeader category={category} />
        <ProvidersSection providers={providers} loading={loading} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
