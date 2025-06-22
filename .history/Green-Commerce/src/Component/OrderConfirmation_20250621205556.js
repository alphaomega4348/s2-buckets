import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../Css/OrderConfirmation.css';

const OrderConfirmation = ({ order }) => {
  const navigate = useNavigate();
const buttonRef = useRef(null);

  if (!order) {
    return (
      <div className="confirmation-container">
        <h2>Oops! No order details found.</h2>
        <p>Please go back and complete your order first.</p>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">
        <span className="checkmark">✔</span> Order placed, thank you!
      </h1>
      <p className="confirmation-note">Confirmation will be sent to your email.</p>

      <p className="shipping-info">
        <strong>Shipping to {order.name}</strong>, {order.address}
      </p>

      <hr className="separator" />

      <div className="delivery-date">
        <strong>Saturday, {order.deliveryDate}</strong><br />
        Delivery date
      </div>

      <div className="ordered-items">
        {order.items.map((item, index) => (
          <div key={index} className="item-preview">
            <img src={item.image} alt={item.productName} className="item-image" />
            {item.quantity > 1 && (
              <div className="item-quantity">{item.quantity}</div>
            )}
          </div>
        ))}
      </div>

      <a href="/orders" className="recent-orders-link">
        Review or edit your recent orders ›
      </a>

      <div className="continue-btn-wrapper">
  <button
    ref={buttonRef}
    className="continue-shopping-btn"
    onClick={() => {
      if (buttonRef.current) {
        buttonRef.current.classList.add('clicked');
        setTimeout(() => {
          buttonRef.current?.classList.remove('clicked');
          navigate('/');
        }, 300);
      }
    }}
  >
    <FaShoppingCart className="cart-icon" />
    Continue Shopping
  </button>
</div>
    </div>
  );
};

export default OrderConfirmation;