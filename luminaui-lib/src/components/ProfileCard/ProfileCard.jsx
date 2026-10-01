import React from "react";

export const ProfileCard = ({
  name = "John Doe",
  bio = "Full-stack developer passionate about building beautiful web experiences.",
  avatar = "https://i.pravatar.cc/200",
  accent = "#6366f1",
  bg = "#0f172a",
  stats = ["3.4K Followers", "1.2K Following", "245 Posts"],
  onFollowClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "24px", width: "320px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <img src={avatar} alt={name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "2px solid " + alpha(accent, 0.5) }} />
        <div>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>{name}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{bio}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: accent }}>{stat.split(" ")[0]}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{stat.split(" ")[1]}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onFollowClick}
        style={{ width: "100%", padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
      >Follow</button>
    </div>
  );
};