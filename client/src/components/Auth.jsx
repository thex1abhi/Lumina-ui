import React from "react";
import { AnimatePresence, motion } from "motion/react"

function AUTH() {
    return (
        <AnimatePresence >
            < motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4" >

                <motion.div className="flex flex-col sm:flex-row  max-w-220 w-full max-h-[90vh]  overflow-y-auto  rounded-2xl border border-2xl border-[#3be8ff]/10 
                 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative " >

                </motion.div>

            </ motion.div >;
        </AnimatePresence>

    )
}

export default AUTH;

