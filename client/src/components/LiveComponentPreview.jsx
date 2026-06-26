import React, { useState, useEffect, useRef, useCallback } from "react";
import { LiveProvider } from "react-live"
import { motion } from "motion/react"
export const LivePreview = (code) => {

    const [refreshKey, setRefreshKey] = useState(0);

    const refreshPreview = () => {
        setRefreshKey((prev) => prev + 1)
    }


    let sanitized = code
        .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
        .replace(/export\s+/g, "");

    sanitized = sanitized
        .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
        .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')
        .replace(/\bfixed\b/g, "absolute");


    const match = sanitized.match(/const\s+([A-Z]\w+)/);
    const componentname = match ? match[1] : null

    const wrappedCode = componentname
        ? `${sanitized}\n\nrender(<${componentname}/>)`
        : sanitized;


    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100%"
            }}
        >

            <motion.button
                onClick={refreshPreview}
                style={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    background: "#1e293b",
                    border: "none",
                    color: "#94a3b8",
                    padding: "6px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    zIndex: 10,
                }}>

            </motion.button>

            <LiveProvider
                key={refreshKey}
                code={wrappedCode}
                scope={{ React, useState, useEffect, useRef, useCallback }}
                noInline

            />

        </div>
    )

} 
