import React, { useState } from "react";

export const Toggle = ({
  defaultValue = false,
  size = "md",
  activeColor = "#6366f1",
  inactiveColor = "#1e293b",
  thumbColor = "#fff",
  onChange = () => {}
}) => {
  const [isActive, setIsActive] = useState(defaultValue);
  const sizes = { sm: { width: 40, height: 20 }, md: { width: 48, height: 24 }, lg: { width: 56, height: 28 } };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const toggle = () => {
    setIsActive(!isActive);
    onChange(!isActive);
  };
  return (
    <button
      onClick={toggle}
      style={{
        width: sizes[size].width + "px",
        height: sizes[size].height + "px",
        borderRadius: "100px",
        border: "none",
        background: isActive ? activeColor : inactiveColor,
        cursor: "pointer",
        padding: "0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        transition: "background 0.2s",
        boxShadow: isActive ? "0 0 0 3px " + alpha(activeColor, 0.2) : "none"
      }}
    >
      <div
        style={{
          width: sizes[size].height - 8 + "px",
          height: sizes[size].height - 8 + "px",
          borderRadius: "50%",
          background: thumbColor,
          position: "absolute",
          left: isActive ? sizes[size].width - sizes[size].height + 4 + "px" : "4px",
          transition: "left 0.2s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      />
    </button>
  );
};