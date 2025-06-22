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
  // fade‐up trail for years
  const trail = useTrail(YEAR_LINKS.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200
  });

  // flip‐in springs for cards
  const springs = useSprings(
    CARDS.length,
    CARDS.map((_, i) => ({
      from: { opacity: 0, transform: "rotateX(-90deg)" },
      to: { opacity: 1, transform: "rotateX(0deg)" },
      delay: 500 + i * 200
    }))
  );

  // image fade
  const imgFade = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 1400
  });

  return (
    <div style={{
      background: "#faf7f7",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Hero */}
      <div style={{
        width: "100%", height: 200,
        background: `url(../images/SusImage.png) center/cover`,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <h1 style={{
          color: "white", fontSize: 32, textShadow: "0 2px 6px rgba(0,0,0,0.5)"
        }}>Sustainable Report</h1>
      </div>

      {/* Year Links */}
      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 16
      }}>
        <span style={{
          fontWeight: 600,
          marginRight: 8,
          color: "#555"
        }}>Sustainability Reports:</span>

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
            onMouseEnter={e =>
              e.currentTarget.style.borderBottom = "2px solid #2d5a2d"
            }
            onMouseLeave={e =>
              e.currentTarget.style.borderBottom = "none"
            }
          >
            {YEAR_LINKS[i].year}
          </animated.a>
        ))}
      </div>

      {/* Cards */}
      <div style={{
        display: "flex",
        gap: 16,
        marginTop: 24
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
            }}>{c.label}</div>
          </animated.div>
        ))}
      </div>

      {/* Images */}
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
