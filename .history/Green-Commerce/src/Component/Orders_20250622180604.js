import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderedProduct from './OrderedProduct';
import './MyOrders.css';    // make sure you import the new CSS

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`http://localhost:8080/my-orders?email=${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    }
    fetchOrders();
  }, [email]);

  return (
    <div className="checkout__left">
      {/* 👇 New header/navbar */}
      <div className="orders-header">
        <h2>Your Orders</h2>
        <div className="actions">
          <button onClick={() => window.location.reload()}>Refresh</button>
          <button onClick={() => alert('Filter coming soon!')}>Filter</button>
        </div>
      </div>

      {/* Existing list */}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders
          .slice().reverse()
          .flatMap((order) =>
            order.items.map((item, idx) => (
              <OrderedProduct
                key={`${order._id}-${idx}`}
                id={item.productId}
                price={item.price}
                rating={item.rating || 4}
                image={item.image}
                title={item.title}
                badge_id={item.badge_id || 0}
                totalAmount={order.totalAmount}
                quantity={item.quantity}
                deliveryDate={order.deliveryDate}
              />
            ))
          )
      )}
    </div>
  );
}
