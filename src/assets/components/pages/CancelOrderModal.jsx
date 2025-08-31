import React, { useState } from "react";
import { motion } from "framer-motion";

const CancelOrderModal = ({ order, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Cancel Order #{order.id}</h2>
        <p className="text-gray-600 mb-4">
          Please provide a reason for cancelling this order.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          rows="4"
          placeholder="Enter cancellation reason..."
        />
        <div className="flex justify-end gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg"
          >
            Close
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg"
            disabled={!reason}
          >
            Confirm Cancellation
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelOrderModal;