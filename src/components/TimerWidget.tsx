"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock, AlertTriangle, Sparkles, Coffee, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimerWidget() {
  const [initialHours, setInitialHours] = useState(36);
  const [timeLeft, setTimeLeft] = useState(36 * 3600); // 36 hours in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer Tick Logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    };
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialHours * 3600);
  };

  const handleSetHours = (hours: number) => {
    setIsRunning(false);
    setInitialHours(hours);
    setTimeLeft(hours * 3600);
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  // Compute percentage elapsed
  const totalDuration = initialHours * 3600;
  const elapsedPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  // Context-aware hackathon recommendations based on time left
  const getContextAlert = () => {
    const elapsedRatio = (totalDuration - timeLeft) / totalDuration;
    
    if (elapsedRatio === 0) {
      return {
        title: "Ready to Start?",
        text: "Generate your initial architecture models and wireframes. Check the 'Planning' roadmap phase.",
        icon: Sparkles,
        color: "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5"
      };
    }
    if (elapsedRatio < 0.25) {
      return {
        title: "Phase 1: Mockup and Frontend",
        text: "Make sure you build landing layouts fast using Lovable/v0. Don't waste time manual styling.",
        icon: Sparkles,
        color: "text-neon-purple border-neon-purple/20 bg-neon-purple/5"
      };
    }
    if (elapsedRatio >= 0.25 && elapsedRatio < 0.5) {
      return {
        title: "Phase 2: Database Bindings",
        text: "Time to link collections and auth tables in Supabase/Firebase. Setup edge endpoint APIs.",
        icon: Clock,
        color: "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5"
      };
    }
    if (elapsedRatio >= 0.5 && elapsedRatio < 0.75) {
      return {
        title: "Phase 3: AI Model Hookup",
        text: "Integrate LLM calls, test prompts in Anti-Gravity, and deploy to Vercel previews.",
        icon: AlertTriangle,
        color: "text-neon-orange border-neon-orange/20 bg-neon-orange/5"
      };
    }
    if (elapsedRatio >= 0.75 && elapsedRatio < 0.9) {
      return {
        title: "Phase 4: Slide Preparation",
        text: "Stop coding features! Compile slides in Gamma/Canva. Start recording your demo screens.",
        icon: Tv,
        color: "text-neon-pink border-neon-pink/20 bg-neon-pink/5 animate-pulse"
      };
    }
    return {
      // 90%+ elapsed
      title: "Warning: Submission Crunch!",
      text: "Submit your video on Devpost now. Verify git paths compile. Stay hydrated!",
      icon: Coffee,
      color: "text-red-500 border-red-500/20 bg-red-500/5 animate-bounce"
    };
  };

  const alert = getContextAlert();
  const Icon = alert.icon;

  return (
    <div className="glass-card rounded-3xl p-6 mb-12 relative overflow-hidden select-none text-left" id="timer-widget-section">
      <div className="absolute top-0 right-0 w-64 h-64 ambient-glow-2 opacity-30 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Countdown visual */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-neon-purple" />
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Hackathon Countdown Clock
            </span>
          </div>

          {/* Time digits display */}
          <div className="flex items-center gap-1.5 countdown-digits text-4xl sm:text-5xl font-black text-white bg-slate-950/40 border border-white/5 px-6 py-4 rounded-2xl shadow-inner">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">{hours}</span>
            <span className="text-neon-purple animate-pulse">:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">{minutes}</span>
            <span className="text-neon-purple animate-pulse">:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">{seconds}</span>
          </div>

          {/* Preset Buttons & Controls */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full">
            <button
              onClick={() => handleSetHours(24)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                initialHours === 24 ? "border-neon-purple text-white bg-neon-purple/5" : "border-white/5 text-slate-500 hover:text-white"
              }`}
            >
              24H
            </button>
            <button
              onClick={() => handleSetHours(36)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                initialHours === 36 ? "border-neon-purple text-white bg-neon-purple/5" : "border-white/5 text-slate-500 hover:text-white"
              }`}
            >
              36H
            </button>
            <button
              onClick={() => handleSetHours(48)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                initialHours === 48 ? "border-neon-purple text-white bg-neon-purple/5" : "border-white/5 text-slate-500 hover:text-white"
              }`}
            >
              48H
            </button>
            
            <div className="w-px h-6 bg-white/10 mx-2 self-center" />

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-lg border transition ${
                isRunning 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                  : "bg-neon-green/10 border-neon-green/30 text-neon-green"
              }`}
              id="timer-play-pause-btn"
            >
              {isRunning ? <Pause size={14} /> : <Play size={14} />}
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
              title="Reset timer"
              id="timer-reset-btn"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Right Side: Progress Bar and contextual recommendation warnings */}
        <div className="lg:col-span-7 space-y-4">
          {/* Progress track */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500 font-bold">
              <span>ELAPSED PROGRESS</span>
              <span className="text-slate-300 font-mono">{Math.round(elapsedPercent)}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink rounded-full transition-all duration-300"
                style={{ width: `${elapsedPercent}%` }}
              />
            </div>
          </div>

          {/* Warning display box */}
          <div className={`p-4.5 rounded-2xl border flex items-start gap-4 transition duration-300 ${alert.color} timer-alert-box`}>
            <div className="p-2.5 rounded-xl bg-white/5 mt-0.5">
              <Icon size={18} />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white tracking-tight">
                {alert.title}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {alert.text}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
