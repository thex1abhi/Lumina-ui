import React, { useState, useRef, useEffect } from "react";

export const InputArea = ({
  placeholder = "Type your message here...",
  initialValue = "",
  bg = "#1e293b",
  borderColor = "rgba(255,255,255,0.1)",
  accentColor = "#6366f1",
  textColor = "#fff",
  disabled = false,
  rows = 4,
  maxLength = 500,
  showCounter = true,
  onSubmit = () => {},
  onChange = () => {}
}) => {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);
  
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
      setValue("");
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);
  
  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: "600px",
      borderRadius: "12px",
      background: bg,
      border: "1px solid " + (focused ? alpha(accentColor, 0.4) : borderColor),
      transition: "border 0.2s, box-shadow 0.2s",
      boxShadow: focused ? "0 0 0 3px " + alpha(accentColor, 0.15) : "none"
    }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        style={{
          width: "100%",
          minHeight: rows * 24 + "px",
          padding: "16px",
          background: "transparent",
          border: "none",
          resize: "none",
          color: textColor,
          fontFamily: "system-ui, sans-serif",
          fontSize: "15px",
          lineHeight: "1.5",
          outline: "none",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "text"
        }}
      />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px 12px",
        gap: "8px"
      }}>
        <div style={{
          display: "flex",
          gap: "8px"
        }}>
          <button 
            onClick={() => {
              onSubmit(value);
              setValue("");
            }}
            disabled={disabled || !value}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: value ? accentColor : "rgba(255,255,255,0.08)",
              color: value ? "#fff" : "rgba(255,255,255,0.5)",
              border: "none",
              fontSize: "13px",
              fontWeight: "600",
              cursor: (disabled || !value) ? "not-allowed" : "pointer",
              opacity: (disabled || !value) ? 0.6 : 1,
              transition: "background 0.2s, opacity 0.2s"
            }}
          >
            Send
          </button>
        </div>
        {showCounter && (
          <div style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.4)",
            marginLeft: "auto"
          }}>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};