import React from 'react'
import { 
  Sparkles, 
  Send, 
  Bot, 
  Users, 
  Layers, 
  ShieldCheck, 
  Settings, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  TrendingUp,
  Store
} from 'lucide-react'

interface SidebarProps {
  onOpenPmDrawer: () => void
  onOpenWizard: () => void
  isErrorActive: boolean
  activeView: string
  setActiveView: (view: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenPmDrawer,
  onOpenWizard,
  isErrorActive,
  activeView,
  setActiveView
}) => {
  return (
    <aside className="w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      
      {/* Top Branding & Store Selector */}
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-white tracking-tight">cheerio</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Meta BSP
              </span>
            </div>
          </div>
        </div>

        {/* Store Profile Card */}
        <div className="px-3 pt-3">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300 font-bold text-xs shrink-0">
                <Store className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Aura Skincare</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                  <span>Shopify Plus</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400">Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-3 py-4 space-y-5">
          
          {/* Main Channels */}
          <div>
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Marketing Channels
            </div>
            <nav className="space-y-0.5">
              <button
                onClick={() => setActiveView('DASHBOARD')}
                className={`w-full px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeView === 'DASHBOARD'
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Overview Dashboard</span>
                </div>
              </button>

              <button
                onClick={onOpenWizard}
                className="w-full px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Broadcasts</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  14.2k
                </span>
              </button>

              <button
                onClick={onOpenWizard}
                className="w-full px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Automations & Flows</span>
                </div>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-medium">
                  1 Active
                </span>
              </button>

              <button
                onClick={onOpenWizard}
                className="w-full px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>AI Skincare Agent</span>
                </div>
                <span className="text-[10px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded">
                  New
                </span>
              </button>

              <button
                onClick={() => {}}
                className="w-full px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Audience & CRM</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Autonomous Support Guardian Section */}
          <div>
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Autonomous Support
            </div>
            <div className="space-y-1">
              <button
                onClick={onOpenWizard}
                className={`w-full p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isErrorActive
                    ? 'bg-amber-950/30 border-amber-500/50 hover:bg-amber-950/50'
                    : 'bg-indigo-950/30 border-indigo-500/40 hover:bg-indigo-950/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isErrorActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></div>
                    <span className="text-xs font-bold text-white">FixFlow Guardian</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isErrorActive ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {isErrorActive ? '1 Issue Caught' : 'Active'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  {isErrorActive ? 'Pre-launch Meta error intercepted' : 'Monitoring WABA setup & compliance'}
                </p>
              </button>

              <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Meta Quality
                </span>
                <span className="text-emerald-400 font-semibold">High Tier ⭐</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Assignment Evaluation Trigger & Maya Profile */}
      <div className="p-3 border-t border-slate-800/80 space-y-2.5 bg-slate-950">
        
        {/* PM Evaluation Dock CTA Button */}
        <button
          onClick={onOpenPmDrawer}
          className="w-full p-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-purple-600/20 border border-purple-500/40 hover:border-purple-400 text-left transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                  Assignment Evaluation
                </div>
                <div className="text-[10px] text-purple-300">Q1-Q6 Rubric & Financials</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* User Account Profile */}
        <div className="flex items-center justify-between px-1.5 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white ring-2 ring-indigo-400/30">
              MS
            </div>
            <div>
              <div className="text-xs font-bold text-white">Maya Sharma</div>
              <div className="text-[10px] text-slate-400">Growth Plan ($79/mo)</div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-200 p-1 rounded-lg">
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>

    </aside>
  )
}
