import React, { useState } from "react";
import { SiValorant } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { TbChevronRight, TbLayoutSidebarLeftExpand, TbMenu2, TbSearch, TbX } from "react-icons/tb"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "motion/react";

function GuidePanel() {
  return (
    <div className=" flex flex-col items-center justify-center  h-full  px-6  sm:px-8 
    text-center  py-10 sm:py-16  "> 
    
    </div>
  )
}


function DetailePanel({ component, onBack }) {
  return (
    <div className="">
      Detail panel
    </div>
  )
}

function SideBarComponent({ publicComponents, selected, onSelect, search, setSearch }) {
  return (
    <>
      <div className="px-3 py-3 border-b border-white/[0.05]">
        <div className="flex itemscenter gap-2 px-3 py-2 rounded-xl bg-white/[0.03] 
      border-white/[0.06]  ">
          <TbSearch size={13} className="text-white/25 shrink-0 " />
          <input className="bg-transparent  text-xs text-white/70  placeholder:white/20
       outline-none  w-full " placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)} />
        </div>

      </div>

      <div className="px-4 pt-3 pb-1.5">
        <p className="text-[9px]  font-bold tracking-[2.5px] uppercase text-white/20 ">
          Public .  {publicComponents.length}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-1 px-2  ">
        {publicComponents.length === 0 ? (
          <p className="text-white/20 text-xs text-center py-8 px-3  ">
            No  public Components yet</p>
        ) : (
          publicComponents.map((c) => (
            <button
              key={c._id}
              onClick={() => onSelect(c)}
              className="w-full  flex  items-center justify-between px-3 py-2.5  rounded-xl 
              text-sm transition-all cursor-pointer  border text-left mb-0.5  "
              style={{
                background: selected?._id === c._id ? "rgba(59,232,255,0.07)" : "transparent",
                borderColor: selected?._id === c._id ? "rgba(59,232,255,0.18)" : "transparent",
                color: selected?._id === c._id ? "#3be8ff" : " rgba(255,255,255,0.5) "
              }} >
              <span className=" truncate  font-medium text-xs  "> {c.name}  </span>
              {selected?._id === c._id && <TbChevronRight size={13} className="shrink-0 ml-1 " />}

            </button>
          ))
        )}
      </div>
    </>

  )
}


function AllComponents() {

  const navigate = useNavigate();
  const { allComponents } = useSelector((s) => s.user)
  const [selected, setSelected] = useState(null);
  const [search, setsearch] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const publicComponents = (allComponents || [])
    .filter((c) => c.visibility === "public")
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name));
  // console.log(publicComponents)  

  const handleSelect = (c) => {
    setSelected(c)
    setSideBarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#030b0d] text-white flex flex-col overflow-hidden"
      style={{ fontFamily: "'DM Sans','sans-serif'" }}>

      <nav className=" sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 
      sm:py-4 border border-b border-white/[0.05] bg-[#030b0d]/90 backdrop-blur-md shrink-0 ">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 sm:gap-2.5 bg-transparent border-none cursor-pointer ">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8   rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] ">
            <SiValorant size={13} color="#051c28" />
          </div>
          <span className=" text-sm sm:text-base font-bold text-white  "
            style={{ fontFamily: "'Syne',sans-serif" }}
          >Lumina UI</span>
        </button>
        <div className="flex items-center gap-2 ">
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/80 ">
            <TbLayoutSidebarLeftExpand size={14} />
            <span className="">Component Explorer </span>
          </div>

          <button
            onClick={() => setSideBarOpen(true)}
            className="sm:hidden  flex items-center justify-center w-8 h-8 
          rounded-xl  bg-white/[0.04] border border-white/[0.08] 
          text-white/50  hover:text-white/80 transition-colors cursor-pointer  ">
            <TbMenu2 size={16} />
          </button>
        </div>

      </nav>

      <div className="flex flex-1 overflow-hidden   "
        style={{ height: "calc(100vh -57px)" }}>
        <aside className=" hidden sm:flex w-52 md:w-56 shrink-0 flex-col  border-r 
         border-white/[0.06]  bg-[#040e11] overflow-hidden  " >

          <SideBarComponent selected={selected} search={search}
            setSearch={setsearch} publicComponents={publicComponents}
            onSelect={handleSelect} />
        </aside>

        <AnimatePresence >
          {sideBarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSideBarOpen(false)}
                className=" sm: hidden fixed  inset-0 z-50 bg-black/60  backdrop-blur-sm "
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="sm:hidden fixed top-0 left-0 z-60 h-full w-72 flex flex-col bg-[#040e11] border-r border-white/[0.08] " >

                <div className="flex items-center justify-between px-4 py-4 border-b 
                 border-white/[0.06]  ">
                  <span className=" text-xs font-bold text-white/40 tracking-widest uppercase ">
                    Components   </span>
                  <button
                    onClick={() => setSideBarOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors cursor-pointer 
                   bg-transparent  border-none ">
                    <TbX size={14} />
                  </button>

                </div>

                <SideBarComponent selected={selected} search={search}
                  setSearch={setsearch} publicComponents={publicComponents}
                  onSelect={handleSelect} />

              </motion.div>
            </>
          )}

        </AnimatePresence>

        <main className="flex-1 overflow-auto bg-[#030b0d] min-w-0   ">
          {
            selected ? (
              <DetailePanel component={selected} onBack={() => setSelected(null)} />
            ) : (
              <GuidePanel />
            )
          }
        </main>

      </div>
    </div>
  );
}

export default AllComponents;
