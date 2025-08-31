import React, { useState, useEffect, useRef } from 'react';

// Custom SVG Icons
const Icons = {
  Users: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Search: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  MoreVertical: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Hash: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5028/api/Test/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleUserSelect = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 flex items-center justify-center relative overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          
          .floating { animation: float 3s ease-in-out infinite; }
          .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        `}</style>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-20 left-20 floating opacity-10" width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#D29C8B" />
          </svg>
          <svg className="absolute top-1/3 right-20 floating opacity-10" width="60" height="60" viewBox="0 0 100 100" style={{animationDelay: '0.5s'}}>
            <polygon points="50,10 90,90 10,90" fill="#D29C8B" />
          </svg>
          <svg className="absolute bottom-20 left-1/4 floating opacity-10" width="70" height="70" viewBox="0 0 100 100" style={{animationDelay: '1s'}}>
            <rect x="20" y="20" width="60" height="60" rx="15" fill="#D29C8B" />
          </svg>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-rose-200 animate-spin"></div>
            <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-rose-400 border-t-transparent animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full pulse-ring" style={{backgroundColor: '#D29C8B'}}></div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2" style={{color: '#D29C8B'}}>Loading Users</h3>
            <p className="text-gray-600">Fetching user data...</p>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#D29C8B', animationDelay: '0s'}}></div>
            <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#D29C8B', animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 rounded-full animate-bounce" style={{backgroundColor: '#D29C8B', animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-rose-100 relative overflow-hidden"
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFade {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
        
        .floating { animation: float 3s ease-in-out infinite; }
        .floating:nth-child(2) { animation-delay: 0.5s; }
        .floating:nth-child(3) { animation-delay: 1s; }
        
        .animate-in { animation: slideInUp 0.8s ease-out; }
        .animate-header { animation: slideInDown 0.6s ease-out 0.2s both; }
        .animate-table { animation: slideInFade 0.6s ease-out 0.4s both; }
        .animate-row { animation: slideInRight 0.4s ease-out both; }
        
        .button-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .button-hover:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(210, 156, 139, 0.3);
        }
        
        .input-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .input-focus:focus {
          transform: scale(1.01);
          box-shadow: 0 8px 25px rgba(210, 156, 139, 0.2);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 left-20 floating opacity-10" width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#D29C8B" />
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <svg className="absolute top-1/3 right-20 floating opacity-10" width="60" height="60" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="#D29C8B" />
        </svg>
        <svg className="absolute bottom-20 left-1/4 floating opacity-10" width="70" height="70" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="15" fill="#D29C8B" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className={`${isVisible ? 'animate-header' : 'opacity-0'}`}>
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 button-hover"
              style={{color: '#D29C8B'}}
            >
              <div className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300">
                <Icons.ArrowLeft />
              </div>
              <span className="font-semibold">Back to Dashboard</span>
            </button>

            <div className="flex items-center space-x-3">
              <button 
                className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 button-hover"
                style={{color: '#D29C8B'}}
              >
                <div className="w-5 h-5"><Icons.Filter /></div>
              </button>
              <button 
                className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 button-hover"
                style={{color: '#D29C8B'}}
              >
                <div className="w-5 h-5"><Icons.Download /></div>
              </button>
              <button 
                className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 button-hover"
                style={{color: '#D29C8B'}}
              >
                <div className="w-5 h-5"><Icons.MoreVertical /></div>
              </button>
            </div>
          </div>

          {/* Title and Stats */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div 
                className="p-4 rounded-3xl text-white shadow-xl"
                style={{background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)'}}
              >
                <div className="w-10 h-10"><Icons.Users /></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{color: '#D29C8B'}}>
                  All Users
                </h1>
                <p className="text-gray-600 text-lg">Manage and monitor user accounts</p>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold mb-1" style={{color: '#D29C8B'}}>{filteredUsers.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Users</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-3xl font-bold mb-1" style={{color: '#c8886f'}}>{selectedUsers.size}</div>
                <div className="text-sm text-gray-600 font-medium">Selected</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-lg">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" style={{color: '#D29C8B'}}>
                <Icons.Search />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 focus:border-rose-300 focus:outline-none input-focus placeholder-gray-400 font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`${isVisible ? 'animate-table' : 'opacity-0'}`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div 
              className="px-8 py-6 border-b-2 border-rose-100"
              style={{background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)'}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-rose-600 border-white/30 rounded-lg focus:ring-rose-500 bg-white/20"
                  />
                  <span className="font-semibold text-white">
                    {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                  </span>
                </div>
                {selectedUsers.size > 0 && (
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 text-sm bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium">
                      Export
                    </button>
                    <button className="px-4 py-2 text-sm bg-red-400/20 text-white rounded-xl hover:bg-red-400/30 transition-all duration-300 font-medium">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{backgroundColor: '#D29C8B20'}}>
                    <th className="text-left py-5 px-8 font-bold border-b border-rose-100" style={{color: '#D29C8B'}}>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5"><Icons.Hash /></div>
                        <span>S.N</span>
                      </div>
                    </th>
                    <th className="text-left py-5 px-8 font-bold border-b border-rose-100" style={{color: '#D29C8B'}}>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5"><Icons.User /></div>
                        <span>Username</span>
                      </div>
                    </th>
                    <th className="text-left py-5 px-8 font-bold border-b border-rose-100" style={{color: '#D29C8B'}}>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5"><Icons.Mail /></div>
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="text-left py-5 px-8 font-bold border-b border-rose-100" style={{color: '#D29C8B'}}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-rose-50/50 transition-all duration-300 group animate-row"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <td className="py-6 px-8 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                            className="w-5 h-5 text-rose-600 border-gray-300 rounded-lg focus:ring-rose-500"
                          />
                          <span className="text-gray-700 font-bold text-lg">{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                            style={{background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)'}}
                          >
                            {user.userName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <span className="font-bold text-gray-800 text-lg group-hover:text-rose-600 transition-colors">
                            {user.userName}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">{user.email}</span>
                      </td>
                      <td className="py-6 px-8 border-b border-gray-100">
                        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            className="p-3 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 button-hover"
                            style={{background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)'}}
                          >
                            <div className="w-5 h-5"><Icons.Eye /></div>
                          </button>
                          <button className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-300 button-hover">
                            <div className="w-5 h-5"><Icons.Settings /></div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-16">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{backgroundColor: '#D29C8B20'}}
                  >
                    <div className="w-10 h-10" style={{color: '#D29C8B'}}><Icons.Users /></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{color: '#D29C8B'}}>No users found</h3>
                  <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-gray-600 font-medium text-lg">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-white font-medium transition-all duration-300 button-hover">
                Previous
              </button>
              <button 
                className="px-6 py-3 rounded-2xl text-white font-bold shadow-lg transition-all duration-300 button-hover"
                style={{background: 'linear-gradient(135deg, #D29C8B 0%, #c8886f 100%)'}}
              >
                1
              </button>
              <button className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-white font-medium transition-all duration-300 button-hover">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;