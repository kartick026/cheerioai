import React from 'react'
import { Sparkles, ArrowRight, TrendingUp, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface OverviewHeroProps {
  onStartSetup: () => void
  onOpenPmDrawer: () => void
  activeAutomations: number
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  onStartSetup,
  onOpenPmDrawer,
  activeAutomations
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900/90 border border-indigo-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        {/* Left: Persona Context & Problem Framing */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Cheerio FixFlow Activated
            </span>
            <span className="text-xs text-slate-400">
              Personalized for Aura Skincare (D2C Skincare & Cosmetics)
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Turn First-Time Buyers Into Loyal Subscribers with Zero Support Friction
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Maya, your manual broadcasts achieve a <strong>76.4% open rate</strong>, but only <strong>2.1% of customers reorder</strong> automatically. FixFlow guides you through setting up an automated 30-day refill reminder on WhatsApp — checking Meta compliance and catching errors before you launch.
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> 14,250 Contacts Synced
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-white font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Est. +18% Repeat Orders
            </span>
            <span>•</span>
            <span className="text-slate-400">
              Active Automations: <strong className="text-white">{activeAutomations}</strong>
            </span>
          </div>
        </div>

        {/* Right: Quick Action Widget & Adoption Meter */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shrink-0 lg:w-80 space-y-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Cheerio Adoption Score</span>
            <span className="text-indigo-400 font-bold">{activeAutomations > 1 ? '52%' : '28%'}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: activeAutomations > 1 ? '52%' : '28%' }}
            ></div>
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            {activeAutomations > 1 
              ? '✨ Replenishment automation is live! Next: AI Consultation Bot.'
              : 'You are currently using manual broadcasts only. Activate automated flows to save 4.5 hrs/week.'
            }
          </p>

          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={onStartSetup}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{activeAutomations > 1 ? 'View Active Automation' : 'Start 3-Minute Guided Setup'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
