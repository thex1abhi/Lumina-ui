
import React from "react";
import { AnimatePresence, motion } from "motion/react"
import { FiCpu } from "react-icons/fi"
import { useSelector } from "react-redux"
function Generate() {

  const { userData } = useSelector((state) => state.user)

  const userRole = userData.userRole
  const aiCredits = userData.aiCredits
  const lowCredits = userRole === "user" && aiCredits < 50

  return (
    <div
      className="relative min-h-screen w-screen bg-[#040f12] overflow-x-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
      }}
    >

      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(59,232,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 90%, rgba(10,181,212,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 " >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6  "
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)"
            }}
          >
            <FiCpu size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold  tracking-widest text-indigo-300 uppercase ">
              AI component Studio
            </span>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-3 "
            style={{ fontFamily: " 'space Grotesk ' , sans-serif ", letterSpacing: "-0.03em" }}
          >
            <span className="text-white  "> Build with  </span>
            <span className=""
              style={{ background: "linear-gradient(135deg,#818cf8 0% ,  #06b6d4 100% )", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            > AI  </span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto  ">
            Describe your react component in plain English. Preview , save , and publish - all in one place
          </p>
        </motion.div>

        {
          userRole === "user" && (
            <motion.div
              style={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-end  mb-4 ">
              <div className=" flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{
                  background: lowCredits ? "rgba(239,68,68,0.1)" : " rgba(99,102,241,0.1) ",
                  border: `1px solid ${lowCredits ? " rgba(239,68,68,0.25)  " : " rgba(99,102, 241, 0.25) "} `
                }}
              ></div>
            </motion.div>
          )
        }


      </div>

    </div>
  );
}

export default Generate;
