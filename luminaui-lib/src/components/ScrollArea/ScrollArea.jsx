import React, { useState, useRef } from "react";

export const ScrollArea = ({
  width = "400px",
  height = "300px",
  bg = "#0f172a",
  accent = "#6366f1",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  scrollbarThickness = "8px",
  scrollbarBg = "rgba(255,255,255,0.08)",
  scrollbarHoverBg = "rgba(255,255,255,0.16)"
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        width: width,
        height: height,
        background: bg,
        borderRadius: "12px",
        overflowY: "scroll",
        position: "relative",
        scrollbarWidth: "thin",
        scrollbarColor: alpha(accent, 0.3) + " " + scrollbarBg,
        border: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      <div style={{ padding: "16px", color: "rgba(255,255,255,0.8)", fontSize: "14px", lineHeight: 1.6 }}>{content}</div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: scrollbarThickness,
          height: height,
          background: scrollbarBg,
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: scrollTop,
            right: 0,
            width: scrollbarThickness,
            height: "20%",
            background: alpha(accent, 0.2),
            borderRadius: "4px",
            transition: "background 0.2s"
          }}
        />
      </div>
    </div>
  );
};