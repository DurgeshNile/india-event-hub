
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategory';
import FeaturedProviders from '@/components/FeaturedProviders';
import ImageGallery from '@/components/ImageGallery';
import Testimonials from '@/components/Testimonials';
import FeatureShowcase from '@/components/FeatureShowcase';
import EventCarousel from '@/components/EventCarousel';
import PopularSearches from '@/components/PopularSearches';
import RealWeddingGallery from '@/components/RealWeddingGallery';
import LocationBasedSearch from '@/components/LocationBasedSearch';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';
import { Button } from '@/components/ui/button';
import { Camera, Utensils, Brush, Music, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Full page EventCarousel at the top */}
        <EventCarousel />
        
        <ServiceCategories />
        
        <LocationBasedSearch />
        
        <PopularSearches />
        
        <RealWeddingGallery />
        
        <FeatureShowcase />
        <Testimonials />
        
        <FeaturedProviders />
        
        <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Perfect Services for Your Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who found their ideal event service providers on LetsEventify.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/categories">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Searching
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Index;
