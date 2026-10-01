import React from "react";

export const Avatar = ({
  src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&q=80",
  alt = "User avatar",
  size = "md",
  borderColor = "#6366f1",
  borderWidth = "2px",
  status = "online",
  shadow = true
}) => {
  const sizes = { sm: "32px", md: "48px", lg: "64px", xl: "80px" };
  const statusColors = { online: "#10b981", offline: "#6b7280", away: "#f59e0b", busy: "#ef4444" };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ position: "relative", width: sizes[size], height: sizes[size] }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          border: `${borderWidth} solid ${borderColor}`,
          boxShadow: shadow ? `0 0 0 4px ${alpha(borderColor, 0.2)}` : "none"
        }}
      />
      {status && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "22%",
            height: "22%",
            borderRadius: "50%",
            background: statusColors[status] || statusColors.online,
            border: "2px solid #0f172a"
          }}
        />
      )}
    </div>
  );
};