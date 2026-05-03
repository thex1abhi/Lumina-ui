import React, { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react"
import { TbCopy, TbDownload, TbLogin2, TbSettings, TbX } from "react-icons/tb"
import { SiValorant } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios"
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const steps = [
    {
        icon: TbLogin2,
        title: "Login with Google",
        desc: "Secure OAuth to unlock all AI tools instantly ",
    },
    {
        icon: HiSparkles,
        title: "Get 150 AI Credits",
        desc: "Free credits to  generate premium UI components.",
    },
    {
        icon: TbSettings,
        title: "Customize Props",
        desc: "Fine-tune preview every change live.",
    },
    {
        icon: TbCopy,
        title: "Generate Components",
        desc: "AI builds production-ready JSX components",
    },
    {
        icon: TbDownload,
        title: "Copy or Save",
        desc: "Export clean code straight into your project.",
    },
];


function Auth({ onclose }) {
    const [active, setActive] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const id = setInterval(() => setActive(s => (s + 1) % steps.length), 2400)
        return () => clearInterval(id)
    }, []);


    const googleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", {
                name, email
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            onclose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
            >

                <motion.div
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 28, scale: 0.97 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row max-w-[92vw] sm:max-w-[920px] w-full mx-auto max-h-[95vh] overflow-y-auto rounded-2xl border border-[#3be8ff]/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative"
                >

                    <button
                        onClick={onclose}
                        className="absolute top-2 right-2 xs:top-3 xs:right-3 z-20 w-10 h-10 xs:w-8 xs:h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
                    >
                        <TbX size={18} />
                    </button>
                    {/* left box  */}

                    <div className="w-full sm:w-[52%] bg-linear-to-b from-[#03181c] to-[#041e24] p-4 xs:p-6 sm:p-10 relative overflow-hidden  " >

                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full 
                         bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] 
                        pointer-events-none " />

                        <motion.div
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 mb-7 sm:mb-9">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#3be8ff]
                              to-[#0ab5d4] flex items-center justify-center  shadow-[0_0_18px_rgba(59,232,255,0.35)] ">
                                <SiValorant size={17} color="#051c20" />
                            </div>
                            <span className="text-lg xs:text-xl font-bold tracking-tight text-[#e8f8fa] "
                                style={{ fontFamily: "'Syne',sans-serif" }}
                            >
                                Lumina UI
                            </span>
                        </motion.div>
                        <p className="text-[9px] xs:text-[10px] font-semibold tracking-[2px] xs:tracking-[3px] text-[#3be8ff] uppercase mb-3 xs:mb-4 sm:mb-5 ">
                            How it works

                        </p>
                        <div className="flex flex-col sm:flex-col overflow-x-hidden gap-1 pb-0">
                            {steps.map((item, i) => (
                                <motion.div key={i}
                                    className={`flex items-start gap-2 xs:gap-3 px-2 xs:px-3 py-2 xs:py-2.5 rounded-lg xs:rounded-xl border transition-all duration-300 ${active === i ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20" : "bg-transparent border-transparent"}  `}  >
                                    {/* icon  */}
                                    <div className={`min-w-6 xs:min-w-7 h-6 xs:h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${active === i ? "bg-linear-to-b from-[#3be8ff] to-[#0ab8d6] border-transparent" : "bg-[#3be8ff]/8 border-[#3be8ff]/20"}   `} > <item.icon size={11} className="xs:w-[13px]" color={active === i ? "#051c20" : "#3be8ff"} />
                                    </div>
                                    {/* title desc  */}
                                    <div className="flex-1">
                                        <p className={`text-xs xs:text-sm font-semibold whitespace-normal transition-colors duration-300 ${active === i ? 'text-white' : 'text-white/55'}`}>
                                            {item.title}
                                        </p>
                                        <div className={`overflow-hidden transition-all duration-500 ${active === i ? 'max-h-10 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-[10px] xs:text-[11px] leading-relaxed text-[#3be8ff]/40" >
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>


                                </motion.div>
                            )
                            )}
                        </div>
                    </div>

                    {/* right box  */}
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="w-full sm:w-[48%] bg-[#040f12] px-4 xs:px-6 sm:px-10 py-6 xs:py-8 sm:py-12 flex flex-col justify-center items-center relative overflow-hidden ">

                        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-size-[32px_32px] " />

                        <div className="relative z-10 w-full max-w-full xs:max-w-64 sm:max-w-70 text-center mx-auto ">

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: easeInOut }}
                                className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-xl xs:rounded-2xl mx-auto mb-4 xs:mb-5 sm:mb-6 bg-linear-to-br from-[#3be8ff]/15 to-[#040f12] border border-[#3be8ff]/20 flex items-center justify-center" >
                                <SiValorant size={18} className="xs:w-5 sm:w-6" color="#3be8ff" />
                            </motion.div>
                            <h3 className="text-lg xs:text-xl font-bold text-[#e4f6f8] tracking-tight mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                                Welcome
                            </h3>
                            <p className="text-[12px] xs:text-[13px] text-[#96bec8]/55 leading-relaxed mb-5 xs:mb-6 sm:mb-7"> Sign-In to generate AI powered UI components in seconds
                            </p>
                            <div className="flex justify-center gap-3 xs:gap-4 sm:gap-5 mb-5 xs:mb-6 sm:mb-7">
                                {
                                    [["150", "AI credits"], ["∞", "components"], ["JSX", "Ready"]].map(([v, l], i) => (
                                        <div key={i}
                                            className="text-center">
                                            <div className="text-sm xs:text-base font-bold text-[#3be8ff]"> {v} </div>
                                            <div className="text-[8px] xs:text-[9px] text-[#78aab4]/45 uppercase tracking-wider font-medium"> {l} </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <motion.button
                                onClick={googleAuth}
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 xs:gap-2.5 py-3 xs:py-3.5 rounded-lg xs:rounded-xl bg-white text-[#0a1a1d] font-semibold text-xs xs:text-sm cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] transition-shadow">
                                <FcGoogle size={18} />
                                Continue with Google
                            </motion.button>
                            <p className="text-[10px] xs:text-[11px] text-[#64919b]/45 mt-3 xs:mt-4 sm:mt-5">
                                No account needed for npm.{" "}<span onClick={onclose}
                                    className="text-[#3be8ff]/50 border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors"> View Docs</span>
                            </p>
                        </div>
                    </motion.div>

                </motion.div>

            </motion.div>;

        </AnimatePresence>

    )
}

export default Auth;

