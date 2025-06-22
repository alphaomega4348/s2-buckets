import React, { useEffect, useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import '../Css/NearbyGroups.css';

const NearbyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [radiusKm, setRadiusKm] = useState(5);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const email = localStorage.getItem("email");
  const userEmail = email;

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          const res = await axios.get(
            `http://localhost:8080/group/nearby?lat=${latitude}&lng=${longitude}&radius=${radiusKm}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setGroups(res.data);
        } catch (err) {
          console.error("Error fetching nearby groups:", err);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Please enable location to see nearby groups.");
      }
    );
  }, [token, radiusKm]);

  const joinGroup = async (groupId) => {
    try {
      // Join the group
      await axios.post(
        `http://localhost:8080/group/join/${groupId}`,
        { user: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // ✅ Fetch group data to extract cart items for the order
      const groupRes = await axios.get(`http://localhost:8080/group/${groupId}`);
      const group = groupRes.data;

      // ✅ Prepare order structure based on your schema
      const orderItems = group.cartItems.map(item => ({
        productId: item.id || item._id || 'unknown', // fallback if id not present
        name: item.title || item.name,
        description: item.description || '',
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1
      }));

      const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const orderPayload = {
        userEmail: email,
        items: orderItems,
        totalAmount,
        ecoPackaging: true, // or false if you want to let user decide
        deliveryDate: group.deadline, // optional mapping
        address: group.locationName || 'Unknown'
      };

      // ✅ Send to Order DB
      await axios.post("http://localhost:8080/place-order", orderPayload);

      // ✅ Celebrate
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        emojis: ['🛍️', '📦', '🎉']
      });

      // ✅ Store and show badge
      const existing = JSON.parse(localStorage.getItem('myGroups') || '[]');
      const updated = [...existing, { id: groupId }];
      localStorage.setItem('myGroups', JSON.stringify(updated));
      setGroupCount(updated.length);
      setShowBadge(true);
    } catch (err) {
      console.error("Join Group Error:", err);
      alert(err.response?.data?.message || "Failed to join group.");
    }
  };

  return (
    <div
      className="nearby-groups-container"
      style={{
        padding: '24px',
        fontFamily: 'Segoe UI, sans-serif',
        background: 'linear-gradient(180deg, transparent, #f3f9f4)',
        minHeight: '100vh',
        color: '#233d4a',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>📦 Nearby Group Orders</h1>

      {/* Radius Slider */}
      <div
        className="slider-section"
        style={{
          margin: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <label style={{ fontWeight: 600, color: '#1f2a33' }}>
          🔍 Show groups within{' '}
          <span style={{ color: '#2e7d32' }}>{radiusKm} km</span>
        </label>
        <input
          type="range"
          min={1}
          max={20}
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: '#2e7d32',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Groups Grid */}
      {userLocation && groups.length > 0 ? (
        <div
          className="group-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
            gap: 24,
          }}
        >
          {groups.map((group) => {
            const isMember = group.members.includes(userEmail);
            return (
              <div
                key={group._id}
                className="group-card"
                style={{
                  background: '#ffffff',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                {/* Card Content */}
                <div style={{ padding: '16px 20px' }}>
                  <h2 style={{ margin: 0, marginBottom: 8, fontSize: 20, color: '#233d4a' }}>
                    {group.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <span
                      style={{
                        background: group.isClosed ? '#FFB74D' : '#A5D6A7',
                        color: '#fff',
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {group.isClosed
                        ? 'Closed'
                        : `${Math.max(
                          0,
                          Math.ceil((new Date(group.deadline) - Date.now()) / (1000 * 60 * 60 * 24))
                        )} day(s) left`}
                    </span>
                  </div>

                  <p style={{ margin: '4px 0', fontSize: 14 }}>
                    📍 <strong>Location:</strong>{' '}
                    {group.locationName || 'Unknown'}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: 14 }}>
                    👥 <strong>Members:</strong> {group.members.length}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: 14 }}>
                    🗓 <strong>Deadline:</strong>{' '}
                    {new Date(group.deadline).toLocaleDateString()}
                  </p>
                  <p style={{ margin: '4px 0 16px', fontSize: 14 }}>
                    🔗{' '}
                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#2e7d32', textDecoration: 'none' }}
                    >
                      {group.link}
                    </a>
                  </p>

                  <button
                    disabled={isMember}
                    onClick={() => !isMember && joinGroup(group._id)}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      background: isMember ? '#ccc' : '#2e7d32',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      cursor: isMember ? 'default' : 'pointer',
                      fontWeight: 600,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isMember) e.currentTarget.style.background = '#276b2b';
                    }}
                    onMouseLeave={(e) => {
                      if (!isMember) e.currentTarget.style.background = '#2e7d32';
                    }}
                  >
                    {isMember ? 'Already a Member' : 'Join Group'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        userLocation && (
          <p style={{ color: '#555', fontStyle: 'italic' }}>
            No groups found within {radiusKm} km.
          </p>
        )
      )}

      {/* Join Badge Modal */}
      {showBadge && (
        <div
          className="badge-modal-overlay"
          onClick={() => setShowBadge(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className="badge-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              padding: 32,
              borderRadius: 12,
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              maxWidth: 320,
              width: '90%',
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Group Badge"
              style={{ width: 80, marginBottom: 16 }}
            />
            <h2 style={{ margin: '8px 0', color: '#2e7d32' }}>🎉 You joined a group!</h2>
            <p style={{ marginBottom: 24, fontSize: 15 }}>
              🏅 You've joined <strong>{groupCount}</strong> group order
              {groupCount > 1 ? 's' : ''}!
            </p>
            <button
              onClick={() => navigate('/my-groups')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2e7d32',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#276b2b')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#2e7d32')}
            >
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default NearbyGroups;