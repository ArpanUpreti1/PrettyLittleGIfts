import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(''); // Changed from 'name' to 'fullName'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5028/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName: fullName,     // Changed to match backend expectation
          email: email, 
          password: password,
          confirmPassword: confirmPassword  // Added confirmPassword to request
        }),
      });

      const responseData = await response.json();
      console.log('Full API Response:', response);
      console.log('API Response Data:', responseData);

      if (response.ok) {
        // Check for success - most APIs return success indicator or just 200 means success
        if (responseData.success !== false) {
          alert('Sign up successful! Please check your email for OTP.');
          localStorage.setItem('userEmailForOTP', email);
          navigate('/otp-verification');
        } else {
          console.error('Sign up failed (backend indicated error):', responseData);
          alert(`Sign up failed: ${responseData.message || 'Please try again.'}`);
        }
      } else {
        // Handle validation errors more specifically
        if (response.status === 400 && responseData.errors) {
          const errorMessages = [];
          Object.keys(responseData.errors).forEach(field => {
            responseData.errors[field].forEach(error => {
              errorMessages.push(`${field}: ${error}`);
            });
          });
          alert(`Validation errors:\n${errorMessages.join('\n')}`);
        } else {
          console.error('Sign up failed (HTTP error):', responseData);
          alert(`Sign up failed: ${responseData.message || responseData.title || 'Please try again.'}`);
        }
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred during sign up. Please check your network connection.');
    }
  };

  return (
    <motion.div
      className="container mx-auto p-4 md:p-8 my-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-md mx-auto">
        <h2 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </motion.button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signin');
            }}
            className="text-[#D29C8B] hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;