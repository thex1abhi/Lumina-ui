import React, { useMemo, useState } from "react";
import { SiValorant } from "react-icons/si";
import { TbSearch, TbCode, TbWorld } from "react-icons/tb";

function AllComponents() {

  return (
    <div className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden"
      style={{ fontFamily: "'DM Sans','sans-serif'" }}>
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/6 fixed top-0 left-0 z-20">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/6">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] shrink-0">
            <SiValorant size={15} color="#051c28" />
          </div>
          <div>
            <span className="text-base font-bold block">Lumina UI</span>

          </div>
        </div>

      </aside>

    </div>
  );
}

export default AllComponents;
