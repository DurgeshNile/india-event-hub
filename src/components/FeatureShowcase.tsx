
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Calendar, MapPin, Search, Shield, Award, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: "Easy Discovery",
    description: "Find the perfect service providers for your event with our powerful search filters",
    icon: Search,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10"
  },
  {
    id: 2,
    title: "Verified Professionals",
    description: "Every service provider is verified to ensure quality and reliability",
    icon: Shield,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    id: 3,
    title: "Transparent Reviews",
    description: "Read authentic reviews from previous customers to make informed decisions",
    icon: Award,
    color: "text-teal-400",
    bgColor: "bg-teal-400/10"
  },
  {
    id: 4,
    title: "Community Network",
    description: "Connect with a growing community of event professionals across India",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    id: 5,
    title: "Portfolio Showcase",
    description: "Browse through comprehensive portfolios with high-quality images",
    icon: Camera,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10"
  },
  {
    id: 6,
    title: "Real-time Availability",
    description: "Check service provider availability and book instantly",
    icon: Calendar,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10"
  },
  {
    id: 7,
    title: "Pan-India Coverage",
    description: "Find services in any city or town across India for your event needs",
    icon: MapPin,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: 8,
    title: "Quick Response",
    description: "Get prompt responses from service providers to your inquiries",
    icon: Clock,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10"
  }
];

const FeatureShowcase = () => {
  return (
    <section className="py-16 bg-gradient-dark relative overflow-hidden perspective">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-[10%] w-40 h-40 bg-gradient-to-r from-accent/20 to-teal-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 preserve-3d">
            <motion.span 
              initial={{ z: 0 }}
              whileInView={{ z: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block"
            >
              Why Choose Us
            </motion.span>
          </div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Features That Make Us Special
          </motion.h2>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover how LetsEventify transforms the way you plan and organize events
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ z: 20, scale: 1.03 }}
              className="preserve-3d"
            >
              <Card 
                className="card-3d border-none overflow-hidden h-full"
              >
                <CardContent className="p-6 preserve-3d">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 preserve-3d`}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.7 }}
                  >
                    <feature.icon className={`h-7 w-7 ${feature.color} depth-2`} />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-white depth-1">{feature.title}</h3>
                  <p className="text-gray-300 depth-1">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
