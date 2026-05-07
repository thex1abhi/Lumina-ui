import React, { useState } from "react";
import Auth from "../components/Auth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SiValorant } from "react-icons/si";
import { AnimatePresence, motion } from "motion/react"
import { TbAdjustments, TbArrowRight, TbBrandNpm, TbCheck, TbCode, TbComponents, TbCopy, TbLayout, TbLogout, TbMenu, TbMenu2, TbPlayerPlay, TbX } from "react-icons/tb";
import { ServerUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiSparkles } from "react-icons/hi2";

const features = [
    {
        icon: TbLayout,
        title: "Prebuilt UI Components",
        text: "Install LuminaUI and use ready-made, production-grade components instantly.",
    },
    {
        icon: HiSparkles,
        title: "AI Component Generator",
        text: "Describe your UI in plain English and generate React components in seconds.",
    },
    {
        icon: TbAdjustments,
        title: "Customizable Props",
        text: "Modify component props and preview changes in real-time without rebuilding.",
    },
    {
        icon: TbCode,
        title: "Clean JSX Code",
        text: "Copy production-ready JSX directly into your project zero boilerplate.",
    },
    {
        icon: TbBrandNpm,
        title: "NPM Library",
        text: "Import LuminaUI components with a simple npm install command.",
    },
    {
        icon: TbPlayerPlay,
        title: "Live Preview",
        text: "Instantly preview AI-generated components before exporting your code.",
    },
];
const steps = [
    {
        n: "01",
        title: "Install Library",
        text: "npm install @yadavabhi/lumina-ui to access all prebuilt UI components."
    },
    {
        n: "02",
        title: "Use Components",
        text: "Import and customize with props for any design requirement."
    },
    {
        n: "03",
        title: "Generate with AI",
        text: "Describe your UI and let AI build the component for you."
    },
    {
        n: "04",
        title: "Copy & Use",
        text: "Paste the clean JSX code straight into your project."
    }
];




