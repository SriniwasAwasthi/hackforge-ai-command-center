"use client";

import React, { useEffect } from "react";
import { Tool } from "../data/toolsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Check, 
  AlertTriangle, 
  Workflow, 
  Cpu, 
  Layers, 
  ExternalLink,
  Zap,
  Gauge
} from "lucide-react";

interface ToolDetailsModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolDetailsModal({
  tool,
  isOpen,
  onClose
}: ToolDetailsModalProps) {
  
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!tool) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none overflow-y-auto">
          
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-4xl bg-dark-card border border-white/10 rounded-3xl overflow-hidden glass-card z-10 max-h-[90vh] flex flex-col shadow-2xl relative text-left"
            style={{
              boxShadow: `0 0 50px -15px ${tool.color}33`
            }}
          >
            
            {/* Colored header accent glow line */}
            <div 
              className="w-full h-1.5" 
              style={{ backgroundColor: tool.color }}
            />

            {/* Sticky Modal Title header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-card/90 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg border border-white/10"
                  style={{
                    backgroundColor: `${tool.color}15`,
                    color: tool.color,
                    borderColor: `${tool.color}30`
                  }}
                >
                  {tool.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {tool.name}
                    </h2>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-white/5 border border-white/5 text-slate-400">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Best Stage: <span className="text-slate-300 font-bold">{tool.stage}</span> • Difficulty: <span className="text-slate-300 font-bold">{tool.difficulty}</span>
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
                id="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              
              {/* Detailed Description & Productivity meter */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    About this platform
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {tool.detailedDescription}
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <h4 className="text-xs font-black uppercase text-neon-cyan tracking-wider flex items-center gap-1.5">
                      <Cpu size={12} /> Why use {tool.name}?
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {tool.whyToUse}
                    </p>
                  </div>
                </div>

                {/* Productivity Score Radar box */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl border border-white/5 bg-slate-950/40 relative">
                  <div className="absolute top-3 left-3 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    Core telemetry
                  </div>
                  
                  {/* Gauge indicator */}
                  <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="stroke-white/5"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke={tool.color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - tool.productivityScore / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-black font-mono text-white">
                        {tool.productivityScore}
                      </span>
                      <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest">
                        PROD SCORE
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-bold text-slate-400 flex items-center gap-1 justify-center">
                      <Gauge size={12} className="text-neon-cyan" /> Speed Rating: {tool.speed}%
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-white/5" />

              {/* Advantages and Disadvantages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Advantages */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-neon-green tracking-wider flex items-center gap-1.5">
                    <Check size={16} /> Advantages
                  </h4>
                  <ul className="space-y-2.5">
                    {tool.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green mt-1.5 flex-shrink-0" />
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-neon-pink tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={16} /> Disadvantages
                  </h4>
                  <ul className="space-y-2.5">
                    {tool.disadvantages.map((dis, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-pink mt-1.5 flex-shrink-0" />
                        {dis}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <hr className="border-white/5" />

              {/* Best workflow & Hackathon deployment details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Best workflow pipeline */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-black uppercase text-neon-purple tracking-wider flex items-center gap-1.5">
                    <Workflow size={14} /> Recommended Workflow
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {tool.bestWorkflow}
                  </p>
                </div>

                {/* Hackathon specifics */}
                <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-black uppercase text-neon-orange tracking-wider flex items-center gap-1.5">
                    <Zap size={14} /> Hackathon Efficiency Playbook
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {tool.hackathonUsage}
                  </p>
                </div>

              </div>

              {/* Integrations and alternatives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                
                {/* Integrations */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    Key Integrations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tool.integrations.map((int, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/5 border border-white/5 text-slate-300">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alternatives */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    Alternative Choices
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tool.alternatives.map((alt, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white/5 border border-white/5 text-slate-300">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Footer with actions */}
            <div className="p-6 border-t border-white/5 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Official Resource
              </span>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase text-white transition duration-300 flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: tool.color,
                  boxShadow: `0 0 15px ${tool.color}33`
                }}
                id={`modal-visit-btn-${tool.id}`}
              >
                Go to Website <ExternalLink size={14} />
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
