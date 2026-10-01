import React from "react";

export const Spinner = ({
  size = 32,
  color = "#6366f1",
  speed = 0.8,
  trackWidth = 3,
  trackColor = "rgba(255,255,255,0.1)"
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{
      display: "inline-block",
      position: "relative",
      width: size + "px",
      height: size + "px",
      animation: "rotate " + speed + "s linear infinite"
    }}>
      <style>{`@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      <svg
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={trackColor}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth={trackWidth}
          strokeDasharray="80, 200"
          strokeDashoffset="0"
          strokeLinecap="round"
          style={{
            animation: "dash 1.5s ease-in-out infinite",
            opacity: 0.8
          }}
        />
      </svg>
      <style>{`@keyframes dash {
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
        100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
      }`}</style>
    </div>
  );
};