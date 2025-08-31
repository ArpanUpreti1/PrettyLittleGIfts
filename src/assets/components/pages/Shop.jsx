import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = ({ navigateTo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('price-low');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Mock location for standalone component
  const location = { search: '' };

  // GSAP animations
  useEffect(() => {
    // Simulate GSAP timeline for header animation
    if (headerRef.current) {
      const header = headerRef.current;
      header.style.opacity = '0';
      header.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        header.style.transition = 'all 1s ease-out';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Animate grid items when products load
    if (gridRef.current && products.length > 0) {
      const cards = gridRef.current.children;
      Array.from(cards).forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, index * 100 + 300);
      });
    }
  }, [products]);

  const handleCreateOrder = async (productId, amount) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setOrderMessage({ type: 'error', text: 'You must be logged in to place an order.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5028/api/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          amount: parseFloat(amount),
        }),
      });

      if (response.ok) {
        setOrderMessage({ type: 'success', text: 'Order placed successfully!' });
      } else {
        const errorData = await response.json();
        setOrderMessage({ type: 'error', text: errorData.message || 'Failed to place order.' });
      }
    } catch (error) {
      setOrderMessage({ type: 'error', text: 'An error occurred while placing the order.' });
    } finally {
      setTimeout(() => setOrderMessage(null), 3000);
    }
  };

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('productId');
    if (productId && products.length > 0) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [location.search, products]);

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

  // SVG Icons
  const SortIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ShoppingBagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ProductCard = ({ product, delay }) => {
    return (
      <motion.div 
        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-gray-50 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#D29C8B] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#D29C8B]">${product.price}</span>
            <div className="w-10 h-10 rounded-full bg-[#D29C8B] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <ShoppingBagIcon />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const ProductModal = ({ product, onClose, handleCreateOrder }) => {
    const [amount, setAmount] = useState(1);

    const onPlaceOrder = () => {
      handleCreateOrder(product.id, amount);
      onClose();
    };

    return (
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[99]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl p-0 max-w-5xl w-full overflow-hidden relative shadow-2xl"
          initial={{ y: 100, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 100, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
          >
            <CloseIcon />
          </button>
          
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/5 relative">
              <div className="aspect-square lg:aspect-auto lg:h-[600px] bg-gray-50 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            
            <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-6">
                    <span className="text-4xl font-bold text-[#D29C8B]">${product.price}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label htmlFor="amount" className="text-lg font-medium text-gray-900 min-w-fit">
                    Quantity:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      className="w-20 h-12 px-4 border-2 border-gray-200 rounded-xl text-center text-lg font-medium focus:border-[#D29C8B] focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>
                
                <motion.button
                  onClick={onPlaceOrder}
                  className="w-full h-14 bg-[#D29C8B] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#C08A79] transition-all duration-300 flex items-center justify-center space-x-3 text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBagIcon />
                  <span>Add to Cart - ${(product.price * amount).toFixed(2)}</span>
                </motion.button>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 mx-auto mb-2 text-[#D29C8B]">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Premium Quality</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 mx-auto mb-2 text-[#D29C8B]">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D29C8B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Curating our collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-red-500">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Animated Background Component
  const AnimatedBackground = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#D29C8B]/10 to-[#E8B4A6]/5 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-[#D29C8B]/8 to-transparent rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-48 h-48 bg-gradient-to-br from-[#E8B4A6]/12 to-[#D29C8B]/5 rounded-full blur-xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#D29C8B]/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#D29C8B]/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#E8B4A6]/15 rounded-full"
          animate={{
            x: [0, 10, 0],
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,200 Q400,150 800,200 T1600,200"
            stroke="url(#gradient1)"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M0,400 Q600,350 1200,400 T2400,400"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D29C8B" stopOpacity="0"/>
              <stop offset="50%" stopColor="#D29C8B" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#E8B4A6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B4A6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#D29C8B" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#D29C8B" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
      <AnimatedBackground />
      {/* Order Message Toast */}
      <AnimatePresence>
        {orderMessage && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            className={`fixed top-8 right-8 p-6 rounded-2xl shadow-2xl z-50 text-white backdrop-blur-lg ${
              orderMessage.type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6">
                {orderMessage.type === 'success' ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 14.5L14.5 15.5L12 13L9.5 15.5L8.5 14.5L11 12L8.5 9.5L9.5 8.5L12 11L14.5 8.5L15.5 9.5L13 12L15.5 14.5Z"/>
                  </svg>
                )}
              </div>
              <span className="font-medium">{orderMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-[#D29C8B] to-[#E8B4A6] rounded-full"></div>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D29C8B] to-[#E8B4A6]">
              Collection
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover handcrafted treasures that tell a story. Each piece is carefully curated for those who appreciate extraordinary quality.
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-900 font-medium">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <SortIcon />
            <select
              className="bg-transparent text-gray-900 font-medium text-sm focus:outline-none cursor-pointer px-4 py-2"
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
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
        >
          {sortedProducts.map((product, index) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)}>
              <ProductCard product={product} delay={index * 0.1} />
            </div>
          ))}
        </div>

        {/* Featured Collection Banner */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-96 lg:h-[500px] bg-gradient-to-r from-[#D29C8B] to-[#E8B4A6] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="white"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)"/>
              </svg>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Autumn
                  <span className="block text-white/90">Essentials</span>
                </h2>
                <p className="text-xl lg:text-2xl text-white/90 mb-10 font-light leading-relaxed">
                  Embrace the season with our carefully selected collection of cozy essentials and warm scents
                </p>
                <motion.button
                  className="inline-flex items-center space-x-3 px-10 py-4 bg-white text-[#D29C8B] font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Collection</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            handleCreateOrder={handleCreateOrder} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;