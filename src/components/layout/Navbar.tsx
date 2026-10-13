import React from 'react'
import { Sparkles, ShieldCheck, HelpCircle, FileText, Smartphone } from 'lucide-react'

interface NavbarProps {
  onOpenPmDrawer: () => void
  onOpenNewCampaign: () => void
  onToggleDemoScenario: () => void
  isErrorActive: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPmDrawer,
  onOpenNewCampaign,
  onToggleDemoScenario,
  isErrorActive
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand & App Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">cheerio</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                FixFlow AI
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Meta BSP Live
              </span>
            </div>
            <p className="text-xs text-slate-400">Autonomous Product Support & Setup Guardian</p>
          </div>
        </div>

        {/* Center: Active Store Persona Pill */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="font-medium text-white">Aura Skincare</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Shopify Connected</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">14,250 Contacts</span>
        </div>

        {/* Right: Actions & Evaluation Dock Button */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Toggle for simulated roadblock */}
          <button
            onClick={onToggleDemoScenario}
            title="Toggle error state for demo presentation"
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
              isErrorActive
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Demo State:</span>
            <span className={isErrorActive ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
              {isErrorActive ? '⚠️ Error Triggered' : 'Normal'}
            </span>
          </button>

          {/* New Campaign Button */}
          <button
            onClick={onOpenNewCampaign}
            className="text-xs px-3 py-1.5 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <span>+ New Automation Flow</span>
          </button>

          {/* PM Evaluator Console Button (Pulsing Glow) */}
          <button
            onClick={onOpenPmDrawer}
            className="text-xs px-3.5 py-1.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 border border-purple-400/30 transition-all flex items-center gap-1.5 pulse-glow"
          >
            <FileText className="w-3.5 h-3.5 text-purple-200" />
            <span>PM Evaluation Dock</span>
          </button>
        </div>

      </div>
    </header>
  )
}
