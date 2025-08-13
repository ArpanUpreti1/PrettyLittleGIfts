import React from 'react';

const Dashboard = ({ userName, handleSignOut }) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Admin Dashboard, {userName}!</h1>
      <p className="text-lg mb-8">Here you can manage users and products.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
          <p>Placeholder for user management features.</p>
          {/* Add user management components here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
          <p>Placeholder for product management features.</p>
          {/* Add product management components here */}
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-10 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
