
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiCpu, FiLoader, FiPlus, FiZap } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const Toast = ({ message, type, onclose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 
     px-5 py-3 rounded-2xl shadow-2xl"
      style={{
        background: type === "success" ? "#0d9f6e " : type === "error" ?
          "#e02424" : "#1c1c2e",
        color: "#fff",
        minWidth: "220px",
      }}
    >
      {type === "success" ? <FiCheckCircle size={18} /> : <FiAlertCircle size={18} />} 
      <p className=""> { message} </p>

    </motion.div>
  )
}

function Generate() {

  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const userRole = userData?.role
  const aiCredits = userData?.aiCredits
  const lowCredits = userRole === "user" && aiCredits <= 50
  const [prompt, setPrompt] = useState("")
  const [generated, setGenerated] = useState(null);
  const [generating, setGenerating] = useState(false);

  const hanleGenerate = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

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
              >
                <FiZap size={13} style={{ color: lowCredits ? "#f87171" : "#818cf8" }} />
                <span className="text-xs font-semibold  " style={{ color: lowCredits ? "#f87171" : "818cf8" }} > {aiCredits} AI Credits  </span>
                <button className="flex items-center justify-center w-5 h-5 rounded-md transition-all cursor-pointer border-none "
                  style={{ backgroundColor: lowCredits ? "rgba(239 68,68,0.2)" : "rgba(99,102,241,0.2)" }}
                  onClick={() => navigate("/pricing")}
                >
                  <FiPlus size={11} style={{ color: lowCredits ? "#f87171" : "818cf8" }} />
                </button>
              </div>
            </motion.div>
          )
        }

        {lowCredits && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl mb-5"
            style={{
              backgroundColor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <FiAlertCircle size={16} className="text-red-400 shrink-0" />

            <p className="text-sm text-red-300">
              You need at least
              <span className="font-bold text-red-400"> 50 credits </span>
              to generate a component
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none whitespace-nowrap"
              style={{
                background: "rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              Buy Credits <FiArrowRight size={15} />
            </button>
          </motion.div>
        )}


        {/* prompt box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-1 mb-8">

          <div
            className="rounded-xl p-4 flex gap-2 items-start"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              border: "1px solid rgba(99,102,241,0.06)",
            }}
          >
            <FiZap className="text-indigo-400 mt-2 shrink-0" />

            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              disabled={lowCredits}
              rows={3}
              className="flex-1 bg-transparent text-white placeholder-white/40 resize-none rounded-lg  outline-none border border-transparent focus:border-indigo-500 transition-colors disabled:cursor-not-allowed "
              placeholder={lowCredits ? "Not enough credits to generate" : " A glassmorphism pricing card with a toggle for monthly/annual billing..."}
            />
          </div>

          <div className="flex items-center justify-between  px-4 pb-3 ">
            <span className="text-xs text-white/20"> Crtl + Enter to generate  </span>
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={generating || lowCredits || !prompt.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40  disabled:cursor-not-allowed transition-all "
              style={{
                background: generating ? "rgba(99,102,241,0.3)" :
                  " linear-gradient(135deg, #6366f1 0% , #4f46e5 100% ) ",
                boxShadow: generating ? "none" : " 0 0 24px rgba(99,102,241,0.4) ",
              }}
            >

              {generating ? (
                <motion.span animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block">
                  <FiLoader size={15} />
                </motion.span>
              ) : (
                <FiZap size={13} />
              )
              }

              {generating ? "Generating..." : " Generate"}

            </motion.button>
          </div>
        </motion.div>

      </div>

      {
        !generated && !generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16 ">

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 "
              style={{ background: " rgba(99,102, 241,0.1) ", border: " 1px solid rgba(99,102,241,0.2) " }}
            >

              <FiCpu size={28} className="text-indigo-400" />
            </div>
            <p className="text-white/20  text-sm  "> Describe your component above and hit Generate
            </p>
          </motion.div>
        )
      }

      {
        generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ borderTopColor: "#6366f1", borderRightColor: "#06b6d4" }}
              className="w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-4 "

            />

            <p className="text-white/30  text-sm "> AI is crafting your component...</p>

          </motion.div>
        )
      }



    </div>
  );
}

export default Generate;
