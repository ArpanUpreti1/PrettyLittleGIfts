// Fixed App.jsx with improved sign out handling
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Shop from './assets/components/pages/Shop';
import HeroSection from './assets/components/HeroSection';
import About from './assets/components/pages/About';
import Contact from './assets/components/pages/Contact';
import SignIn from './assets/components/pages/SignIn';
import SignUp from './assets/components/pages/SignUp';
import Dashboard from './assets/components/pages/Dashboard';
import AddProduct from './assets/components/pages/AddProduct';
import ProductList from './assets/components/pages/ProductList';
import EditProduct from './assets/components/pages/EditProduct';
import UserList from './assets/components/pages/UserList';
import AccessDenied from './assets/components/pages/AccessDenied';
import Orders from './assets/components/pages/Orders';
import OrderManagement from './assets/components/pages/OrderManagement';
import ContactUsMessages from './assets/components/pages/ContactUsMessages';
import OTPVerification from './assets/components/pages/OTPVerification';

const colors = {
  primary: '#FDF7F0',
  secondary: '#D29C8B',
  accent: '#B8860B',
  text: '#333333',
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <HeroSection navigateTo={navigate} />
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false); // Add signing out state

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status...');
        
        const response = await fetch('http://localhost:5028/api/Test/session-test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        console.log('Auth check response:', response.status, response.statusText);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Auth check successful:', data);
          setIsLoggedIn(true);
          if (data.userName || data.email) {
            setUserName(data.userName || data.email.split('@')[0]);
          }

          // Check user role from backend using userinfo endpoint
          try {
            const userInfoResponse = await fetch('http://localhost:5028/api/Auth/userinfo', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });

            if (userInfoResponse.ok) {
              const userInfoData = await userInfoResponse.json();
              console.log('User info fetched successfully:', userInfoData);
              if (userInfoData.roles && userInfoData.roles.includes('Admin')) {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            } else {
              console.error('Failed to fetch user info:', userInfoResponse.status);
              setIsAdmin(false);
            }
          } catch (userInfoError) {
            console.error('Error fetching user info:', userInfoError);
            setIsAdmin(false);
          }
        } else {
          console.log('Auth check failed:', response.status);
          setIsLoggedIn(false);
          setUserName('');
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
        setIsLoggedIn(false);
        setUserName('');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Updated handleSignIn function
  const handleSignIn = async (email, password) => {
    try {
      console.log('Attempting login...');
      
      const response = await fetch('http://localhost:5028/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      console.log('Login response:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        
        setIsLoggedIn(true);
        setUserName(data.userName || email.split('@')[0]);
        
        // Check user role from backend using userinfo endpoint
        try {
          const userInfoResponse = await fetch('http://localhost:5028/api/Auth/userinfo', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (userInfoResponse.ok) {
            const userInfoData = await userInfoResponse.json();
            console.log('User info fetched successfully:', userInfoData);
            if (userInfoData.roles && userInfoData.roles.includes('Admin')) {
              setIsAdmin(true);
              navigate('/dashboard');
            } else {
              setIsAdmin(false);
              navigate('/');
            }
          } else {
            console.error('Failed to fetch user info:', userInfoResponse.status);
            setIsAdmin(false);
            navigate('/');
          }
        } catch (userInfoError) {
          console.error('Error fetching user info:', userInfoError);
          setIsAdmin(false);
          navigate('/');
        }
        
        setMessage({ text: "You are now signed in!", type: "success" });
        
        return { success: true };
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        setMessage({ 
          text: errorData.message || "Sign in failed. Please check your credentials.", 
          type: "error" 
        });
        return { success: false, error: errorData.message };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setMessage({ 
        text: "Network error. Please try again.", 
        type: "error" 
      });
      return { success: false, error: error.message };
    }
  };

  const handleSignUp = () => {
    setMessage({ text: "Sign up successful! Please sign in.", type: "success" });
    navigate('/signin');
  };

  // Updated handleSignOut function with improved state management
  const handleSignOut = async () => {
    setIsSigningOut(true); // Set signing out state immediately
    
    // Navigate to home immediately before clearing auth state
    navigate('/', { replace: true });
    
    try {
      const response = await fetch('http://localhost:5028/api/Auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    // Clear all authentication state after navigation
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setIsAdmin(false);
    setMessage({ text: "You have been signed out.", type: "info" });
    
    // Small delay to ensure navigation completes before clearing signing out state
    setTimeout(() => {
      setIsSigningOut(false);
    }, 100);
  };
  
  // MessageDisplay component moved outside of handleSignOut
  const MessageDisplay = ({ message, setMessage }) => {
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage(null);
        }, 5000); // Auto-dismiss after 5 seconds
        return () => clearTimeout(timer);
      }
    }, [message, setMessage]);

    if (!message) return null;
    
    const bgColor = message.type === 'success' ? 'bg-green-500' : 
                   message.type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    return (
      <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${bgColor}`}>
        <span>{message.text}</span>
        <button onClick={() => setMessage(null)} className="ml-4 font-bold">×</button>
      </div>
    );
  };

  // Show loading spinner while checking authentication or signing out
  if (loading || isSigningOut) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen font-body"
      style={{ backgroundColor: colors.primary, color: colors.text }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&family=Lato:wght@400;700&display=swap');
          .font-heading { font-family: 'Cormorant', serif; }
          .font-body { font-family: 'Lato', sans-serif; }
        `}
      </style>

      <Navbar
        navigateTo={navigate}
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        colors={colors}
        userName={userName}
        isAdmin={isAdmin}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  userName={userName} 
                  handleSignOut={handleSignOut} 
                  isLoggedIn={isLoggedIn} 
                  isAdmin={isAdmin}
                  isSigningOut={isSigningOut}
                />
              } 
            />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/contact-messages" element={<ContactUsMessages />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer colors={colors} />
      <MessageDisplay message={message} setMessage={setMessage} />
    </div>
  );
}