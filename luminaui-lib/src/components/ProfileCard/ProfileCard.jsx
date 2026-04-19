 
 import React, { useState } from "react";

 export const Profilecard = ({
  name        = "Jane Doe",
  role        = "Product Designer",
  bio         = "Crafting delightful user experiences, one pixel at a time.",
  avatar      = "",               // URL — falls back to initials
  stats       = [                   // array of { label, value }
    { label: "Posts",    value: "128" },
    { label: "Followers", value: "4.2k" },
    { label: "Following", value: "318" },
  ],
  accentColor = "#534AB7",
  width       = "300px",
  onFollow,
}) => {
  const [following, setFollowing]   = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleFollow = () => {
    setFollowing((f) => !f);
    onFollow?.(!following);
  };

  const cardStyle = {
    width,
    borderRadius: "16px",
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    boxShadow: cardHovered
      ? "0 8px 24px rgba(0,0,0,0.10)"
      : "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
    fontFamily: "inherit",
    transition: "box-shadow 0.2s, transform 0.2s",
    transform: cardHovered ? "translateY(-2px)" : "translateY(0)",
  };

  const bannerStyle = {
    height: "72px",
    background: accentColor,
    opacity: 0.12,
    position: "absolute",
    inset: "0 0 auto 0",
  };

  const avatarStyle = {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    border: `3px solid var(--color-background-primary)`,
    background: avatar ? "transparent" : accentColor + "22",
    color: accentColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: 500,
    overflow: "hidden",
    flexShrink: 0,
  };

  const btnStyle = {
    padding: "7px 22px",
    borderRadius: "999px",
    border: `1.5px solid ${accentColor}`,
    background: following
      ? accentColor
      : btnHovered ? accentColor + "18" : "transparent",
    color: following ? "#fff" : accentColor,
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.18s, color 0.18s",
    outline: "none",
    fontFamily: "inherit",
  };

  const statStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    flex: 1,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <div style={{ position: "relative", padding: "0 1.25rem 1.25rem" }}>
        <div style={bannerStyle} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "36px", position: "relative" }}>
          <div style={avatarStyle}>
            {avatar
              ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : initials}
          </div>

          <button
            style={btnStyle}
            onClick={handleFollow}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>

        <div style={{ marginTop: "12px" }}>
          <h3 style={{ margin: "0 0 2px", fontSize: "16px", fontWeight: 500, color: "var(--color-text-primary)" }}>
            {name}
          </h3>
          <p style={{ margin: "0 0 10px", fontSize: "13px", color: accentColor, fontWeight: 500 }}>
            {role}
          </p>
          <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "var(--color-text-secondary)" }}>
            {bio}
          </p>
        </div>
      </div>

      <div style={{
        display: "flex",
        borderTop: "0.5px solid var(--color-border-tertiary)",
        padding: "14px 1.25rem",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            ...statStyle,
            borderLeft: i > 0 ? "0.5px solid var(--color-border-tertiary)" : "none",
          }}>
            <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)" }}>{s.value}</span>
            <span style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

