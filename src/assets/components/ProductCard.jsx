// ProductCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, delay }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="w-full h-64 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-6 text-left">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{product.category}</p>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">${product.price}</span>
        <motion.button
          className="px-5 py-2 text-sm font-medium bg-gray-900 text-white rounded-full transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default ProductCard;