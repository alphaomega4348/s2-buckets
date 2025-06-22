import React, { useState, useEffect, useRef } from 'react';

export default function SuggestGreenBrands() {
  const brands = [
    {
      name: 'ZWS Essentials',
      image: 'https://example.com/zws.png',
      description: 'ZWS Essentials crafts sustainable household basics made from recycled materials, delivering eco-friendly quality without compromise.'
    },
    {
      name: 'Terracycle',
      image: 'https://example.com/terracycle.png',
      description: 'Terracycle leads recycling innovation, transforming waste into new products through global upcycling programs.'
    },
    {
      name: 'Meliora',
      image: 'https://example.com/meliora.png',
      description: 'Meliora offers plant-based cleaning solutions free from harsh chemicals for a safer, greener home.'
    },
    {
      name: 'Dropps',
      image: 'https://example.com/dropps.png',
      description: 'Dropps provides water-soluble, plastic-free laundry and dishwasher pods that are powerful yet planet-friendly.'
    },
    {
      name: 'BioBag',
      image: 'https://example.com/biobag.png',
      description: 'BioBag produces compostable bags and films made from renewable raw materials to reduce plastic waste.'
    },
    {
      name: 'Bumbleride',
      image: 'https://example.com/bumbleride.png',
      description: 'Bumbleride creates eco-friendly, durable baby strollers and gear designed for urban and outdoor adventures.'
    },
    {
      name: 'Un•Paste',
      image: 'https://example.com/unpaste.png',
      description: 'Un•Paste offers toothpaste tablets in plastic-free packaging, promoting zero-waste oral care.'
    },
    {
      name: 'Plaine Products',
      image: 'https://example.com/plaine.png',
      description: 'Plaine Products provides refillable personal care essentials in aluminum bottles to eliminate single-use plastics.'
    },
    {
      name: 'Holy Lamb Organics',
      image: 'https://example.com/holylamb.png',
      description: 'Holy Lamb Organics delivers certified organic wool products that are sustainable, cozy, and hypoallergenic.'
    },
    {
      name: 'Suds & Eco',
      image: 'https://example.com/suds.png',
      description: 'Suds & Eco creates plant-based, cruelty-free body care items packaged in biodegradable materials.'
    }
  ];

  const visibleCount = 4;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(brands[0]);
  const intervalRef = useRef(null);

  // Auto-slide every 4s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(i => Math.min(i + 1, brands.length - visibleCount));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setIndex(i => Math.max(i - 1, 0));
  };
  const handleNext = () => {
    clearInterval(intervalRef.current);
    setIndex(i => Math.min(i + 1, brands.length - visibleCount));
  };

  // Styles
  const wrapper = { display: 'flex', alignItems: 'center', margin: '24px 0' };
  const arrow = {
    width: 40, height: 40, borderRadius: '50%', border: 'none',
    backgroundColor: '#333', color: '#fff', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  };
  const viewport = { overflow: 'hidden', flex: 1 };
  const track = {
    display: 'flex',
    transition: 'transform 0.5s ease',
    transform: `translateX(-${index * (160 + 16)}px)`
  };
  const card = {
    minWidth: 160, marginRight: 16, textAlign: 'center', cursor: 'pointer',
    transition: 'transform 0.3s'
  };
  const img = { width: '100%', height: 'auto', borderRadius: 8 };
  const label = { marginTop: 8 };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 600 }}>Shop Popular Brands:</h2>
      <p>Learn more about our 5 Pillars of sustainable product sourcing.</p>

      <div style={wrapper}>
        <button onClick={handlePrev} style={{ ...arrow, marginRight: 8 }} disabled={index === 0}>
          &lt;
        </button>
        <div style={viewport}>
          <div style={track}>
            {brands.map((b, i) => (
              <div
                key={b.name}
                style={card}
                onClick={() => setSelected(b)}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={b.image} alt={b.name} style={img} />
                <div style={label}>{b.name}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} style={{ ...arrow, marginLeft: 8 }} disabled={index >= brands.length - visibleCount}>
          &gt;
        </button>
      </div>

      <div style={{ padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
        <h3 style={{ margin: 0 }}>{selected.name}</h3>
        <p style={{ marginTop: 8 }}>{selected.description}</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
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
