import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { motion } from "framer-motion";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* Products List */}
        <div className="flex-1">
          <Link to="/green" className="block mb-8 overflow-hidden rounded-lg shadow-xl">
            <img
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
              src="../images/greenad.png"
              alt="Green World Clean World"
            />
          </Link>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-400 pb-2">
            Your Shopping Cart
          </h2>

          <div className="space-y-6">
            {basket.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
              >
                <CheckoutProduct
                  id={item.productId}
                  price={item.price}
                  rating={item.grade}
                  image={item.productImage}
                  title={item.productName}
                  badge_id={item._id["$oid"]}
                />
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary & Address */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 space-y-6"
          >
            {/* Delivery Address Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-700">Delivery Address</h3>
              {address ? (
                <div className="mt-2 text-gray-800">
                  {address}
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="ml-4 text-green-600 hover:underline text-sm"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="mt-2 text-green-600 hover:underline"
                >
                  Set Delivery Address
                </button>
              )}
            </div>

            <Subtotal />
            <button
              disabled={!address || basket.length === 0}
              className={
                `w-full py-3 rounded-lg font-semibold transition transform duration-300 ` +
                (address && basket.length > 0
                  ? `bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-105`
                  : `bg-gray-300 text-gray-600 cursor-not-allowed`)
              }
            >
              Place Standard Order
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Set Delivery Address</h2>
            <textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              placeholder="Enter your delivery address..."
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
