import React, { useState } from 'react';

const tabs = ['Your Orders', 'Buy Again', 'Prime', 'Wish Lists', 'Your Account', 'Green Store'];

export default function StandardDashboard() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Sample orders for "Your Orders"
    const sampleOrders = [
        { id: 'A123', date: '2024-06-01', total: '$45.00' },
        { id: 'B456', date: '2024-05-20', total: '$120.99' },
        { id: 'C789', date: '2024-05-05', total: '$75.50' }
    ];

    // Common styles
    const container = { fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 };
    const header = {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(90deg, #006600, #004d00)', padding: '16px 24px', color: '#fff'
    };
    const nav = { display: 'flex', gap: '8px', padding: '8px 24px', backgroundColor: '#e6f4ea', borderBottom: '1px solid #c3e6cd' };
    const tabStyle = (active) => ({
        padding: '10px 16px', borderRadius: '4px 4px 0 0',
        backgroundColor: active ? '#e0f8de' : '#f5fcf7', cursor: 'pointer',
        border: active ? '2px solid #004d00' : '2px solid transparent', transition: '0.2s'
    });
    const layout = { display: 'flex', padding: '24px', gap: '24px', backgroundColor: '#f3faf5' };
    const sidebar = { width: '220px', backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
    const linkStyle = { display: 'block', padding: '10px', margin: '4px 0', color: '#2e3e23', textDecoration: 'none', borderRadius: '4px', cursor: 'pointer' };
    const cardBase = { padding: '16px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: '0.2s' };
    const buttonPrimary = { padding: '10px 20px', backgroundColor: '#004d00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '12px' };
    const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
    const modalContent = { backgroundColor: '#fff', padding: '24px', borderRadius: '8px', width: '320px', textAlign: 'center' };

    function handleLogout() {
        localStorage.clear();
        // redirect or update state
        window.location.reload();
    }

    return (
        <div style={container}>
            {/* Header */}
            <header style={header}>
                <h1 style={{ fontSize: '24px', margin: 0 }}>Hello, Vishal</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ fontSize: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>🔔</button>
                    <button style={{ fontSize: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✉️</button>
                    <button style={{ fontSize: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>❓</button>
                    <button onClick={() => setShowLogoutModal(true)} style={buttonPrimary}>Logout</button>
                </div>
            </header>

            {/* Tab navigation */}
            <nav style={nav}>
                {tabs.map(tab => (
                    <div key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(activeTab === tab)}>
                        {tab}
                    </div>
                ))}
            </nav>

            {/* Layout */}
            <div style={layout}>
                {/* Sidebar quick links */}
                <aside style={sidebar}>
                    <a style={linkStyle} onClick={() => setActiveTab('Your Orders')}>Your Orders</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Login & security')}>Login & security</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Prime')}>Prime</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Your Addresses')}>Your Addresses</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Your business account')}>Your business account</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Payment options')}>Payment options</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Amazon Pay balance')}>Amazon Pay balance</a>
                    <a style={linkStyle} onClick={() => setActiveTab('Contact Us')}>Contact Us</a>
                </aside>

                {/* Main content */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Your Orders */}
                    {activeTab === 'Your Orders' && (
                        <section style={cardBase}>
                            <h2 style={{ marginTop: 0 }}>Your Orders</h2>
                            <p>Track, return, or buy things again</p>
                            {sampleOrders.map(o => (
                                <div key={o.id}>{o.id} | {o.date} | {o.total}</div>
                            ))}
                            <button style={buttonPrimary}>View All Orders</button>
                        </section>
                    )}

                    {/* Login & security */}
                    {activeTab === 'Login & security' && (
                        <section style={cardBase}><h2>Login & security</h2><p>Edit login, name, and mobile number</p></section>
                    )}

                    {/* Prime */}
                    {activeTab === 'Prime' && (
                        <section style={cardBase}><h2>Prime</h2><p>View benefits and payment settings</p></section>
                    )}

                    {/* Your Addresses */}
                    {activeTab === 'Your Addresses' && (
                        <section style={cardBase}><h2>Your Addresses</h2><p>Edit addresses for orders and gifts</p></section>
                    )}

                    {/* Your business account */}
                    {activeTab === 'Your business account' && (
                        <section style={cardBase}><h2>Your business account</h2><p>Sign up for free to save up to 28% with GST invoice and bulk discounts and purchase on credit.</p></section>
                    )}

                    {/* Payment options */}
                    {activeTab === 'Payment options' && (
                        <section style={cardBase}><h2>Payment options</h2><p>Edit or add payment methods</p></section>
                    )}

                    {/* Amazon Pay balance */}
                    {activeTab === 'Amazon Pay balance' && (
                        <section style={cardBase}><h2>Amazon Pay balance</h2><p>Add money to your balance</p></section>
                    )}

                    {/* Contact Us */}
                    {activeTab === 'Contact Us' && (
                        <section style={cardBase}><h2>Contact Us</h2><p>Contact our customer service via phone or chat</p></section>
                    )}

                    {/* Green Store Dashboard */}
                    {activeTab === 'Green Store' && (
                        <section style={cardBase}>
                            <h2>Your Green Store Dashboard</h2>
                            <p>Track your sustainable purchases, carbon savings, and more.</p>
                            <button style={buttonPrimary}>View Green Metrics</button>
                        </section>
                    )}
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>
                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
                            <button onClick={handleLogout} style={{ ...buttonPrimary, backgroundColor: '#cc0000' }}>Yes, Logout</button>
                            <button onClick={() => setShowLogoutModal(false)} style={{ padding: '10px 20px', borderRadius: '4px', background: '#e5e7eb', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
