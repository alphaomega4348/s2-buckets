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

export default function EducationSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (idx) => setActiveIndex(activeIndex === idx ? null : idx);

  // ---- inline style objects ----
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
            Zero Waste Production through Return Box System
          </h1>
          <p>
            Leverage Amazon’s infrastructure to recycle packaging: choose 'Return Box,' and once your region meets
            the threshold, we’ll pick up used boxes and notify you of the schedule. Track progress in-app or online
            for full transparency.
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

      {/* Certificates */}
      <section id="EcoCertification">
        <h2 style={sectionTitle}>Eco-Friendly Certifications</h2>
        <div style={certGrid}>
          {["eco_badge1.png", "eco_badge2.png", "eco_badge3.png", "eco_badge4.png"].map((img, i) => (
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
