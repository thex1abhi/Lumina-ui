import React from "react";

export const Badge = ({
  text = "New",
  bg = "#6366f1",
  color = "#fff",
  size = "md",
  rounded = true,
  border = false
}) => {
  const sizes = { sm: "6px 10px", md: "8px 12px", lg: "10px 14px" };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        color: color,
        padding: sizes[size],
        borderRadius: rounded ? "100px" : "6px",
        border: border ? "1px solid " + alpha(bg, 0.3) : "none",
        fontSize: "12px",
        fontWeight: "700",
        fontFamily: "system-ui,sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        lineHeight: 1,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      {text}
    </div>
  );
};