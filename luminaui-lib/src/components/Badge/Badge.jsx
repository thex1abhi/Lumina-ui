import React from "react";

export const Badge = ({
  text = "New",
  bg = "#22c55e",
  color = "#fff"
}) => {
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "system-ui,sans-serif"
      }}
    >
      {text}
    </span>
  );
};