function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showAuth, setShowAuth] = useState(false);
    const [copied, setCopied] = useState(false);

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
    const handleCopy = () => {
        navigator.clipboard.writeText(" npm install @yadavabhi/lumina-ui ")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000);
    }

    const handleGenerateClick = () => {
        if (userData) {
            navigate("/generate")

        } else {
            setShowAuth(true)
        }
    }

    return <div className="relative min-h-screen w-screen bg-[#040f12] overflow-x-hidden" >


        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <nav className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-3 relative z-10 border-b border-[#3be8ff]/10 backdrop-blur-md bg-[#040f12]/50" >
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
                        className="px-2  flex  items-center gap-2 whitespace-nowrap py-2 rounded-lg bg-[#3be8ff] text-[#051c20] text-sm font-semibold hover:shadow-[0_8px_24px_rgba(59,232,255,0.3)] transition-all duration-300 cursor-pointer">
                        <HiSparkles size={14} />   Generate AI component
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
                                onClick={() => setMenuOpen(false)}
                                className="w-full flex justify-center gap-3 px-3 py-1 rounded-lg text-[#3be8ff]/70 hover:text-[#3be8ff] transition-all duration-200 cursor-pointer" >
                                <TbComponents size={16} className="text-[#3be8ff]/70" />
                                <span className="text-sm font-medium">My Components</span>
                            </button>
                            <button onClick={() => { setMenuOpen(false); handleLogout() }}
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

        <section className="relative  text-white max-w-5xl mx-auto px-4 sm:px-6  pt-12 sm:pt-18 pb-12 sm:pb-20  text-center "  >
            <motion.div
                initial={{ opacity: 0, y: -22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.6 }}
                className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px]
                 uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/5 rounded-full px-4 py-1.5 mb-6 sm:mb-7 ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3be8ff] animate-pulse " />
                AI-Powered React UI library
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: -22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.6 }}
                className="text-4xl sm:text-5xl  lg:text-6xl font-bold leading-[1.08]  tracking-tight mb-5 sm:mb-6  " style={{ fontFamily: " 'Syne','sans-serif' " }} >
                Build React UI <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3be8ff] to-[#0ab5d4] " >Faster with AI </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.6 }}
                className="text-white/50 text-base sm:text-lg  max-w-xl mx-auto leading-relaxed  mb-8  sm:mb-10 font-light px-2">
                Use prebuilt LuminaUI components or generate custom ones with AI <br /> Copy clean JSX directly into your project in seconds
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27, duration: 0.6 }}
                className="flex justify-center mb-7 sm:mb-8 px-2  ">
                <div className="flex items-center gap-2 sm:gap-3 bg-white/4  border border-white/10 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono w-full max-w-xs sm:max-w-fit ">
                    <span className="text-[#3be8ff]/60">$ </span>
                    <span className="text-white/80 truncate"> npm install @yadavabhi/lumina-ui </span>
                    <button
                        onClick={handleCopy}
                        className="ml-1 text-white/30 hover:text-[#3be8ff] transition-colors cursor-pointer bg-transparent border-none shrink-0">
                        {copied ? <TbCheck size={15} className="text-[#3be8ff]" /> : <TbCopy size={15} />}
                    </button>
                </div>
            </motion.div>
            <motion.div

                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27, duration: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
                <motion.button
                    whilehover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className=" flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto  ">
                    Get started <TbArrowRight size={15} />
                </motion.button>

                <motion.button
                    whilehover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGenerateClick}
                    className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent w-full sm:w-auto ">
                    <HiSparkles size={14} /> Generate AI components

                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.7 }}
                className="mt-12 sm:mt-16 mx-auto max-w-2xl bg-[#0a1a1e]/80  border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)]  backdrop-blur-sm overflow-x-auto ">
                <div className="flex items-center gap-1.5 mb-4 ">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]  " />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 text-[11px] text-white/20 font-mono ">
                        App.jsx</span>
                </div>
                <div className="font-mono text-[11px] sm:text-[12.5px] leading-6 space-y-0.5 
                 min-w-70 ">
                    <p className="">
                        <span className="text-[#3be8ff]/60">import  </span>
                        <span className="text-white/80"> {"{Button , Card}"} </span>
                        <span className="text-[#3be8ff]/60"> from  </span>
                        <span className="text-[#aaff80]/70">@yadavabhi/lumina-ui </span>
                        <span className="text-white/30"> ;</span>
                    </p>
                    <p> {" "} </p>
                    <p className="">
                        <span className="text-[#3be8ff]/60">export default function </span>
                        <span className="text-yellow-300">App</span>
                        <span className=""> (){"{"} </span>
                    </p>
                    <p> <span className="text-white/30"> {"return ("} </span> </p>
                    <p> <span className="text-white/30"> {"<"}  </span> <span className="text-[#3be8ff]/70">  Card </span>
                        <span className="text-[#aaff80]/60">  title </span>
                        <span className=" text-white/30" > {"="} </span>
                        <span className="text-[##aaff80]/60"> {"\"Dashboard\""} </span>
                        <span className="text-white/30">  {"/>"}  </span>
                    </p>
                    <p> <span className="text-white/30"> {"<"}  </span> <span className="text-[#3be8ff]/70">  Button </span>
                        <span className="text-[#aaff80]/60">  text </span>
                        <span className=" text-white/30" > {"="} </span>
                        <span className="text-[##aaff80]/60"> {"\"hello\""} </span>
                        <span className="text-white/30">  {"/>"}  </span>
                    </p>
                    <p className="">
                        <span className="text-white/30"> {"</"} </span>
                        <span className="text-[#3be8ff]/70">Card</span>
                        <span className="text-white/30">{" >"}</span>
                    </p>
                    <p> <span className="text-white/30" > {" );"} </span> </p>
                    <p> <span className="text-white/50" > {"}"} </span> </p>
                </div>
            </motion.div>
        </section>

        <section className="max-w-6xl  mx-auto px-4 sm:px-6 py-16 sm:py-24 ">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10 sm:mb-14" >
                <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3  "   > What's inside </p>
                <h2 className="text-3xl sm:text-4xl text-white font-bold tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }} >
                    Everything you need
                </h2>



            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 ">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-[#3be8ff]/[0.04] hover:border-[#3be8ff]/20 transition-all duration-300"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <item.icon className="w-8 h-8 text-[#3be8ff] mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        </div>

                        <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                    </motion.div>
                ))}
            </div>
            <div className="mt-14 sm:mt-12">



                <div className="w-full py-8  text-white relative overflow-hidden">

                    <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10 sm:mb-14" >
                            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3  "   > Simple Process</p>
                            <h2 className="text-3xl sm:text-4xl text-white font-bold tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }} >
                                How it works
                            </h2>
                        </motion.div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-5 left-0 w-full h-[1px] bg-[#3be8ff]/20"></div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
                                {steps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        viewport={{ once: true }}
                                        className="flex flex-col items-center text-center max-w-xs"
                                    >
                                        <div className="relative z-10 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-[#3be8ff]/10 border border-[#3be8ff]/30 backdrop-blur-md flex items-center justify-center text-[#3be8ff] font-semibold shadow-[0_0_20px_rgba(59,232,255,0.2)]">
                                                {step.n}
                                            </div>
                                        </div>
                                        <h3 className="text-base font-semibold mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {step.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24  ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.06 }}
                viewport={{ once: true }}
                className="relative rounded-2xl sm:rounded-3xl  border  border-[#3be8ff]/15 bg-linear-to-br from-[#071518] to-[#040f12]  p-8 sm:p-14 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,232,255,0.08)_0%,transparent_60%)] pointer-events-none " >   </div>
                <div className="relative z-10">
                    <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 sm:mb-4  "> start building </p>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4   "
                        style={{ fontFamily: "'Syne',sans-serif" }}
                    >Ready to generate  <br /> your new component ? </h3>
                    {userData ? (
                        <>
                            <p className="text-white/40 mb-7 sm:mb-8 text-sm  max-w-md mx-auto leading-relaxed "
                            > Welcome back,  <span className="text-[#3be8ff]/70"> {userData.name}
                                </span>! Continue building amazing components
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3 ">
                                <motion.button
                                    whilehover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer  border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)]  transition-shadow   ">
                                    <HiSparkles size={15} />   Generate AI component
                                </motion.button>
                                <motion.button
                                    whilehover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-2  px-7 py-3.5  
                                    border border-white/15 rounded-xl text-sm text-white/60 hover:text-white  hover:border-white/25 transition-all cursor-pointer bg-transparent   ">
                                    <TbComponents size={16} className="text-[#3be8ff]/70" />
                                    My Components
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <>

                        </>
                    )}

                </div>
            </motion.div>

        </section>


    </div>;
}

export default Home;
