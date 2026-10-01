import React, { useState, useRef, useEffect } from "react";

export const ContextMenu = ({
  items = ["Copy", "Paste", "Delete", "Rename"],
  accent = "#6366f1",
  bg = "#1e293b",
  onSelect = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return isOpen ? (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: bg,
        borderRadius: "10px",
        padding: "8px 0",
        minWidth: "180px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
        fontFamily: "system-ui,sans-serif"
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            onSelect(item);
            setIsOpen(false);
          }}
          style={{
            padding: "10px 16px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            transition: "all 0.2s",
            borderLeft: "3px solid transparent",
            ':hover': {
              background: alpha(accent, 0.1),
              borderLeft: "3px solid " + accent,
              color: "#fff"
            }
          }}
        >
          {item}
        </div>
      ))}
    </div>
  ) : null;
};