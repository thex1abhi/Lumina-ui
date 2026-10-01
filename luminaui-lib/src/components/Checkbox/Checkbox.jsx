import React, { useState } from "react";

export const Checkbox = ({
  label = "Remember me",
  checked = false,
  disabled = false,
  accent = "#6366f1",
  textColor = "#ffffff",
  disabledColor = "rgba(255,255,255,0.3)",
  onChange = () => {},
  size = "md"
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  const sizes = { sm: 14, md: 18, lg: 22 };
  const checkboxSize = sizes[size];
  
  const toggleCheck = () => {
    if (!disabled) {
      const newVal = !isChecked;
      setIsChecked(newVal);
      onChange(newVal);
    }
  };
  
  return (
    <div 
      onClick={toggleCheck}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none"
      }}
    >
      <div 
        style={{
          width: checkboxSize + "px",
          height: checkboxSize + "px",
          borderRadius: "5px",
          border: "1px solid " + (disabled ? disabledColor : alpha(accent, 0.5)),
          background: disabled 
            ? "rgba(255,255,255,0.05)" 
            : isChecked 
              ? accent 
              : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          opacity: disabled ? 0.6 : 1
        }}
      >
        {isChecked && (
          <svg 
            width={checkboxSize - 6} 
            height={checkboxSize - 6} 
            viewBox="0 0 14 14" 
            fill="none" 
            stroke={disabled ? disabledColor : "#fff"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="1.5,7 5.5,11 12.5,4" />
          </svg>
        )}
      </div>
      <span 
        style={{
          color: disabled ? disabledColor : textColor,
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        {label}
      </span>
    </div>
  );
};