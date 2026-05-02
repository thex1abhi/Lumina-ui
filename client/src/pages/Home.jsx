import React, { useState } from "react";
import Auth from "../components/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SiValorant } from "react-icons/si";
import { AnimatePresence, motion } from "motion/react"
import { TbComponents, TbLogout, TbMenu, TbMenu2, TbX } from "react-icons/tb";
import { ServerUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAuth, setShowAuth] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { userData } = useSelector((state) => state.user)
    const getLetters = (name) => {
        if (!name) return "U"
        return name.split(" ").map(n => n[0]).join(" ").toUpperCase().slice(0, 2)
    }
    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/")
        } catch (error) {
            console.log(`Error in logout ${error}`)
        }
        setProfileOpen(false)
    }
    return <div className="min-h-screen bg-[#040f12]" >


        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <nav className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 relative z-10 border-b border-[#3be8ff]/10 backdrop-blur-md bg-[#040f12]/50" >
            <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3" >
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]">
                    <SiValorant size={15} color="#051c20" />
                </div>
                <span className="text-lg font-bold tracking-tight text-[#e8f8fa]" style={{ fontFamily: "'Syne',sans-serif" }}>Lumina UI</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50 ">
                <motion.button
                    whileHover={{ color: "#3be8ff", y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="transition-all duration-200  px-3 py-2.5 border border-white/15 rounded-xl text-sm text-white/70  hover:text-white hover:border-white/25 cursor-pointer bg-transparent w-full ">Components</motion.button>

                {userData ? (
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#3be8ff]/8 border border-[#3be8ff]/20 hover:bg-[#3be8ff]/12 hover:border-[#3be8ff]/40 transition-all duration-300 cursor-pointer" >
                            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[11px] font-bold text-[#051c20] shadow-[0_0_12px_rgba(59,232,255,0.3)]">
                                {getLetters(userData.name)}
                            </div>
                            <span className="truncate text-white/70 text-sm">
                                {userData.name}
                            </span>

                        </motion.button>
                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute right-0 mt-2 w-56 rounded-xl border border-[#3be8ff]/20 bg-[#03181c]/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 overflow-hidden" >
                                    <div className="px-4 py-3 border-b border-[#3be8ff]/10">
                                        <p className="font-semibold text-[#e8f8fa] text-sm"> {userData.name} </p> 
                                        <p className="text-[12px] text-[#3be8ff]/60"> {userData.email} </p>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={() => setProfileOpen(false)}
                                            className="w-full flex items-center gap-3 px-3 py-1 rounded-lg text-[#3be8ff]/70 hover:text-[#3be8ff] transition-all duration-200" >
                                            <TbComponents size={16} className="text-[#3be8ff]/70" />
                                            <span className="text-sm font-medium">My Components</span>
                                        </button>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-1 rounded-lg text-red-400/80 hover:text-red-400 transition-colors cursor-pointer duration-200" >
                                            <TbLogout size={16} className="text-red-400/80" />
                                            <span className="text-sm font-medium">Logout</span>
                                        </button>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.03, }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAuth(true)}
                        className="px-2 whitespace-nowrap py-2 rounded-lg bg-[#3be8ff] text-[#051c20] text-sm font-semibold hover:shadow-[0_8px_24px_rgba(59,232,255,0.3)] transition-all duration-300 cursor-pointer">
                        Generate AI component
                    </motion.button>
                )}

            </div>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white/60 hover:text-white transition-colors 
                 bg-transparent    border-none cursor-pointer " >
                {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
            </button>

        </nav> 
        {/* mobile menu  */}
        <AnimatePresence >
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="md:hidden sticky    z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex flex-col  items-center gap-3"  >
                    <button className="w-full px-3 py-2 rounded-lg bg-[#0b1e24]/80 text-white/80 hover:text-white transition-colors">Components</button>
                    {userData ? (
                        <>
                            <div className="text-white flex items-center gap-3">
                                <div className="  w-7 h-7  rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[11px] font-bold text-[#051c20] shadow-[0_0_12px_rgba(59,232,255,0.3)]" >{getLetters(userData.name)}  
                                    
                                </div>
                            <span className="text-white/80" > {userData.name} </span>
                            </div> 
                            <button   
                            onClick={()=>setMenuOpen(false)  } 
                            className="w-full flex justify-center gap-3 px-3 py-1 rounded-lg text-[#3be8ff]/70 hover:text-[#3be8ff] transition-all duration-200 cursor-pointer" >
                                <TbComponents size={16} className="text-[#3be8ff]/70" />
                                            <span className="text-sm font-medium">My Components</span>
                            </button> 
                            <button onClick={()=>{setMenuOpen(false) ; handleLogout()  }}
                                            className="w-full flex items-center justify-center gap-3 px-3 py-1 rounded-lg text-red-400/80 hover:text-red-400 transition-colors cursor-pointer duration-200" >
                                            <TbLogout size={16} className="text-red-400/80" />
                                            <span className="text-sm font-medium">Logout</span> 
                                 </button>


                        </>
                    ) : (
                        <>
                         <motion.button
                        whileHover={{ scale: 1.03, }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAuth(true)}
                        className="px-2 whitespace-nowrap py-2 rounded-lg bg-[#3be8ff] text-[#051c20] text-sm font-semibold hover:shadow-[0_8px_24px_rgba(59,232,255,0.3)] transition-all duration-300 cursor-pointer">
                        Generate AI component
                    </motion.button>

                        </>
                        
                    )
                    }
                </motion.div>
            )
            }
        </AnimatePresence> 


        <AnimatePresence>
            {showAuth && <Auth onclose={() => setShowAuth(false)} />}
        </AnimatePresence> 

      

    </div>;
}

export default Home;
