
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/63f210e0-ede7-488f-89f1-3c588fe63c17.png" 
                alt="LetsEventify Logo" 
                className="h-10"
              />
            </div>
            <p className="text-gray-300 mb-2 italic">The golden touch to your event</p>
            <p className="text-gray-300 mb-4">
              Connecting event service providers with customers across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-pink-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
              </li>
              <li>
                <Link to="/providers" className="text-gray-300 hover:text-white">Service Providers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">For Providers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-gray-300 hover:text-white">Join as Provider</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white">Pricing Plans</Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-white">Success Stories</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-pink-400" />
                <span className="text-gray-300">123 Event Street, Connaught Place, New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-pink-400" />
                <a href="mailto:info@letseventify.com" className="text-gray-300 hover:text-white">
                  info@letseventify.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-pink-400" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LetsEventify. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
