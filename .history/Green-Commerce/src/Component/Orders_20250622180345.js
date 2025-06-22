import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderedProduct from './orderedProduct';

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
    <div className="checkout__left" ,>
    
      <div>
        <h2 className="checkout__title">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders
            .slice()
            .reverse()
            .flatMap(order =>
              order.items.map((item, index) => (
                <OrderedProduct
                  key={`${order._id}-${index}`}
                  id={item.productId}
                  price={item.price}
                  rating={item.rating || 4}
                  image={item.image}
                  title={item.title}
                  badge_id={item.badge_id || "eco123"}
                  totalAmount={order.totalAmount} // total paid for the order
                  quantity={item.quantity}
                  deliveryDate={order.deliveryDate}
                />
              ))
            )
        )}
      </div>
    </div>
  );
}