import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
 { id: 1, name: 'Hand-Poured Soy Candle', price: 25, category: 'Home Decor', image: 'https://images.unsplash.com/photo-1602874801006-38c80463303b?w=400&h=300&fit=crop', description: 'A beautifully scented candle for a cozy home. Scented with lavender and vanilla, perfect for relaxation.' },
 { id: 2, name: 'Terracotta Mug Set', price: 45, category: 'For the Kitchen', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop', description: 'Warm and rustic mugs for your favorite beverages. Made from hand-fired terracotta with a natural glaze.' },
 { id: 3, name: 'Artisan Soap Collection', price: 30, category: 'Wellness', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=300&fit=crop', description: 'Natural, hand-crafted soaps in a gift box. Made with organic oils and botanical extracts for a luxurious feel.' },
 { id: 4, name: 'Personalized Photo Album', price: 60, category: 'Personalized', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', description: 'Capture your memories in a custom-made album. Features a debossed cover and archival quality paper.' },
 { id: 5, name: 'Cozy Knit Blanket', price: 75, category: 'Home Decor', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', description: 'A soft, oversized blanket perfect for snuggling. Woven from 100% organic cotton for ultimate comfort.' },
 { id: 6, name: 'Gourmet Chocolate Box', price: 50, category: 'For the Kitchen', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop', description: 'A selection of exquisite, handcrafted chocolates. A variety of dark, milk, and white chocolates with unique fillings.' },
 { id: 7, name: 'Essential Oil Diffuser', price: 40, category: 'Wellness', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop', description: 'A stylish and quiet essential oil diffuser. Perfect for creating a calming and fragrant atmosphere.' },
 { id: 8, name: 'Leather Journal', price: 35, category: 'Personalized', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', description: 'A premium leather journal for writing and sketching. Can be personalized with an engraved message.' },
];

// Enhanced ProductCard component
const ProductCard = ({ product, delay }) => (
  <motion.div
    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8, scale: 1.02 }}
  >
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <span className="text-sm font-bold text-gray-900">${product.price}</span>
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-2">
        <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide uppercase">
          {product.category}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {product.description}
      </p>
      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          View Details
        </button>
      </div>
    </div>
  </motion.div>
);

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
 className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[99]"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 >
 <motion.div
 className="bg-white rounded-3xl p-8 max-w-5xl w-full flex flex-col lg:flex-row gap-8 relative shadow-2xl"
 initial={{ y: 50, scale: 0.95, opacity: 0 }}
 animate={{ y: 0, scale: 1, opacity: 1 }}
 exit={{ y: 50, scale: 0.95, opacity: 0 }}
 onClick={(e) => e.stopPropagation()}
 >
 <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300">
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 <div className="w-full lg:w-1/2">
 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
   <img src={product.image} alt={product.name} className="rounded-2xl w-full h-auto object-cover" />
 </div>
 </div>
 <div className="w-full lg:w-1/2 flex flex-col justify-between">
 <div>
   <div className="mb-4">
     <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full font-medium tracking-wide uppercase">
       {product.category}
     </span>
   </div>
 <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">{product.name}</h3>
 <p className="text-3xl font-bold text-indigo-600 mb-6">${product.price}</p>
 <p className="text-gray-700 leading-relaxed mb-8 text-lg">{product.description}</p>
 </div>
 <motion.button
 className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 >
 Add to Cart • ${product.price}
 </motion.button>
 </div>
 </motion.div>
 </motion.div>
 );

 return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
   <div className="container mx-auto p-4 md:p-8 font-sans">

 <motion.section
 className="my-16"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 >
 <div className="text-center mb-16">
   <motion.h2 
     className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.4 }}
   >
     Shop All
   </motion.h2>
   <motion.p 
     className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.6 }}
   >
     Explore our curated selection of hand-crafted items, perfect for any occasion.
   </motion.p>
 </div>

 {/* Enhanced Filtering and Sorting Controls */}
 <motion.div 
   className="flex flex-col lg:flex-row justify-between items-center mb-16 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8, delay: 0.8 }}
 >
 <div className="flex flex-wrap gap-3 mb-6 lg:mb-0">
 {categories.map((category, index) => (
 <motion.button
 key={category}
 className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
 selectedCategory === category
 ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
 : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
 }`}
 onClick={() => setSelectedCategory(category)}
 whileHover={{ scale: 1.05, y: -2 }}
 whileTap={{ scale: 0.95 }}
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
 >
 {category}
 </motion.button>
 ))}
 </div>
 <div className="flex items-center space-x-4 bg-white rounded-xl px-4 py-2 shadow-md border border-gray-200">
 <label htmlFor="sort" className="text-sm text-gray-700 font-semibold whitespace-nowrap">Sort by:</label>
 <select
 id="sort"
 className="p-3 border-0 rounded-xl text-sm bg-transparent text-gray-700 focus:ring-0 focus:outline-none font-medium"
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value)}
 >
 <option value="price-low">Price: Low to High</option>
 <option value="price-high">Price: High to Low</option>
 <option value="name-asc">Name: A-Z</option>
 </select>
 </div>
 </motion.div>

 {/* Enhanced Product Grid */}
 <motion.div 
   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   transition={{ duration: 0.8, delay: 1.2 }}
 >
 {filteredProducts.map((product, index) => (
 <motion.div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
 <ProductCard product={product} delay={1.4 + index * 0.1} />
 </motion.div>
 ))}
 </motion.div>
 </motion.section>

 {/* Enhanced New Collection Banner */}
 <motion.div
 className="relative h-96 rounded-3xl overflow-hidden flex flex-col justify-center items-center text-center my-20 shadow-2xl"
 style={{ 
   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
   backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop")',
   backgroundPosition: 'center', 
   backgroundSize: 'cover',
   backgroundBlendMode: 'overlay'
 }}
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, delay: 0.8 }}
 >
 <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-indigo-900/80"></div>
 <div className="relative z-10 p-8 max-w-4xl mx-auto">
 <motion.h2 
   className="text-4xl md:text-6xl font-bold text-white mb-6"
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8, delay: 1.2 }}
 >
   Introducing the Autumn Collection
 </motion.h2>
 <motion.p 
   className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed"
   initial={{ opacity: 0, y: 30 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8, delay: 1.4 }}
 >
   Explore our new line of cozy gifts and seasonal scents, perfect for the fall.
 </motion.p>
 <motion.button
 className="px-10 py-4 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105"
 whileHover={{ scale: 1.05, y: -2 }}
 whileTap={{ scale: 0.95 }}
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 1.6 }}
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
 </div>
 );
};

export default Shop;