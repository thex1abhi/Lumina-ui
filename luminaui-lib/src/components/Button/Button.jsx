import React from "react";

export const Button = ({ text = "Click Me", bg = "#6366f1", color = "#fff", size = "md", disabled = false, loading = false, onClick = () => {} }) => {
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        background: bg,
        color: color,
        padding: sizes[size],
        borderRadius: "10px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        fontSize: "14px",
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease",
        transform: disabled ? "none" : "scale(1)",
        ":hover": {
          transform: disabled ? "none" : "scale(1.05)"
        }
      }}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};