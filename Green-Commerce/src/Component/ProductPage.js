// src/components/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import cleaningcloth from "../assets/green products/cleaning/cleaningcloth.png";
import EcoWheel from './EcoWheel';
import EcoBadge from './EcoBadge';
import Headergreen from './Headergreen';
import Rewards from './Rewards';

const IMAGE_BASE = 'http://localhost:8080/uploads';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, dispatch] = useStateValue();
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/getproducts");
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((p) => p._id === id);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product._id,
        title: product.productName,
        image: product.productImage || src,
        price: product.price,
        rating: 4,
        badge_id: product.badge_id || "",
        subtitle: product.category,
        originalPrice: product.price,
        discountPercent: 20
      },
    });
    console.log("Product added to basket:", product.productName);
  };

  const filename = product?.productImage?.split(/[/\\]/).pop() || "";
  const src = `${IMAGE_BASE}/${filename}`;

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        background: '#E8F5E9'
      }}>
        <div className="spinner" />
        <style>{`
          .spinner {
            border: 8px solid #C8E6C9;
            border-top: 8px solid #2E7D32;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '2rem', fontSize: '1.2rem', color: '#777' }}>
        Sorry, that product doesn’t exist.
      </div>
    );
  }

  return (
    <div>
      <Headergreen />
      <div style={{
        display: 'flex',
        padding: '2rem',
        background: '#fff',
        alignItems: 'flex-start'
      }}>
        {/* LEFT: Product Image */}
        <div style={{ flex: '0 0 200px' }}>
          <img
            src={product.productImage || src}
            alt={product.productName}
            onError={e => e.currentTarget.src = src}
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* CENTER: Textual Info */}
        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', color: '#222' }}>
            {product.productName}
          </h1>

          {product.grade && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0.75rem 0'
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#2E7D32' }}>
                Eco Rating
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'radial-gradient(circle at 30% 30%, #E8F5E9, #C8E6C9)',
                color: '#2E7D32',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                animation: 'ecoPulse 1.2s ease-in-out infinite'
              }}>
                {product.grade}
              </div>
              <style>{`
                @keyframes ecoPulse {
                  0%   { transform: scale(1);    box-shadow: none; }
                  50%  { transform: scale(1.2);  box-shadow: 0 0 8px rgba(46,125,50,0.5); }
                  100% { transform: scale(1);    box-shadow: none; }
                }
              `}</style>
            </div>
          )}

          <div style={{ margin: '0.5rem 0 1rem', color: '#555', fontSize: '0.9rem' }}>
            ★★★★☆ (4.4) &nbsp;|&nbsp; (26,759 reviews)
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>-30%</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}> ₹{product.price}</span>
            <span style={{ textDecoration: 'line-through', color: '#999' }}>
              ₹{product.price - 30 * product.price / 100}
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
              Save Extra with 3 offers
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#444' }}>
              <li style={{ marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                Cashback: 5% back with Amazon Pay ICICI Bank credit card
              </li>
              <li style={{ marginBottom: '0.3rem', fontSize: '0.95rem' }}>
                Bank Offer: Flat ₹50 Instant Discount on SBI Debit Card
              </li>
              <li style={{ fontSize: '0.95rem' }}>
                …and <Link style={{ color: 'blue' }}>more offers</Link>
              </li>
            </ul>
          </div>

          <button
            style={{
              backgroundColor: '#fadb14',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
            onClick={() => addToBasket()}
          >
            Add to cart
          </button>

          <Rewards />
        </div>

        {/* RIGHT: EcoWheel & Badge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginLeft: '-1rem'
        }}>
          <EcoWheel grade={product.grade} />
          <EcoBadge />
        </div>
      </div>
    </div>
  );
}
