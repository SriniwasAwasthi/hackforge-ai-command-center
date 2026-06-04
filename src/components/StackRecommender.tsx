"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  Zap, 
  Activity, 
  Layout, 
  Database, 
  Cloud,
  MessageSquare,
  Presentation
} from "lucide-react";
import { toolsData, Tool } from "../data/toolsData";

export default function StackRecommender() {
  const [projectGoal, setProjectGoal] = useState("ai-saas");
  const [speedPriority, setSpeedPriority] = useState("speed");

  const projectOptions = [
    { id: "ai-saas", label: "Building AI SaaS", description: "Rich interactive frontends connected to AI models." },
    { id: "mobile-app", label: "Mobile App Prototype", description: "Fast, real-time data synchronization with file storage." },
    { id: "dev-tool", label: "Developer & API Tool", description: "High-performance data scrapers, microservices, and databases." },
    { id: "creative-video", label: "Creative Media & Promo", description: "Heavily visual marketing apps, landing pages, and cinematic loops." }
  ];

  // Helper function to resolve tool details
  const getToolById = (id: string): Tool | undefined => {
    return toolsData.find(t => t.id === id);
  };

  // Recommendation engine logic
  const getRecommendations = () => {
    let recs = {
      frontend: "v0",
      backend: "supabase",
      ai: "claude",
      deploy: "vercel",
      present: "gamma"
    };

    if (projectGoal === "ai-saas") {
      recs = {
        frontend: "v0",
        backend: speedPriority === "speed" ? "supabase" : "neon",
        ai: "claude",
        deploy: "vercel",
        present: "gamma"
      };
    } else if (projectGoal === "mobile-app") {
      recs = {
        frontend: "lovable",
        backend: "firebase",
        ai: "chatgpt",
        deploy: "netlify",
        present: "canva"
      };
    } else if (projectGoal === "dev-tool") {
      recs = {
        frontend: "tailwind-ui",
        backend: "railway",
        ai: "antigravity",
        deploy: "railway",
        present: "tome"
      };
    } else if (projectGoal === "creative-video") {
      recs = {
        frontend: "framer",
        backend: "supabase",
        ai: "gemini",
        deploy: "vercel",
        present: "runwayml"
      };
    }

    return {
      frontend: getToolById(recs.frontend) || toolsData[0],
      backend: getToolById(recs.backend) || toolsData[11],
      ai: getToolById(recs.ai) || toolsData[18],
      deploy: getToolById(recs.deploy) || toolsData[23],
      present: getToolById(recs.present) || toolsData[28]
    };
  };

  const currentRecs = getRecommendations();

  return (
    <div className="glass-card rounded-3xl p-8 mb-12 relative overflow-hidden select-none text-left" id="stack-recommender-section">
      {/* Glow highlight background */}
      <div className="absolute -top-24 -left-24 w-80 h-80 ambient-glow-2 opacity-50 z-0 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-black tracking-widest uppercase">
            <Sparkles size={12} /> ALGORITHMIC RECOMMENDATION
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            AI Stack Recommender
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Select your hackathon target and priorities to generate a customized, zero-conflict stack pipeline.
          </p>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Target Selection */}
          <div className="md:col-span-7 space-y-4">
            <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
              1. What is your goal?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setProjectGoal(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition duration-300 flex flex-col justify-between h-28 cursor-pointer ${
                    projectGoal === opt.id
                      ? "bg-neon-cyan/10 border-neon-cyan/50 text-white"
                      : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                  }`}
                  id={`goal-select-${opt.id}`}
                >
                  <span className="text-sm font-bold tracking-tight">
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium leading-snug">
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Speed & complexity toggle */}
          <div className="md:col-span-5 space-y-4">
            <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
              2. Development Speed Preference
            </label>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSpeedPriority("speed")}
                className={`p-4 rounded-2xl border text-left transition duration-300 flex items-center gap-4 cursor-pointer ${
                  speedPriority === "speed"
                    ? "bg-neon-purple/10 border-neon-purple/50 text-white"
                    : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                }`}
                id="speed-select-speed"
              >
                <div className={`p-2.5 rounded-xl border ${speedPriority === "speed" ? "border-neon-purple/30 text-neon-purple" : "border-white/5 text-slate-500"}`}>
                  <Zap size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">Edge Speed (fastest MVP)</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Optimized for speed and rapid client integrations.</div>
                </div>
              </button>

              <button
                onClick={() => setSpeedPriority("scale")}
                className={`p-4 rounded-2xl border text-left transition duration-300 flex items-center gap-4 cursor-pointer ${
                  speedPriority === "scale"
                    ? "bg-neon-purple/10 border-neon-purple/50 text-white"
                    : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                }`}
                id="speed-select-scale"
              >
                <div className={`p-2.5 rounded-xl border ${speedPriority === "scale" ? "border-neon-purple/30 text-neon-purple" : "border-white/5 text-slate-500"}`}>
                  <Layers size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">Enterprise Scale</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Optimized for heavy logic models and database branches.</div>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Visual stack outputs pipeline */}
        <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 relative">
          
          <div className="text-xs font-black uppercase text-slate-500 tracking-wider mb-6">
            Recommended Tool Pipeline Flow
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            
            {/* Frontend recommendation */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-widest justify-center sm:justify-start">
                <Layout size={10} className="text-neon-cyan" /> Frontend
              </div>
              <div 
                className="p-4 rounded-xl border bg-dark-card border-white/10 shadow-lg text-center"
                style={{ borderLeft: `3px solid ${currentRecs.frontend.color}` }}
              >
                <div className="text-xs font-bold uppercase" style={{ color: currentRecs.frontend.color }}>
                  {currentRecs.frontend.logo}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {currentRecs.frontend.name}
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex items-center justify-center text-slate-600">
              <ArrowRight size={20} className="animate-pulse text-neon-cyan" />
            </div>

            {/* Backend recommendation */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-widest justify-center sm:justify-start">
                <Database size={10} className="text-neon-pink" /> Database
              </div>
              <div 
                className="p-4 rounded-xl border bg-dark-card border-white/10 shadow-lg text-center"
                style={{ borderLeft: `3px solid ${currentRecs.backend.color}` }}
              >
                <div className="text-xs font-bold uppercase" style={{ color: currentRecs.backend.color }}>
                  {currentRecs.backend.logo}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {currentRecs.backend.name}
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex items-center justify-center text-slate-600">
              <ArrowRight size={20} className="animate-pulse text-neon-pink" />
            </div>

            {/* AI Assistant recommendation */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-widest justify-center sm:justify-start">
                <MessageSquare size={10} className="text-neon-purple" /> AI Partner
              </div>
              <div 
                className="p-4 rounded-xl border bg-dark-card border-white/10 shadow-lg text-center"
                style={{ borderLeft: `3px solid ${currentRecs.ai.color}` }}
              >
                <div className="text-xs font-bold uppercase" style={{ color: currentRecs.ai.color }}>
                  {currentRecs.ai.logo}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {currentRecs.ai.name}
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex items-center justify-center text-slate-600">
              <ArrowRight size={20} className="animate-pulse text-neon-purple" />
            </div>

            {/* Deployment recommendation */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-widest justify-center sm:justify-start">
                <Cloud size={10} className="text-neon-green" /> Hosting
              </div>
              <div 
                className="p-4 rounded-xl border bg-dark-card border-white/10 shadow-lg text-center"
                style={{ borderLeft: `3px solid ${currentRecs.deploy.color}` }}
              >
                <div className="text-xs font-bold uppercase" style={{ color: currentRecs.deploy.color }}>
                  {currentRecs.deploy.logo}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {currentRecs.deploy.name}
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex items-center justify-center text-slate-600">
              <ArrowRight size={20} className="animate-pulse text-neon-green" />
            </div>

            {/* Presentation recommendation */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-500 tracking-widest justify-center sm:justify-start">
                <Presentation size={10} className="text-neon-orange" /> Pitch/Demo
              </div>
              <div 
                className="p-4 rounded-xl border bg-dark-card border-white/10 shadow-lg text-center"
                style={{ borderLeft: `3px solid ${currentRecs.present.color}` }}
              >
                <div className="text-xs font-bold uppercase" style={{ color: currentRecs.present.color }}>
                  {currentRecs.present.logo}
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {currentRecs.present.name}
                </div>
              </div>
            </div>

          </div>

          {/* Productivity score banner for recommendation */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                <Activity size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Recommended Stack Efficiency</div>
                <p className="text-[11px] text-slate-400">Integrated pipeline with absolute minimum latency, zero syntax duplication.</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className="text-xl font-black font-mono text-neon-cyan">
                {Math.round((currentRecs.frontend.productivityScore + currentRecs.backend.productivityScore + currentRecs.ai.productivityScore) / 3)}%
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Efficiency Rating</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
