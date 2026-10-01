import React from "react";

export const StatsCard = ({
  title = "Total Revenue",
  value = "$42,690",
  change = "+12.5%",
  changePositive = true,
  iconBg = "#6366f1",
  bg = "#0f172a",
  accent = "#6366f1",
  icon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20V14" /></svg>
  )
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "16px", padding: "20px", width: "280px", fontFamily: "system-ui,sans-serif", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "rgba(255,255,255,0.7)" }}>{title}</div>
      </div>
      <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: changePositive ? "#10b981" : "#ef4444" }}>
        <div style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: changePositive ? "6px solid #10b981" : "6px solid #ef4444", transform: changePositive ? "rotate(0deg)" : "rotate(180deg)" }} />
        {change}
      </div>
    </div>
  );
};