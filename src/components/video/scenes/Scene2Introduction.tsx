import React from 'react'
import { Sparkles, HelpCircle, CheckCircle2, LifeBuoy, ArrowRight, ShieldCheck, Zap, Bot } from 'lucide-react'
import { CheerioLogo } from '../../brand/CheerioLogo'

export const Scene2Introduction: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-white select-none relative overflow-hidden">
      
      {/* Ambient Morphing Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-morph-blob" />

      {/* Top Scene Marker */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 z-10">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-beacon-purple" />
          Scene 2 • The FixFlow Philosophy
        </span>
        <span className="text-xs text-slate-400 font-mono">B2B SaaS Walkthrough</span>
      </div>

      {/* Centerpiece Headline & Branding */}
      <div className="my-auto text-center max-w-2xl mx-auto space-y-4 z-10 py-4">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-400/40 shadow-xl mb-1">
          <CheerioLogo iconOnly className="h-6" />
          <span className="font-extrabold text-sm text-white tracking-tight">Cheerio FixFlow</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon ml-1" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Meet FixFlow.
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium">
          A guided troubleshooting copilot that helps customers understand configuration problems, take the next safe step, and reach a human specialist when needed.
        </p>

        {/* 3 Core Ideas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
          
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2 hover:border-purple-500/60 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-400/30">
              1
            </div>
            <h4 className="text-xs font-bold text-white">Understand the Problem</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Translates technical Meta Graph API rejections and webhook codes into plain English.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2 hover:border-emerald-500/60 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-400/30">
              2
            </div>
            <h4 className="text-xs font-bold text-white">Follow Guided Resolution</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Provides step-by-step verification checks and safe in-wizard configuration corrections.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2 hover:border-indigo-500/60 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-400/30">
              3
            </div>
            <h4 className="text-xs font-bold text-white">Escalate With Context</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Packages telemetry and prior attempts so users never repeat themselves to specialists.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Principle Note */}
      <div className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-between z-10">
        <span>FixFlow emphasizes useful guidance and safe corrections, not over-promising total autonomy.</span>
        <span className="text-emerald-400 font-bold text-[11px]">Proceeding to Step-by-Step Demo &rarr;</span>
      </div>

    </div>
  )
}
