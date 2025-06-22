import React from "react";
import { useSpring, animated, useTrail, useSprings, useTransition } from "react-spring";

const YEAR_LINKS = [
  { year: "2024", url: "https://.../2022-sustainability-report.pdf" },
  { year: "2023", url: "https://.../2022-sustainability-report.pdf" },
  { year: "2022", url: "https://.../2022-sustainability-report.pdf" },
  { year: "2021", url: "https://.../2021-sustainability-report.pdf" },
  { year: "2020", url: "https://.../2020-sustainability-report.pdf" },
  { year: "2019", url: "https://.../2019-sustainability-report.pdf" },
  { year: "2018", url: "https://.../2018-sustainability-report.pdf" },
];

const CARDS = [
  { value: 234000, color: "#89B753", label: "ZERO PLASTIC PRODUCTS SOLD" },
  { value: 10000, color: "#00B099", label: "KGS PLASTIC POLLUTION PREVENTED" },
  { value: 17936, color: "#00B099", label: "TONS CARBON EMISSIONS PREVENTED" },
];

// Bounce animation for Download buttons
function DownloadButton({ label, href }) {
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
        borderRadius: "999px",
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

// Animated counter
function Counter({ to, color }) {
  const { n } = useSpring({ from: { n: 0 }, to: { n: to }, config: { mass: 1, tension: 280, friction: 60 }, delay: 300 });
  return (
    <animated.div style={{ color, fontSize: 24, fontWeight: 700 }}>
      {n.to(x => Math.round(x).toLocaleString())}
    </animated.div>
  );
}

export default function SustainabilityReportsSection() {
  // Trail for years
  const trail = useTrail(YEAR_LINKS.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200
  });

  // Springs for stat cards
  const springs = useSprings(
    CARDS.length,
    CARDS.map((_, i) => ({
      from: { opacity: 0, transform: "rotateX(-90deg)" },
      to: { opacity: 1, transform: "rotateX(0deg)" },
      delay: 500 + i * 200
    }))
  );

  // Images fade-up
  const imgFade = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 1000
  });

  return (
    <div style={{
      background: "#faf7f7",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Year Links with gradient BG */}
      <div style={{
        background: "linear-gradient(transparent, #f3f9f4)",
        padding: "16px 0",
        borderRadius: 8,
        marginBottom: 16
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          <span style={{ fontWeight: 600, marginRight: 8, color: "#555" }}>
            Sustainability Reports:
          </span>
          {trail.map((spr, i) => (
            <animated.a
              key={YEAR_LINKS[i].year}
              href={YEAR_LINKS[i].url}
              style={{
                ...spr,
                margin: "0 8px",
                color: "#777",
                textDecoration: "none",
                paddingBottom: 2,
                position: "relative",
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
      </div>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: 16, justifyContent: "space-around" }}>
        {CARDS.map((c, i) => (
          <animated.div key={i} style={{
            ...springs[i],
            flex: 1,
            background: "#e8f6e8",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            margin: "0 8px",
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

      {/* Overview & Reports Section */}
      <animated.div style={{ ...imgFade, marginTop: 32, display: "flex", gap: 24, justifyContent: "center" }}>
        {[
          { title: "Overview", src: "../images/Overview.png", pdf: "#/overview.pdf" },
          { title: "Results", src: "../images/Reports.png", pdf: "#/reports.pdf" }
        ].map((item, idx) => (
          <div key={idx} style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
            width: "240px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.3s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotateX(10deg) rotateY(-5deg) scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <img src={item.src} alt={item.title} style={{ width: "100%", display: "block" }} />
            <div style={{ padding: "12px" }}>
              <h3 style={{ margin: "0 0 8px", color: "#2d5a2d" }}>{item.title}</h3>
              <DownloadButton label={`Download ${item.title}`} href={item.pdf} />
            </div>
          </div>
        ))}
      </animated.div>
    </div>
  );
}
