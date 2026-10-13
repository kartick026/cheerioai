import React from 'react'
import { FileText, Smartphone, Sparkles, LayoutDashboard, Globe } from 'lucide-react'

interface CheerioNavbarProps {
  onOpenPmDrawer: () => void
  onOpenWizard: () => void
  onOpenTour?: () => void
  onToggleDemoError: () => void
  isErrorActive: boolean
  currentView: 'WEBSITE' | 'PORTAL'
  onToggleView: (view: 'WEBSITE' | 'PORTAL') => void
}

export const CheerioNavbar: React.FC<CheerioNavbarProps> = ({
  onOpenPmDrawer,
  onOpenWizard,
  onOpenTour,
  onToggleDemoError,
  isErrorActive,
  currentView,
  onToggleView
}) => {
  return (
    <header className="sticky top-6 z-40 px-6 sm:px-10 mb-8 pt-1">
      <nav className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-purple-100/90 rounded-full px-8 sm:px-10 py-3.5 shadow-xl shadow-purple-900/5 flex items-center justify-between">
        
        {/* Left: Clean Brand Text with generous breathing room */}
        <div className="flex items-center gap-3.5 shrink-0 pl-1">
          <div 
            onClick={() => onToggleView('WEBSITE')} 
            className="flex items-baseline cursor-pointer"
          >
            <span className="font-extrabold text-xl tracking-tight text-[#1e1b4b]">Cheerio</span>
            <span className="font-bold text-xl tracking-tight ml-1 text-[#7c3aed]">AI</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7c3aed] border border-purple-200/80">
            <Sparkles className="w-3 h-3 text-[#7c3aed]" />
            FixFlow
          </span>
        </div>

        {/* Center: Perspective Switcher Pill (Website vs Maya's In-App Portal) */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          <button
            onClick={() => onToggleView('WEBSITE')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'WEBSITE'
                ? 'bg-white shadow text-[#7c3aed]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Product Showcase</span>
          </button>

          <button
            onClick={() => onToggleView('PORTAL')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'PORTAL'
                ? 'bg-white shadow text-[#7c3aed]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Maya's In-App Portal</span>
          </button>
        </div>

        {/* Right: Uncrowded, Balanced Action Buttons */}
        <div className="flex items-center gap-3 shrink-0 pr-1">
          
          {/* Toggle Demo Error State */}
          <button
            onClick={onToggleDemoError}
            title="Toggle simulated Meta template error"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isErrorActive
                ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Demo State:</span>
            <span>{isErrorActive ? '⚠️ Error' : 'Normal'}</span>
          </button>

          {/* Recruiter 60s Tour Button */}
          <button
            onClick={onOpenTour}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>Recruiter Tour</span>
          </button>

          {/* PM Evaluator Console Trigger */}
          <button
            onClick={onOpenPmDrawer}
            className="px-4 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-[#7c3aed] border border-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all pulse-glow"
          >
            <FileText className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>PM Rubric</span>
          </button>

          {/* Launch FixFlow Button */}
          <button
            onClick={onOpenWizard}
            className="cheerio-btn-primary px-5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
          >
            <span>Launch FixFlow</span>
          </button>

        </div>

      </nav>
    </header>
  )
}
