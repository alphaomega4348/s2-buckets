import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import '../Css/OrderPage.css';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';


const OrderPage = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const [ecoPackaging, setEcoPackaging] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

const handleStartGroupOrder = () => {
  setShowGroupModal(true);
};

  const handlePlaceOrder = () => {
    // 🌱 Confetti burst with emojis
    const defaults = {
      origin: { y: 0.6 },
      emojis: ['🌱', '💚', '🍀', '♻️'],
      scalar: 1.2,
      spread: 120
    };
  
    confetti({
      ...defaults,
      particleCount: 50,
      origin: { x: 0.5, y: 0.5 }
    });
  
    confetti({
      ...defaults,
      particleCount: 40,
      origin: { x: 0.2, y: 0.4 }
    });
  
    confetti({
      ...defaults,
      particleCount: 40,
      origin: { x: 0.8, y: 0.4 }
    });
  
    // Delay navigation so confetti is visible
    setTimeout(() => {
      navigate('/order-confirmation', {
        state: {
          order: {
            name: 'Shivam',
            address: 'Hostel J, Nit Jamshedpur, JAMSHEDPUR, JHARKHAND, 831014, India',
            deliveryDate: '28 Jun',
            items: cartItems,
            ecoPackaging
          }
        }
      });
    }, 700); // give time for confetti animation
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="order-card">
            <img src={item.image} alt={item.productName} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{item.productName}</h2>
              <p className="product-brand">by {item.brand}</p>
              <p className="product-stock">In stock</p>
              <p className="product-shipping">Eligible for FREE Shipping</p>
              <div className="product-actions">
                <div className="quantity-box">
                  <FaTrash className="trash-icon" />
                  <span>{item.quantity}</span>
                  <span className="plus">+</span>
                </div>
                <button className="link-button">Delete</button>
                <button className="link-button">Save for later</button>
                <button className="link-button">See more like this</button>
                <button className="link-button">Share</button>
              </div>
            </div>
            <div className="product-price">
              ₹{item.price.toLocaleString()}
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <>
          <div className="sustainable-section">
            <button
              className={`sustainable-btn ${ecoPackaging ? 'enabled' : ''}`}
              onClick={() => {
                if (!ecoPackaging) setShowBadge(true);
                setEcoPackaging(!ecoPackaging);
              }}
            >
              {ecoPackaging ? '✅ Sustainable Packaging Enabled' : 'Enable Sustainable Packaging'}
            </button>
            <p className="sustainable-description">
              Uses recyclable, minimal, or biodegradable materials
              <span className="impact"> (~2.8 kg CO₂ saved)</span>
            </p>
          </div>

          <div className="subtotal-section">
            <p className="subtotal-text">
              Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}):
              <span className="subtotal-price">
                ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
              </span>
            </p>

            <div className="order-buttons">
              <button className="standard-order-button" onClick={handlePlaceOrder}>
                Place Standard Order
              </button>
              <button className="group-order-button" onClick={handleStartGroupOrder}>
                Start Group Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* Optional: Badge Modal still here if needed */}
      {showBadge && (
        <div className="badge-modal-overlay" onClick={() => setShowBadge(false)}>
          <div className="badge-modal" onClick={e => e.stopPropagation()}>
            <img
              src="https://png.pngtree.com/png-vector/20250115/ourmid/pngtree-an-eco-friendly-green-badge-with-a-leaf-symbolizing-environmental-care-png-image_15194446.png"
              alt="Eco Badge"
              className="badge-image"
            />
            <h3>🎉 You’ve earned a badge!</h3>
            <p className="badge-message">Eco-Friendly Shopper 🏆</p>
            <button className="badge-close" onClick={() => setShowBadge(false)}>Close</button>
          </div>
        </div>
      )}
      {showGroupModal && (
  <div className="group-modal-overlay" onClick={() => setShowGroupModal(false)}>
    <div className="group-modal" onClick={e => e.stopPropagation()}>
      <h2>Start Group Order</h2>
      <p>Choose how you'd like to participate:</p>
      <div className="group-options">
        <button
          className="group-option-btn"
          onClick={() => {
            setShowGroupModal(false);
            navigate('/group-order-setup', { state: { cartItems } });
          }}
        >
          🛠 Create a Group Order
        </button>

        <button
          className="group-option-btn"
          onClick={() => {
            setShowGroupModal(false);
            navigate('/nearby-groups');
          }}
        >
          📍 Join Nearby Groups
        </button>
      </div>
      <button className="group-close" onClick={() => setShowGroupModal(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default OrderPage;