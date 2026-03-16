"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-[12rem] md:text-[16rem] font-serif italic leading-none opacity-10 select-none">
            404
          </h1>
          <p className="text-xl md:text-2xl font-serif italic tracking-tight -mt-12 md:-mt-20">
            Lost in the digital dawn.
          </p>
        </div>

        <p className="text-zinc-500 font-light max-w-xs mx-auto text-sm leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another dimension.
        </p>

        <motion.div
          whileHover={{ x: -5 }}
          className="inline-block pt-8"
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle background grain or glow could be added here if needed */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
