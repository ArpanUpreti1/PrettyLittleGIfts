import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SignIn = ({ handleSignIn, navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(email, password);
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
            />
          </div>
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-[#D29C8B] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('signUp'); }} className="text-[#D29C8B] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;
