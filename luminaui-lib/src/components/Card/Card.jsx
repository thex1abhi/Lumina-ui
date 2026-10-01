import React, { useState } from "react";

export const Card = ({
  title = "Premium UI Component",
  description = "A beautifully designed card with interactive elements and smooth animations.",
  accent = "#6366f1",
  bg = "#0f172a",
  image = "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
  ctaText = "Learn More",
  onCtaClick = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "16px",
        overflow: "hidden",
        width: "320px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.08)"),
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.1)" : "scale(1)"
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, " + bg + ", transparent 60%)" }} />
      </div>
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 10px" }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, margin: "0 0 20px" }}>{description}</p>
        <button
          onClick={onCtaClick}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.2s",
            opacity: hovered ? 1 : 0.9
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};