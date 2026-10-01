import React, { useState } from "react";

export const MenuBar = ({
  items = ["Home", "About", "Services", "Contact"],
  activeColor = "#6366f1",
  inactiveColor = "rgba(255,255,255,0.5)",
  bg = "#020617",
  onItemClick = () => {}
}) => {
  const [activeItem, setActiveItem] = useState(items[0]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "12px", padding: "8px", width: "100%", maxWidth: "600px", margin: "0 auto", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
        {items.map(item => (
          <button
            key={item}
            onClick={() => { setActiveItem(item); onItemClick(item); }}
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeItem === item ? alpha(activeColor, 0.12) : "transparent",
              color: activeItem === item ? activeColor : inactiveColor,
              fontSize: "14px",
              fontWeight: activeItem === item ? "700" : "500",
              cursor: "pointer",
              fontFamily: "system-ui,sans-serif",
              transition: "all 0.2s"
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};