import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../HeroSection';
import ProductCard from '../ProductCard';

const products = [
  { id: 1, name: 'Hand-Poured Soy Candle', price: 25, category: 'Home Decor', image: 'https://placehold.co/400x300/FDF7F0/B8860B?text=Candle', description: 'A beautifully scented candle for a cozy home. Scented with lavender and vanilla, perfect for relaxation.' },
  { id: 2, name: 'Terracotta Mug Set', price: 45, category: 'For the Kitchen', image: 'https://placehold.co/400x300/FDF7F0/D29C8B?text=Mugs', description: 'Warm and rustic mugs for your favorite beverages. Made from hand-fired terracotta with a natural glaze.' },
  { id: 3, name: 'Artisan Soap Collection', price: 30, category: 'Wellness', image: 'https://placehold.co/400x300/FDF7F0/333333?text=Soap', description: 'Natural, hand-crafted soaps in a gift box. Made with organic oils and botanical extracts for a luxurious feel.' },
  { id: 4, name: 'Personalized Photo Album', price: 60, category: 'Personalized', image: 'https://placehold.co/400x300/FDF7F0/B8860B?text=Album', description: 'Capture your memories in a custom-made album. Features a debossed cover and archival quality paper.' },
  { id: 5, name: 'Cozy Knit Blanket', price: 75, category: 'Home Decor', image: 'https://placehold.co/400x300/FDF7F0/D29C8B?text=Blanket', description: 'A soft, oversized blanket perfect for snuggling. Woven from 100% organic cotton for ultimate comfort.' },
  { id: 6, name: 'Gourmet Chocolate Box', price: 50, category: 'For the Kitchen', image: 'https://placehold.co/400x300/FDF7F0/333333?text=Chocolate', description: 'A selection of exquisite, handcrafted chocolates. A variety of dark, milk, and white chocolates with unique fillings.' },
  { id: 7, name: 'Essential Oil Diffuser', price: 40, category: 'Wellness', image: 'https://placehold.co/400x300/FDF7F0/B8860B?text=Diffuser', description: 'A stylish and quiet essential oil diffuser. Perfect for creating a calming and fragrant atmosphere.' },
  { id: 8, name: 'Leather Journal', price: 35, category: 'Personalized', image: 'https://placehold.co/400x300/FDF7F0/D29C8B?text=Journal', description: 'A premium leather journal for writing and sketching. Can be personalized with an engraved message.' },
];

const Shop = ({ navigateTo }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price-low');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Home Decor', 'Wellness', 'For the Kitchen', 'Personalized'];

  const filteredProducts = products.filter(product =>
    selectedCategory === 'All' || product.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const ProductModal = ({ product, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[99]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-2xl w-full flex flex-col md:flex-row gap-8 relative"
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.name} className="rounded-2xl w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-heading text-[#D29C8B] mb-2">{product.name}</h3>
            <p className="text-xl font-heading text-[#D29C8B] font-bold mb-4">${product.price}</p>
            <p className="text-sm font-body text-gray-600 mb-4">{product.description}</p>
            <p className="text-xs text-gray-400">Category: {product.category}</p>
          </div>
          <motion.button
            className="w-full mt-4 px-6 py-3 bg-[#B8860B] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* <HeroSection navigateTo={navigateTo} /> */}
      
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-heading text-center text-[#D29C8B] mb-10">Featured Gifts</h2>
        
        {/* Filtering and Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {categories.map(category => (
              <motion.button
                key={category}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#B8860B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
            <select
              id="sort"
              className="p-2 border rounded-lg text-sm bg-white"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
              <ProductCard product={product} delay={index * 0.1} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Collection Banner */}
      <motion.div
        className="relative h-64 bg-cover bg-center rounded-3xl overflow-hidden flex flex-col justify-center items-center text-center my-16 shadow-xl"
        style={{ backgroundImage: 'url(https://placehold.co/1200x800/D29C8B/FDF7F0?text=New+Collection)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-white z-10 p-4">
          <h2 className="text-4xl md:text-5xl font-heading mb-2">Introducing the Autumn Collection</h2>
          <p className="text-lg md:text-xl font-body mb-6 max-w-xl mx-auto">
            Explore our new line of cozy gifts and seasonal scents, perfect for the fall.
          </p>
          <motion.button
            className="px-6 py-3 bg-[#B8860B] text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-colors duration-300"
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