"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Layout, 
  Database, 
  MessageSquare, 
  CloudLightning, 
  Presentation, 
  Bookmark, 
  GitFork, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Clock
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  favoritesCount: number;
}

export default function Sidebar({
  activeSection,
  setActiveSection,
  collapsed,
  setCollapsed,
  favoritesCount
}: SidebarProps) {
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Terminal, category: "Core" },
    { id: "AI Builders", label: "AI Builders", icon: Cpu, category: "Ecosystem" },
    { id: "Frontend Tools", label: "Frontend Tools", icon: Layout, category: "Ecosystem" },
    { id: "Backend Platforms", label: "Backend + Database", icon: Database, category: "Ecosystem" },
    { id: "AI Assistants", label: "AI Assistants", icon: MessageSquare, category: "Ecosystem" },
    { id: "Deployment Platforms", label: "Deployment", icon: CloudLightning, category: "Ecosystem" },
    { id: "Presentation Tools", label: "Presentation Tools", icon: Presentation, category: "Ecosystem" },
    { id: "roadmap", label: "Roadmap", icon: GitFork, category: "Guides" },
    { id: "favorites", label: "Favorites", icon: Bookmark, category: "Personal", badge: favoritesCount },
    { id: "timer", label: "Hackathon Timer", icon: Clock, category: "Guides" },
    { id: "settings", label: "Settings", icon: Settings, category: "Core" }
  ];

  // Group items by category
  const categories = ["Core", "Ecosystem", "Guides", "Personal"];

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="glass-sidebar sticky top-0 left-0 h-screen flex flex-col z-30 select-none flex-shrink-0"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/5 h-16">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => setActiveSection("dashboard")}
              className="flex items-center gap-2 font-sans font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink cursor-pointer select-none"
            >
              HACK OS
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition duration-200"
          id="sidebar-toggle-btn"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
        {categories.map(cat => {
          const catItems = menuItems.filter(item => item.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-xs font-black tracking-widest text-slate-500 uppercase pb-2">
                  {cat}
                </div>
              )}
              <div className="space-y-1">
                {catItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group text-left ${
                        isActive
                          ? "bg-neon-purple/10 text-white border border-neon-purple/30 glow-purple"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      title={item.label}
                    >
                      <div className="flex items-center gap-3">
                        <Icon 
                          size={18} 
                          className={`transition-colors duration-200 ${
                            isActive ? "text-neon-purple" : "text-slate-400 group-hover:text-white"
                          }`} 
                        />
                        {!collapsed && (
                          <span className="text-sm font-medium tracking-wide">
                            {item.label}
                          </span>
                        )}
                      </div>
                      
                      {/* Badge if any */}
                      {!collapsed && item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-neon-cyan/15 text-neon-cyan text-xs font-black px-2 py-0.5 rounded-full border border-neon-cyan/25">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-white/5 flex flex-col justify-center">
        {!collapsed ? (
          <div className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-xs text-neon-cyan font-bold tracking-wide">
              <TrendingUp size={12} /> ECOSYSTEM ALPHA
            </div>
            <p className="text-[10px] text-slate-500 mt-1">v1.2.0 • Build & Win</p>
          </div>
        ) : (
          <button 
            onClick={() => setActiveSection("dashboard")}
            className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple text-xs font-black mx-auto cursor-pointer hover:bg-neon-purple/20 transition-all duration-200"
            title="Go to Dashboard"
          >
            H
          </button>
        )}
      </div>
    </motion.aside>
  );
}
