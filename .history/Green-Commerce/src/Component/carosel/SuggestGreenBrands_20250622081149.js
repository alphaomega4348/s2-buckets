import React, { useState, useEffect, useRef } from 'react';

export default function SuggestGreenBrands() {
  const brands = [
    { name: 'ZWS Essentials', image: 'https://…', description: 'ZWS Essentials crafts sustainable household basics…' },
    /* …other brands… */
    { name: 'Suds & Eco', image: 'https://…', description: 'Suds & Eco creates plant-based, cruelty-free body care…' }
  ];

  const visibleCount = 4;
  const [index, setIndex]     = useState(0);
  const [selected, setSelected] = useState(brands[0]);
  const intervalRef            = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % brands.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setIndex(i => (i - 1 + brands.length) % brands.length);
  };
  const handleNext = () => {
    clearInterval(intervalRef.current);
    setIndex(i => (i + 1) % brands.length);
  };

  // Styles (as before) …
  const section   = { backgroundColor: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' };
  const header    = { marginBottom: 16, color: '#333' };
  const carousel  = { display: 'flex', alignItems: 'center', margin: '24px 0', position: 'relative' };
  const arrow     = { width: 40, height: 40, borderRadius: '50%', border: 'none', backgroundColor: '#2d6a4f', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' };
  const viewport  = { overflow: 'hidden', flex: 1 };
  const track     = { display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${index * (200 + 16)}px)` };
  const card      = { minWidth: 200, marginRight: 16, backgroundColor: '#f9f9f9', borderRadius: 8, padding: 16, textAlign: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'transform 0.3s, background-color 0.3s', position: 'relative' };
  const imgStyle = { width: '100%', height: 'auto', borderRadius: 4 };
  const label    = { marginTop: 12, fontWeight: 600, color: '#2d6a4f' };
  const overlay  = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', borderRadius: 8, padding: 16, boxSizing: 'border-box' };

  // --- NEW: scrollToTop handler ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={section}>
      <h2 style={{ ...header, fontSize: 24 }}>Recommended Sustainable Brands</h2>
      <p style={{ ...header, fontSize: 16 }}>Featuring eco-conscious companies making real impact—discover brands championing sustainability.</p>

      <div style={carousel}>
        <button onClick={handlePrev} style={{ ...arrow, marginRight: 8 }}>&lt;</button>
        <div style={viewport}>
          <div style={track}>
            {brands.concat(brands.slice(0, visibleCount)).map((b, i) => (
              <div
                key={i}
                style={card}
                onClick={() => setSelected(b)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  const ov = e.currentTarget.querySelector('.overlay');
                  if (ov) ov.style.opacity = 1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  const ov = e.currentTarget.querySelector('.overlay');
                  if (ov) ov.style.opacity = 0;
                }}
              >
                <img src={b.image} alt={b.name} style={imgStyle} />
                <div style={label}>{b.name}</div>
                <div className="overlay" style={overlay}>
                  <p style={{ margin: 0 }}>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} style={{ ...arrow, marginLeft: 8 }}>&gt;</button>
      </div>

      <div style={{ padding: 16, backgroundColor: '#f0fdf4', borderRadius: 8, marginTop: 16 }}>
        <h3 style={{ margin: 0, color: '#2d6a4f' }}>{selected.name}</h3>
        <p style={{ marginTop: 8, color: '#555' }}>{selected.description}</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
          onClick={scrollToTop}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2d6a4f',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Shop All Brands
        </button>
      </div>
    </div>
  );
}
