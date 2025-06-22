import React, { useState } from "react";

// Data for each sustainability topic, drawing from 2023 report
const sections = [
  { key: 'carbon', title: 'Carbon', desc: '3% absolute emissions reduction; 13% carbon intensity decrease; 473 Climate Pledge signatories', icon: '🟢' },
  { key: 'carbonFreeEnergy', title: 'Carbon‑Free Energy', desc: '100% renewables matched; world’s largest corporate purchaser of renewable energy', icon: '⚡' },
  { key: 'packaging', title: 'Packaging', desc: '90% of new devices in 100% recyclable packaging; 9% plastic packaging weight reduction', icon: '📦' },
  { key: 'wasteCircularity', title: 'Waste & Circularity', desc: '75% reduction in food waste intensity (EU); 28% (US); 82M meals donated', icon: '♻️' },
  { key: 'water', title: 'Water', desc: '41% progress toward AWS water positive; returning more water than used', icon: '💧' },
  { key: 'valueChain', title: 'Value Chain', desc: 'Supplier decarbonization initiatives; public Sustainable Supply Chain Exchange', icon: '🔗' },
  { key: 'humanRights', title: 'Human Rights', desc: '3K+ supplier assessments on social & environmental metrics', icon: '⚖️' },
  { key: 'supplyChain', title: 'Responsible Supply Chain', desc: '>$1.3B invested in diverse suppliers; $4.3B with US Tier‑1 diverse', icon: '🚚' },
  { key: 'productsMaterials', title: 'Sustainable Products & Materials', desc: '1.16B Climate Pledge Friendly items sold; 16K homes supported', icon: '🌱' },
  { key: 'communityImpact', title: 'Community Impact', desc: '32M+ AWS credits for health equity; 76K employees volunteered', icon: '🏘️' },
  { key: 'employees', title: 'Employees', desc: '358K employees upskilled; 100K+ veterans & spouses hired', icon: '👥' },
  { key: 'healthSafety', title: 'Health & Safety', desc: '30% reduction in recordable incident rate vs 2019', icon: '🛡️' }
];

export default function EducationSection() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const toggleFAQ = idx => setActiveFAQ(activeFAQ === idx ? null : idx);

  // Inline styles
  const container = { padding: '24px', backgroundColor: '#f5fbf9', fontFamily: 'Arial, sans-serif' };

  const navStyle = { display: 'flex', gap: '16px', marginBottom: '32px' };
  const navLink = { color: '#006d5a', textDecoration: 'none', fontWeight: 600, padding: '8px 12px', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' };

  const heroGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '48px'
  };
  const heroCard = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };
  const heroIcon = { fontSize: '1.8rem', marginBottom: '8px' };
  const heroTitle = { fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#01332b' };
  const heroDesc = { fontSize: '0.85rem', color: '#01332b', lineHeight: 1.4 };

  const faqSection = { marginTop: '32px' };
  const faqTitle = { fontSize: '1.8rem', marginBottom: '16px', color: '#01332b' };
  const faqItem = { marginBottom: '12px' };
  const faqBtn = open => ({
    width: '100%', padding: '16px', textAlign: 'left', fontSize: '1rem',
    background: open ? '#e3f7f0' : '#fff', border: '1px solid #d0e3de', borderRadius: '8px',
    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  });
  const faqAnswer = { padding: '16px', background: '#fafafa', border: '1px solid #d0e3de', borderTop: 'none', borderRadius: '0 0 8px 8px', fontSize: '0.95rem', lineHeight: 1.5 };

  return (
    <div style={container}>
      {/* Top Nav */}
      <nav style={navStyle}>
        <a href="/" style={navLink}>Home</a>
        <a href="#EcoCertification" style={navLink}>Certificates</a>
      </nav>

      {/* Hero: Sustainability Topics */}
      <section style={heroGrid} id="EcoCertification">
        {sections.map((s, i) => (
          <div
            key={s.key}
            style={heroCard}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}
          >
            <div style={heroIcon}>{s.icon}</div>
            <div style={heroTitle}>{s.title}</div>
            <div style={heroDesc}>{s.desc}</div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={faqSection} id="FAQ">
        <h2 style={faqTitle}>Frequently Asked Questions</h2>
        {sections.map((s, i) => (
          <div key={s.key} style={faqItem}>
            <button
              onClick={() => toggleFAQ(i)}
              style={faqBtn(activeFAQ === i)}
            >
              <span>{s.title}</span>
              <span>{activeFAQ === i ? '−' : '+'}</span>
            </button>
            {activeFAQ === i && (
              <div style={faqAnswer}>
                {s.desc} {/* Detailed text from 2023 report can go here */}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
