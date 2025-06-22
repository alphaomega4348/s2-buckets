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
    <div className="checkout__left">
      <img className="checkout__ad" src="../images/greenad.png" alt="" />
    
    </div>
  );
}