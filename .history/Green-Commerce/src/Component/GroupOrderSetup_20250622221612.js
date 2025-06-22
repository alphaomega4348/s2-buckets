import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/GroupOrder.css';
import axios from 'axios';
import { useStateValue } from "../StateProvider";

const GroupOrderSetup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  const cartItems = state?.cartItems || [];
  const [groupName, setGroupName] = useState('My Eco Group');
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");

  const fakeGroupLink = `https://green-commerce.com/group/${encodeURIComponent(groupName.replace(/\s+/g, '-').toLowerCase())}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        // Reverse Geocoding
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0`
          );
          const data = await response.json();
          if (data.status === 'OK') {
            const address = data.results[0].formatted_address;
            setLocationName(address);
          } else {
            setLocationName('Location not found');
          }
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setLocationName('Error getting location');
        }
      },
      (err) => {
        console.error("Location access denied", err);
        alert("Location permission is required to create a group.");
      }
    );
  }, []);

  const getDeadlineDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(deadlineDays));
    return date.toISOString().split('T')[0];
  };

  const handleCreateGroup = async () => {
    setErrorMessage('');
    if (!email) {
      alert("Please log in before creating a group.");
      return navigate("/login");
    }

    if (!coords) {
      return alert("Location not available yet.");
    }

    const deadline = getDeadlineDate();

    if (
      typeof coords.lat !== 'number' ||
      typeof coords.lng !== 'number' ||
      isNaN(coords.lat) ||
      isNaN(coords.lng)
    ) {
      return alert("Invalid coordinates. Please wait for location detection.");
    }
    
    const newGroup = {
      name: groupName,
      link: fakeGroupLink,
      deadline,
      cartItems: basket,
      members: [email],
      latitude: coords.lat,
      longitude: coords.lng,
      location: {
        type: 'Point',
        coordinates: [coords.lng, coords.lat]
      },
      locationName
    };

    try {
      // Create group
      await axios.post('http://localhost:8080/group/create', newGroup, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      try {
        const orderPayload = {
          userEmail: email,
          items: basket.map(item => ({
            productId: item.productId || item.id || '',
            name: item.title || item.name,
            description: item.description || '',
            image: item.image,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          ecoPackaging: false,
          placedAt: new Date(),
          totalAmount: basket.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
          address: locationName,
          deliveryDate: deadline
        };
        await axios.post('http://localhost:8080/place-order', orderPayload);
      } catch (orderErr) {
        console.error('Error saving order:', orderErr);
      }

      // Clear basket after group creation
      dispatch({ type: "CLEAR_BASKET" });

      // Fetch updated group count
      const groupRes = await axios.get('http://localhost:8080/group/my-groups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroupCount(groupRes.data.length);
      setShowBadge(true);

    } catch (err) {
      console.error("Error creating group:", err);
      setErrorMessage('Failed to create group. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: 24,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
        color: '#333',
        lineHeight: 1.4,
      }}
    >
      <h1 style={{ marginBottom: 8, fontSize: 28 }}>🛠 Create Group Order</h1>
      <p style={{ marginBottom: 24, color: '#666' }}>
        Invite friends to place a group order and earn eco rewards!
      </p>

      {/** Form fields */}
      {[
        { label: 'Group Name', value: groupName, onChange: (e) => setGroupName(e.target.value), type: 'text' },
        { label: 'Join Deadline (days)', value: deadlineDays, onChange: (e) => setDeadlineDays(e.target.value), type: 'number' },
        { label: 'Your Location', value: locationName || 'Detecting...', readOnly: true },
      ].map(({ label, ...fld }, i) => (
        <div
          key={i}
          style={{
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            animation: `fadeInUp 0.3s ${i * 0.1}s both`,
          }}
        >
          <label style={{ fontWeight: 600 }}>{label}</label>
          <input
            {...fld}
            style={{
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 15,
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#4CAF50')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
          />
        </div>
      ))}

      {/** Cart preview */}
      <div
        style={{
          marginBottom: 24,
          animation: 'fadeInUp 0.3s 0.4s both',
        }}
      >
        <h2 style={{ marginBottom: 12 }}>Your Cart ({basket.length} items)</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {basket.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: 12,
                borderRadius: 8,
                background: '#f9f9f9',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#555' }}>Qty: {item.quantity || 1}</div>
                <div style={{ fontSize: 14, color: '#4CAF50' }}>₹{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/** Share link */}
      <div
        style={{
          marginBottom: 24,
          animation: 'fadeInUp 0.3s 0.6s both',
        }}
      >
        <h3 style={{ marginBottom: 8 }}>📤 Share this link:</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            readOnly
            value={fakeGroupLink}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(fakeGroupLink);
              alert('Copied!');
            }}
            style={{
              background: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0 18px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#45A049')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#4CAF50')}
          >
            Copy
          </button>
        </div>
      </div>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</div>
      )}

      <button
        onClick={handleCreateGroup}
        style={{
          width: '100%',
          padding: '14px 0',
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          background: 'linear-gradient(90deg, #43A047 0%, #66BB6A 100%)',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(67,160,71,0.4)',
          transition: 'transform 0.1s, box-shadow 0.1s',
          animation: 'fadeInUp 0.3s 0.8s both',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(67,160,71,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(67,160,71,0.4)';
        }}
      >
        ✅ Create Group
      </button>

      {showBadge && (
        <div
          onClick={() => setShowBadge(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.2s',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              maxWidth: 320,
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              animation: 'scaleIn 0.2s',
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Badge"
              style={{ width: 80, marginBottom: 16 }}
            />
            <h2 style={{ marginBottom: 8 }}>🎉 Badge Unlocked!</h2>
            <p style={{ marginBottom: 24 }}>
              You’re a Group Champion! Participating in {groupCount}{' '}
              group{groupCount > 1 ? 's' : ''}
            </p>
            <button
              onClick={() => navigate('/my-groups')}
              style={{
                padding: '10px 24px',
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#45A049')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#4CAF50')}
            >
              View My Groups
            </button>
          </div>
        </div>
      )}

      {/** Keyframes */}
      <style>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
    `}</style>
    </div>
  );
};

export default GroupOrderSetup;