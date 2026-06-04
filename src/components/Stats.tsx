"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Award, Zap, Cloud, Compass, Sparkles } from "lucide-react";

interface StatsProps {
  toolsCount: number;
  favoritesCount: number;
}

export default function Stats({ toolsCount, favoritesCount }: StatsProps) {
  const statsList = [
    {
      id: "total-tools",
      label: "Total Ecosystem Tools",
      value: toolsCount.toString(),
      subtext: "Verified production-ready",
      icon: Cpu,
      color: "from-neon-purple/20 to-neon-purple/5",
      iconColor: "text-neon-purple",
      borderColor: "hover:border-neon-purple/35"
    },
    {
      id: "productivity-score",
      label: "Productivity Score",
      value: "98.4%",
      subtext: "System efficiency multiplier",
      icon: Award,
      color: "from-neon-cyan/20 to-neon-cyan/5",
      iconColor: "text-neon-cyan",
      borderColor: "hover:border-neon-cyan/35"
    },
    {
      id: "dev-speed",
      label: "Development Speed",
      value: "10x",
      subtext: "MVP bootstrap multiplier",
      icon: Zap,
      color: "from-neon-pink/20 to-neon-pink/5",
      iconColor: "text-neon-pink",
      borderColor: "hover:border-neon-pink/35"
    },
    {
      id: "deploy-time",
      label: "Deployment Saved",
      value: "24 Hrs",
      subtext: "Per hackathon project build",
      icon: Cloud,
      color: "from-neon-green/20 to-neon-green/5",
      iconColor: "text-neon-green",
      borderColor: "hover:border-neon-green/35"
    },
    {
      id: "stack-efficiency",
      label: "Stack Efficiency",
      value: "96.8%",
      subtext: "Active tools integration tier",
      icon: Compass,
      color: "from-neon-orange/20 to-neon-orange/5",
      iconColor: "text-neon-orange",
      borderColor: "hover:border-neon-orange/35"
    },
    {
      id: "trending-platforms",
      label: "Trending Platforms",
      value: "V0 / LV / AG",
      subtext: "Highly active this week",
      icon: Sparkles,
      color: "from-neon-purple/10 to-neon-cyan/5",
      iconColor: "text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan",
      borderColor: "hover:border-neon-purple/35"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 select-none">
      {statsList.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${stat.color} backdrop-blur-md transition-all duration-300 ${stat.borderColor} group text-left`}
          >
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.iconColor} group-hover:scale-110 transition duration-300`}>
                <Icon size={18} />
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              <h3 className="text-3xl font-black tracking-tight text-white stat-val">
                {stat.value}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
