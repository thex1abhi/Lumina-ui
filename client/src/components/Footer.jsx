import React from "react";
import { SiValorant } from "react-icons/si";
function Footer() {
    return <footer className="border-t  border-white/[0.05] py-8 sm:py-10  ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0  ">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]">
                    <SiValorant size={15} color="#051c20" />
                </div>
                <span className="text-lg font-bold tracking-tight text-[#e8f8fa]" style={{ fontFamily: "'Syne',sans-serif" }}>Lumina UI</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-xs text-white/30 ">
                <span className="hover:text-white/60 transition-colors "> Components </span>
                <span className="hover:text-white/60 transition-colors"> luminaui@mail.com </span>
            </div>
            <p className="text-xs text-white/25  order-last sm:order-none"> @{new Date().getFullYear()} lumina UI .All rights reserved </p>
        </div>

    </footer>
}

export default Footer;
