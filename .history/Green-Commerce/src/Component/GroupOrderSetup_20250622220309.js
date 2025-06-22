import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from "../StateProvider";

const GroupOrderSetup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const [groupName, setGroupName] = useState('My Eco Group');
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");
  const fakeGroupLink = `https://green-commerce.com/group/${encodeURIComponent(
    groupName.replace(/\s+/g, '-').toLowerCase()
  )}`;

  // Slide‐in animation helper
  const slideIn = {
    animation: 'slideIn 0.5s ease-out forwards',
    opacity: 0,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setCoords({ lat, lng });
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_API_KEY`
          );
          const data = await res.json();
          setLocationName(data.results?.[0]?.formatted_address || 'Unknown location');
        } catch {
          setLocationName('Error fetching location');
        }
      },
      () => alert("Location permission is required.")
    );
  }, []);

  const getDeadlineDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + Number(deadlineDays));
    return d.toISOString().split('T')[0];
  };

  const handleCreateGroup = async () => {
    setErrorMessage('');
    if (!email) return navigate("/login");
    if (!coords) return alert("Waiting for location…");

    const newGroup = {
      name: groupName,
      link: fakeGroupLink,
      deadline: getDeadlineDate(),
      cartItems: basket,
      members: [email],
      latitude: coords.lat,
      longitude: coords.lng,
      location: { type: 'Point', coordinates: [coords.lng, coords.lat] },
      locationName,
    };

    try {
      await axios.post('http://localhost:8080/group/create', newGroup, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // also save order
      try {
        await axios.post('http://localhost:8080/place-order', {
          userEmail: email,
          items: basket.map(i => ({
            productId: i.productId || i.id,
            name: i.title || i.name,
            description: i.description || '',
            image: i.image,
            price: i.price,
            quantity: i.quantity || 1,
          })),
          ecoPackaging: false,
          placedAt: new Date(),
          totalAmount: basket.reduce((s, i) => s + i.price * (i.quantity || 1), 0),
          address: locationName,
          deliveryDate: getDeadlineDate(),
        });
      } catch { }

      dispatch({ type: "CLEAR_BASKET" });
      const { data } = await axios.get('http://localhost:8080/group/my-groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroupCount(data.length);
      setShowBadge(true);

    } catch {
      setErrorMessage('Failed to create group. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      {/* inject keyframes */}
      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>

      <div style={{ ...styles.section, ...slideIn }}>
        <h1 style={styles.title}>🛠 Create Group Order</h1>
        <p style={styles.subtitle}>
          Invite friends, save on shipping & earn eco rewards!
        </p>
      </div>

      <div style={{ ...styles.section, ...slideIn, animationDelay: '0.1s' }}>
        <label style={styles.label}>Group Name:</label>
        <input
          style={styles.input}
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />

        <label style={styles.label}>Join Deadline (days):</label>
        <input
          type="number"
          style={styles.input}
          value={deadlineDays}
          onChange={e => setDeadlineDays(e.target.value)}
        />

        <label style={styles.label}>Your Location:</label>
        <input
          style={{ ...styles.input, background: '#f3f3f3' }}
          readOnly
          value={locationName || 'Detecting…'}
        />
      </div>

      <div style={{ ...styles.section, ...slideIn, animationDelay: '0.2s' }}>
        <h2 style={styles.sectionTitle}>Your Cart ({basket.length} item{basket.length !== 1 ? 's' : ''})</h2>
        {basket.map((item, i) => (
          <div key={i} style={styles.cartItem}>
            <img src={item.image} alt="" style={styles.cartImage} />
            <div>
              <div style={styles.cartName}>{item.title || item.name}</div>
              <div>Qty: {item.quantity || 1}</div>
              <div>₹{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...styles.section, ...slideIn, animationDelay: '0.3s' }}>
        <h3 style={styles.sectionTitle}>📤 Share this link:</h3>
        <div style={styles.shareRow}>
          <input
            readOnly
            value={fakeGroupLink}
            style={{ ...styles.input, flex: 1, marginRight: 8 }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(fakeGroupLink);
              alert('Copied!');
            }}
            style={styles.copyButton}
          >
            Copy
          </button>
        </div>
      </div>

      {errorMessage && (
        <div style={{ color: 'crimson', margin: '12px 0', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}

      <div style={{ ...styles.section, ...slideIn, animationDelay: '0.4s', textAlign: 'center' }}>
        <button
          onClick={handleCreateGroup}
          style={styles.createButton}
          onMouseEnter={e => e.currentTarget.style.animation = 'pulse 1.2s infinite'}
          onMouseLeave={e => e.currentTarget.style.animation = 'none'}
        >
          ✅ Create Group
        </button>
      </div>

      {showBadge && (
        <div style={styles.badgeOverlay} onClick={() => setShowBadge(false)}>
          <div style={styles.badgeModal} onClick={e => e.stopPropagation()}>
            <img src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              style={styles.badgeImage} />
            <h3 style={styles.badgeTitle}>🎉 You earned a badge!</h3>
            <p style={styles.badgeText}>
              🏅 Group Champion – part of {groupCount} order{groupCount > 1 ? 's' : ''}
            </p>
            <button
              onClick={() => navigate('/my-groups')}
              style={styles.badgeButton}
            >
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#eef2f1",
    padding: 20,
    lineHeight: 1.4,
  },
  section: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: 24,
    margin: "12px auto",
    maxWidth: 600,
  },
  title: { fontSize: 28, margin: 0, color: "#2d4b3a" },
  subtitle: { color: "#5a6b63", marginTop: 8 },
  label: { display: "block", margin: "16px 0 4px", fontWeight: 600 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #cbd2d1",
    fontSize: 16,
    outline: "none"
  },
  sectionTitle: { margin: "0 0 12px", color: "#274832" },
  cartItem: {
    display: "flex", alignItems: "center",
    padding: "8px 0", borderBottom: "1px solid #e4e8e7"
  },
  cartImage: { width: 60, height: 60, objectFit: "cover", marginRight: 12, borderRadius: 6 },
  cartName: { fontWeight: 600, marginBottom: 4 },
  shareRow: { display: "flex", alignItems: "center" },
  copyButton: {
    padding: "8px 16px",
    background: "#ffd54f",
    border: "none", borderRadius: 6,
    fontWeight: 600, cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  createButton: {
    padding: "14px 32px",
    background: "linear-gradient(90deg,#44d7a8 65%,#51e2a4)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  badgeOverlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000
  },
  badgeModal: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    animation: "slideIn 0.4s ease-out"
  },
  badgeImage: { width: 80, marginBottom: 12 },
  badgeTitle: { margin: "12px 0 6px", color: "#2d5f3b" },
  badgeText: { margin: "0 0 16px", color: "#4a5d53" },
  badgeButton: {
    padding: "10px 20px",
    background: "#44d7a8",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer"
  }
};

export default GroupOrderSetup;
