import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Link to="/green" className="block mb-6">
            <img
              className="rounded-lg shadow-md"
              src="../images/greenad.png"
              alt="Green World Clean World"
            />
          </Link>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Shopping Cart
          </h2>

          <div className="space-y-4">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                price={item.price}
                rating={item.rating}
                image={item.produimage}
                title={item.title}
                badge_id={item.badge_id}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <Subtotal />
            <button
              className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
