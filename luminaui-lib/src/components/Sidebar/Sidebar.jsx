import React, { useState } from "react";

export const Sidebar = ({
  logo = "Dashboard",
  items = ["Home", "Analytics", "Messages", "Settings"],
  activeItem = "Home",
  accent = "#6366f1",
  bg = "#0f172a",
  width = "280px",
  onItemClick = () => {}
}) => {
  const [active, setActive] = useState(activeItem);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{
      background: bg,
      width: width,
      height: "100%",
      borderRight: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "system-ui,sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "24px 12px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", padding: "0 12px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")" , display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "800", color: "#fff" }}>{logo[0]}</div>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>{logo}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {items.map(item => (
          <button
            key={item}
            onClick={() => { setActive(item); onItemClick(item); }}
            style={{
              background: active === item ? alpha(accent, 0.12) : "transparent",
              border: "none",
              padding: "12px 16px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "14px",
              fontWeight: active === item ? "600" : "500",
              color: active === item ? accent : "rgba(255,255,255,0.6)",
              transition: "all 0.2s"
            }}
          >
            <div style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background: active === item ? accent : "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {active === item ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
              )}
            </div>
            {item}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: "24px 12px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          background: alpha(accent, 0.1),
          border: "1px solid " + alpha(accent, 0.3),
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          fontWeight: "600",
          color: accent,
          cursor: "pointer"
        }}>
          <div style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            background: alpha(accent, 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          Account
        </button>
      </div>
    </div>
  );
};