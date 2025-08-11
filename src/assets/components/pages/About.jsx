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
        Pretty Little Gifts was born from a simple idea: to make the act of giving a beautiful and meaningful experience. We believe that a gift should tell a story, evoke an emotion, and be as special as the person receiving it.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
        <motion.div
          className="relative h-64 md:h-full rounded-2xl overflow-hidden shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src="https://placehold.co/600x400/D29C8B/FDF7F0?text=Handcrafted+Gifts" alt="Handcrafted gifts" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl font-heading text-[#D29C8B] mb-4">Our Mission</h3>
          <p className="text-base text-gray-600">
            We meticulously curate our collection of gifts, partnering with independent artisans and small businesses who share our passion for quality and craftsmanship. From the moment you browse our store to the joy of watching someone unwrap their gift, we want every step to be a delight. Our goal is to connect people through thoughtful, beautiful objects that create lasting memories.
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
        <div className="grid sm:grid-cols-2 gap-12">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="https://placehold.co/150x150/B8860B/FDF7F0?text=Jane+Doe" alt="Jane Doe" className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg" />
            <h4 className="text-2xl font-heading text-[#D29C8B]">Jane Doe</h4>
            <p className="text-sm text-gray-500 italic">Chief Curator</p>
            <p className="mt-2 text-base text-gray-600 max-w-sm">Jane has a lifelong passion for design and finding unique, heartfelt gifts that tell a story.</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="https://placehold.co/150x150/B8860B/FDF7F0?text=John+Smith" alt="John Smith" className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg" />
            <h4 className="text-2xl font-heading text-[#D29C8B]">John Smith</h4>
            <p className="text-sm text-gray-500 italic">Operations Lead</p>
            <p className="mt-2 text-base text-gray-600 max-w-sm">John ensures every gift is packaged with care and delivered with joy, from our hands to yours.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default About;