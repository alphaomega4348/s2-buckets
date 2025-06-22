import React, { useState } from "react";
import "../Css/Educationsection.css";

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

  return (
    <div className="edu-container">
      <aside className="edu-sidebar">
        <ul>
          <li><a href="/green">Home</a></li>
          <li><a href="#EcoCertification">Certificates</a></li>
          <li><a href="#FAQ">FAQs</a></li>
        </ul>
      </aside>

      <section className="edu-hero">
        <div className="edu-text">
          <h1>Zero Waste Production through Return Box System</h1>
          <p>
            Leverage Amazon’s infrastructure to recycle packaging: choose 'Return Box,' and once your region meets the threshold, we’ll pick up used boxes and notify you of the schedule.
            Track progress in-app or online for full transparency.
          </p>
        </div>
        <div className="edu-media">
          <video autoPlay loop muted>
            <source src="/videos/food_delivery.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="edu-tutorial">
        <div className="edu-media">
          <video autoPlay loop muted>
            <source src="/videos/foldbox.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="edu-text">
          <h2>How to Fold a Box?</h2>
          <p>
            Lay the box flat, fold up the sides along creased lines, secure the base flaps, and reverse to flatten.
            Watch the video for step-by-step guidance and store your box easily for future use.
          </p>
        </div>
      </section>

      <section className="edu-certificates" id="EcoCertification">
        <h2>Eco-Friendly Certifications</h2>
        <div className="cert-grid">
          {/* Replace with dynamic images when provided */}
          <div className="cert-item"><img src="/images/eco_badge1.png" alt="Certification" /></div>
          <div className="cert-item"><img src="/images/eco_badge2.png" alt="Certification" /></div>
          <div className="cert-item"><img src="/images/eco_badge3.png" alt="Certification" /></div>
          <div className="cert-item"><img src="/images/eco_badge4.png" alt="Certification" /></div>
        </div>
      </section>

      <section className="edu-faq" id="FAQ">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${activeIndex === idx ? 'open' : ''}`}
                onClick={() => toggleItem(idx)}
              >
                {item.question}
                <span className="icon">{activeIndex === idx ? '−' : '+'}</span>
              </button>
              {activeIndex === idx && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="edu-shoplink">
        <a href="/green" className="shop-button">Shop Eco-Friendly Products</a>
      </section>
    </div>
  );
}
