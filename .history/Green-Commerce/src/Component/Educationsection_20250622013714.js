import React, { useState } from "react";
import { motion } from 'framer-motion';
import net0carbon from "../assets/net0carbon.png"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  LabelList,
  Cell,
} from "recharts";

const faqItems = [
  {
    question: "Why did we create Green Store?",
    answer:
      "The Amazon Green Store was created to make it easier for customers to find and buy eco-friendly products, promoting conscious shopping and reducing environmental impact.",
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
  {
    question: "How does the box returning system work?",
    answer:
      "When enough customers in your area choose 'Return Box', we schedule a pickup and notify you. Track your area's progress and next pickup date in real time.",
  },
];

const sections = [
  { key: "carbon", title: "Carbon", desc: "3% absolute emissions reduction; 13% carbon intensity decrease; 473 Climate Pledge signatories", icon: "🟢" },
  { key: "carbonFreeEnergy", title: "Carbon-Free Energy", desc: "100% renewables matched; world’s largest corporate purchaser of renewable energy", icon: "⚡" },
  { key: "packaging", title: "Packaging", desc: "90% of new devices in 100% recyclable packaging; 9% plastic packaging weight reduction", icon: "📦" },
  { key: "wasteCircularity", title: "Waste & Circularity", desc: "75% reduction in food waste intensity (EU); 28% (US); 82M meals donated", icon: "♻️" },
  { key: "water", title: "Water", desc: "41% progress toward AWS water positive; returning more water than used", icon: "💧" },
  { key: "valueChain", title: "Value Chain", desc: "Supplier decarbonization initiatives; public Sustainable Supply Chain Exchange", icon: "🔗" },
  { key: "humanRights", title: "Human Rights", desc: "3K+ supplier assessments on social & environmental metrics", icon: "⚖️" },
  { key: "supplyChain", title: "Responsible Supply Chain", desc: ">$1.3B invested in diverse suppliers; $4.3B with US Tier-1 diverse", icon: "🚚" },
  { key: "productsMaterials", title: "Sustainable Products & Materials", desc: "1.16B Climate Pledge Friendly items sold; 16K homes supported", icon: "🌱" },
  { key: "communityImpact", title: "Community Impact", desc: "32M+ AWS credits for health equity; 76K employees volunteered", icon: "🏘️" },
  { key: "employees", title: "Employees", desc: "358K employees upskilled; 100K+ veterans & spouses hired", icon: "👥" },
  { key: "healthSafety", title: "Health & Safety", desc: "30% reduction in recordable incident rate vs 2019", icon: "🛡️" },
];

const progressData = [
  { year: "2019", value: 42 },
  { year: "2020", value: 65 },
  { year: "2021", value: 85 },
  { year: "2022", value: 90 },
  { year: "2023", value: 100 },
];

export default function EducationSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleItem = (idx) => setActiveIndex(activeIndex === idx ? null : idx);

  // ---- inline style objects ----
  const container = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Montserrat', sans-serif",
    color: "#01332b",
    background: "linear-gradient(135deg, #eafaf4 0%, #f5fbf9 100%)",
    padding: "32px",
    gap: "48px",
  };
  const hero = {
    display: "flex",
    alignItems: "flex-start",
    gap: "32px",
    padding: "48px 0",
  };
  const textBlock = {
    flex: 1,
    maxWidth: "600px",
  };
  const videoBlock = {
    flex: 1,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  };
  const graphBlock = {
    flex: 1,
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  };
  const heading = {
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "16px",
    lineHeight: 1.2,
    color: "#01332b",
  };
  const paragraph = {
    fontSize: "1.1rem",
    fontWeight: 500,
    lineHeight: 1.6,
    color: "#01332b",
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
  
 
  
  
  const sectionTitle = {
    fontSize: "2rem",
    marginBottom: "16px",
    borderBottom: "2px solid #d0e3de",
    paddingBottom: "8px",
  };
  const heroGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "48px",
  };
  const heroCard = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };
  const heroIcon = { fontSize: "1.8rem", marginBottom: "8px" };
  const heroTitle = {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "4px",
    color: "#01332b",
  };
  const heroDesc = {
    fontSize: "0.85rem",
    color: "#01332b",
    lineHeight: 1.4,
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
    marginBottom: "16px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderLeft: "4px solid #006d5a",
  };

  const questionBtn = (open) => ({
    width: "100%",
    textAlign: "left",
    padding: "16px 20px",
    background: open ? "#e6f5ef" : "#f9fdfb",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background 0.3s ease",
  });

  const answerDiv = (open) => ({
    maxHeight: open ? "500px" : "0",
    overflow: "hidden",
    transition: "max-height 0.4s ease",
    padding: open ? "16px 20px" : "0 20px",
    borderTop: open ? "1px solid #d0e3de" : "none",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  });
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
  
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // how many pixels you want between the top of the viewport and the section
      const offset = 150;
      // get the element’s distance from the top of the document…
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      // …then subtract your offset
      window.scrollTo({ top: top - offset, behavior: 'smooth' });
    }
  };

  return (
    <div style={container}>
      {/* Sidebar Nav */}
      <nav>
        <ul style={sidebar}>
          <li>
            <a href="/green" style={link}>Home</a>
          </li>
          <li>
            <a
              href="#EcoCertification"
              style={link}
              onClick={e => handleNavClick(e, 'EcoCertification')}
            >
              Highlights
            </a>
          </li>
          <li>
            <a
              href="#FAQ"
              style={link}
              onClick={e => handleNavClick(e, 'FAQ')}
            >
              FAQs
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO: Carbon Emission */}
      <motion.section
        style={hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={textBlock}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 style={heading}>Carbon Emission</h1>
          <p style={paragraph}>
            The science is clear. Significant carbon emission reductions are
            required to avoid the most severe effects of climate change, restore
            biodiversity, protect vulnerable communities, and ensure a habitable
            planet for future generations. Amazon has an incredibly ambitious
            goal to achieve net-zero carbon across our operations by 2040. We’ll
            do this by implementing decarbonization strategies through real
            business changes and innovations, and neutralizing any remaining
            emissions with additional, quantifiable, real, permanent, and
            socially beneficial offsets to achieve
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#005448",
              }}
            >
              {" "}
              net-zero carbon by 2040.
            </span>
          </p>
        </motion.div>

        <motion.div
          style={videoBlock}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src={net0carbon}
            alt="Carbon Emission Illustration"
            style={{
              width: "500px",
              height: "450px",
              display: "block",
              borderRadius: "8px",
            }}
          />
        </motion.div>
      </motion.section>


      {/* TUTORIAL: Carbon-Free Energy + Animated Graph */}
      <motion.section
        style={{...hero,marginTop:'-90px'}}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          style={graphBlock}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={progressData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="year" />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <ReferenceLine
                y={100}
                stroke="#006d5a"
                strokeDasharray="4 4"
                label={{
                  value: "Goal 100%",
                  position: "top",
                  fill: "#006d5a",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="value"
                isAnimationActive
                animationDuration={1200}
                radius={[8, 8, 0, 0]}
              >
                {progressData.map((entry) => (
                  <Cell
                    key={entry.year}
                    fill={entry.year === "2023" ? "#005448" : "#a6fbd3"}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(v) => `${v}%`}
                  style={{ fill: "#005448", fontSize: "0.85rem" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          style={textBlock}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 style={heading}>Carbon-Free Energy</h2>
          <p style={paragraph}>
            Transitioning to carbon-free energy sources—which include renewable
            sources like wind and solar as well as nuclear—is one of the most
            effective ways to lower Scope 2 emissions. By scaling carbon-free
            energy, we aim to make Amazon a more resilient and sustainable
            business, drive a global transition to cleaner energy, and fulfill
            The Climate Pledge of {'  '} 
             {' '} net-zero carbon by 2040.
            
          </p>
          <p style={paragraph}>
            We’re proud to have hit 100% renewable-energy match in 2023—seven
            years early.
          </p>
        </motion.div>
      </motion.section>

      {/* Hero: Sustainability Topics */}
      <h style={heading}>Sustainability Report Highlights</h>
      <section style={heroGrid} id="EcoCertification">
        {sections.map((s) => (
          <div
            key={s.key}
            style={heroCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            <div style={heroIcon}>{s.icon}</div>
            <div style={heroTitle}>{s.title}</div>
            <div style={heroDesc}>{s.desc}</div>
          </div>
        ))}
      </section>

      {/* Eco-Friendly Certifications */}
      {/* <section id="EcoCertification">
        <h2 style={sectionTitle}>Eco-Friendly Certifications</h2>
        <div style={certGrid}>
          {["eco_badge1.png", "eco_badge2.png", "eco_badge3.png", "eco_badge4.png"].map(
            (img, i) => (
              <div key={i} style={certItem}>
                <img
                  src={`/images/${img}`}
                  alt="Certification badge"
                  style={{ maxWidth: "80px" }}
                />
              </div>
            )
          )}
        </div>
      </section> */}

      {/* FAQ */}
      <section id="FAQ">
        <h2 style={sectionTitle}>Frequently Asked Questions</h2>
        {faqItems.map((item, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div key={idx} style={faqItem}>
              <button
                onClick={() => toggleItem(idx)}
                style={questionBtn(isOpen)}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    display: "inline-block",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div style={answerDiv(isOpen)}>
                {item.answer}
              </div>
            </div>
          );
        })}
      </section>

      {/* Call to Action */}
      <div style={cta}>
        <a href="/green" style={ctaBtn}>
          Shop Eco-Friendly Products
        </a>
      </div>
    </div>
  );
}
