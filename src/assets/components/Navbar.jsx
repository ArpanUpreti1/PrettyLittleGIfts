import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, navigateTo, children, className = "" }) => (
  <motion.a
    href="#"
    onClick={(e) => { e.preventDefault(); navigateTo(to); }}
    className={`hover:text-[#D29C8B] transition-colors duration-300 block py-2 ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const Navbar = ({ navigateTo, isLoggedIn, handleSignOut, userName }) => { // Added userName
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="p-4 md:p-6 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-heading text-[#D29C8B] cursor-pointer" onClick={() => navigateTo('herosection')}>
          Pretty Little Gifts
        </div>
        <div className="hidden md:flex space-x-8 items-center font-body text-[#333333]">
          <NavLink to="shop" navigateTo={navigateTo}>Shop</NavLink>
          <NavLink to="about" navigateTo={navigateTo}>About Us</NavLink>
          <NavLink to="contact" navigateTo={navigateTo}>Contact Us</NavLink>
          {isLoggedIn ? (
            <>
              <span className="text-gray-700">Hi, {userName}!</span> {/* Greeting for desktop */}
              <NavLink to="dashboard" navigateTo={navigateTo}>Dashboard</NavLink>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-[#D29C8B] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="signIn" navigateTo={navigateTo}>Sign In</NavLink>
              <NavLink to="signUp" navigateTo={navigateTo} className="bg-[#D29C8B] text-white px-4 py-2 rounded-lg font-bold">Sign Up</NavLink>
            </>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-[#333333]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-4"
          >
            {isLoggedIn && <span className="block py-2 text-gray-700">Hi, {userName}!</span>} {/* Greeting for mobile */}
            <NavLink to="shop" navigateTo={navigateTo}>Shop</NavLink>
            <NavLink to="about" navigateTo={navigateTo}>About Us</NavLink>
            <NavLink to="contact" navigateTo={navigateTo}>Contact Us</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="dashboard" navigateTo={navigateTo}>Dashboard</NavLink>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-[#D29C8B] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="signIn" navigateTo={navigateTo}>Sign In</NavLink>
                <NavLink to="signUp" navigateTo={navigateTo} className="bg-[#D29C8B] text-white px-4 py-2 rounded-lg font-bold">Sign Up</NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
