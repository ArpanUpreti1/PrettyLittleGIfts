import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, delay }) => (
  <motion.div
    className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    whileHover={{ y: -5 }}
  >
    <div className="w-full h-56 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-heading text-[#D29C8B] mb-2">{product.name}</h3>
      <p className="text-sm font-body text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-2xl font-heading text-[#D29C8B] font-bold">${product.price}</span>
        <motion.button
          className="px-4 py-2 text-sm bg-[#B8860B] text-white font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default ProductCard;