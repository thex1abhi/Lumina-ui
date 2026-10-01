import React from "react";

export const DataTable = ({
  columns = ["Name", "Age", "Email"],
  data = [["John Doe", 23, "john@example.com"], ["Jane Smith", 28, "jane@example.com"]],
  headerBg = "#1e293b",
  rowBg = "#0f172a",
  accent = "#6366f1",
  borderColor = "rgba(255,255,255,0.08)",
  onRowClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ borderRadius: "12px", overflow: "hidden", fontFamily: "system-ui,sans-serif", width: "100%", maxWidth: "800px", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", border: "1px solid " + borderColor }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + columns.length + ", 1fr)", background: headerBg, padding: "14px 20px", borderBottom: "1px solid " + borderColor }}>
        {columns.map((col, i) => (
          <div key={i} style={{ fontSize: "13px", fontWeight: "700", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{col}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((row, i) => (
          <div key={i} onClick={() => onRowClick(row)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "repeat(" + columns.length + ", 1fr)", padding: "14px 20px", background: rowBg, borderBottom: i === data.length - 1 ? "none" : "1px solid " + borderColor, transition: "background 0.2s" }}>
            {row.map((cell, j) => (
              <div key={j} style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: "500" }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};