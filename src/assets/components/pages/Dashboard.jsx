import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ userName, handleSignOut, isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      navigate('/access-denied'); // Redirect to access denied page
    }
  }, [navigate, isLoggedIn, isAdmin]);
  return (
    <motion.div
      className="container mx-auto p-8 font-body min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">
          Admin Control Center
        </h1>
        <p className="text-xl text-center text-gray-600 mb-10">
          Welcome, {userName}! Manage your application from this central hub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.165-1.294-.478-1.857m0 0A5.002 5.002 0 0012 13a5.002 5.002 0 00-4.522 2.143M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.165-1.294.478-1.857m0 0A5.002 5.002 0 0112 13a5.002 5.002 0 014.522 2.143M12 13V7m0 6a2 2 0 100-4 2 2 0 000 4zm-3 0h6"></path></svg>
            <h2 className="text-3xl font-heading text-blue-700 mb-3">Manage Users</h2>
            <p className="text-gray-600">View all user accounts.</p>
            <Link to="/user-list" className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
              Manage Users
            </Link>
          </motion.div>

          <motion.div
            className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <h2 className="text-3xl font-heading text-green-700 mb-3">Manage Products</h2>
            <p className="text-gray-600">View, edit, and delete your products.</p>
            <Link to="/product-list" className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Manage Products
            </Link>
          </motion.div>

          <motion.div
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 className="text-3xl font-heading text-yellow-700 mb-3">Add a New Product</h2>
            <p className="text-gray-600">Create a new product listing.</p>
            <Link to="/add-product" className="mt-6 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition-colors duration-300">
              Add Product
            </Link>
          </motion.div>

          <motion.div
            className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            <h2 className="text-3xl font-heading text-purple-700 mb-3">Manage Orders</h2>
            <p className="text-gray-600">Track and manage customer orders.</p>
            <Link to="/order-management" className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-purple-600 transition-colors duration-300">
              Manage Orders
            </Link>
          </motion.div>

          <motion.div
            className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <h2 className="text-3xl font-heading text-red-700 mb-3">Contact Messages</h2>
            <p className="text-gray-600">View all contact us messages.</p>
            <Link to="/contact-messages" className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-colors duration-300">
              View Messages
            </Link>
          </motion.div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
