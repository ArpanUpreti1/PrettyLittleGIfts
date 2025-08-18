import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Shop from './assets/components/pages/Shop';
import HeroSection from './assets/components/HeroSection';
import About from './assets/components/pages/About';
import Contact from './assets/components/pages/Contact';
import SignIn from './assets/components/pages/SignIn'; // Uncommented SignIn
import SignUp from './assets/components/pages/SignUp';
import Dashboard from './assets/components/pages/Dashboard';

const colors = {
  primary: '#FDF7F0',
  secondary: '#D29C8B',
  accent: '#B8860B',
  text: '#333333',
};

// New Home page component that includes HeroSection
const Home = ({ navigateTo }) => {
  return (
    <div className="w-full">
      <HeroSection navigateTo={navigateTo} />
      {/* Additional home page content can go here */}
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Changed default to 'home'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState(null);

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Assuming a backend endpoint to check auth status and return user info
        const response = await fetch('http://localhost:5028/api/Test/session-test');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserName(data.userName || data.email.split('@')[0]); // Use userName from backend or derive from email
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
  }, []); // Empty dependency array means this runs once on mount

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleSignIn = (email) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setMessage({ text: "You are now signed in!", type: "success" });
    // Admin check: For demonstration, assume 'admin@example.com' is an admin
    if (email === 'admin@example.com') {
      navigateTo('dashboard');
    } else {
      navigateTo('home'); // Redirect non-admin users to home or another appropriate page
    }
  };

  const handleSignUp = () => {
    setMessage({ text: "Sign up successful! Please sign in.", type: "success" });
    navigateTo('signIn');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserName('');
    setMessage({ text: "You have been signed out.", type: "info" });
    navigateTo('home'); // Changed to navigate to home after sign out
  };

  const PageRenderer = () => {
    switch (currentPage) {
      case 'home': // Added home case
        return <Home navigateTo={navigateTo} />;
      case 'shop':
        return <Shop navigateTo={navigateTo} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'signIn':
        return <SignIn handleSignIn={handleSignIn} navigateTo={navigateTo} />;
      case 'signUp':
        return <SignUp handleSignUp={handleSignUp} navigateTo={navigateTo} />;
      case 'dashboard':
        return <Dashboard userName={userName} handleSignOut={handleSignOut} />;
      default:
        return <Home navigateTo={navigateTo} />; // Default to home
    }
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
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        handleSignOut={handleSignOut}
        colors={colors}
        userName={userName}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageRenderer />
        </AnimatePresence>
      </main>

      <Footer colors={colors} />
      
      <MessageDisplay message={message} setMessage={setMessage} />
    </div>
  );
}