import React, { useState } from "react";
import { SiValorant } from "react-icons/si";
import { TbChevronLeft, TbLayoutDashboard, TbLogout, TbMenu2, TbPackage, TbPlus } from "react-icons/tb";
import { ServerUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { AnimatePresence, motion } from "motion/react";

function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeView, setactiveView] = useState("dashboard");
  const [sideBarOpen, SetsideBarOpen] = useState(false);
  const { userData, allUsers, allComponents } = useSelector((s) => s.user)
  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Components", Icon: TbPackage }

  ]

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/")
    } catch (error) {
      console.log(`Error in logout ${error}`)
    }

  }


  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]  ">
        <div className="w-8 h-8  rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] flex-shrink-0  ">
          <SiValorant size={15} color="#051c28" />
        </div>
        <div className="">
          <span className="text-base font-bold block"> Lumina UI </span>
          <span className="text-[10px] text-[#3be8ff]/60  font-semibold tracking-[2px] uppercase  "> Admin  </span>
        </div>
        <button
          onClick={() => SetsideBarOpen(false)}
          className=" ml-auto md:hidden  bg-transparent border-none  cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors  ">
          <TbChevronLeft size={18} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button key={id}
              onClick={() => setactiveView(id)}
              className="w-full  flex items-cente gap-3  px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer text-left  "
              style={{
                background: isActive ? "rgba(59,232,255,0.08)" : "transparent",
                color: isActive ? " #3be8ff " : " rgba(255,255,255,0.45) ",
                borderLeft: isActive ? " 2px solid #3be8ff " : " 2px solid transparent "
              }}   >
              <Icon size={15} />
              {label}
            </button>)
        })}
      </nav>

      <div className=" p-3 border-t border-white/[0.05] ">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-1 rounded-lg text-red-400 hover:text-red-400 transition-colors cursor-pointer duration-200" >
          <TbLogout size={16} className="text-red-400" />
          <span className="text-sm font-medium">LogOut</span>
        </button>
      </div>

    </>
  )

  return (
    <>
      <div className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden "
        style={{ fontFamily: "'DM Sans','sans-serif'" }}
      >
        <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/[0.06]  fixed top-0 left-0 z-20  ">
          <SidebarContent />
        </aside>

        <AnimatePresence >
          {
            sideBarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-30 bg-black/60  
                  backdrop-blur-[2px] md:hidden "
                  onClick={() => SetsideBarOpen(false)}
                />

                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen  bg-[#040e11] border-r border-white/[0.06] md:hidden  ">
                  <SidebarContent />
                </motion.aside>

              </>
            )
          }
        </AnimatePresence>

        <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto ">
          <div className="sticky top-0 z-10 pz-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90
           backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between gap-2   ">

            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => SetsideBarOpen(true)}
                className="md:hidden  bg-transparent border-none  cursor-pointer  p-1.5 rounded-lg text-white/50 hover:text-white/70 hover:bg-white/[0.05]  transition-all
             flex-shrink-0   ">
                <TbMenu2 size={20} />
              </button>
              <div className="min-w-0  ">
                <h1 className="text-base sm:text-lg font-bold truncate ">
                  {activeView === "dashboard" ? "Dashbaord" : "Add Component"}
                </h1>
                <p className="text-white/35 text-xs truncate"> Welcome back , {userData?.name || "Admin"}
                </p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate("/generate")}
              className="   px-2  flex  items-center gap-2 whitespace-nowrap py-2 rounded-lg bg-[#3be8ff] text-[#051c20] text-sm font-semibold hover:shadow-[0_8px_24px_rgba(59,232,255,0.3)] transition-all duration-300 cursor-pointer ">
              <TbPlus />
              <span className="hidden sm:inline" > AI component</span>

            </motion.button>
          </div>

          {activeView === "dashboard" && (
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,232,255,0.08) 0%, rgba(10,181,212,0.04) 100%)",
                    border: "1px solid rgba(59,232,255,0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3be8ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <p className="text-white/50 text-sm font-medium mb-2">Total Users</p>
                    <motion.h3
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                      className="text-4xl sm:text-5xl font-bold text-[#3be8ff]"
                    >
                      {allUsers?.length || 0}
                    </motion.h3>
                    <p className="text-white/35 text-xs mt-3">Active users on platform</p>
                  </div>
                  <div className="absolute top-2 right-2 w-20 h-20 bg-[#3be8ff]/10 rounded-full blur-2xl" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative p-6 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,232,255,0.08) 0%, rgba(10,181,212,0.04) 100%)",
                    border: "1px solid rgba(59,232,255,0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3be8ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <p className="text-white/50 text-sm font-medium mb-2">Total Components</p>
                    <motion.h3
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
                      className="text-4xl sm:text-5xl font-bold text-[#3be8ff]"
                    >
                      {allComponents?.length || 0}
                    </motion.h3>
                    <p className="text-white/35 text-xs mt-3">Components in library</p>
                  </div>
                  <div className="absolute top-2 right-2 w-20 h-20 bg-[#3be8ff]/10 rounded-full blur-2xl" />
                </motion.div>
              </div>

              <div className="mt-6 space-y-3">
                {(allComponents || []).map((component, index) => (
                  <motion.div
                    key={component?._id || index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <p className="text-sm font-semibold text-[#3be8ff]">
                      {component?.name || "Unnamed Component"}
                    </p>

                    <pre className="mt-2 overflow-x-auto text-sm text-white/70 whitespace-pre-wrap break-words">
                      Props : 
                      {typeof component?.props === "string"
                        ? component.props.replace(/\s+/g, " ")
                        : JSON.stringify(component?.props || {})}
                    </pre>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>

      </div>

    </>
  )
}

export default AdminDashboard;

