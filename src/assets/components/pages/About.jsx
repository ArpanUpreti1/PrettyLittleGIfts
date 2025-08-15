import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.div
    className="container mx-auto p-4 md:p-8 my-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#D29C8B]/10 to-[#D29C8B]/5 p-8 md:p-16">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-6xl md:text-7xl font-heading text-[#D29C8B] mb-8 tracking-tight">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-[#D29C8B] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl font-body text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Pretty Little Gifts was born from a simple idea: to make the act of giving a beautiful and meaningful experience. We believe that a gift should tell a story, evoke an emotion, and be as special as the person receiving it.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="p-8 md:p-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative group"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://placehold.co/600x400/D29C8B/FDF7F0?text=Handcrafted+Gifts" 
                alt="Handcrafted gifts" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-heading text-[#D29C8B] mb-6">Our Mission</h3>
              <div className="w-16 h-1 bg-[#D29C8B] mb-6 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We meticulously curate our collection of gifts, partnering with independent artisans and small businesses who share our passion for quality and craftsmanship.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From the moment you browse our store to the joy of watching someone unwrap their gift, we want every step to be a delight. Our goal is to connect people through thoughtful, beautiful objects that create lasting memories.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Founders Section */}
      <motion.div
        className="bg-gradient-to-b from-gray-50/50 to-white p-8 md:p-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl font-heading text-[#D29C8B] mb-6">Meet the Founders</h3>
          <div className="w-24 h-1 bg-[#D29C8B] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div
            className="group text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 mx-auto relative">
                <img 
                  src="https://placehold.co/150x150/B8860B/FDF7F0?text=Aayush+Prasai" 
                  alt="Aayush" 
                  className="w-full h-full rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D29C8B]/20 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-heading text-[#D29C8B]">Aayush Prasai</h4>
              <p className="text-base text-gray-500 italic font-medium">Co-Founder</p>
              <p className="text-base text-gray-600 max-w-xs mx-auto leading-relaxed">
                Aayush has a lifelong passion for design and finding unique, heartfelt gifts that tell a story.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="group text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 mx-auto relative">
                <img 
                  src="https://placehold.co/150x150/B8860B/FDF7F0?text=Jenish+Shrestha" 
                  alt="Jenish" 
                  className="w-full h-full rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D29C8B]/20 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-heading text-[#D29C8B]">Jenish Shrestha</h4>
              <p className="text-base text-gray-500 italic font-medium">Co-Founder</p>
              <p className="text-base text-gray-600 max-w-xs mx-auto leading-relaxed">
                Jenish ensures every gift is packaged with care and delivered with joy, from our hands to yours.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="group text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 mx-auto relative">
                <img 
                  src="https://placehold.co/150x150/B8860B/FDF7F0?text=Arpan+Uprety" 
                  alt="Arpan" 
                  className="w-full h-full rounded-full object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D29C8B]/20 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-2xl font-heading text-[#D29C8B]">Arpan Uprety</h4>
              <p className="text-base text-gray-500 italic font-medium">Co-Founder</p>
              <p className="text-base text-gray-600 max-w-xs mx-auto leading-relaxed">
                Arpan brings innovative ideas and strategic vision to help create memorable gifting experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default About;