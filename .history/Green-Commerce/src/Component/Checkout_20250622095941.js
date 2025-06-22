import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { motion } from "framer-motion";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-12"
      >
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
              >
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
        </div>

        <div className="lg:w-1/3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200"
          >
            <Subtotal />
            <button
              className="w-full mt-6 bg-green-500 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Checkout;