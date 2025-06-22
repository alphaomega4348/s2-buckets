import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { motion } from 'framer-motion';
import Headergreen from './Headergreen';

const styles = {
  page: {
    minHeight: '100vh',              // ensures vertical centering
    background: 'linear-gradient(120deg, #e7f8f1 65%, #f9fdfa 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    maxWidth: 440,                  // <-- This is the perfect card width
    borderRadius: 24,
    padding: '38px 38px 28px 38px',
    boxShadow: '0 12px 40px #b4eed94c',
    background: 'rgba(255,255,255,0.97)',
    textAlign: 'center',
    position: 'relative',
    margin: '42px 0',
  },
  checkIcon: {
    color: '#22bb55',
    fontSize: 52,
    background: '#e7f8ef',
    borderRadius: '50%',
    boxShadow: '0 1px 9px #9de4b544',
    marginBottom: 18,
    display: 'inline-block',
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    letterSpacing: '0.04em',
    color: '#17925c',
    marginBottom: 9,
  },
  note: {
    color: '#45556b',
    fontSize: 17,
    marginBottom: 7,
  },
  shipping: {
    color: '#1a3d2f',
    fontSize: 16.5,
    margin: '10px 0 7px 0',
    fontWeight: 600,
    letterSpacing: '0.01em',
    textAlign: 'center',
  },
  section: {
    background: 'rgba(236,255,247,0.80)',
    padding: '14px 10px 7px 10px',
    borderRadius: 12,
    margin: '23px 0 12px 0',
  },
  delivery: {
    fontSize: 19,
    fontWeight: 700,
    color: '#35573f',
    marginBottom: 2,
  },
  itemsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    margin: '17px 0 10px 0',
  },
  item: {
    width: 70,
    minHeight: 70,
    borderRadius: 14,
    background: '#f6fcfa',
    boxShadow: '0 2px 10px #bdebdc27',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: 8,
  },
  itemImg: {
    width: 42,
    height: 42,
    objectFit: 'contain',
    marginBottom: 2,
    borderRadius: 8,
    background: '#fff',
    border: '1px solid #e3efe5',
  },
  itemQty: {
    position: 'absolute',
    right: 8,
    top: 8,
    background: '#137a4f',
    color: '#fff',
    fontWeight: 600,
    fontSize: 13,
    borderRadius: 9,
    padding: '1.5px 7px',
  },
  recentOrders: {
    color: '#2177e4',
    margin: '18px 0 0 0',
    fontSize: 15.5,
    textDecoration: 'underline',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-block',
  },
  buttonWrap: {
    margin: '32px 0 0 0',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    background: 'linear-gradient(91deg, #fee96b 65%, #ffe27b 100%)',
    color: '#23273a',
    fontWeight: 700,
    fontSize: 22,
    border: 'none',
    borderRadius: 12,
    padding: '16px 38px',
    boxShadow: '0 3px 12px #f6e05e11',
    display: 'flex',
    alignItems: 'center',
    gap: 13,
    cursor: 'pointer',
    transition: 'transform 0.16s, box-shadow 0.16s, background 0.21s',
  },
};

const OrderConfirmation = ({ order }) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    // Confetti effect on mount
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.45 },
        zIndex: 2100,
      });
    });
  }, []);

  if (!order) {
    return (
      <div>
       
       
        <div style={styles.page}>
          <div style={styles.card}>
            <MdOutlineShoppingBag size={58} color="#bbb" style={{ marginBottom: 16 }} />
            <h2 style={styles.title}>Oops! No order details found.</h2>
            <div style={styles.note}>Please go back and complete your order first.</div>
          </div>
        </div>
      </div>
     
    );
  }

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 90 }}
      >
        <span style={styles.checkIcon}>
          <FaCheckCircle />
        </span>
        <div style={styles.title}>Order placed, thank you!</div>
        <div style={styles.note}>Confirmation will be sent to your email.</div>
        <div style={styles.shipping}>
          <strong>Shipping to:</strong> {order.address}
        </div>

        <div style={styles.section}>
          <div style={styles.delivery}>
            {order.deliveryDate
              ? `Delivery by ${order.deliveryDate}`
              : 'Delivery date will be notified'}
          </div>
        </div>

        <div style={styles.itemsWrap}>
          {order.items.map((item, idx) => (
            <div key={idx} style={styles.item}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.productName}
                  style={styles.itemImg}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://cdn-icons-png.flaticon.com/512/1170/1170678.png';
                  }}
                />
              ) : (
                <FaShoppingCart size={40} color="#8be4b1" />
              )}
              {item.quantity > 1 && (
                <span style={styles.itemQty}>{item.quantity}</span>
              )}
            </div>
          ))}
        </div>

        <a
          href="/orders"
          style={{... styles.recentOrders ,marginTop:-20}}
        >
          Review or edit your recent orders &rsaquo;
        </a>

        <div style={styles.buttonWrap}>
          <button
            ref={buttonRef}
            style={styles.button}
            onClick={() => {
              if (buttonRef.current) {
                buttonRef.current.style.transform = 'scale(0.94)';
                setTimeout(() => {
                  buttonRef.current.style.transform = '';
                  navigate('/');
                }, 220);
              }
            }}
          >
            <FaShoppingCart style={{ fontSize: 23 }} />
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
