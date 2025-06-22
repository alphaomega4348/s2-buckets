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
  const [selectedItems, setSelectedItems] = useState(
    basket.reduce((acc, item) => ({ ...acc, [item.productId]: true }), {})
  );
  const [couponCode, setCouponCode] = useState("");
  const [donation, setDonation] = useState(0);

  const toggleSelect = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const removeSelected = () => {
    Object.keys(selectedItems).forEach(id => {
      if (selectedItems[id]) {
        dispatch({ type: "REMOVE_FROM_BASKET", id: Number(id) });
      }
    });
  };

  const moveToWishlist = () => {
    // implement wishlist logic
  };

  const itemsSelectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with selection controls */}
      <div className="flex items-center justify-between text-gray-700 mb-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={itemsSelectedCount === basket.length}
            onChange={() => {
              const all = itemsSelectedCount !== basket.length;
              const newSel = {};
              basket.forEach(item => newSel[item.productId] = all);
              setSelectedItems(newSel);
            }}
            className="form-checkbox h-5 w-5 text-green-500"
          />
          <span className="font-semibold">{itemsSelectedCount}/{basket.length} ITEMS SELECTED</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={removeSelected} className="text-red-500 hover:underline">REMOVE</button>
          <button onClick={moveToWishlist} className="text-blue-500 hover:underline">MOVE TO WISHLIST</button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* Products List */}
        <div className="flex-1 space-y-4">
          {basket.map(item => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 rounded shadow flex gap-4"
            >
              <input
                type="checkbox"
                checked={!!selectedItems[item.productId]}
                onChange={() => toggleSelect(item.productId)}
                className="form-checkbox h-5 w-5 text-green-500 self-start mt-2"
              />
              <CheckoutProduct
                id={item.productId}
                price={item.price}
                rating={item.grade}
                image={item.productImage}
                title={item.productName}
                badge_id={item._id}
              />
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Coupons */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-gray-800 mb-2">COUPONS</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="Apply Coupons"
                className="flex-1 p-2 border rounded focus:outline-none"
              />
              <button className="px-4 bg-pink-500 text-white rounded hover:bg-pink-600 transition">APPLY</button>
            </div>
          </div>

          {/* Donation */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-gray-800 mb-2">SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA</h3>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox text-green-500" />
              <span>Donate and make a difference</span>
            </label>
            <div className="flex gap-3 mt-2">
              {[10, 20, 50, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setDonation(val)}
                  className={`px-3 py-1 border rounded-full ${donation === val ? 'bg-green-500 text-white' : 'text-gray-700'}`}
                >₹{val}</button>
              ))}
            </div>
          </div>

          {/* Address & Price Details */}
          <div className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Delivery Address</h3>
              {address ? (
                <p className="mt-1 text-gray-700">{address}</p>
              ) : (
                <button onClick={() => setShowAddressModal(true)} className="text-green-600 hover:underline mt-1">Enter Address</button>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">PRICE DETAILS ({basket.length} Items)</h3>
              <div className="mt-2 text-gray-700">
                <div className="flex justify-between"><span>Total MRP</span><span>₹{basket.reduce((sum, i) => sum + i.price, 0)}</span></div>
                <div className="flex justify-between"><span>Discount on MRP</span><span className="text-green-600">-₹{/* calculate discount */}</span></div>
                <div className="flex justify-between"><span>Coupon Discount</span><span>Apply Coupon</span></div>
                <div className="flex justify-between"><span>Platform Fee</span><span className="text-green-600">FREE</span></div>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3"><span>Total Amount</span><span>₹{/* total */}</span></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-yellow-400 text-gray-900 font-semibold py-3 rounded hover:bg-yellow-500 transition">Place Standard Order</button>
            <button className="flex-1 bg-green-500 text-white font-semibold py-3 rounded hover:bg-green-600 transition">Start Group Order</button>
          </div>
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
