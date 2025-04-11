
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-pink-50 to-pink-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-pink-900 mb-4">
              Explore Service Categories
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Discover a wide range of event services to make your special occasions memorable.
              From photographers to caterers, we have everything you need.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10 pr-4 py-3 border-2 border-pink-200 focus:border-pink-500 rounded-full shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                className={activeFilter === 'all' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 text-gray-700'}
                onClick={() => setActiveFilter('all')}
              >
                All Categories
              </Button>
              <Button 
                variant={activeFilter === 'wedding' ? 'default' : 'outline'}
                className={activeFilter === 'wedding' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 text-gray-700'}
                onClick={() => setActiveFilter('wedding')}
              >
                Wedding Services
              </Button>
              <Button 
                variant={activeFilter === 'corporate' ? 'default' : 'outline'}
                className={activeFilter === 'corporate' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 text-gray-700'}
                onClick={() => setActiveFilter('corporate')}
              >
                Corporate Events
              </Button>
              <Button 
                variant={activeFilter === 'birthday' ? 'default' : 'outline'}
                className={activeFilter === 'birthday' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 text-gray-700'}
                onClick={() => setActiveFilter('birthday')}
              >
                Birthday Parties
              </Button>
              <Button 
                variant={activeFilter === 'social' ? 'default' : 'outline'}
                className={activeFilter === 'social' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 text-gray-700'}
                onClick={() => setActiveFilter('social')}
              >
                Social Gatherings
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Link to={`/category/${category.id}`} key={category.id}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <div className="overflow-hidden h-48">
                        <img 
                          src={category.image || `https://source.unsplash.com/random/300x200?${category.name.toLowerCase()}`} 
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{category.name}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-sm text-pink-500 font-medium">{category.providers?.length || '20+' } Providers</span>
                          <Button variant="ghost" className="text-pink-500 hover:text-pink-600 p-0 flex items-center gap-1">
                            View Services <ArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No categories found</h3>
                  <p className="text-gray-500">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">How do I book a service provider?</h3>
                <p className="text-gray-700">
                  Simply browse through our categories, find a service provider you like, and contact them through our platform. 
                  You can discuss your requirements and finalize the booking directly.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Are all service providers verified?</h3>
                <p className="text-gray-700">
                  Yes, we thoroughly verify all service providers listed on our platform. We check their credentials, 
                  past work, and client reviews to ensure you get quality services.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Can I compare prices between different providers?</h3>
                <p className="text-gray-700">
                  Absolutely! You can view pricing information on each provider's profile and compare services 
                  and rates before making your decision.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">What if I'm not satisfied with the service?</h3>
                <p className="text-gray-700">
                  We have a customer satisfaction policy. If you face any issues, please contact our support team 
                  within 48 hours of the service delivery, and we'll help resolve the matter.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Perfect Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start exploring our service categories and connect with the best event professionals in your city.
            </p>
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
