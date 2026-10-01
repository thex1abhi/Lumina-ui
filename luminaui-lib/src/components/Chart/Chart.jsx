import React from "react";

export const Chart = ({
  data = [30, 50, 70, 90, 110],
  labels = ["Jan", "Feb", "Mar", "Apr", "May"],
  width = 400,
  height = 200,
  accent = "#6366f1",
  bg = "#0f172a",
  strokeWidth = 4,
  gridColor = "rgba(255,255,255,0.07)",
  labelColor = "rgba(255,255,255,0.5)",
  showGrid = true,
  showLabels = true
}) => {
  const maxValue = Math.max(...data);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "16px", padding: "20px", width: width + "px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
      <svg width={width} height={height}>
        {showGrid && (
          Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1={0}
              y1={(height / 4) * i}
              x2={width}
              y2={(height / 4) * i}
              stroke={gridColor}
              strokeWidth="1"
            />
          ))
        )}
        <polyline
          fill="none"
          stroke={accent}
          strokeWidth={strokeWidth}
          points={data.map((d, i) => `${(width / (data.length - 1)) * i},${height - (d / maxValue) * height}`).join(" ")}
        />
        {showLabels && (
          labels.map((label, i) => (
            <text
              key={i}
              x={(width / (data.length - 1)) * i}
              y={height + 16}
              fill={labelColor}
              fontSize="12px"
              textAnchor="middle"
            >
              {label}
            </text>
          ))
        )}
      </svg>
    </div>
  );
};