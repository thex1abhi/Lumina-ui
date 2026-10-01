import React, { useState } from "react";

export const Tabs = ({
  tabs = ["Overview", "Features", "Pricing", "Docs"],
  activeTab = "Overview",
  accent = "#6366f1",
  bg = "#0f172a",
  onTabChange = () => {}
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "12px", padding: "8px", fontFamily: "system-ui,sans-serif", width: "100%", maxWidth: "600px", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", gap: "8px", position: "relative" }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setCurrentTab(tab); onTabChange(tab); }}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: currentTab === tab ? alpha(accent, 0.15) : "transparent",
              color: currentTab === tab ? accent : "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontWeight: currentTab === tab ? "600" : "500",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              position: "relative",
              zIndex: 1
            }}
          >
            {tab}
          </button>
        ))}
        <div style={{ position: "absolute", bottom: "0px", left: "0px", height: "2px", background: alpha(accent, 0.5), width: "calc(100% / " + tabs.length + ")", transform: "translateX(" + (tabs.indexOf(currentTab) * 100) + "%)", transition: "transform 0.3s ease" }} />
      </div>
    </div>
  );
};