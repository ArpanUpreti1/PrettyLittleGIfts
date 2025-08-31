// Fixed SignIn.jsx
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ handleSignIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await handleSignIn(email, password);
      // handleSignIn now returns a result, so we can handle success/failure
      if (result.success) {
        // Clear form on success
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 md:p-8 my-12"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-md mx-auto">
        <h2 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]"
              required
              disabled={loading}
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 text-white font-bold rounded-lg shadow-md transition-colors duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#D29C8B] hover:bg-opacity-90'
            }`}
            whileHover={loading ? {} : { scale: 1.05 }}
            whileTap={loading ? {} : { scale: 0.95 }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/signup'); }} 
            className="text-[#D29C8B] hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;