"use client";

import React from "react";
import { Globe, Sparkles } from "lucide-react";

const GithubIcon = ({ size = 14, className, ...props }: { size?: number, className?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14, className, ...props }: { size?: number, className?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-20 border-t border-white/5 bg-slate-950/20 py-12 px-8 rounded-t-3xl select-none text-left">
      
      {/* Glow ambient background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 ambient-glow-2 opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding & credits */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 font-sans font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan justify-center md:justify-start">
            HACK OS
          </div>
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Hack OS AI Ecosystem. Built for Hackathon Developers.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold uppercase tracking-wider justify-center md:justify-start">
            <Sparkles size={10} className="text-neon-cyan" /> Powered by the AI Ecosystem
          </div>
        </div>

        {/* Social Links buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition cursor-pointer"
            id="footer-github-link"
          >
            <GithubIcon size={14} /> GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition cursor-pointer"
            id="footer-linkedin-link"
          >
            <LinkedinIcon size={14} /> LinkedIn
          </a>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition cursor-pointer"
            id="footer-portfolio-link"
          >
            <Globe size={14} /> Portfolio
          </a>
        </div>

      </div>

    </footer>
  );
}
