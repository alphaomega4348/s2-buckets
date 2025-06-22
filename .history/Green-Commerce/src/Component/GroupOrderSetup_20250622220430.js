import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from "../StateProvider";

export default function GroupOrderSetup() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  const [groupName, setGroupName] = useState('My Eco Group');
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState('');
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [groupCount, setGroupCount] = useState(0);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");
  const fakeLink = `https://green-commerce.com/group/${encodeURIComponent(
    groupName.replace(/\s+/g, '-').toLowerCase()
  )}`;

  // Try to reverse‐geocode on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords: { latitude: lat, longitude: lng } }) => {
      setCoords({ lat, lng });
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
        );
        const j = await res.json();
        setLocationName(j.results?.[0]?.formatted_address || 'Unknown');
      } catch {
        setLocationName('Lookup failed');
      }
    }, () => setLocationName('Permission denied'));
  }, []);

  const deadlineDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + Number(deadlineDays));
    return d.toISOString().split('T')[0];
  };

  async function createGroup() {
    setError('');
    if (!email) return navigate('/login');
    if (!coords) return setError('Waiting for location…');

    const payload = {
      name: groupName,
      link: fakeLink,
      deadline: deadlineDate(),
      cartItems: basket,
      members: [email],
      latitude: coords.lat,
      longitude: coords.lng,
      location: { type: 'Point', coordinates: [coords.lng, coords.lat] },
      locationName
    };

    try {
      await axios.post('http://localhost:8080/group/create', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // also place order behind the scenes
      await axios.post('http://localhost:8080/place-order', { ...payload, userEmail: email, totalAmount: basket.reduce((s, i) => (s + i.price * (i.quantity || 1)), 0) }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'CLEAR_BASKET' });
      const { data } = await axios.get('http://localhost:8080/group/my-groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroupCount(data.length);
      setBadgeVisible(true);
    } catch {
      setError('Could not create group, try again.');
    }
  }

  if (!basket.length) return (
    <div style={styles.empty}>Your cart is empty.</div>
  );

  return (
    <div style={styles.wrap}>
      <h1 style={styles.h1}>Create Group Order</h1>
      <p style={styles.p}>Invite friends, split shipping & earn eco rewards!</p>

      <div style={styles.formGrid}>
        <div style={styles.field}>
          <label style={styles.label}>Group Name</label>
          <input
            style={styles.input}
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Deadline (days)</label>
          <input
            type="number"
            style={styles.input}
            value={deadlineDays}
            onChange={e => setDeadlineDays(e.target.value)}
          />
        </div>
        <div style={styles.fieldFull}>
          <label style={styles.label}>Your Location</label>
          <input
            readOnly
            style={{ ...styles.input, background: '#f5f5f5' }}
            value={locationName || 'Detecting...'}
          />
        </div>
      </div>

      <div style={styles.cart}>
        <h2 style={styles.h2}>Your Cart ({basket.length})</h2>
        {basket.map((it, i) => (
          <div key={i} style={styles.cartItem}>
            <img src={it.image} alt="" style={styles.cartImg} />
            <div>
              <div style={styles.cartName}>{it.title || it.name}</div>
              <div>Qty: {it.quantity || 1}</div>
              <div>₹{it.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.share}>
        <input style={styles.shareInput} readOnly value={fakeLink} />
        <button style={styles.shareBtn} onClick={() => {
          navigator.clipboard.writeText(fakeLink);
        }}>Copy Link</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <button
        style={styles.primary}
        onClick={createGroup}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        ✅ Create & Launch
      </button>

      {badgeVisible && (
        <div style={styles.modalOverlay} onClick={() => setBadgeVisible(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              style={styles.badgeImg}
            />
            <h3 style={styles.h3}>Group Champion!</h3>
            <p style={styles.p}>You’ve joined {groupCount} group order{groupCount > 1 ? 's' : ''}</p>
            <button
              style={styles.secondary}
              onClick={() => navigate('/my-groups')}
            >View My Groups</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#334',
    padding: 20,
    maxWidth: 800,
    margin: 'auto'
  },
  h1: { fontSize: 28, margin: 0 },
  h2: { fontSize: 22, borderBottom: '1px solid #ddd', paddingBottom: 4 },
  h3: { margin: '12px 0' },
  p: { margin: '8px 0 16px', color: '#556' },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 24
  },
  field: {},
  fieldFull: { gridColumn: '1/ -1' },
  label: { display: 'block', marginBottom: 4, fontWeight: 600 },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 14
  },
  cart: {
    marginBottom: 24
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  cartImg: { width: 50, height: 50, objectFit: 'cover', borderRadius: 4 },
  cartName: { fontWeight: 600 },
  share: {
    display: 'flex',
    gap: 8,
    marginBottom: 24
  },
  shareInput: {
    flex: 1,
    padding: '8px 12px',
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4
  },
  shareBtn: {
    padding: '8px 16px',
    border: 'none',
    background: '#4caf50',
    color: '#fff',
    borderRadius: 4,
    cursor: 'pointer'
  },
  primary: {
    width: '100%',
    padding: '12px',
    background: '#388e3c',
    color: '#fff',
    border: 'none',
    fontSize: 16,
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'transform 0.15s'
  },
  secondary: {
    marginTop: 12,
    padding: '8px 16px',
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  error: {
    color: 'crimson',
    marginBottom: 16,
    textAlign: 'center'
  },
  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  modal: {
    background: '#fff', padding: 24, borderRadius: 8,
    width: 300, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  badgeImg: { width: 80, marginBottom: 12 }
};
