import { useState } from "react";

export default function EcoCapsule({ onClick }) {
    const [checked, setChecked] = useState(false);

    // This calls both your own onClick and local check
    const handleClick = () => {
        setChecked(true);
        if (onClick) onClick();
        setTimeout(() => setChecked(false), 1200); // optional: untick after modal
    };

    return (
        <button
            onClick={handleClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: "linear-gradient(90deg, #44c455 65%, #2ecc71 100%)",
                border: "none",
                borderRadius: 48,
                boxShadow: "0 6px 30px #b4eed94c",
                padding: "30px 40px 26px 40px",
                minWidth: 420,
                position: "relative",
                cursor: "pointer",
                transition: "box-shadow 0.18s",
            }}
        >
            {/* Text block */}
            <div style={{ textAlign: "left", flex: 1 }}>
                <div
                    style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 27,
                        letterSpacing: "0.01em",
                        marginBottom: 4,
                        lineHeight: 1.09,
                    }}
                >
                    Enable Sustainable Packaging
                </div>
                <div style={{ color: "#e4ffe9", fontWeight: 400, fontSize: 19, marginBottom: 0 }}>
                    Recyclable, minimal, or biodegradable materials
                </div>
                <div style={{ color: "#c3ffce", fontSize: 17, marginTop: 2 }}>
                    (~2.8 kg CO<sub style={{ fontSize: 13 }}>2</sub> saved)
                </div>
            </div>
            {/* Tick Circle */}
            <span
                style={{
                    minWidth: 52,
                    minHeight: 52,
                    background: "#e2f7e8",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: checked ? "0 0 0 3px #81e6a5" : "0 1px 6px #b4eed94c",
                    transition: "box-shadow 0.19s",
                }}
            >
                {/* Animate SVG tick */}
                <svg width="38" height="38" viewBox="0 0 38 38">
                    <circle
                        cx="19"
                        cy="19"
                        r="18"
                        fill="none"
                        stroke={checked ? "#38b24d" : "#b7dbc1"}
                        strokeWidth="2.6"
                    />
                    <polyline
                        points="11,20 17,27 27,13"
                        fill="none"
                        stroke={checked ? "#38b24d" : "#bbb"}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            transition: "stroke 0.19s",
                            strokeDasharray: 28,
                            strokeDashoffset: checked ? 0 : 28,
                            transitionProperty: "stroke,stroke-dashoffset",
                            transitionDuration: checked ? "0.3s" : "0.2s",
                        }}
                    />
                </svg>
            </span>
        </button>
    );
}
