import React from 'react';

function Cartempty() {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(transparent, #f3f9f4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    maxWidth: 440,
                    width: '100%',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.92)',
                    borderRadius: 20,
                    boxShadow: '0 8px 32px #9ee4c54c',
                    padding: '48px 32px 40px 32px',
                }}
            >
                <div style={{ marginBottom: 25 }}>
                    {/* SVG Shopping Cart Icon */}
                    <svg
                        width="78"
                        height="78"
                        viewBox="0 0 78 78"
                        fill="none"
                        style={{ display: 'block', margin: '0 auto', opacity: 0.86 }}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="39" cy="39" r="39" fill="#e9f7f3" />
                        <path
                            d="M23 28h34l-4 17.5H28.5L23 28z"
                            fill="#44d7a8"
                            stroke="#137a4f"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                        />
                        <circle cx="32" cy="52" r="3" fill="#137a4f" />
                        <circle cx="48" cy="52" r="3" fill="#137a4f" />
                    </svg>
                </div>
                <h2
                    style={{
                        fontSize: 34,
                        fontWeight: 700,
                        color: '#23273a',
                        marginBottom: 15,
                        letterSpacing: '0.03em',
                    }}
                >
                    YOUR CART IS EMPTY
                </h2>
                <div style={{ color: '#616b76', fontSize: 18, marginBottom: 32 }}>
                    Add items that you like to your cart. Review them anytime and easily move them to checkout.
                </div>
                <button
                    style={{
                        padding: '17px 38px',
                        borderRadius: 9,
                        border: '2px solid #2464f7',
                        background: '#fff',
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#2464f7',
                        boxShadow: '0 3px 12px #2464f71c',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'background 0.2s, color 0.2s',
                    }}
                    onClick={() => (window.location.href = '/green')}
                >
                    CONTINUE SHOPPING
                </button>
            </div>
        </div>
    );
}

export default Cartempty;
