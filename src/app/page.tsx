"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import TimerWidget from "../components/TimerWidget";
import SearchFilter from "../components/SearchFilter";
import ToolCard from "../components/ToolCard";
import ToolDetailsModal from "../components/ToolDetailsModal";
import StackRecommender from "../components/StackRecommender";
import CompareSystem from "../components/CompareSystem";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";
import { toolsData, Tool } from "../data/toolsData";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Sliders, Server, HardDrive, Compass } from "lucide-react";

export default function Home() {
  // Navigation & UI Layout States
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Selection/Overlay states
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [comparedToolIds, setComparedToolIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Favorites (persisted via LocalStorage in useEffect)
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Settings values mock state
  const [settings, setSettings] = useState({
    autoSync: true,
    telemetry: true,
    soundEffects: false,
    visualFidelity: "ultra"
  });

  // Load Favorites and Theme from LocalStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("hack_os_favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      
      const storedCompare = localStorage.getItem("hack_os_compared");
      if (storedCompare) {
        setComparedToolIds(JSON.parse(storedCompare));
      }

      const storedTheme = localStorage.getItem("hack_os_theme") || "dark";
      setTheme(storedTheme);
      if (storedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch (e) {
      console.error("Failed to load local storage configurations", e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("hack_os_theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // Update states on sidebar filter clicks
  useEffect(() => {
    // If active section is an ecosystem category, automatically select that category filter
    const categories = [
      "AI Builders",
      "Frontend Tools",
      "Backend Platforms",
      "Databases",
      "AI Assistants",
      "Deployment Platforms",
      "Presentation Tools"
    ];
    
    if (categories.includes(activeSection)) {
      setSelectedCategory(activeSection);
      setShowOnlyFavorites(false);
      
      // Scroll grid into view
      scrollToSection("tools-directory-grid");
    } else if (activeSection === "favorites") {
      setShowOnlyFavorites(true);
      setSelectedCategory("All");
      scrollToSection("tools-directory-grid");
    } else if (activeSection === "roadmap") {
      scrollToSection("roadmap-section");
    } else if (activeSection === "timer") {
      scrollToSection("timer-widget-section");
    } else if (activeSection === "dashboard") {
      setSelectedCategory("All");
      setShowOnlyFavorites(false);
      setSelectedDifficulty("All");
      setSearchQuery("");
      scrollToSection("main-scroll-container");
    }
  }, [activeSection]);

  const toggleFavorite = (id: string) => {
    let updatedFavs = [...favorites];
    if (favorites.includes(id)) {
      updatedFavs = updatedFavs.filter(favId => favId !== id);
    } else {
      updatedFavs.push(id);
    }
    setFavorites(updatedFavs);
    localStorage.setItem("hack_os_favorites", JSON.stringify(updatedFavs));
  };

  const toggleCompare = (id: string) => {
    let updatedCompare = [...comparedToolIds];
    if (comparedToolIds.includes(id)) {
      updatedCompare = updatedCompare.filter(compId => compId !== id);
    } else {
      if (comparedToolIds.length >= 3) {
        alert("You can compare a maximum of 3 tools side-by-side.");
        return;
      }
      updatedCompare.push(id);
    }
    setComparedToolIds(updatedCompare);
    localStorage.setItem("hack_os_compared", JSON.stringify(updatedCompare));
  };

  const handleDetailsClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDetailsOpen(true);
  };

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      if (id === "main-scroll-container") {
        const container = document.getElementById("main-scroll-container");
        if (container) {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  // Processing, Filtering and Sorting logic
  const filteredTools = toolsData
    .filter((tool) => {
      // 1. Text Query Filter
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCase.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Category Tab Filter
      const matchesCategory = 
        selectedCategory === "All" || 
        tool.category === selectedCategory || 
        (selectedCategory === "Databases" && (tool.category === "Databases" || tool.category === "Backend Platforms"));

      // 3. Difficulty Pill Filter
      const matchesDifficulty = 
        selectedDifficulty === "All" || 
        tool.difficulty === selectedDifficulty;

      // 4. Favorites Only Toggle
      const matchesFavorites = 
        !showOnlyFavorites || 
        favorites.includes(tool.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites;
    })
    .sort((a, b) => {
      // Sort configurations
      if (sortBy === "trending") return b.trending - a.trending;
      if (sortBy === "productivity") return b.productivityScore - a.productivityScore;
      if (sortBy === "speed") return b.speed - a.speed;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-dark-bg font-sans text-slate-100">
      
      {/* 1. Left Sidebar navigation */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        favoritesCount={favorites.length}
      />

      {/* 2. Right Side container panel */}
      <div id="main-scroll-container" className="flex-1 flex flex-col h-full overflow-y-auto relative">
        
        {/* Top Navbar */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          compareCount={comparedToolIds.length}
          onCompareClick={() => setIsCompareOpen(true)}
          onWorkflowClick={() => scrollToSection("roadmap-section")}
          onFavoritesClick={() => setActiveSection("favorites")}
          favoritesCount={favorites.length}
        />

        {/* Core Content Body (Spacious & Breathing Room layout) */}
        <main className="flex-1 px-6 sm:px-12 py-10 max-w-7xl mx-auto w-full space-y-16">
          
          {/* A. If Settings section is active */}
          {activeSection === "settings" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple rounded-full text-xs font-black tracking-widest uppercase">
                  <Terminal size={12} /> System Preferences
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">Ecosystem Settings</h2>
                <p className="text-slate-400 text-sm">Tune your futuristic workspace telemetry, cache profiles, and renderers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                {/* Setting items */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Local Telemetry</div>
                    <div className="text-xs text-slate-500 mt-1">Report tool performance to compute averages.</div>
                  </div>
                  <button 
                    onClick={() => setSettings({ ...settings, telemetry: !settings.telemetry })}
                    className={`w-12 h-6.5 rounded-full p-1 transition duration-300 flex items-center ${settings.telemetry ? "bg-neon-purple" : "bg-slate-800"}`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-full bg-white transition duration-300 transform ${settings.telemetry ? "translate-x-5.5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Auto Sync Stack Cache</div>
                    <div className="text-xs text-slate-500 mt-1">Keep favorites and compared lists saved locally.</div>
                  </div>
                  <button 
                    onClick={() => setSettings({ ...settings, autoSync: !settings.autoSync })}
                    className={`w-12 h-6.5 rounded-full p-1 transition duration-300 flex items-center ${settings.autoSync ? "bg-neon-cyan" : "bg-slate-800"}`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-full bg-white transition duration-300 transform ${settings.autoSync ? "translate-x-5.5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Haptic Audio Beeps</div>
                    <div className="text-xs text-slate-500 mt-1">Play glowing hover micro-audio triggers.</div>
                  </div>
                  <button 
                    onClick={() => setSettings({ ...settings, soundEffects: !settings.soundEffects })}
                    className={`w-12 h-6.5 rounded-full p-1 transition duration-300 flex items-center ${settings.soundEffects ? "bg-neon-pink" : "bg-slate-800"}`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-full bg-white transition duration-300 transform ${settings.soundEffects ? "translate-x-5.5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">Visual Quality Engine</div>
                    <div className="text-xs text-slate-500 mt-1">Control particle layers and background overlays.</div>
                  </div>
                  <select 
                    value={settings.visualFidelity} 
                    onChange={(e) => setSettings({ ...settings, visualFidelity: e.target.value })}
                    className="bg-slate-900 border border-white/10 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="ultra">Ultra (Glows & Particles)</option>
                    <option value="standard">Standard (Glows Only)</option>
                    <option value="flat">Performance (Flat Cards)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ) : (
            // B. Standard command center view
            <>
              {/* Cinematic Hero */}
              <Hero
                onBuildStackClick={() => scrollToSection("stack-recommender-section")}
                onExploreWorkflowClick={() => scrollToSection("roadmap-section")}
                onCompareToolsClick={() => setIsCompareOpen(true)}
              />

              {/* Quick stats grid */}
              <Stats 
                toolsCount={toolsData.length} 
                favoritesCount={favorites.length} 
              />

              {/* Stack Recommender */}
              <StackRecommender />

              {/* Interactive Countdown Timer */}
              <TimerWidget />

              {/* Tools Directory Section */}
              <div className="space-y-8 scroll-mt-20 text-left" id="tools-directory-grid">
                
                {/* Heading */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-full text-xs font-black tracking-widest uppercase">
                    <Compass size={12} /> Resource Index
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    {showOnlyFavorites ? "Favorited AI Tools" : `${selectedCategory} AI Directory`}
                  </h2>
                  <p className="text-slate-400 text-sm max-w-xl">
                    {showOnlyFavorites 
                      ? "Your curated collection of active hackathon bookmark shortcuts." 
                      : "Audit official links, speed capabilities, pros/cons, and deployment structures."}
                  </p>
                </div>

                {/* Filter and Search controls */}
                <SearchFilter
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  showOnlyFavorites={showOnlyFavorites}
                  setShowOnlyFavorites={setShowOnlyFavorites}
                />

                {/* Grid layout (Breathing Room rule: max 2 cards per row on large displays!) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, idx) => (
                      <motion.div
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ToolCard
                          tool={tool}
                          isFavorite={favorites.includes(tool.id)}
                          toggleFavorite={toggleFavorite}
                          isCompared={comparedToolIds.includes(tool.id)}
                          toggleCompare={toggleCompare}
                          onDetailsClick={handleDetailsClick}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty state when filtering yields nothing */}
                  {filteredTools.length === 0 && (
                    <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-3xl bg-slate-900/10">
                      <div className="text-slate-500 font-bold text-sm">
                        No AI tools match your current filter parameters.
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory("All");
                          setSelectedDifficulty("All");
                          setSearchQuery("");
                          setShowOnlyFavorites(false);
                        }}
                        className="mt-3 text-xs text-neon-purple hover:underline font-bold"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Hackathon Roadmap Workflow progression */}
              <Roadmap />
            </>
          )}

          {/* Persistent global footer */}
          <Footer />

        </main>

        {/* Global Expandable Modals */}
        <ToolDetailsModal
          tool={selectedTool}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />

        <CompareSystem
          comparedToolIds={comparedToolIds}
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          toggleCompare={toggleCompare}
        />

      </div>
    </div>
  );
}
