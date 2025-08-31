import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CancelOrderModal from './CancelOrderModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5028/api/Orders/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        setError('Error fetching orders: ' + error.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenCancelModal = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setSelectedOrder(null);
    setShowCancelModal(false);
  };

  const handleConfirmCancel = async (reason) => {
    if (!selectedOrder) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5028/api/Orders/${selectedOrder.id}/cancel`, {
        method: 'PUT', // Changed from POST to PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        // Update the order status locally
        const updatedOrders = orders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: 'cancelled' } : order
        );
        setOrders(updatedOrders);
        handleCloseCancelModal();
      } else {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) {
          // Ignore if response is not valid JSON
        }
        setError(errorData?.message || 'Failed to cancel order');
      }
    } catch (error) {
      setError('Error cancelling order: ' + error.message);
    } finally {
      handleCloseCancelModal();
    }
  };

  // Helpers
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) return 'N/A';
    return `Rs. ${Number(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return 'Invalid Date'; }
  };

  // Icons & status styling
  const getStatusColor = (statusRaw) => {
    const status = (statusRaw || '').toLowerCase();
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200 text-green-800';
      case 'shipped':   return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'pending':   return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'cancelled': return 'bg-red-50 border-red-200 text-red-800';
      default:          return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const StatusIcon = ({ status }) => {
    const s = (status || '').toLowerCase();
    const base = 'w-5 h-5';
    const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    const color = s === 'completed' ? 'text-green-500' : s === 'shipped' ? 'text-blue-500' : s === 'pending' ? 'text-yellow-500' : s === 'cancelled' ? 'text-red-500' : 'text-gray-500';

    return (
      <svg className={`${base} ${color}`} viewBox="0 0 24 24">
        {s === 'completed' && (
          <>
            <path {...common} d="M9 12l2 2 4-4" />
            <path {...common} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </>
        )}
        {s === 'shipped' && (
          <>
            <path {...common} d="M16 3h5v5" />
            <path {...common} d="M21 3l-7 7" />
            <path {...common} d="M4 20h9v-9" />
            <path {...common} d="M15 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          </>
        )}
        {s === 'pending' && (
          <>
            <circle {...common} cx="12" cy="12" r="10" />
            <path {...common} d="M12 6v6l4 2" />
          </>
        )}
        {s === 'cancelled' && (
          <>
            <circle {...common} cx="12" cy="12" r="10" />
            <path {...common} d="M15 9l-6 6M9 9l6 6" />
          </>
        )}
        {(!['completed', 'shipped', 'pending', 'cancelled'].includes(s)) && (
          <>
            <path {...common} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <path {...common} d="M3.27 6.96L12 12.01l8.73-5.05" />
            <path {...common} d="M12 22.08V12" />
          </>
        )}
      </svg>
    );
  };

  const getProgressSteps = (statusRaw) => {
    const status = (statusRaw || '').toLowerCase();

    if (status === 'cancelled') {
      return [
        { label: 'Order Placed', status: 'completed' },
        { label: 'Cancelled', status: 'cancelled' }
      ];
    }

    return [
      { label: 'Order Placed', status: 'completed' },
      { label: 'Processing', status: status === 'pending' ? 'current' : (status === 'shipped' || status === 'completed') ? 'completed' : 'pending' },
      { label: 'Shipped',     status: status === 'shipped' ? 'current' : status === 'completed' ? 'completed' : 'pending' },
      { label: 'Delivered',   status: status === 'completed' ? 'completed' : 'pending' },
    ];
  };

  const ProgressBar = ({ status }) => {
    const steps = getProgressSteps(status);
    return (
      <div className="flex items-center justify-between mt-3 px-1">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                step.status === 'completed' ? 'bg-green-500 text-white shadow-md shadow-green-200' :
                step.status === 'current'   ? 'bg-blue-500 text-white shadow-md shadow-blue-200' :
                step.status === 'cancelled' ? 'bg-red-500 text-white shadow-md shadow-red-200' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step.status === 'completed' ? '✓' : step.status === 'cancelled' ? '✗' : step.status === 'current' ? '●' : index + 1}
              </div>
              <span className={`text-[10px] mt-1 text-center font-medium truncate ${
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'current'   ? 'text-blue-600' :
                step.status === 'cancelled' ? 'text-red-600'  :
                'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-700 ${
                (steps[index].status === 'completed' && steps[index + 1].status !== 'pending') ? 'bg-green-500' :
                steps[index].status === 'cancelled' ? 'bg-red-500' :
                'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style={{ border: '4px solid #f3f4f6', borderTop: '4px solid #D29C8B' }}></div>
            <div className="text-base font-medium text-gray-700">Loading your orders...</div>
            <div className="text-xs text-gray-500 mt-1">Fetching your order history</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-4">
            <div className="w-14 h-14 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div className="text-lg font-medium text-red-600 mb-4">{error}</div>
            <Link to="/" className="inline-block text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c68975 100%)' }}>Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const totalSpent = orders.reduce((total, order) => total + (Number(order.amount) || 0), 0);
  const completedCount = orders.filter(o => (o.status || '').toLowerCase() === 'completed').length;
  const shippedCount   = orders.filter(o => (o.status || '').toLowerCase() === 'shipped').length;
  const pendingCount   = orders.filter(o => (o.status || '').toLowerCase() === 'pending').length;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c68975 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>My Orders</h1>
          <p className="text-gray-600 text-base">Track and manage your order history</p>
          <div className="w-20 h-1 mx-auto mt-3" style={{ backgroundColor: '#D29C8B' }}></div>
        </div>

        {/* Order Summary (TOP) */}
        {orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#D29C8B' }}>Order Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: '#D29C8B' }}>{orders.length}</div>
                <p className="font-semibold text-gray-800">Total Orders</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold text-white">{completedCount}</div>
                <p className="font-semibold text-gray-800">Completed</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold text-white">{shippedCount}</div>
                <p className="font-semibold text-gray-800">Shipped</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-yellow-500 flex items-center justify-center text-xl font-bold text-white">{pendingCount}</div>
                <p className="font-semibold text-gray-800">Processing</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-gray-600 mb-1">Total Amount Spent</p>
              <p className="text-3xl font-bold" style={{ color: '#D29C8B' }}>{formatCurrency(totalSpent)}</p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D29C8B', opacity: 0.1 }}>
              <svg className="w-10 h-10" style={{ color: '#D29C8B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start exploring our amazing products!</p>
            <Link to="/shop" className="inline-flex items-center space-x-2 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg" style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c68975 100%)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Smaller, always-detailed cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-4 text-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D29C8B', opacity: 0.12 }}>
                        <StatusIcon status={order.status} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-800">Order #{order.id}</h3>
                        <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status || 'Unknown'}
                    </div>
                  </div>

                  {/* Main details */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 mt-0.5" style={{ color: '#D29C8B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{order.productName || 'Unknown Product'}</p>
                        <p className="text-xs text-gray-500 truncate">{order.name}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <span className="text-gray-500 block">Product ID</span>
                        <span className="font-semibold text-gray-800">{order.productId}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <span className="text-gray-500 block">Amount</span>
                        <span className="font-semibold text-gray-800">{order.amount || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* <span className="text-xs text-gray-600">User: <span className="font-medium text-gray-800">{order.userName || 'Unknown User'}</span></span> */}
                      {/* <span className="text-lg font-bold" style={{ color: '#D29C8B' }}>{formatCurrency(order.totalAmount)}</span> */}
                    </div>

                    {/* <div className="text-[10px] text-gray-400 break-all">User ID: {order.userId}</div> */}
                  </div>

                  {/* Compact Progress */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center space-x-2">
                      <svg className="w-4 h-4" style={{ color: '#D29C8B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                      <span>Order Progress</span>
                    </h4>
                    <ProgressBar status={order.status} />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/shop?productId=${order.productId}`} className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                      View Product
                    </Link>
                    {order.status && order.status.toLowerCase() !== 'completed' && order.status.toLowerCase() !== 'cancelled' && (
                      <button
                        onClick={() => handleOpenCancelModal(order)}
                        className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <Link to="/" className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span>Back to Home</span>
              </Link>
              <Link to="/shop" className="inline-flex items-center space-x-2 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #D29C8B 0%, #c68975 100%)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </>
        )}

        {showCancelModal && selectedOrder && (
          <CancelOrderModal
            order={selectedOrder}
            onClose={handleCloseCancelModal}
            onConfirm={handleConfirmCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
