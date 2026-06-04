"use client";

import React, { useState } from "react";
import { 
  Search, 
  Layers, 
  GitBranch, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Sparkles,
  BookMarked
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  compareCount: number;
  onCompareClick: () => void;
  onWorkflowClick: () => void;
  onFavoritesClick: () => void;
  favoritesCount: number;
}

export default function Navbar({
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  compareCount,
  onCompareClick,
  onWorkflowClick,
  onFavoritesClick,
  favoritesCount
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Lovable database integration has been updated to support custom Supabase columns.", read: false },
    { id: 2, text: "Gemini 1.5 Pro context expanded to 2 million tokens! Accessing full codebases is active.", read: false },
    { id: 3, text: "Try the new Stack Recommender: Build an AI SaaS stack in 3 clicks.", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <nav className="glass-nav sticky top-0 right-0 w-full h-16 flex items-center justify-between px-6 z-20 select-none">
      {/* Search Input Bar */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search AI builders, frontend, databases..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-white/5 rounded-full text-slate-200 placeholder-slate-400 focus:outline-none focus:border-neon-purple/40 focus:ring-1 focus:ring-neon-purple/40 transition duration-300"
          id="global-ai-search"
        />
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[10px] text-slate-500 font-mono tracking-widest pointer-events-none hidden sm:flex">
          CTRL + K
        </div>
      </div>

      {/* Control Utility Buttons */}
      <div className="flex items-center gap-4">
        {/* Compare Basket Trigger */}
        <button
          onClick={onCompareClick}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-neon-cyan/40 text-slate-300 hover:text-white transition duration-300 text-xs sm:text-sm"
          title="Compare selected AI tools"
          id="navbar-compare-btn"
        >
          <Layers size={15} className="text-neon-cyan" />
          <span className="hidden md:inline">Compare</span>
          {compareCount > 0 && (
            <motion.span 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center"
            >
              {compareCount}
            </motion.span>
          )}
        </button>

        {/* Workflow Roadmap Scroll Trigger */}
        <button
          onClick={onWorkflowClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-neon-pink/40 text-slate-300 hover:text-white transition duration-300 text-xs sm:text-sm"
          title="Jump to Hackathon Roadmap workflow"
          id="navbar-roadmap-btn"
        >
          <GitBranch size={15} className="text-neon-pink" />
          <span className="hidden md:inline">Workflow</span>
        </button>

        {/* Bookmarks quick view trigger */}
        <button
          onClick={onFavoritesClick}
          className="relative p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition duration-300"
          title="View favorited tools"
          id="navbar-favorites-btn"
        >
          <BookMarked size={16} className="text-neon-purple" />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-purple rounded-full glow-purple" />
          )}
        </button>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition duration-300 relative"
            id="navbar-notifications-btn"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute right-0 mt-3 w-80 bg-dark-card border border-white/10 rounded-2xl p-4 shadow-2xl glass-card z-50 text-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-neon-purple" /> Notifications
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead} 
                      className="text-[10px] text-neon-purple hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`text-xs p-2 rounded-lg border notification-card ${
                        notif.read ? "border-transparent text-slate-400" : "border-white/5 bg-white/5 text-slate-200"
                      }`}
                    >
                      {notif.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark/Light mode toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple hover:bg-neon-purple/10 cursor-pointer transition-all duration-200"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          id="navbar-theme-toggle"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-xs text-white font-black font-mono">
              OS
            </div>
          </div>
          <span className="text-xs text-slate-300 font-medium hidden lg:inline-block">
            Builder Mode
          </span>
        </div>
      </div>
    </nav>
  );
}
