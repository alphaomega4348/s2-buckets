import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/GroupOrder.css';
import axios from 'axios';

const GroupOrderSetup = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cartItems = state?.cartItems || [];
  const [groupName, setGroupName] = useState('My Eco Group');
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [showBadge, setShowBadge] = useState(false);
  const [groupCount, setGroupCount] = useState(0);

  const email = localStorage.getItem("email");

  const fakeGroupLink = `https://green-commerce.com/group/${encodeURIComponent(groupName.replace(/\s+/g, '-').toLowerCase())}`;

  const getDeadlineDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(deadlineDays));
    return date.toISOString().split('T')[0];
  };

  const handleCreateGroup = async () => {
    if (!email) {
      alert("Please log in before creating a group.");
      return navigate("/login");
    }

    const deadline = getDeadlineDate();
    const newGroup = {
      name: groupName,
      link: fakeGroupLink,
      deadline,
      cartItems,
      members: [email],
    };

    try {
      await axios.post('http://localhost:8080/group/create', newGroup);
      const existing = JSON.parse(localStorage.getItem('myGroups') || '[]');
      existing.push(newGroup);
      localStorage.setItem('myGroups', JSON.stringify(existing));
      setGroupCount(existing.length);
      setShowBadge(true);
    } catch (err) {
      console.error("Error creating group:", err);
      alert("Failed to create group. Please try again.");
    }
  };

  return (
    <div className="group-setup-container">
      <h1>🛠 Create Group Order</h1>
      <p>Invite friends to place a group order together and save shipping + earn eco rewards!</p>

      <div className="group-input">
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="group-input">
        <label htmlFor="deadline">Join Deadline (days):</label>
        <input
          type="number"
          id="deadline"
          value={deadlineDays}
          onChange={(e) => setDeadlineDays(e.target.value)}
        />
      </div>

      <div className="group-cart">
        <h2>Your Cart ({cartItems.length} items)</h2>
        {cartItems.map((item, i) => (
          <div key={i} className="group-cart-item">
            <img src={item.image} alt={item.productName} />
            <div>
              <h4>{item.productName}</h4>
              <p>Qty: {item.quantity}</p>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="share-section">
        <h3>📤 Share this link with others:</h3>
        <div className="share-link-box">
          <input type="text" readOnly value={fakeGroupLink} />
          <button onClick={() => {
            navigator.clipboard.writeText(fakeGroupLink);
            alert('Link copied to clipboard!');
          }}>Copy</button>
        </div>
      </div>

      <button className="create-group-btn" onClick={handleCreateGroup}>
        ✅ Create Group
      </button>

      {showBadge && (
        <div className="badge-modal-overlay" onClick={() => setShowBadge(false)}>
          <div className="badge-modal" onClick={e => e.stopPropagation()}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/763/763673.png"
              alt="Group Badge"
              className="badge-image"
              style={{ width: '100px', marginBottom: '10px' }}
            />
            <h3>🎉 You earned a badge!</h3>
            <p>🏅 Group Champion – Part of {groupCount} group order{groupCount > 1 ? 's' : ''}</p>
            <button className="badge-close" onClick={() => navigate('/my-groups')}>
              Go to My Groups
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupOrderSetup;