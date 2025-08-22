import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../HeroSection';
import ProductCard from '../ProductCard';

const Shop = ({ navigateTo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price-low');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5028/api/Products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productsWithFullImageUrl = data.map(product => ({
          ...product,
          image: `http://localhost:5028/ProductPictures/${product.imageFileName}`,
        }));
        setProducts(productsWithFullImageUrl);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sortBy]);

  const ProductModal = ({ product, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[99]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl p-8 max-w-4xl w-full flex flex-col lg:flex-row gap-8 relative"
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full lg:w-1/2">
          <img src={product.image} alt={product.name} className="rounded-lg w-full h-auto object-cover" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-lg text-gray-500 font-medium mb-4">${product.price}</p>
            <p className="text-sm font-light text-gray-700 mb-6">{product.description}</p>
          </div>
          <motion.button
            className="w-full mt-6 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      {/* <HeroSection navigateTo={navigateTo} /> */}

      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Shop All</h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Explore our curated selection of hand-crafted items, perfect for any occasion.
        </p>

        {/* Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-12">
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600 font-medium">Sort by:</label>
            <select
              id="sort"
              className="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:ring-gray-500 focus:border-gray-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              <ProductCard product={product} delay={index * 0.1} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Collection Banner */}
      <motion.div
        className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center my-20 shadow-inner bg-[url('https://placehold.co/1200x800/E5E7EB/4B5563?text=New+Collection')]"
        style={{ backgroundPosition: 'center', backgroundSize: 'cover' }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 p-4 max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Introducing the Autumn Collection</h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explore our new line of cozy gifts and seasonal scents, perfect for the fall.
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;