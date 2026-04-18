import { useState } from "react";

 export  const Card = ({
  title = "Card title",
  subtitle = "",
  children,
  footer,
  image,
  badge,
  variant = "default",   // "default" | "outlined" | "flat"
  hoverable = false,
  onClick,
  width = "320px",
  padding = "1.25rem",
}) => {
  const [hovered, setHovered] = useState(false);

  const variantStyles = {
    default:  { background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.12)", shadow: hovered && hoverable ? "0 4px 16px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)" },
    outlined: { background: "transparent", border: "1.5px solid rgba(0,0,0,0.18)", shadow: "none" },
    flat:     { background: "#F1EFE8", border: "none", shadow: "none" },
  };

  const v = variantStyles[variant] ?? variantStyles.default;

  const cardStyle = {
    width,
    borderRadius: "12px",
    background: v.background,
    border: v.border,
    boxShadow: v.shadow,
    overflow: "hidden",
    fontFamily: "inherit",
    cursor: onClick ? "pointer" : "default",
    transform: hovered && hoverable ? "translateY(-2px)" : "translateY(0)",
    transition: "box-shadow 0.2s, transform 0.2s",
    userSelect: "none",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#EEEDFE",
    color: "#3C3489",
    marginBottom: "10px",
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {image && (
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
        />
      )}

      <div style={{ padding }}>
        {badge && <span style={badgeStyle}>{badge}</span>}

        {title && (
          <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 500, color: "inherit" }}>
            {title}
          </h3>
        )}

        {subtitle && (
          <p style={{ margin: "0 0 12px", fontSize: "13px", color: "rgba(0,0,0,0.45)" }}>
            {subtitle}
          </p>
        )}

        {children && (
          <div style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(0,0,0,0.7)" }}>
            {children}
          </div>
        )}
      </div>

      {footer && (
        <div style={{
          padding: `0 ${padding} ${padding}`,
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
          paddingTop: "12px",
          fontSize: "13px",
          color: "rgba(0,0,0,0.45)",
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};
