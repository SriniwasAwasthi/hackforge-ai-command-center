"use client";

import React from "react";
import { Tool } from "../data/toolsData";
import { Bookmark, Compass, Zap, Star, ExternalLink, ArrowRightLeft, Eye } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  isCompared: boolean;
  toggleCompare: (id: string) => void;
  onDetailsClick: (tool: Tool) => void;
}

export default function ToolCard({
  tool,
  isFavorite,
  toggleFavorite,
  isCompared,
  toggleCompare,
  onDetailsClick
}: ToolCardProps) {
  
  // Choose difficulty badge styling
  const difficultyColors = {
    Beginner: "bg-neon-green/10 text-neon-green border-neon-green/20",
    Intermediate: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
    Advanced: "bg-neon-pink/10 text-neon-pink border-neon-pink/20"
  };

  return (
    <div 
      className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 select-none border border-white/5 relative overflow-hidden group text-left"
      style={{
        boxShadow: `0 0 30px -15px ${tool.color}22`
      }}
    >
      {/* Light glow overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${tool.color} 0%, transparent 70%)`
        }}
      />

      {/* Top section: logo and badge selectors */}
      <div className="flex justify-between items-start gap-4">
        
        {/* Logo and name */}
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg border border-white/10"
            style={{
              backgroundColor: `${tool.color}15`,
              color: tool.color,
              borderColor: `${tool.color}30`
            }}
          >
            {tool.logo}
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition duration-300">
              {tool.name}
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              {tool.category}
            </span>
          </div>
        </div>

        {/* Favorite & Compare Action row */}
        <div className="flex items-center gap-1.5">
          {/* Compare Button Toggle */}
          <button
            onClick={() => toggleCompare(tool.id)}
            className={`p-2 rounded-lg border transition duration-200 cursor-pointer ${
              isCompared
                ? "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan"
                : "bg-white/5 border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/10"
            }`}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
            id={`compare-btn-${tool.id}`}
          >
            <ArrowRightLeft size={14} />
          </button>

          {/* Favorite Bookmark Toggle */}
          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`p-2 rounded-lg border transition duration-200 cursor-pointer ${
              isFavorite
                ? "bg-neon-purple/15 border-neon-purple/40 text-neon-purple"
                : "bg-white/5 border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/10"
            }`}
            title={isFavorite ? "Remove from bookmarks" : "Add to bookmarks"}
            id={`fav-btn-${tool.id}`}
          >
            <Bookmark size={14} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Description and Best use case */}
      <div className="my-5 space-y-3.5">
        <p className="text-slate-300 text-sm font-normal leading-relaxed min-h-[48px]">
          {tool.description}
        </p>
        
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
          <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
            Best Use Case
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {tool.useCase}
          </p>
        </div>
      </div>

      {/* Meta tags and metrics footer */}
      <div className="space-y-4 pt-3 border-t border-white/5">
        
        {/* Badges: Stage & Difficulty */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase rounded-md bg-white/5 border border-white/5 text-slate-400">
            Stage: {tool.stage}
          </span>
          <span className={`px-2.5 py-1 text-[10px] font-black tracking-wide uppercase rounded-md border ${difficultyColors[tool.difficulty]}`}>
            {tool.difficulty}
          </span>
        </div>

        {/* Dynamic telemetry meters */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-500 font-black">
              <span>SPEED</span>
              <span className="text-slate-300">{tool.speed}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neon-cyan rounded-full" 
                style={{ width: `${tool.speed}%` }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-slate-500 font-black">
              <span>TRENDING</span>
              <span className="text-slate-300">{tool.trending}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neon-pink rounded-full" 
                style={{ width: `${tool.trending}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card action triggers */}
        <div className="flex gap-2 pt-1.5">
          {/* Expandable details button */}
          <button
            onClick={() => onDetailsClick(tool)}
            className="flex-1 py-2 px-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white text-xs font-black tracking-wider uppercase transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            id={`details-btn-${tool.id}`}
          >
            <Eye size={12} /> Details
          </button>
          
          {/* Direct official link button */}
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 text-xs font-black tracking-wider uppercase transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            id={`website-btn-${tool.id}`}
          >
            Visit <ExternalLink size={12} />
          </a>
        </div>

      </div>

    </div>
  );
}
