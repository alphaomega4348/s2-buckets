import React, { useState } from 'react';

const tabs = ['Your Orders', 'Buy Again', 'Prime', 'Wish Lists', 'Your Account'];

export default function StandardDashboard() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Sample orders for "Your Orders"
    const sampleOrders = [
        { id: 'A123', date: '2024-06-01', total: '$45.00' },
        { id: 'B456', date: '2024-05-20', total: '$120.99' },
        { id: 'C789', date: '2024-05-05', total: '$75.50' }
    ];

    // Styles
    const containerStyle = { fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #0066cc, #004a99)',
        padding: '16px 24px',
        color: '#fff'
    };

    const navStyle = { display: 'flex', gap: '8px', padding: '0 24px', backgroundColor: '#e9eff5', borderBottom: '1px solid #cbd5e1' };
    const tabStyle = (isActive) => ({
        padding: '12px 20px',
        border: isActive ? '2px solid #004a99' : '2px solid transparent',
        borderRadius: '4px 4px 0 0',
        backgroundColor: isActive ? '#f0f4fa' : '#f9fbfc',
        cursor: 'pointer',
        transition: 'all 0.2s'
    });

    const layoutStyle = { display: 'flex', padding: '24px', gap: '24px', backgroundColor: '#f3f4f6' };
    const sidebarStyle = {
        width: '240px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'background 0.3s'
    };
    const quickLinkStyle = {
        padding: '10px 12px',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        fontSize: '14px',
        color: '#334155',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'background 0.2s'
    };

    const cardBase = {
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, background 0.2s',
        backgroundColor: '#ffffff'
    };
    const cardHover = (e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.backgroundColor = '#f7f9fc'; };
    const cardUnhover = (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.backgroundColor = '#ffffff'; };

    const buttonPrimary = {
        padding: '10px 20px',
        backgroundColor: '#004a99',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background 0.2s'
    };

    return (
        <div style={containerStyle}>
            {/* Header with Logout */}
            <header style={headerStyle}>
                <h1 style={{ fontSize: '24px', margin: 0 }}>Hello, Vishal</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#fff', cursor: 'pointer' }}>🔔</button>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#fff', cursor: 'pointer' }}>✉️</button>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#fff', cursor: 'pointer' }}>❓</button>
                    <button onClick={() => alert('Logging out...')} style={{ ...buttonPrimary, backgroundColor: '#cc0000' }}>Logout</button>
                </div>
            </header>

            {/* Tabs */}
            <nav style={navStyle}>
                {tabs.map(tab => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={tabStyle(activeTab === tab)}
                    >
                        {tab}
                    </div>
                ))}
            </nav>

            {/* Layout */}
            <div style={layoutStyle}>
                {/* Sidebar */}
                <aside style={sidebarStyle}>
                    {['Orders', 'Payments', 'Addresses', 'Subscriptions', 'Gift Cards'].map(item => (
                        <button
                            key={item}
                            style={quickLinkStyle}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >{item}</button>
                    ))}
                </aside>

                {/* Main Panel */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Your Orders with sample data */}
                    {activeTab === 'Your Orders' && (
                        <section style={cardBase} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Your Top Orders</h2>
                            {sampleOrders.map(o => (
                                <div key={o.id} style={{ marginBottom: '8px', color: '#334155' }}>
                                    <strong>Order {o.id}</strong> on {o.date} — {o.total}
                                </div>
                            ))}
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>View all orders</button>
                        </section>
                    )}

                    {/* Buy Again */}
                    {activeTab === 'Buy Again' && (
                        <section style={cardBase} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Buy Again</h2>
                            <p style={{ color: '#6b7280' }}>Items you've purchased frequently appear here.</p>
                        </section>
                    )}

                    {/* Prime */}
                    {activeTab === 'Prime' && (
                        <section style={{ ...cardBase, backgroundColor: '#fafafb' }} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Prime Membership</h2>
                            <p style={{ color: '#6b7280' }}>Member since Jan 2023 • Renewal: Dec 2024</p>
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>Manage membership</button>
                        </section>
                    )}

                    {/* Wish Lists */}
                    {activeTab === 'Wish Lists' && (
                        <section style={{ ...cardBase, backgroundColor: '#fdfdfd' }} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Your Wish Lists</h2>
                            <p style={{ color: '#6b7280' }}>Default List, Birthday Gifts, and more.</p>
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>Create new list</button>
                        </section>
                    )}

                    {/* Your Account */}
                    {activeTab === 'Your Account' && (
                        <section style={cardBase} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Account Settings</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {['Profile & security', 'Login & security', 'Payment methods', 'Manage addresses'].map(i =>
                                    <button key={i} style={quickLinkStyle}>{i}</button>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Recommendations */}
                    <section>
                        <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#111827' }}>Recommendations for you</h2>
                        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} style={cardBase} onMouseOver={cardHover} onMouseOut={cardUnhover}>
                                    <div style={{ height: '100px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '12px' }}></div>
                                    <p style={{ fontWeight: '600', margin: '8px 0' }}>Product {i}</p>
                                    <p style={{ color: '#6b7280', marginBottom: '12px' }}>$XX.XX</p>
                                    <button style={buttonPrimary}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
