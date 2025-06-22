import React from "react";
import { useSpring, animated, useTrail, useSprings } from "react-spring";

const YEAR_LINKS = [
  { year: "2024", url: "https://sustainability.aboutamazon.com/2022-sustainability-report.pdf" },
  { year: "2023", url: "https://sustainability.aboutamazon.com/2022-sustainability-report.pdf" },
  { year: "2022", url: "https://sustainability.aboutamazon.com/2022-sustainability-report.pdf" },
  { year: "2021", url: "https://sustainability.aboutamazon.com/2021-sustainability-report.pdf" },
  { year: "2020", url: "https://sustainability.aboutamazon.com/2020-sustainability-report.pdf" },
  { year: "2019", url: "https://sustainability.aboutamazon.com/2019-sustainability-report.pdf" },
  { year: "2018", url: "https://sustainability.aboutamazon.com/2018-sustainability-report.pdf" },
];

const CARDS = [
  { value: 234000, color: "#89B753", label: "ZERO PLASTIC PRODUCTS SOLD" },
  { value: 10000, color: "#00B099", label: "KGS PLASTIC POLLUTION PREVENTED" },
  { value: 17936, color: "#00B099", label: "TONS CARBON EMISSIONS PREVENTED" },
];

const PANELS = [
  {
    title: "Overview",
    text: "Sustainability reports provide a communication tool, helping consumers and stakeholders understand efforts to minimize environmental and social impact."
  },
  {
    title: "Results",
    text: "Our latest report showcases milestones in waste reduction, carbon avoidance, and sustainable sourcing over the past year."
  }
];

// Counter animates numbers
function Counter({ to, color }) {
  const props = useSpring({
    from: { n: 0 },
    to: { n: to },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 300
  });
  return (
    <animated.div style={{ color, fontSize: 24, fontWeight: 700 }}>
      {props.n.to(n => Math.round(n).toLocaleString())}
    </animated.div>
  );
}

// Bounce animation for Download buttons
function DownloadButton({ href, label }) {
  const props = useSpring({
    loop: true,
    to: [{ transform: "scale(1.05)" }, { transform: "scale(1)" }],
    from: { transform: "scale(1)" },
    config: { tension: 300, friction: 10 },
    delay: 1000
  });
  return (
    <animated.a
      href={href}
      style={{
        ...props,
        display: "inline-block",
        marginTop: "1rem",
        padding: "0.6rem 1.2rem",
        background: "#4a8f4a",
        color: "white",
        borderRadius: 999,
        textDecoration: "none",
        fontWeight: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        cursor: "pointer"
      }}
    >
      {label} ⬇️
    </animated.a>
  );
}

export default function SustainabilityReportsSection() {
  // Trail for year links
  const yearTrail = useTrail(YEAR_LINKS.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200
  });

  // Springs for stat cards
  const statSprings = useSprings(
    CARDS.length,
    CARDS.map((_, i) => ({
      from: { opacity: 0, transform: "rotateX(-90deg)" },
      to: { opacity: 1, transform: "rotateX(0deg)" },
      delay: 500 + i * 200
    }))
  );

  // Trail for the two panels
  const panelTrail = useTrail(PANELS.length, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 1000
  });

  return (
    <div style={{
      background: "#faf7f7",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Year Links */}
      <div style={{
        background: "linear-gradient(transparent, #f3f9f4)",
        padding: "12px 0",
        borderRadius: 8,
        marginBottom: 16,
        textAlign: "center"
      }}>
        <span style={{ fontWeight: 600, marginRight: 8, color: "#555" }}>
          Sustainability Reports:
        </span>
        {yearTrail.map((spr, i) => (
          <animated.a
            key={YEAR_LINKS[i].year}
            href={YEAR_LINKS[i].url}
            style={{
              ...spr,
              margin: "0 8px",
              color: "#777",
              textDecoration: "none",
              fontWeight: 500,
              cursor: "pointer"
            }}
            onMouseEnter={e => e.currentTarget.style.borderBottom = "2px solid #2d5a2d"}
            onMouseLeave={e => e.currentTarget.style.borderBottom = "none"}
          >
            {YEAR_LINKS[i].year}
          </animated.a>
        ))}
      </div>

      {/* Statistic Cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        {CARDS.map((c, i) => (
          <animated.div key={i} style={{
            ...statSprings[i],
            flex: 1,
            background: "#e8f6e8",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transformStyle: "preserve-3d"
          }}>
            <Counter to={c.value} color={c.color} />
            <div style={{
              marginTop: 8,
              color: "#533A2B",
              fontWeight: 600,
              fontSize: 12
            }}>{c.label}</div>
          </animated.div>
        ))}
      </div>

      {/* Overview & Results Panels */}
      <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
        {panelTrail.map((spr, i) => (
          <animated.div key={i} style={{
            ...spr,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            padding: 20,
            maxWidth: 360,
            flex: 1,
            textAlign: "left"
          }}>
            <h3 style={{ margin: "0 0 8px", color: "#2d5a2d" }}>
              {PANELS[i].title}
            </h3>
            <p style={{ margin: 0, color: "#555", fontSize: 14, lineHeight: 1.5 }}>
              {PANELS[i].text}
            </p>
            <DownloadButton
              href={YEAR_LINKS[0].url}
              label={`Download ${PANELS[i].title}`}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
