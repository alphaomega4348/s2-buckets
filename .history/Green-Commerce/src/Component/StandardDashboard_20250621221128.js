import React, { useState } from 'react';

const tabs = ['Your Orders', 'Buy Again', 'Prime', 'Wish Lists', 'Your Account'];

export default function StandardDashboard() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    // Common style objects
    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '16px 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const tabNavStyle = {
        display: 'flex',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 24px',
    };

    const tabButtonStyle = (isActive) => ({
        padding: '12px 16px',
        marginRight: '16px',
        fontSize: '14px',
        fontWeight: isActive ? '600' : '500',
        color: isActive ? '#1d4ed8' : '#4b5563',
        borderBottom: isActive ? '2px solid #1d4ed8' : '2px solid transparent',
        background: 'none',
        cursor: 'pointer',
        outline: 'none',
    });

    const layoutStyle = {
        display: 'flex',
        padding: '24px',
        gap: '24px',
    };

    const sidebarStyle = {
        width: '240px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    };

    const quickLinkStyle = {
        padding: '8px 12px',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        fontSize: '14px',
        color: '#374151',
        cursor: 'pointer',
        borderRadius: '4px',
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '16px',
    };

    const sectionTitleStyle = {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '12px',
        color: '#111827',
    };

    const buttonPrimary = {
        padding: '10px 20px',
        backgroundColor: '#1d4ed8',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    };

    const recommendationCard = {
        minWidth: '160px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '12px',
        textAlign: 'center',
        flexShrink: 0,
    };

    return (
        <div style={containerStyle}>
            {/* Greeting Bar */}
            <header style={headerStyle}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Hello, Vishal</h1>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>🔔</button>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✉️</button>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>❓</button>
                </div>
            </header>

            {/* Tabs Navigation */}
            <nav style={tabNavStyle}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={tabButtonStyle(activeTab === tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Layout */}
            <div style={layoutStyle}>
                {/* Side Quick Links */}
                <aside style={sidebarStyle}>
                    {['Orders', 'Payments', 'Addresses', 'Subscriptions', 'Gift Cards'].map((item) => (
                        <button
                            key={item}
                            style={quickLinkStyle}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
                        >
                            {item}
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {(activeTab === 'Your Orders') && (
                        <section style={cardStyle}>
                            <h2 style={sectionTitleStyle}>Recent Orders</h2>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>You have no recent orders.</p>
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>View all orders</button>
                        </section>
                    )}

                    {(activeTab === 'Wish Lists') && (
                        <section style={cardStyle}>
                            <h2 style={sectionTitleStyle}>Your Wish Lists</h2>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>Default List, Birthday Gifts, etc.</p>
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>Create new list</button>
                        </section>
                    )}

                    {(activeTab === 'Prime') && (
                        <section style={cardStyle}>
                            <h2 style={sectionTitleStyle}>Prime Membership</h2>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>Member since Jan 2023 • Renewal: Dec 2024</p>
                            <button style={{ ...buttonPrimary, marginTop: '16px' }}>Manage membership</button>
                        </section>
                    )}

                    {(activeTab === 'Your Account') && (
                        <section style={cardStyle}>
                            <h2 style={sectionTitleStyle}>Account Settings</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {['Profile & security', 'Login & security', 'Payment methods', 'Manage addresses'].map((item) => (
                                    <button key={item} style={{ ...quickLinkStyle, textAlign: 'left' }}>{item}</button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Recommendations Carousel */}
                    <section>
                        <h2 style={sectionTitleStyle}>Recommendations for you</h2>
                        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} style={recommendationCard}>
                                    <div style={{ height: '100px', backgroundColor: '#e5e7eb', marginBottom: '12px', borderRadius: '4px' }}></div>
                                    <p style={{ fontWeight: '600', margin: '8px 0' }}><strong>Product {i}</strong></p>
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
