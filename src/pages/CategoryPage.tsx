
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProviders } from '@/hooks/useProviders';
import CategoryHeader from '@/components/CategoryHeader';
import ProvidersSection from '@/components/ProvidersSection';
import SearchForm from '@/components/SearchForm';
import { Provider } from '@/types/provider';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { providers, category, loading } = useProviders(categoryId);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchApplied, setSearchApplied] = useState(false);

  // Handle search results
  const handleSearchResults = (results: Provider[]) => {
    setFilteredProviders(results);
    setSearchApplied(true);
  };

  // Clear search results
  const clearSearch = () => {
    setFilteredProviders([]);
    setSearchApplied(false);
  };

  // Determine which providers to display
  const displayProviders = searchApplied ? filteredProviders : providers;

  return (
    <div>
      {/* Category Header */}
      <CategoryHeader 
        title={category?.name || 'Category'} 
        description={category?.description || 'Browse services in this category'} 
        imageUrl={category?.image_url}
      />
      
      {/* Search Form */}
      <div className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <SearchForm />
        </div>
      </div>
      
      {/* Providers Section */}
      <ProvidersSection 
        providers={displayProviders} 
        loading={loading}
      />

    </div>
  );
};

export default CategoryPage;
