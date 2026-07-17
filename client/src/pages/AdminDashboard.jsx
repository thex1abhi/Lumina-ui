import React, { useState } from "react";
import { SiValorant } from "react-icons/si";
import { TbBoxOff, TbChevronLeft, TbCode, TbLayoutDashboard, TbLogout, TbMenu2, TbPackage, TbPlus, TbSearch, TbUsers, TbWorld } from "react-icons/tb";
import { ServerUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { AnimatePresence, motion } from "motion/react";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function AddComponentForm() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl w-full mx-auto  " >
      <h2 className="text-base sm:text-lg  font-bold mb-1  ">
        Add Component
      </h2>
      <p className="text-white/35  text-xs  mb-5 sm:mb-6   ">
        Manually add a component - give it a name , define props, paste the code and preview it.
      </p>
      <div className="space-y-4 sm:space-y-5 ">

        <div className="p-3.5 sm:p-4 rounded-2xl border border-white[0.07] 
        bg-white/[0.02] space-y-2  ">
          ``
        </div>

      </div>
    </div>
  )
}

function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeView, setactiveView] = useState("dashboard");
  const [sideBarOpen, SetsideBarOpen] = useState(false);
  const [componentSearch, setComponentSearch] = useState("");

  const { userData, allUsers, allComponents } = useSelector((s) => s.user)

  const publicComponents = Array.isArray(allComponents)
    ? allComponents.filter((component) => component?.visibility === "public" || component?.visiblity === "public")
    : []

  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Components", Icon: TbPackage }
  ]

  const stats = [
    { label: "Total Users", value: allUsers?.length || 0, icon: TbUsers, color: "#3be8ff" },
    { label: "Components Made", value: publicComponents?.length || 0, icon: TbCode, color: "#a78bfa" },
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

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter((c) =>
      c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
      c.props?.some((p) => p.toLowerCase().includes(componentSearch.
        toLowerCase()))
    )
    : publicComponents;


  const chatData = (() => {
    if (!publicComponents.length) return []

    const map = {}
    publicComponents.forEach((component) => {
      const raw = component?.createdAt;
      if (!raw) return;

      const createdDate = new Date(raw);
      if (Number.isNaN(createdDate.getTime())) return;

      const label = createdDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      map[label] = (map[label] || 0) + 1;
    });

    return Object.entries(map)
      .map(([date, count]) => ({ date, components: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-12);
  })();

  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-[#0a1f24] border border-white/10 rounded-xl px-3 py-2  
      text-xs shadow-xl ">
        <p className="text-white/50 mb-1 "> {label} </p>
        <p className="text-[#5a3db1] font-bold "> {payload[0].value} component </p>
      </div>
    )
  }


  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/6  ">
        <div className="w-8 h-8  rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] shrink-0  ">
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

      <div className=" p-3 border-t border-white/5 ">
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
        <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/6  fixed top-0 left-0 z-20  ">
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
                  className="fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen  bg-[#040e11] border-r border-white/6 md:hidden  ">
                  <SidebarContent />
                </motion.aside>

              </>
            )
          }
        </AnimatePresence>

        <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto ">
          <div className="sticky top-0 z-10 pz-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90
           backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-2   ">

            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => SetsideBarOpen(true)}
                className="md:hidden  bg-transparent border-none  cursor-pointer  p-1.5 rounded-lg text-white/50 hover:text-white/70 hover:bg-white/5  transition-all
             shrink-0   ">
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
              className="   px-2  flex  items-center gap-2 whitespace-nowrap py-2 rounded-lg 
              bg-[#3be8ff] text-[#051c20] text-sm font-semibold 
               hover:shadow-[0_8px_24px_rgba(59,232,255,0.3)] transition-all duration-300 cursor-pointer ">
              <TbPlus />
              <span className="hidden sm:inline" > AI component</span>

            </motion.button>
          </div>
          <AnimatePresence mode="wait" >
            {activeView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6 ">

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map(({ label, value, icon: Icon, color }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] 
                       bg-white/2 hover:border-white[0.12] transition-all   "
                    >
                      <div className="mb-2.5 sm:mb-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25 ` }}>
                          <Icon />
                        </div>

                      </div>
                      <p className="text-xl sm:text-2xl  font-bold ">{value.toLocaleString()} </p>
                      <p className="text-white/40 text-xs mt-0.5  "> {label} </p>

                    </motion.div>
                  ))}

                </div>

                {/* chart  */}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-4 sm:p-5 rounded-2xl border border-white/[0.07] 
                   bg-white/[0.02] " >
                  <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2 ">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate"> Public Components Published  </p>
                      <p className="text-white/35 text-xs mt-0.5  ">Date-wise breakdown  </p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full 
                   bg-[#a78bfa]/10 text-[#a78bfa] border  border-[#a78bfa]/20 shrink-0 ">
                      Last 12 Days</span>

                  </div>
                  {chatData?.length === 0 ? (
                    <div className="h-[180px] sm:h-[220px] flex items-center justify-center text-white/20 text-sm  ">
                      No public Components yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={200} >
                      <AreaChart data={chatData}
                        margin={{ top: 5, right: 5, bottom: 0, left: -25 }} >
                        <defs>
                          <linearGradient id="componentGradient" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="0%" stopColor="#5a3db1" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#5a3db1" stopOpacity={0} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="date"
                          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          interval="preserveStartEnd" />
                        <YAxis
                          tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          allowDecimals={false}
                          width={30} />

                        <Tooltip content={CustomTooltip} />
                        <Area
                          type="monotone"
                          dataKey="components"
                          stroke="#a78bfa"
                          strokeWidth={2}
                          fill="url(#componentGradient)"
                          dot={false}
                          activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </motion.div >

                {/* public components  */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  initial={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="rounded-2xl border border-white/[0.07] 
                 bg-white/[0.02]  overflow-hidden  " >
                  <div className="flex  flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4  border-b border-white/[0.05] ">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center   "
                        style={{ background: "rgba(59,232,255,0.1)", border: "1px solid rgba(59,232 , 255,0.2)" }}  > <TbWorld size={14} style={{ color: "#3be8ff" }} />   </div>

                      <div className="">
                        <p className="font-semibold text-sm  "> Public Components</p>
                        <p className="text-white/35 text-[11px]">{publicComponents.length} components visible to all  Users </p>
                      </div>
                    </div>

                    <div className="relative w-full sm:w-64 ">
                      <TbSearch size={13} className="absolute  left-3 top-1/2 -translate-y-1/2 
                     text-white/30 pointer-events-none " />
                      <input
                        onChange={(e) => setComponentSearch(e.target.value)}
                        placeholder="Search Component..."
                        className="w-full bg-white/[0.04] border border-white/30 rounded-xl
                     pl-8 pr-3 py-2 text-xs  text-white placeholder-white/25  outline-none
                      focus:border-[#3be8ff]/40  transition-colors     " />
                    </div>
                  </div>
                  {
                    filteredPublicComponents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/20">
                        <TbBoxOff size={32} />
                        <p className="text-sm">
                          {componentSearch ? "No components match your search" : "No public components yet"}
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/[0.04] ">
                        {filteredPublicComponents.map((c, i) => (
                          <motion.div key={i} className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors  ">
                            <div className="flex items-start sm:items-center gap-3 min-w-0 ">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center
                             flex-shrink-0 mt-0.5 sm:mt-0  "
                                style={{
                                  background: "rgba(167,139,250,0.1)",
                                  border: "1px solid rgba(167,139,250,0.2)"
                                }}  >
                                <TbCode size={14} style={{ color: "#a78bfa" }} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{c.name}
                                </p>
                                {c.props?.length > 0 && (
                                  <div className="flex flex-wrap mt-1 gap-1">
                                    {c.props.slice(0, 4).map((p) => (
                                      <div key={p} className="px-1.5 py-0.5  rounded-md text-[10px]
                                       font-medium "
                                        style={{
                                          background: "rgba(167,139,250,0.1)",
                                          color: "rgba(167,139,250,0.7)"
                                        }} >
                                        {p}

                                      </div>
                                    ))}
                                    {c.props?.length > 4 && (
                                      <span className="px-1.5  py-0.5 rounded-md text-[10px] text-white/25 ">
                                        +{c.props.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-end md:items-center gap-2 flex-shrink-0 ">
                              <span className="text-[11px]  text-white/25 whitespace-nowrap  ">
                                {
                                  new Date(c.createdAt).toLocaleDateString("en-us", {
                                    month: "short", day: "numeric", year: "numeric"
                                  })

                                }  </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full
                                 text-[10px] font-semibold  "
                                style={{
                                  background: "rgba(59,232,255,0.08)",
                                  color: "#3be8ff", border: " 1px solid rgba(59,232,255,0.2)"
                                }} > <TbWorld size={9} /> Public
                              </span>

                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )
                  }


                </motion.div>

              </motion.div>
            )}

            {activeView === "add" && (
              <motion.div key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <AddComponentForm />

              </motion.div>
            )}


          </AnimatePresence>



        </main >

      </div >

    </>
  )
}

export default AdminDashboard;

