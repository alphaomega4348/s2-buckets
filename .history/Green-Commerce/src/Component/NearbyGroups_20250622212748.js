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
    <div className="nearby-groups-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#232f3e' }}>📦 Nearby Group Orders</h1>

      <div className="slider-section" style={{ margin: '20px 0' }}>
        <label style={{ fontWeight: 'bold', color: '#111' }}>
          🔍 Show groups within <span style={{ color: '#007185' }}>{radiusKm} km</span>
        </label>
        <input
          type="range"
          min={1}
          max={20}
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          style={{ width: '100%', marginTop: '8px' }}
        />
      </div>

      {userLocation && groups.length > 0 ? (
        <div className="group-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {groups.map((group) => {
            const isMember = group.members.includes(userEmail);
            return (
              <div key={group._id} className="group-card" style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                width: '300px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: '18px', color: '#111' }}>{group.name}</h2>
                <p><strong>Deadline:</strong> {new Date(group.deadline).toLocaleDateString()}</p>
                <p><strong>Members:</strong> {group.members.length}</p>
                <p><strong>Items:</strong> {group.cartItems.length}</p>
                <p><strong>Location:</strong> {group.locationName || "Unknown"}</p>
                <button
                  disabled={isMember}
                  onClick={() => !isMember && joinGroup(group._id)}
                  style={{
                    backgroundColor: isMember ? '#ccc' : '#ffa41c',
                    color: '#111',
                    border: 'none',
                    padding: '10px 14px',
                    marginTop: '10px',
                    borderRadius: '4px',
                    cursor: isMember ? 'default' : 'pointer'
                  }}
                >
                  {isMember ? 'Already a Member' : 'Join Group'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        userLocation && <p style={{ color: '#555' }}>No groups found within {radiusKm} km.</p>
      )}

      {showBadge && (
        <div className="badge-modal-overlay" onClick={() => setShowBadge(false)} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="badge-modal" style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Group Badge"
              style={{ width: '100px', marginBottom: '10px' }}
            />
            <h3>🎉 You joined a group!</h3>
            <p>🏅 You've joined {groupCount} group order{groupCount > 1 ? 's' : ''}!</p>
            <button onClick={() => navigate('/my-groups')} style={{
              marginTop: '10px',
              padding: '10px 16px',
              backgroundColor: '#007185',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyGroups;