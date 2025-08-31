import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Page loading state
  const [userEmail, setUserEmail] = useState('');

  // Check for email and simulate loading when component mounts
  useEffect(() => {
    const checkEmailAndLoad = async () => {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const storedEmail = localStorage.getItem('userEmailForOTP');
      if (!storedEmail) {
        alert("No email found. Please sign up first.");
        navigate('/signup');
        return;
      }
      
      setUserEmail(storedEmail);
      setPageLoading(false);
    };
    
    checkEmailAndLoad();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (!userEmail) {
      alert("User email not found. Please sign up again.");
      setLoading(false);
      navigate('/signup');
      return;
    }

    try {
      const response = await fetch('http://localhost:5028/api/Auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, otp: otp }),
      });

      const responseData = await response.json(); // Parse JSON response
      console.log('Full OTP Verification Response:', response);
      console.log('OTP Verification Response Data:', responseData);

      if (response.ok) {
        // Check for success indicator similar to SignUp component
        if (responseData.success !== false) { // Allow for undefined success or true
          alert('OTP Verified Successfully!');
          localStorage.removeItem('userEmailForOTP'); // Clean up stored email
          navigate('/signin'); 
        } else {
          // Backend returned 200 but indicated an error
          console.error('OTP Verification failed (backend indicated error):', responseData);
          alert(`OTP Verification failed: ${responseData.message || 'Invalid OTP. Please try again.'}`);
        }
      } else {
        // HTTP status code indicates an error
        console.error('OTP Verification failed (HTTP error):', responseData);
        alert(`OTP Verification failed: ${responseData.message || 'Invalid OTP. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification. Please check your network connection.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to resend OTP
  const handleResendOTP = async () => {
    if (!userEmail) {
      alert("User email not found. Please sign up again.");
      navigate('/signup');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5028/api/Auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        alert('OTP resent successfully! Please check your email.');
      } else {
        alert(`Failed to resend OTP: ${responseData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('An error occurred while resending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading screen component
  if (pageLoading) {
    return (
      <motion.div
        className="container mx-auto p-4 md:p-8 my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-md mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D29C8B] mb-4"></div>
            <h2 className="text-2xl font-heading text-[#D29C8B] mb-2">Preparing Verification</h2>
            <p className="text-gray-600">Please wait while we set up your OTP verification...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-4 md:p-8 my-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-md mx-auto">
        <h2 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-2">
          Please enter the verification code sent to:
        </p>
        <p className="text-center text-[#D29C8B] font-semibold mb-6">
          {userEmail}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-bold text-gray-700">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow digits
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B] text-center text-lg tracking-widest"
              required
              maxLength="6"
              placeholder="123456"
              disabled={loading}
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full px-6 py-3 text-white font-bold rounded-lg shadow-md transition-colors duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#D29C8B] hover:bg-opacity-90'
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              onClick={handleResendOTP}
              className="text-[#D29C8B] hover:underline font-semibold"
              disabled={loading}
            >
              Resend OTP
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-sm text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            ← Back to Sign Up
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OTPVerification;