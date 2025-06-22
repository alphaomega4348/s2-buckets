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
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(transparent, #f3f9f4)',
      fontFamily: '"Segoe UI", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: 1000,
        margin: '0 auto 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: 32,
          color: '#2E3A44',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          📦 My Group Orders
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#ffd814',
            color: '#111',
            padding: '12px 24px',
            borderRadius: 6,
            border: 'none',
            fontSize: 16,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
        >
          ← Back to Home
        </button>
      </div>

      {groups.length === 0 && (
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: 24,
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
          textAlign: 'center',
          color: '#555',
          fontSize: 16
        }}>
          <p>No groups yet. Start one from your cart to get going!</p>
        </div>
      )}

      {groups.length > 0 && (
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
          gap: 24
        }}>
          {groups.map(group => (
            <div key={group._id}
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <GroupCard
                group={group}
                currentUser={currentUser}
                onLeave={handleLeaveGroup}
              />
              {group.locationName && (
                <div style={{
                  padding: '12px 16px',
                  borderTop: '1px solid #eee',
                  fontSize: 14,
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  📍 <span>{group.locationName}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroups;