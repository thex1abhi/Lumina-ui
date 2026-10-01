import React from "react";

export const Alert = ({
  message = "Something went wrong!",
  type = "error",
  accent = "#e11d48",
  bg = "#0f172a",
  showClose = true,
  onClose = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const accentColors = {
    error: "#e11d48",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#0ea5e9"
  };
  const accentColor = accentColors[type] || accent;
  return (
    <div style={{
      background: bg,
      padding: "14px 18px",
      borderRadius: "12px",
      border: "1px solid " + alpha(accentColor, 0.25),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      width: "320px",
      fontFamily: "system-ui,sans-serif"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: alpha(accentColor, 0.15),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {type === "error" && <circle cx="12" cy="12" r="10" />}
            {type === "warning" && <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />}
            {type === "success" && <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
            {type === "info" && <circle cx="12" cy="12" r="10" />}
            {type === "error" && <line x1="12" y1="8" x2="12" y2="12" />}
            {type === "error" && <line x1="12" y1="16" x2="12" y2="16" />}
            {type === "warning" && <line x1="12" y1="9" x2="12" y2="13" />}
            {type === "warning" && <line x1="12" y1="17" x2="12" y2="17" />}
            {type === "success" && <polyline points="22 4 12 14.01 9 11" />}
            {type === "info" && <line x1="12" y1="16" x2="12" y2="12" />}
            {type === "info" && <line x1="12" y1="8" x2="12" y2="8" />}
          </svg>
        </div>
        <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>{message}</span>
      </div>
      {showClose && (
        <button onClick={onClose} style={{
          background: "transparent",
          border: "none",
          padding: "4px",
          borderRadius: "6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      )}
    </div>
  );
};