// Shop.jsx
import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../HeroSection';
import ProductCard from '../ProductCard';


const products = [
 { id: 1, name: 'Hand-Poured Soy Candle', price: 25, category: 'Home Decor', image: 'https://placehold.co/400x300/E5E7EB/6B7280?text=Candle', description: 'A beautifully scented candle for a cozy home. Scented with lavender and vanilla, perfect for relaxation.' },
 { id: 2, name: 'Terracotta Mug Set', price: 45, category: 'For the Kitchen', image: 'https://placehold.co/400x300/D1D5DB/4B5563?text=Mugs', description: 'Warm and rustic mugs for your favorite beverages. Made from hand-fired terracotta with a natural glaze.' },
 { id: 3, name: 'Artisan Soap Collection', price: 30, category: 'Wellness', image: 'https://placehold.co/400x300/E5E7EB/6B7280?text=Soap', description: 'Natural, hand-crafted soaps in a gift box. Made with organic oils and botanical extracts for a luxurious feel.' },
 { id: 4, name: 'Personalized Photo Album', price: 60, category: 'Personalized', image: 'https://placehold.co/400x300/D1D5DB/4B5563?text=Album', description: 'Capture your memories in a custom-made album. Features a debossed cover and archival quality paper.' },
 { id: 5, name: 'Cozy Knit Blanket', price: 75, category: 'Home Decor', image: 'https://placehold.co/400x300/E5E7EB/6B7280?text=Blanket', description: 'A soft, oversized blanket perfect for snuggling. Woven from 100% organic cotton for ultimate comfort.' },
 { id: 6, name: 'Gourmet Chocolate Box', price: 50, category: 'For the Kitchen', image: 'https://placehold.co/400x300/D1D5DB/4B5563?text=Chocolate', description: 'A selection of exquisite, handcrafted chocolates. A variety of dark, milk, and white chocolates with unique fillings.' },
 { id: 7, name: 'Essential Oil Diffuser', price: 40, category: 'Wellness', image: 'https://placehold.co/400x300/E5E7EB/6B7280?text=Diffuser', description: 'A stylish and quiet essential oil diffuser. Perfect for creating a calming and fragrant atmosphere.' },
 { id: 8, name: 'Leather Journal', price: 35, category: 'Personalized', image: 'https://placehold.co/400x300/D1D5DB/4B5563?text=Journal', description: 'A premium leather journal for writing and sketching. Can be personalized with an engraved message.' },
];


const Shop = ({ navigateTo }) => {
 const [selectedCategory, setSelectedCategory] = useState('All');
 const [sortBy, setSortBy] = useState('price-low');
 const [selectedProduct, setSelectedProduct] = useState(null);


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
 <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Category: {product.category}</p>
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


 {/* Filtering and Sorting Controls */}
 <div className="flex flex-col md:flex-row justify-between items-center mb-12">
 <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-0">
 {categories.map(category => (
 <motion.button
 key={category}
 className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
 selectedCategory === category
 ? 'bg-gray-900 text-white'
 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
 }`}
 onClick={() => setSelectedCategory(category)}
 whileHover={{ scale: 1.05 }}
 whileTap={{ scale: 0.95 }}
 >
 {category}
 </motion.button>
 ))}
 </div>
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
 {filteredProducts.map((product, index) => (
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