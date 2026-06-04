"use client";

import React, { useEffect } from "react";
import { Tool, toolsData } from "../data/toolsData";
import { motion, AnimatePresence } from "framer-motion";
import { X, Layers, AlertCircle, ExternalLink, Check, Star } from "lucide-react";

interface CompareSystemProps {
  comparedToolIds: string[];
  isOpen: boolean;
  onClose: () => void;
  toggleCompare: (id: string) => void;
}

export default function CompareSystem({
  comparedToolIds,
  isOpen,
  onClose,
  toggleCompare
}: CompareSystemProps) {

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

  // Resolve compared tools
  const comparedTools = toolsData.filter(t => comparedToolIds.includes(t.id));

  // If there are no compared tools, show placeholder
  const hasTools = comparedTools.length > 0;

  // Render score stars helper
  const renderStars = (score: number) => {
    // scale rating out of 5 stars
    const count = Math.round((score / 100) * 5);
    return (
      <div className="flex gap-0.5 text-neon-cyan">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < count ? "currentColor" : "none"} 
            className={i < count ? "" : "text-slate-700"}
          />
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl z-0"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-5xl bg-dark-card border border-white/10 rounded-3xl overflow-hidden glass-card z-10 max-h-[85vh] flex flex-col shadow-2xl relative text-left"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-card/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25">
                  <Layers size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Side-by-Side Comparison
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Compare technical parameters, speed capabilities, and learning curves.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
                id="compare-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
              {!hasTools ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                  <AlertCircle size={44} className="text-slate-600 animate-bounce" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-400">No tools selected for comparison</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">
                      Close this screen and toggle the compare button (<span className="inline-flex"><Layers size={10} /></span>) on any tool cards.
                    </p>
                  </div>
                </div>
              ) : (
                <table className="w-full text-slate-300 text-sm border-collapse min-w-[700px]">
                  
                  {/* Table Header Row */}
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider w-1/4">
                        Metric / Tool
                      </th>
                      {comparedTools.map((tool) => (
                        <th key={tool.id} className="py-4 px-4 text-left w-1/4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs border"
                                style={{
                                  backgroundColor: `${tool.color}15`,
                                  color: tool.color,
                                  borderColor: `${tool.color}30`
                                }}
                              >
                                {tool.logo}
                              </div>
                              <span className="font-bold text-white tracking-tight">
                                {tool.name}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleCompare(tool.id)}
                              className="text-slate-500 hover:text-red-400 transition"
                              title="Remove"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body rows */}
                  <tbody className="divide-y divide-white/5">
                    
                    {/* Category */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Category
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs font-semibold text-slate-300">
                          {tool.category}
                        </td>
                      ))}
                    </tr>

                    {/* Hackathon Stage */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Best Stage
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs font-bold text-neon-purple">
                          {tool.stage}
                        </td>
                      ))}
                    </tr>

                    {/* Difficulty */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Difficulty
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs font-bold">
                          <span 
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-black ${
                              tool.difficulty === "Beginner"
                                ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                                : tool.difficulty === "Intermediate"
                                ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                                : "bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                            }`}
                          >
                            {tool.difficulty}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Speed Score */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Development Speed
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs space-y-1">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-white font-bold">{tool.speed}%</span>
                          </div>
                          {renderStars(tool.speed)}
                        </td>
                      ))}
                    </tr>

                    {/* Trending Score */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Ecosystem Trending
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs space-y-1">
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-white font-bold">{tool.trending}%</span>
                          </div>
                          {renderStars(tool.trending)}
                        </td>
                      ))}
                    </tr>

                    {/* Productivity score */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Productivity Score
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs font-mono font-bold text-neon-green">
                          {tool.productivityScore}%
                        </td>
                      ))}
                    </tr>

                    {/* Primary Advantage */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Key Advantage
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs text-slate-400 leading-relaxed max-w-[200px]">
                          {tool.advantages[0] || "Rapid integration"}
                        </td>
                      ))}
                    </tr>

                    {/* Primary Disadvantage */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Main Constraint
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs text-slate-400 leading-relaxed max-w-[200px]">
                          {tool.disadvantages[0] || "Pricing constraints"}
                        </td>
                      ))}
                    </tr>

                    {/* Action button */}
                    <tr>
                      <td className="py-4 px-4 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-900/10">
                        Official Link
                      </td>
                      {comparedTools.map((tool) => (
                        <td key={tool.id} className="py-4 px-4 text-xs">
                          <a
                            href={tool.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition cursor-pointer"
                          >
                            Visit Site <ExternalLink size={10} />
                          </a>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
              <span>Comparing {comparedTools.length} tool{comparedTools.length === 1 ? "" : "s"}</span>
              <button 
                onClick={onClose}
                className="text-neon-cyan hover:underline cursor-pointer font-bold"
              >
                Return to Command Center
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
