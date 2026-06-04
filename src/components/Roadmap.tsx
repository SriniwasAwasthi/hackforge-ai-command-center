"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Search, 
  Code, 
  Database, 
  Bot, 
  Binary, 
  Send, 
  Tv, 
  Trophy, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toolsData, Tool } from "../data/toolsData";

const FigmaIcon = ({ size = 20, className, ...props }: { size?: number, className?: string } & React.SVGProps<SVGSVGElement>) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 38 57" 
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
  >
    <path d="M19 28.5C19 23.2533 14.7467 19 9.5 19C4.2533 19 0 23.2533 0 28.5C0 33.7467 4.2533 38 9.5 38C14.7467 38 19 33.7467 19 28.5Z" fill="#1ABC9C"/>
    <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0H9.5C4.2533 0 0 4.2533 0 9.5C0 14.7467 4.2533 19 9.5 19H19V0Z" fill="#F24E1E"/>
    <path d="M19 19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.2533 33.7467 0 28.5 0H19V19Z" fill="#FF7262"/>
    <path d="M38 28.5C38 23.2533 33.7467 19 28.5 19H19V38H28.5C33.7467 38 38 33.7467 38 28.5Z" fill="#A259FF"/>
  </svg>
);

interface Stage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  details: string;
  recommendedToolIds: string[];
}

export default function Roadmap() {
  const [activeStageIdx, setActiveStageIdx] = useState(1); // Default to Planning

  const stages: Stage[] = [
    {
      id: "idea",
      name: "Idea Formulation",
      description: "Brainstorming and architectural outlines.",
      icon: Lightbulb,
      details: "Define the core problem you are solving, study your target audience, and detail the technical feasibility of the project.",
      recommendedToolIds: ["chatgpt", "claude", "perplexity"]
    },
    {
      id: "planning",
      name: "Planning & Architecture",
      description: "Structuring database designs and stack choices.",
      icon: Search,
      details: "Set up your database tables, outline the API routing, and choose your core builders and backend platforms.",
      recommendedToolIds: ["gemini", "chatgpt", "claude"]
    },
    {
      id: "ui-design",
      name: "UI / UX Design",
      description: "Designing components and wireframe layouts.",
      icon: FigmaIcon,

      details: "Draft vector graphics, create screen transition prototypes, and define the neon-glow dark mode palettes.",
      recommendedToolIds: ["figma", "framer"]
    },
    {
      id: "frontend",
      name: "Frontend Assembly",
      description: "Building responsive screens and styles.",
      icon: Code,
      details: "Compile layout code, configure custom grids, and implement Framer Motion visual transition rules.",
      recommendedToolIds: ["v0", "twentyone-dev", "tailwind-ui"]
    },
    {
      id: "backend",
      name: "Backend & Databases",
      description: "Provisioning relational columns and schemas.",
      icon: Database,
      details: "Bind user accounts, configure document collection rules, and implement edge functions or API routers.",
      recommendedToolIds: ["supabase", "firebase", "neon", "appwrite"]
    },
    {
      id: "ai-integration",
      name: "AI Integrations",
      description: "Interfacing LLMs and vector embeddings.",
      icon: Bot,
      details: "Connect API endpoints to custom prompt builders, store page files into vector models, and code agent actions.",
      recommendedToolIds: ["antigravity", "cursor", "gemini", "chatgpt"]
    },
    {
      id: "testing",
      name: "Debugging & QA",
      description: "Tracing routing errors and logs.",
      icon: Binary,
      details: "Execute build tools locally to trace errors, debug state machines, and ensure performance compiles correctly.",
      recommendedToolIds: ["devin", "cursor", "copilot"]
    },
    {
      id: "deployment",
      name: "Cloud Deployment",
      description: "Hosting static assets and APIs globally.",
      icon: Send,
      details: "Hook up git connections to launch automated builds, configure environment keys, and publish preview URLs.",
      recommendedToolIds: ["vercel", "netlify", "cloudflare-pages", "railway"]
    },
    {
      id: "presentation",
      name: "Presentation Deck",
      description: "Formatting pitch slides and demo videos.",
      icon: Tv,
      details: "Generate text-to-presentation decks, record visual workflows, and loop glowing high-quality mock intros.",
      recommendedToolIds: ["gamma", "canva", "tome", "higgsfield"]
    },
    {
      id: "submission",
      name: "Submission & Devpost",
      description: "Finalizing pitch documentations and code repositories.",
      icon: Trophy,
      details: "Write readme summaries, format submission pages, publish git repositories, and prepare for live QA.",
      recommendedToolIds: ["claude", "perplexity", "antigravity"]
    }
  ];

  // Resolve tools for active stage
  const getActiveStageTools = (): Tool[] => {
    const ids = stages[activeStageIdx].recommendedToolIds;
    return toolsData.filter(t => ids.includes(t.id));
  };

  const activeStage = stages[activeStageIdx];

  return (
    <div className="glass-card rounded-3xl p-8 mb-12 relative overflow-hidden select-none text-left" id="roadmap-section">
      {/* Background glow overlay */}
      <div className="absolute bottom-0 right-0 w-96 h-96 ambient-glow-1 opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-neon-pink text-xs font-black tracking-widest uppercase">
            <Sparkles size={12} /> INTERACTIVE WORKFLOW
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Hackathon Workflow Roadmap
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Select a timeline node to audit best practices, recommend tools, and ensure pipeline connectivity.
          </p>
        </div>

        {/* Timeline node rail (Horizontal on large screens, vertical/wrap on small) */}
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-thin border-b border-white/5">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStageIdx === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4.5 rounded-2xl border flex flex-col justify-between items-center text-center gap-3 min-w-[124px] transition duration-300 cursor-pointer ${
                  isActive
                    ? "bg-neon-pink/10 border-neon-pink text-white glow-pink"
                    : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-white"
                }`}
                id={`roadmap-node-${stage.id}`}
              >
                <div className={`p-2 rounded-xl bg-white/5 border ${isActive ? "border-neon-pink/30 text-neon-pink" : "border-white/5 text-slate-400"}`}>
                  <Icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    PHASE {idx + 1}
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {stage.name.split(" ")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected stage details container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-mono text-neon-pink">
                0{activeStageIdx + 1}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeStage.name}
              </h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeStage.details}
            </p>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              <div className="text-xs text-slate-400 font-medium">
                Next Stage: <span className="text-slate-300 font-bold">{stages[(activeStageIdx + 1) % stages.length].name}</span>
              </div>
            </div>
          </div>

          {/* Recommended tools column */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Recommended Tools for this Stage
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {getActiveStageTools().map((tool) => (
                <div 
                  key={tool.id}
                  className="p-4 rounded-2xl border border-white/5 bg-slate-950/20 flex items-center justify-between group hover:border-white/10 transition duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm border"
                      style={{
                        backgroundColor: `${tool.color}15`,
                        color: tool.color,
                        borderColor: `${tool.color}30`
                      }}
                    >
                      {tool.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{tool.name}</div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">{tool.category}</span>
                    </div>
                  </div>
                  
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-neon-cyan/35 text-slate-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
