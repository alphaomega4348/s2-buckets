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

export default function SustainabilityReportsSection() {
  // Animate hero text: title & subtitle
  const heroTexts = ["Sustainable Report", "Your Yearly Sustainability Overview"];
  const heroTrail = useTrail(heroTexts.length, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200,
    config: { mass: 1, tension: 200, friction: 20 }
  });

  // Year links fade‐up
  const trail = useTrail(YEAR_LINKS.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 600
  });

  // Cards flip‐in
  const springs = useSprings(
    CARDS.length,
    CARDS.map((_, i) => ({
      from: { opacity: 0, transform: "rotateX(-90deg)" },
      to: { opacity: 1, transform: "rotateX(0deg)" },
      delay: 1000 + i * 200
    }))
  );

  // Images fade
  const imgFade = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 1600
  });

  return (
    <div style={{
      background: "#faf7f7",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Hero Text Banner */}
      <div style={{
        width: "100%", padding: "60px 20px",
        background: "linear-gradient(135deg, #2d5a2d, #89b753)",
        textAlign: "center",
        borderRadius: 8
      }}>
        {heroTrail.map((anim, i) => (
          <animated.div
            key={i}
            style={{
              ...anim,
              color: "white",
              margin: i === 0 ? "0 0 0.5rem" : 0,
              fontSize: i === 0 ? "2.5rem" : "1.25rem",
              fontWeight: i === 0 ? 700 : 400,
              lineHeight: 1.2
            }}
          >
            {heroTexts[i]}
          </animated.div>
        ))}
      </div>

      {/* Year Links */}
      <div style={{
        display: "flex", alignItems: "center",
        flexWrap: "wrap", marginTop: 24
      }}>
        <span style={{
          fontWeight: 600, marginRight: 8, color: "#555"
        }}>
          Sustainability Reports:
        </span>
        {trail.map((anim, i) => (
          <animated.a
            key={YEAR_LINKS[i].year}
            href={YEAR_LINKS[i].url}
            style={{
              ...anim,
              margin: "0 8px",
              color: "#777",
              textDecoration: "none",
              fontWeight: 500,
              position: "relative",
              paddingBottom: 2,
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
      <div style={{
        display: "flex", gap: 16, marginTop: 24
      }}>
        {CARDS.map((c, i) => (
          <animated.div
            key={i}
            style={{
              ...springs[i],
              flex: 1,
              background: "#e8f6e8",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transformStyle: "preserve-3d"
            }}
          >
            <Counter to={c.value} color={c.color} />
            <div style={{
              marginTop: 8,
              color: "#533A2B",
              fontWeight: 600,
              fontSize: 12
            }}>
              {c.label}
            </div>
          </animated.div>
        ))}
      </div>

      {/* Detail Images */}
      <animated.div style={{
        ...imgFade,
        marginTop: 32,
        textAlign: "center"
      }}>
        <img
          src="../images/Overview.png"
          alt="Overview"
          style={{
            width: "80%",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        />
        <img
          src="../images/Reports.png"
          alt="Results"
          style={{
            width: "80%",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginTop: 24
          }}
        />
      </animated.div>
    </div>
  );
}
