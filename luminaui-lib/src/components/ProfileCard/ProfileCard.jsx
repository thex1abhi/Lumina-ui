import React from "react";

export const ProfileCard = ({
  name = "Alex Johnson",
  role = "Senior Designer",
  avatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  bio = "Creating beautiful interfaces that users love. Passionate about design systems and accessibility.",
  stats = [
    { label: "Projects", value: 42 },
    { label: "Clients", value: 28 },
    { label: "Years", value: 7 }
  ],
  accent = "#6366f1",
  bg = "#0f172a",
  onContactClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{
      background: bg,
      borderRadius: "16px",
      padding: "24px",
      width: "320px",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "system-ui,sans-serif",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid " + alpha(accent, 0.3)
        }}>
          <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 4px" }}>{name}</h3>
          <p style={{ fontSize: "13px", color: accent, margin: "0", fontWeight: "600" }}>{role}</p>
        </div>
      </div>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: "0 0 20px" }}>{bio}</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff" }}>{stat.value}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onContactClick}
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
          fontFamily: "inherit"
        }}
      >
        Contact Me
      </button>
    </div>
  );
};