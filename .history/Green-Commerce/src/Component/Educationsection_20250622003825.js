import React, { useState } from "react";

const faqItems = [
  {
    question: "Why did we create Greenovation Zone?",
    answer:
      "The Amazon Greenovation Zone was created to make it easier for customers to find and buy eco-friendly products, promoting conscious shopping and reducing environmental impact.",
  },
  {
    question: "What criteria are used to certify products as eco-friendly?",
    answer:
      "Products are certified based on eco-certifications, carbon emissions, material sourcing, recyclability, energy and water efficiency, non-toxicity, and packaging—verified by reputable organizations.",
  },
  {
    question: "Can I provide feedback or report concerns about eco-friendly claims?",
    answer:
      "Yes! Use our feedback system to report any concerns about a product's eco-friendly claims so we can continuously improve accuracy and reliability.",
  },
  {
    question: "How does the box returning system work?",
    answer:
      "When enough customers in your area choose 'Return Box', we schedule a pickup and notify you. Track your area's progress and next pickup date in real time.",
  },
];

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
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (idx) => setActiveIndex(activeIndex === idx ? null : idx);

  // ---- inline style objects ----
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
  const container = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
    color: "#01332b",
    backgroundColor: "#f5fbf9",
    padding: "24px",
    gap: "48px",
  };
  const sidebar = {
    display: "flex",
    gap: "16px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  };
  const link = {
    color: "#006d5a",
    textDecoration: "none",
    fontWeight: 600,
    padding: "8px 12px",
    borderRadius: "4px",
  };
  const hero = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  };
  const textBlock = {
    flex: 1,
    maxWidth: "600px",
  };
  const videoBlock = {
    flex: 1,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };
  const sectionTitle = {
    fontSize: "2rem",
    marginBottom: "16px",
    borderBottom: "2px solid #d0e3de",
    paddingBottom: "8px",
  };
  const certGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "16px",
  };
  const certItem = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };
  const faqItem = {
    marginBottom: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };
  const questionBtn = (open) => ({
    width: "100%",
    textAlign: "left",
    padding: "16px",
    background: open ? "#e3f7f0" : "#fafafa",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const answerDiv = {
    padding: "16px",
    borderTop: "1px solid #d0e3de",
    lineHeight: 1.5,
  };
  const cta = {
    marginTop: "24px",
    textAlign: "center",
  };
  const ctaBtn = {
    display: "inline-block",
    backgroundColor: "#006d5a",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "24px",
    textDecoration: "none",
    fontWeight: 600,
  };

  return (
    <div style={container}>
      {/* Sidebar Nav */}
      <nav>
        <ul style={sidebar}>
          <li><a href="/green" style={link}>Home</a></li>
          <li><a href="#EcoCertification" style={link}>Certificates</a></li>
          <li><a href="#FAQ" style={link}>FAQs</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section style={hero}>
        <div style={textBlock}>
          <h1 style={{ fontSize: "2.4rem", marginBottom: "12px" }}>
            Carbon Emission
          </h1>
          <p>
            The science is clear. Significant carbon emission reductions are required to avoid the most severe effects 
            of climate change, restore biodiversity, protect vulnerable communities, and ensure a habitable planet for future generations. Amazon has an incredibly ambitious goal to achieve net‑zero carbon across our operations by 2040. We’ll do this by implementing decarbonization strategies through real business changes and innovations, and neutralizing any remaining emissions with additional, quantifiable, real, permanent, and socially beneficial offsets to achieve net‑zero annual carbon emissions by 2040.
          </p>
        </div>
        <div style={videoBlock}>
          <video autoPlay loop muted style={{ width: "100%" }}>
            <source src="/videos/food_delivery.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      {/* Tutorial Section */}
      <section style={hero}>
        <div style={videoBlock}>
          <video autoPlay loop muted style={{ width: "100%" }}>
            <source src="/videos/foldbox.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={textBlock}>
          <h2 style={{ ...sectionTitle, borderColor: "#d0e3de" }}>How to Fold a Box?</h2>
          <p>
            Lay the box flat, fold up the sides along creased lines, secure the base flaps, and reverse to flatten.
            Watch the video for step-by-step guidance and store your box easily for future use.
          </p>
        </div>
      </section>

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

     

      {/* Certificates */}
      <section id="EcoCertification">
        <h2 style={sectionTitle}>Eco-Friendly Certifications</h2>
        <div style={certGrid}>
          {["eco_badge1.png","eco_badge2.png","eco_badge3.png","eco_badge4.png"].map((img, i) => (
            <div key={i} style={certItem}>
              <img src={`/images/${img}`} alt="Certification badge" style={{ maxWidth: "80px" }} />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="FAQ">
        <h2 style={sectionTitle}>Frequently Asked Questions</h2>
        {faqItems.map((item, idx) => (
          <div key={idx} style={faqItem}>
            <button
              onClick={() => toggleItem(idx)}
              style={questionBtn(activeIndex === idx)}
            >
              <span>{item.question}</span>
              <span>{activeIndex === idx ? "−" : "+"}</span>
            </button>
            {activeIndex === idx && (
              <div style={answerDiv}>{item.answer}</div>
            )}
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <div style={cta}>
        <a href="/green" style={ctaBtn}>Shop Eco-Friendly Products</a>
      </div>
    </div>
  );
}
