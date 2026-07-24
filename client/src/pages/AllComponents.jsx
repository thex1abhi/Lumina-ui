import React from "react";
import { SiValorant } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function AllComponents() { 

  const navigate= useNavigate();

  return (
    <div className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden"
      style={{ fontFamily: "'DM Sans','sans-serif'" }}>
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/6 fixed top-0 left-0 z-20">
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/6"> 
        <button 
          onClick={()=>navigate("/")}
        className="flex items-center justify-center gap-2 cursor-pointer ">
          <div 
        
          className="w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] shrink-0">
            <SiValorant size={15} color="#051c28" /> 
           
          </div>  
            <span className="text-base font-bold block">Lumina UI</span>
          </button>
          
        </div>

      </aside>

    </div>
  );
}

export default AllComponents;
