import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ userName, handleSignOut }) => {
  return (
    <motion.div
      className="container mx-auto p-8 font-body min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">
          Welcome, {userName}!
        </h1>
        <p className="text-xl text-center text-gray-600 mb-10">
          Admin Dashboard - Manage Your World
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.165-1.294-.478-1.857m0 0A5.002 5.002 0 0012 13a5.002 5.002 0 00-4.522 2.143M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.165-1.294.478-1.857m0 0A5.002 5.002 0 0112 13a5.002 5.002 0 014.522 2.143M12 13V7m0 6a2 2 0 100-4 2 2 0 000 4zm-3 0h6"></path></svg>
            <h2 className="text-3xl font-heading text-blue-700 mb-3">Manage Users</h2>
            <p className="text-gray-600">View, add, edit, and delete user accounts.</p>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300">
              Go to Users
            </button>
          </motion.div>

          <motion.div
            className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <h2 className="text-3xl font-heading text-green-700 mb-3">Manage Products</h2>
            <p className="text-gray-600">Add new products, update inventory, and manage listings.</p>
            <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Go to Products
            </button>
          </motion.div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="px-8 py-4 bg-[#D29C8B] text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
