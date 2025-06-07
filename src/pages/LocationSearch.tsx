
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LocationSearchForm from '@/components/LocationSearchForm';
import ProviderCard from '@/components/ProviderCard';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { MapPin, Filter } from 'lucide-react';

interface SearchParams {
  category: string;
  location: string;
  city: string;
  radius: string;
}

const LocationSearch = () => {
  const { providers, loading, searchProviders } = useLocationSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (params: SearchParams) => {
    searchProviders(params);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h1 className="text-4xl font-bold mb-4">Find Service Providers Near You</h1>
              <p className="text-xl text-indigo-100">
                Discover local event service providers in your area - photographers, caterers, venues, and more
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <LocationSearchForm onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                  <span className="text-lg">Searching for providers...</span>
                </div>
              </div>
            ) : hasSearched ? (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-2xl font-bold">
                    Search Results ({providers.length} providers found)
                  </h2>
                </div>
                
                {providers.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="max-w-md mx-auto">
                      <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No providers found</h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search criteria or expanding your search radius
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {providers.map((provider) => (
                      <ProviderCard key={provider.id} provider={provider} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <MapPin className="h-16 w-16 text-indigo-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Ready to find local providers?</h3>
                  <p className="text-gray-500">
                    Use the search form above to discover service providers in your area
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocationSearch;
