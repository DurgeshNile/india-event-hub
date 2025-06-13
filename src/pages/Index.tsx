
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategory';
import FeaturedProviders from '@/components/FeaturedProviders';
import ImageGallery from '@/components/ImageGallery';
import Testimonials from '@/components/Testimonials';
import FeatureShowcase from '@/components/FeatureShowcase';
import EventCarousel from '@/components/EventCarousel';
import Footer from '@/components/Footer';
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
        
        <FeatureShowcase />
        
        <ImageGallery />
        
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-white">Are you a service provider?</h2>
                <p className="text-gray-200 mb-6">
                  Join thousands of event service providers across India and grow your business.
                  Create your profile, showcase your portfolio, and connect with potential clients.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Expand Your Reach</h3>
                      <p className="text-gray-200 text-sm">Connect with clients from across the country</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Showcase Your Work</h3>
                      <p className="text-gray-200 text-sm">Display your portfolio to potential clients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Brush className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Build Your Brand</h3>
                      <p className="text-gray-200 text-sm">Establish your reputation with verified reviews</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/register-provider">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Register as Service Provider
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3" 
                      alt="Photographer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3" 
                      alt="Caterer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1519741347686-c1e331c5994e?ixlib=rb-4.0.3" 
                      alt="Decorator" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3" 
                      alt="Musician" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        <FeaturedProviders />
        
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Perfect Services for Your Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who found their ideal event service providers on LetsEventify.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Start Searching
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
