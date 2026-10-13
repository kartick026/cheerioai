import React from 'react'
import { Search, Sparkles, Smartphone, FileText, Bell, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react'

interface HeaderProps {
  onOpenPmDrawer: () => void
  onOpenWizard: () => void
  onToggleDemoError: () => void
  isErrorActive: boolean
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPmDrawer,
  onOpenWizard,
  onToggleDemoError,
  isErrorActive
}) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left: Global Search & Shortcuts */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search campaigns, Meta templates, or ask FixFlow AI..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/80 transition-colors"
          />
        </div>
      </div>

      {/* Center: Live Meta Integration Status Indicators */}
      <div className="hidden lg:flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Meta WABA Live: +91 98201 44521</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Shopify Sync: Active</span>
        </div>
      </div>

      {/* Right: Actions, Demo Toggle & PM Evaluator */}
      <div className="flex items-center gap-2.5">
        
        {/* Toggle Demo Error State Button */}
        <button
          onClick={onToggleDemoError}
          title="Toggle the Meta template compliance violation state"
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isErrorActive
              ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 hover:bg-amber-500/25 shadow-sm shadow-amber-950/30'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Scenario:</span>
          <span>{isErrorActive ? '⚠️ Error Triggered' : 'Normal State'}</span>
        </button>

        {/* New Flow Button */}
        <button
          onClick={onOpenWizard}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
        >
          <span>+ Create Flow</span>
        </button>

        {/* PM Evaluation Console Trigger */}
        <button
          onClick={onOpenPmDrawer}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all flex items-center gap-1.5 pulse-glow"
        >
          <FileText className="w-3.5 h-3.5 text-purple-200" />
          <span className="hidden sm:inline">PM Evaluation Dock</span>
        </button>

      </div>

    </header>
  )
}
