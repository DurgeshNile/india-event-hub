
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceCategories from '@/components/ServiceCategory';
import FeaturedProviders from '@/components/FeaturedProviders';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Camera, Utensils, Brush, Music, Users, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <ServiceCategories />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Are you a service provider?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of event service providers across India and grow your business.
                  Create your profile, showcase your portfolio, and connect with potential clients.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-india-orange/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-india-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expand Your Reach</h3>
                      <p className="text-gray-600 text-sm">Connect with clients from across the country</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-india-blue/10 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-india-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Showcase Your Work</h3>
                      <p className="text-gray-600 text-sm">Display your portfolio to potential clients</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-india-green/10 rounded-full flex items-center justify-center">
                      <Brush className="w-5 h-5 text-india-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Build Your Brand</h3>
                      <p className="text-gray-600 text-sm">Establish your reputation with verified reviews</p>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-india-blue hover:bg-india-darkblue">
                  Register as Service Provider
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
                      src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3" 
                      alt="Musician" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProviders />
        
        <section className="py-16 bg-gradient-to-r from-india-blue to-india-darkblue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Perfect Services for Your Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who found their ideal event service providers on EventHub India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-india-blue hover:bg-india-cream">
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
