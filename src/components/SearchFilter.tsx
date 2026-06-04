"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown, BookmarkCheck, Check } from "lucide-react";

interface SearchFilterProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (fav: boolean) => void;
}

export default function SearchFilter({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  showOnlyFavorites,
  setShowOnlyFavorites
}: SearchFilterProps) {

  const categories = [
    "All",
    "AI Builders",
    "Frontend Tools",
    "Backend Platforms",
    "Databases",
    "AI Assistants",
    "Deployment Platforms",
    "UI/UX Tools",
    "Presentation Tools",
    "Video/Image AI Tools"
  ];

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { id: "trending", label: "Trending Score" },
    { id: "productivity", label: "Productivity Score" },
    { id: "speed", label: "Build Speed" },
    { id: "name", label: "Alphabetical" }
  ];

  return (
    <div className="space-y-6 mb-8 select-none text-left">
      
      {/* Category Scroll Container */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
          Filter by Category
        </h4>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (showOnlyFavorites) setShowOnlyFavorites(false); // turn off favs view when changing category
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat && !showOnlyFavorites
                  ? "bg-neon-purple/10 border-neon-purple text-white glow-purple"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/20"
              }`}
              id={`cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced filters: Difficulty, Sort, Favorites */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-t border-white/5 pt-4">
        
        {/* Difficulty filter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal size={12} /> Tier
          </span>
          <div className="flex gap-1.5">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition duration-200 cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-neon-cyan/15 border-neon-cyan/40 text-neon-cyan"
                    : "bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10"
                }`}
                id={`diff-filter-${diff.toLowerCase()}`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Favorites */}
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          
          {/* Favorites toggle pill */}
          <button
            onClick={() => {
              setShowOnlyFavorites(!showOnlyFavorites);
              if (!showOnlyFavorites) setSelectedCategory("All"); // resetting category tab to prevent blank grids
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-2 transition duration-200 cursor-pointer ${
              showOnlyFavorites
                ? "bg-neon-purple/10 border-neon-purple/40 text-neon-purple"
                : "bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10"
            }`}
            id="favorites-toggle-btn"
          >
            <BookmarkCheck size={14} className={showOnlyFavorites ? "text-neon-purple" : ""} />
            Favorites Only
          </button>

          {/* Sort Selection dropdown wrapper */}
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <ArrowUpDown size={12} /> Sort
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-card border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-neon-purple/50"
              id="sort-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}
