import React from "react";
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiZap } from "react-icons/fi";

const plans = [
  {
    name: "Free",
    amount: null,
    aiCredits: 150,
    tag: "Current Plan",
    description: "Get Started with AI-powered component generation.",
    features: [
      "150 AI Credits included",
      "Save components",
      "Preview & export code ",
      "Community support",
    ],
    cta: "Active",
    disabled: true,
    highlight: false,
  },
  {
    name: "Pro",
    amount: 99,
    aiCredits: 200,
    tag: "Most popular",
    description: "More credits to build faster with no  interruption ",
    features: [
      "200 AI Credits added",
      "Save components",
      "Preview & export code ",
      "Priority support",
    ],
    cta: "Buy for ₹99",
    disabled: false,
    highlight: true,
  },
]


function Pricing() {

  const navigate = useNavigate();

  return (
    <div className=" min-h-screen  text-white relative  overflow-hidden flex flex-col   "
      style={{
        background: "linear-gradient(135deg , #0a0a1a 0% , #0d0d28 60% , #0a1628 100% )",
        fontFamily: " 'DM Sans' , sans-serif"
      }} >
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] "

        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.5) 1px , transparent 1px ) , linear-gradient(90deg, rgba(99,102,241,0.5) 1px ,  transparent 1px ) ",
          backgroundSize: "44px 44px",
        }} />

      <div className=" absolute top-[-8%]  left-[-10%]  w-80 h-80 rounded-full 
        pointer-events-none opacity-20  " style={{
          background: "radial-gradient(circle, #6366f1  0% , transparent 70% )",
          filter: "blur(70px)"
        }} />

      <div className="absolute bottom-[-6%] right-[-5%]  w-72 h-72 
        rounded-full  pointer-events-none  opatcity-15      "
        style={{
          background: "radial-gradient(circle, #06b6d4 0% , transparent 70%)",
          filter: "blur(60px)"
        }} />

      <div className="relative z-10 max-w-3xl  mx-auto px-4 py-14 w-full  ">

        <motion.button
          onClick={() => navigate("/generate")}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2  text-sm text-white/40  hover:text-white/70
          transition-all mb-10 cursor-pointer bg-transparent  border-none  " >
          <FiArrowLeft size={15} /> Back

        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center  mb-12  " >

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full  mb-5  "
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)"
            }}>
            <FiZap size={13} className=" text-indigo-400" />
            <span className=" text-xs font-semibold  tracking-widest  text-indigo-300 uppercase  "> AI  Credits  </span>
          </div>
          <h1 className=" text-4xl sm:text-5xl font-extrabold mb-3     "
            style={{
              fontFamily: " 'Syne', sans-serif ",
              letterSpacing: "-0.03em"
            }}> Simple
            <span style={{
              background: "linear-gradient(135deg, #818cf8  0% , #06b6d4 100% )",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }} > Pricing  </span>
          </h1>
          <p className="text-white/35  text-sm   max-w-sm  mx-auto  ">
            Choose a plan that  fits your workflow Credits are used each time  you generate a component
          </p>

        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5  " >
          {plans.map((plan, i) => (
            <motion.div key={i}
              className="relative rounded-2xl  p-6  flex  flex-col  "
              style={{
                background: plan.highlight ? "linear-gradient(145deg, rgba(99,102,241,0.12) 0% , rgba(6,182,212,0.06) 100% )" : " rgba(255,255,255,0.03) ",
                border: plan.highlight
                  ? "1px solid rgba(99,102,241,0.35) "
                  : " 1px solid rgba(255,255,255,0.07) ",
                boxShadow: plan.highlight ? "0 0 40px rgba(99,102 ,241,0.12)" : "none"
              }}>  

              {/* tags  */}
              <div className=" flex items-center justify-between mb-5   ">
                <span className= " text-xs font-semibold  px-2.5 py-1 rounded-full   "
                style={{
                   background:plan.highlight ? "rgba(99,102,241,0.2)":" rgba(255,255,255,0.06) ",
                   color:plan.highlight ? "#818cf8" :"rgba(255,255,255,0.4)",
                   border: plan.highlight ? "1px solid rgba(99,102,241,0.3)":"1px solid rgba(255,255,255,0.08) "
                }}
                >    </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Pricing;
