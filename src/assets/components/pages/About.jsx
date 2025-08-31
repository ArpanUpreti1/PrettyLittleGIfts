import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.div
    className="container mx-auto p-4 md:p-8 my-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16">
      <h2 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">Our Story</h2>
      <p className="text-lg text-center font-body text-gray-700 mb-8 max-w-3xl mx-auto">
        Our gifting shop was born in Nepal with a simple vision: to make every gift a symbol of love, culture, and connection. 
        We believe a gift should not only bring joy but also carry the warmth of Nepali craftsmanship and the thoughtfulness of the giver. 
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
        <motion.div
          className="relative h-64 md:h-full rounded-2xl overflow-hidden shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://placehold.co/600x400/D29C8B/FDF7F0?text=Nepali+Handmade+Gifts" 
            alt="Nepali handcrafted gifts" 
            className="w-full h-full object-cover" 
          />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl font-heading text-[#D29C8B] mb-4">Our Mission</h3>
          <p className="text-base text-gray-600">
            We aim to bring people closer through meaningful gifts. Partnering with Nepali artisans and local businesses, 
            we curate unique items that reflect both tradition and modern creativity. From browsing to unwrapping, 
            we want each moment to feel special. Our goal is to share Nepal’s culture of heartfelt giving with the world.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-20 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-4xl font-heading text-[#D29C8B] mb-10">Meet the Founders</h3>
        <div className="grid sm:grid-cols-3 gap-12">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="https://placehold.co/150x150/B8860B/FDF7F0?text=Arpan+Upreti" 
              alt="Arpan Upreti" 
              className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg" 
            />
            <h4 className="text-2xl font-heading text-[#D29C8B]">Arpan Upreti</h4>
            <p className="text-sm text-gray-500 italic">Creative Visionary</p>
            <p className="mt-2 text-base text-gray-600 max-w-sm">
              Arpan brings fresh ideas and ensures that every gift tells a meaningful story.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="https://placehold.co/150x150/B8860B/FDF7F0?text=Aayush+Prasai" 
              alt="Aayush Prasai" 
              className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg" 
            />
            <h4 className="text-2xl font-heading text-[#D29C8B]">Aayush Prasai</h4>
            <p className="text-sm text-gray-500 italic">Experience Designer</p>
            <p className="mt-2 text-base text-gray-600 max-w-sm">
              Aayush focuses on making every step—from browsing to unwrapping—a joyful experience.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="https://placehold.co/150x150/B8860B/FDF7F0?text=Jenish+Shrestha" 
              alt="Jenish Shrestha" 
              className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg" 
            />
            <h4 className="text-2xl font-heading text-[#D29C8B]">Jenish Shrestha</h4>
            <p className="text-sm text-gray-500 italic">Operations Lead</p>
            <p className="mt-2 text-base text-gray-600 max-w-sm">
              Jenish ensures each gift is carefully packaged and delivered with love, 
              carrying a piece of Nepal’s spirit to every recipient.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default About;
