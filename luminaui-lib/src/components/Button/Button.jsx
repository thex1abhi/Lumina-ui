import { useState } from "react";

export const Button = ({
  label = "Click me",
  onClick,
  variant = "primary",   // "primary" | "secondary" | "danger"
  size = "md",           // "sm" | "md" | "lg"
  disabled = false,
  fullWidth = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const palette = {
    primary:   { bg: "#534AB7", hover: "#3C3489", text: "#fff" },
    secondary: { bg: "transparent", hover: "#EEEDFE", text: "#534AB7", border: "#534AB7" },
    danger:    { bg: "#E24B4A", hover: "#A32D2D", text: "#fff" },
  };

  const sizes = {
    sm: { padding: "6px 14px", fontSize: "13px" },
    md: { padding: "9px 20px", fontSize: "15px" },
    lg: { padding: "12px 28px", fontSize: "17px" },
  };

  const c = palette[variant] ?? palette.primary;
  const s = sizes[size] ?? sizes.md;

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: fullWidth ? "100%" : "auto",
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    fontFamily: "inherit",
    borderRadius: "8px",
    border: c.border ? `1.5px solid ${c.border}` : "none",
    background: hovered && !disabled ? c.hover : c.bg,
    color: c.text,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transform: pressed && !disabled ? "scale(0.97)" : "scale(1)",
    transition: "background 0.15s, transform 0.1s, opacity 0.15s",
    outline: "none",
    userSelect: "none",
  };

  return (
    <button
      style={style}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {label}
    </button>
  );
};

