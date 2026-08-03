import React from "react";

function Pricing() {
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

      <div className=" absolute top-[-8%]  left-[-10%]  w-8- h-80 rounded-full 
        pointer-events-none opacity-20  " style={{ background: "radial-gradient(circle, #6366f1  0% , transparent 70% )", filter: "blur(70px)" }} > </div> 

        <div className="absolute bottom-[-6%] right-[-5%]  w-72 h-72 
        rounded-full  pointer-events-none  opatcity-15      " 
        style={{
          background: " radial-gradient(circle, #06b6d transparent 70%  ) ",
          filter:"blur(60px)"
        }}
        > 

        </div>


    </div>
  )
}

export default Pricing;
