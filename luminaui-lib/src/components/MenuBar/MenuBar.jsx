import React, { useState } from "react";

export const MenuBar = ({
  items = ["Home", "Products", "Services", "About", "Contact"],
  accent = "#6366f1",
  bg = "#0f172a",
  onItemClick = () => {}
}) => {
  const [active, setActive] = useState(items[0]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "10px", padding: "8px", width: "fit-content", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        {items.map(item => (
          <button
            key={item}
            onClick={() => { setActive(item); onItemClick(item); }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: active === item ? alpha(accent, 0.12) : "transparent",
              color: active === item ? "#fff" : "rgba(255,255,255,0.5)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s"
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};