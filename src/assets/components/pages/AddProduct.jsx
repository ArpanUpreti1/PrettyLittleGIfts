import React, { useState, useEffect, useRef } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("http://localhost:5028/api/Products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setProduct({
          name: "",
          description: "",
          price: "",
          image: null,
        });
        setImagePreview(null);
        document.getElementById("image").value = null;
        setTimeout(() => {
          setSuccess(false);
          window.history.back();
        }, 2000);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 flex items-center justify-center px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFade {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes errorSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .floating { animation: float 3s ease-in-out infinite; }
        .floating:nth-child(2) { animation-delay: 0.5s; }
        .floating:nth-child(3) { animation-delay: 1s; }
        
        .animate-in { animation: slideInUp 0.8s ease-out; }
        .animate-header { animation: slideInDown 0.6s ease-out 0.2s both; }
        .animate-form { animation: slideInFade 0.6s ease-out 0.4s both; }
        .animate-success { animation: successPop 0.5s ease-out; }
        .animate-error { animation: errorSlide 0.4s ease-out; }
        
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }
        
        .input-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .input-focus:focus {
          transform: scale(1.01);
          box-shadow: 0 8px 25px rgba(210, 156, 139, 0.2);
        }
        
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .button-hover:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .button-hover:active {
          transform: translateY(0) scale(0.98);
        }
        
        .image-preview-enter {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-10 left-10 floating opacity-10" width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#D29C8B" />
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <svg className="absolute top-1/3 right-20 floating opacity-10" width="60" height="60" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="#D29C8B" />
        </svg>
        <svg className="absolute bottom-20 left-1/4 floating opacity-10" width="70" height="70" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="15" fill="#D29C8B" />
        </svg>
      </div>

      <div className={`w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative ${isVisible ? 'animate-in' : ''}`}>
        {/* Decorative SVG Header Elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
        
        {/* Header */}
        <div 
          className={`relative overflow-hidden ${isVisible ? 'animate-header' : ''}`}
          style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)' }}
        >
          {/* Header SVG Pattern */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="headerPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#headerPattern)" />
            <path d="M0,120 Q200,80 400,120 L400,0 L0,0 Z" fill="white" opacity="0.1" />
          </svg>
          
          <div className="relative py-8 px-8 text-center">
            <div className="flex items-center justify-center mb-4">
              {/* <svg className="w-12 h-12 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg> */}
              <h2 className="text-3xl font-bold text-white">Create New Product</h2>
            </div>
            <p className="text-white/90 text-sm">
              Fill in the details below to add your product to the catalog
            </p>
            
            {/* Decorative line */}
            {/* <div className="w-24 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div> */}
          </div>
        </div>

        <div className={`p-8 ${isVisible ? 'animate-form' : ''}`}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg animate-error">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div 
              className="mb-6 p-4 rounded-lg relative overflow-hidden animate-success"
              style={{ backgroundColor: '#D29C8B20' }}
            >
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 mr-3" style={{ color: '#D29C8B' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-lg font-semibold" style={{ color: '#D29C8B' }}>
                  Product added successfully!
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block font-semibold mb-3 flex items-center" style={{ color: '#D29C8B' }}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-300 focus:outline-none input-focus group-hover:border-rose-200 bg-white/80 backdrop-blur-sm"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="description" className="block font-semibold mb-3 flex items-center" style={{ color: '#D29C8B' }}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-300 focus:outline-none input-focus group-hover:border-rose-200 bg-white/80 backdrop-blur-sm resize-none"
                placeholder="Enter detailed product description"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="price" className="block font-semibold mb-3 flex items-center" style={{ color: '#D29C8B' }}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                Price (Rs.)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-rose-300 focus:outline-none input-focus group-hover:border-rose-200 bg-white/80 backdrop-blur-sm"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="image" className="block font-semibold mb-3 flex items-center" style={{ color: '#D29C8B' }}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Product Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="block w-full text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:opacity-90 transition-all cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-rose-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(210, 156, 139, 0.05) 0%, rgba(255, 255, 255, 0.8) 100%)'
                  }}
                  accept="image/*"
                  required
                />
              </div>
              
              {imagePreview && (
                <div className="mt-6 image-preview-enter">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <button
                type="submit"
                className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg button-hover flex items-center justify-center min-w-[140px] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)' }}
                disabled={submitting}
              >
                <div className="absolute inset-0 bg-white/10 shimmer"></div>
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-xl shadow-lg button-hover flex items-center justify-center min-w-[140px]"
                disabled={submitting}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;