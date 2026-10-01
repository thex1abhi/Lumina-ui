import React from "react";

export const ProgressBar = ({
  value = 65,
  max = 100,
  height = "12px",
  width = "300px",
  bg = "#1e293b",
  fill = "#6366f1",
  showLabel = true,
  labelPosition = "right",
  borderRadius = "20px"
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
      {showLabel && labelPosition === "left" && (
        <span style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)", minWidth: "40px" }}>{percentage}%</span>
      )}
      <div style={{ flex: 1, height: height, width: width, background: bg, borderRadius: borderRadius, overflow: "hidden", position: "relative" }}>
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: percentage + "%",
            background: "linear-gradient(90deg, " + fill + ", " + alpha(fill, 0.7) + ")",
            borderRadius: borderRadius,
            boxShadow: "0 0 10px " + alpha(fill, 0.3),
            transition: "width 0.4s ease"
          }}
        />
      </div>
      {showLabel && labelPosition === "right" && (
        <span style={{ fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.7)", minWidth: "40px" }}>{percentage}%</span>
      )}
    </div>
  );
};