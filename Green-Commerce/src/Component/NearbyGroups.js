import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/NearbyGroups.css';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const NearbyGroups = () => {
  const [groups, setGroups] = useState([]);
  const user = localStorage.getItem("email"); 
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");


  useEffect(() => {
    axios.get("http://localhost:8080/group/all")
      .then((res) => setGroups(res.data))
      .catch((err) => console.error("Error fetching nearby groups:", err));
  }, []);

  const joinGroup = async (groupId) => {
    try {
        await axios.post(`http://localhost:8080/group/join/${groupId}`, { user }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
          });

      // 🎊 Confetti burst
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        emojis: ['💚', '♻️', '🌍'],
        scalar: 1.2
      });

      // 🌟 Badge logic
      const joined = JSON.parse(localStorage.getItem('myGroups') || '[]');
      const updated = [...joined, { id: groupId }];
      localStorage.setItem('myGroups', JSON.stringify(updated));
      setGroupCount(updated.length);
      setShowBadge(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to join group.");
    }
  };

  return (
    <div className="nearby-groups-container">
      <h1 className="title">📍 Nearby Group Orders</h1>

      {groups.length === 0 ? (
        <p>No groups available to join.</p>
      ) : (
        <div className="group-grid">
          {groups.map((group) => (
            <div key={group._id} className="group-card">
              <h2>{group.name}</h2>
              <p><strong>Deadline:</strong> {group.deadline}</p>
              <p><strong>Members:</strong> {group.members.length}</p>
              <p><strong>Items:</strong> {group.cartItems.length}</p>
              <button className="join-btn" onClick={() => joinGroup(group._id)}>
                Join Group
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🏅 Badge Modal */}
      {showBadge && (
        <div className="badge-modal-overlay" onClick={() => setShowBadge(false)}>
          <div className="badge-modal" onClick={e => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Group Badge"
              className="badge-image"
              style={{ width: '100px', marginBottom: '10px' }}
            />
            <h3>🎉 You joined a group!</h3>
            <p>🏅 Group Explorer – You've joined {groupCount} group order{groupCount > 1 ? 's' : ''}!</p>
            <button className="badge-close" onClick={() => navigate('/my-groups')}>
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyGroups;