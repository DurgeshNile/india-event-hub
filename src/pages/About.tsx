
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Users, MessageSquare, Phone, Mail, ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-50 to-pink-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-pink-900 leading-tight">
                  Simplifying Event Planning in India
                </h1>
                <p className="text-lg text-gray-700">
                  LetsEventify connects you with verified service providers to make your special events truly memorable.
                </p>
                <div className="pt-4">
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    Contact Us
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3" 
                  alt="Team discussing event planning" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3" 
                    alt="Our story" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-pink-500 text-white p-4 rounded-lg shadow-lg hidden md:block">
                    <p className="text-2xl font-bold">Founded in 2022</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                <p className="text-gray-600">
                  LetsEventify was born from a simple idea: make event planning seamless and accessible for everyone in India. 
                  Our founders experienced the challenges of finding reliable service providers firsthand while planning their own events.
                </p>
                <p className="text-gray-600">
                  What started as a small directory of trusted vendors in Delhi has grown into India's premier platform connecting 
                  event planners with verified service providers across the nation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-pink-100 text-pink-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Verified Providers</h3>
                      <p className="text-sm text-gray-500">Every service provider undergoes thorough verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-pink-100 text-pink-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Transparent Pricing</h3>
                      <p className="text-sm text-gray-500">No hidden fees or surprise charges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-pink-100 text-pink-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Quality Assurance</h3>
                      <p className="text-sm text-gray-500">We regularly monitor service quality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded-full bg-pink-100 text-pink-500">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Genuine Reviews</h3>
                      <p className="text-sm text-gray-500">All reviews are from verified customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-pink-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Meet the passionate individuals working tirelessly to make event planning easier for you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3" 
                  alt="CEO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">Vikram Sharma</h3>
                  <p className="text-pink-500 mb-3">CEO & Founder</p>
                  <p className="text-gray-600 text-sm">
                    Previously organized corporate events for multinational companies and brings 10+ years of experience.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3" 
                  alt="COO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">Priya Patel</h3>
                  <p className="text-pink-500 mb-3">COO</p>
                  <p className="text-gray-600 text-sm">
                    An operations expert specializing in vendor relations and quality control systems.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3" 
                  alt="CTO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">Arjun Mehta</h3>
                  <p className="text-pink-500 mb-3">CTO</p>
                  <p className="text-gray-600 text-sm">
                    Technology enthusiast with expertise in creating seamless digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-pink-500">5000+</p>
                <p className="text-gray-600">Service Providers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-pink-500">25+</p>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-pink-500">10,000+</p>
                <p className="text-gray-600">Successful Events</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-pink-500">4.8/5</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-white/90">
                  Have questions or suggestions? Our team is here to help you plan your perfect event.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <p>+91 98765 43210</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <p>contact@letseventify.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <p>Live Chat Support (9 AM - 6 PM IST)</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 border border-white/20">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
