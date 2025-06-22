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
      padding: '40px 20px',
      // maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: '"Segoe UI", Arial, sans-serif',
      background: '#f3f7f9',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <h1 style={{
          fontSize: 28,
          color: '#23303f',
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
            padding: '10px 20px',
            borderRadius: 6,
            border: '1px solid #f0c14b',
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'transform 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          ← Back to Home
        </button>
      </div>

      {/* Empty state */}
      {groups.length === 0 && (
        <div style={{
          background: '#fff',
          padding: 24,
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center',
          color: '#555'
        }}>
          <p style={{ fontSize: 16, marginBottom: 8 }}>You haven’t joined or created any groups yet.</p>
          <p>Head back to your cart and click “Start Group Order” to begin!</p>
        </div>
      )}

      {/* Group grid */}
      {groups.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20
        }}>
          {groups.map((group, i) => (
            <div key={group._id} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.15s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
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
                  color: '#444',
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