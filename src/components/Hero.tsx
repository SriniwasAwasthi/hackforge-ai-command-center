"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Activity, CheckCircle, Zap } from "lucide-react";

interface HeroProps {
  onBuildStackClick: () => void;
  onExploreWorkflowClick: () => void;
  onCompareToolsClick: () => void;
}

export default function Hero({
  onBuildStackClick,
  onExploreWorkflowClick,
  onCompareToolsClick
}: HeroProps) {
  
  return (
    <div className="relative overflow-hidden py-16 px-8 rounded-3xl border border-white/5 bg-slate-950/20 mb-12 select-none">
      
      {/* Background Neon ambient bubbles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-1 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] ambient-glow-2 z-0 pointer-events-none" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 z-0 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Subheading pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-black tracking-widest uppercase">
            <Sparkles size={12} className="animate-pulse" /> COMMAND CENTER ONLINE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            HACKATHON AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              ECOSYSTEM
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl font-normal leading-relaxed">
            Everything you need to design, build, debug, deploy, present, and win hackathons faster using the best AI tools. Select your path, customize your stacks, and deploy at edge speed.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onBuildStackClick}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-black text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              id="hero-build-stack-btn"
            >
              Build My AI Stack
            </button>
            
            <button
              onClick={onExploreWorkflowClick}
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 text-slate-300 hover:text-white font-semibold text-sm transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              id="hero-explore-workflow-btn"
            >
              Explore Workflow
            </button>

            <button
              onClick={onCompareToolsClick}
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-neon-pink/50 hover:bg-neon-pink/5 text-slate-300 hover:text-white font-semibold text-sm transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              id="hero-compare-tools-btn"
            >
              Compare Tools
            </button>
          </div>
        </div>

        {/* Right Side Futuristic AI Graphic */}
        <div className="lg:col-span-5 relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center">
          
          {/* Animated Neon Rings */}
          <div className="absolute w-72 h-72 rounded-full border border-dashed border-neon-purple/20 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute w-60 h-60 rounded-full border border-double border-neon-cyan/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          <div className="absolute w-44 h-44 rounded-full border border-neon-pink/30 animate-pulse" />

          {/* Central AI core logo container */}
          <div className="absolute w-28 h-28 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
              <Zap size={44} className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan animate-pulse" />
            </div>
          </div>

          {/* Floating UI cards */}
          {/* Card 1: Lovable rendering status */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-8 left-0 p-3 rounded-xl border border-white/5 bg-slate-900/80 backdrop-blur-md shadow-2xl glass-card flex items-center gap-3 w-44"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-xs font-bold text-pink-500">
              LV
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Lovable</div>
              <div className="text-xs text-white font-black flex items-center gap-1">
                Sync DB <CheckCircle size={10} className="text-neon-green" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: v0 layout compiler */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 p-3 rounded-xl border border-white/5 bg-slate-900/80 backdrop-blur-md shadow-2xl glass-card flex items-center gap-3 w-40"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-xs font-bold text-rose-500">
              V0
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Vercel V0</div>
              <div className="text-xs text-white font-black flex items-center gap-1">
                React rendering...
              </div>
            </div>
          </motion.div>

          {/* Card 3: AI Speed telemetry */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute bottom-10 left-8 p-3 rounded-xl border border-white/5 bg-slate-900/80 backdrop-blur-md shadow-2xl glass-card flex items-center gap-3 w-40"
          >
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-500">
              <Activity size={16} />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">System telemetry</div>
              <div className="text-xs text-white font-black">
                98% Productivity
              </div>
            </div>
          </motion.div>

          {/* Card 4: Anti-Gravity active agent */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute bottom-6 right-4 p-3 rounded-xl border border-white/5 bg-slate-900/80 backdrop-blur-md shadow-2xl glass-card flex items-center gap-3 w-44"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-500">
              AG
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Anti-Gravity</div>
              <div className="text-xs text-white font-black flex items-center gap-1">
                Agent Coding <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-ping" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
