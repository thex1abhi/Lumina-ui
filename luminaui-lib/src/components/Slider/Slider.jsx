import React, { useState, useRef, useEffect } from "react";

export const Slider = ({
  items = [
    { title: "Mountain Peak", description: "Explore breathtaking mountain views", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
    { title: "Ocean Waves", description: "Discover the beauty of the sea", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80" },
    { title: "Desert Sunset", description: "Witness stunning desert landscapes", image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&q=80" }
  ],
  interval = 5000,
  accent = "#6366f1",
  width = "600px",
  height = "350px",
  autoPlay = true
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    resetInterval();
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    resetInterval();
  };

  const resetInterval = () => {
    if (autoPlay) {
      clearInterval(intervalRef.current);
      startInterval();
    }
  };

  const startInterval = () => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, interval]);

  return (
    <div 
      ref={sliderRef} 
      style={{
        position: "relative",
        width: width,
        height: height,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
      }}
    >
      {items.map((item, index) => (
        <div 
          key={index}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 0.8s ease",
            opacity: index === activeIndex ? 1 : 0,
            zIndex: index === activeIndex ? 1 : 0
          }}
        >
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)"
          }}>
            <h3 style={{ color: "#fff", fontSize: "24px", fontWeight: "700", margin: "0 0 8px" }}>{item.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", margin: 0 }}>{item.description}</p>
          </div>
        </div>
      ))}

      <button 
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: alpha(accent, 0.8),
          border: "none",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        &lt;
      </button>

      <button 
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: alpha(accent, 0.8),
          border: "none",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        &gt;
      </button>

      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        zIndex: 2
      }}>
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "none",
              background: index === activeIndex ? accent : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
};