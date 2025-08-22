import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Added
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Shop from './assets/components/pages/Shop';
import HeroSection from './assets/components/HeroSection';
import About from './assets/components/pages/About';
import Contact from './assets/components/pages/Contact';
import SignIn from './assets/components/pages/SignIn';
import SignUp from './assets/components/pages/SignUp';
import Dashboard from './assets/components/pages/Dashboard';

const colors = {
  primary: '#FDF7F0',
  secondary: '#D29C8B',
  accent: '#B8860B',
  text: '#333333',
};

// New Home page component that includes HeroSection
const Home = () => { // Removed navigateTo prop
  const navigate = useNavigate(); // Use useNavigate inside Home
  return (
    <div className="w-full">
      <HeroSection navigateTo={navigate} /> {/* Pass navigate to HeroSection */}
      {/* Additional home page content can go here */}
    </div>
  );
};

export default function App() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState(null);

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5028/api/Test/session-test');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserName(data.userName || data.email.split('@')[0]);
        } else {
          setIsLoggedIn(false);
          setUserName('');
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkAuthStatus();
  }, []);

  const handleSignIn = (email) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setMessage({ text: "You are now signed in!", type: "success" });
    if (email === 'admin@example.com') {
      navigate('/dashboard'); // Use navigate
    } else {
      navigate('/'); // Use navigate
    }
  };

  const handleSignUp = () => {
    setMessage({ text: "Sign up successful! Please sign in.", type: "success" });
    navigate('/signin'); // Use navigate
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserName('');
    setMessage({ text: "You have been signed out.", type: "info" });
    navigate('/'); // Use navigate
  };

  const MessageDisplay = ({ message, setMessage }) => {
    if (!message) return null;
    return (
      <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}>
        <span>{message.text}</span>
        <button onClick={() => setMessage(null)} className="ml-4 font-bold">x</button>
      </div>
    );
  };

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
        navigateTo={navigate} // Pass navigate to Navbar
        isLoggedIn={isLoggedIn}
        handleSignOut={handleSignOut}
        colors={colors}
        userName={userName}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn handleSignIn={handleSignIn} />} />
            <Route path="/signup" element={<SignUp handleSignUp={handleSignUp} />} />
            <Route path="/dashboard" element={<Dashboard userName={userName} handleSignOut={handleSignOut} />} />
            <Route path="*" element={<Home />} /> {/* Catch-all for unmatched routes */}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer colors={colors} />

      <MessageDisplay message={message} setMessage={setMessage} />
    </div>
  );
}