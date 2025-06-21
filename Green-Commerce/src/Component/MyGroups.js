import React, { useEffect, useState } from 'react';
import GroupCard from './GroupCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("email");

  useEffect(() => {
    if (!currentUser) {
      alert("Please log in to view your groups.");
      return navigate("/login");
    }

    axios.get('http://localhost:8080/group/my-groups', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
      }
    })
      .then((res) => setGroups(res.data))
      .catch((err) => console.error('Failed to fetch groups:', err));
  }, [currentUser, navigate]);

  const handleLeaveGroup = (groupId) => {
    setGroups((prev) => prev.filter(group => group._id !== groupId));
  };

  return (
    <div className="my-groups-container" style={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ fontSize: '26px', marginBottom: '20px' }}>📦 My Group Orders</h1>

      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '24px',
          padding: '10px 20px',
          backgroundColor: '#ffd814',
          color: '#111',
          fontWeight: 'bold',
          borderRadius: '6px',
          border: '1px solid #f0c14b',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        ⬅ Back to Home
      </button>

      {groups.length === 0 ? (
        <div style={{
          background: '#fffbea',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>No groups yet.</p>
          <p>Click <strong>Start Group Order</strong> on the cart page to create your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {groups.map((group, i) =>
            <GroupCard
              key={i}
              group={group}
              currentUser={currentUser}
              onLeave={handleLeaveGroup}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyGroups;