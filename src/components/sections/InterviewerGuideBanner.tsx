import React from 'react'
import { Sparkles, FileText, PlayCircle, HelpCircle, CheckCircle2, ArrowRight, Database } from 'lucide-react'

interface InterviewerGuideBannerProps {
  onStartDemo: () => void
  onOpenPmDock: () => void
}

export const InterviewerGuideBanner: React.FC<InterviewerGuideBannerProps> = ({
  onStartDemo,
  onOpenPmDock
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-10 mt-6">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-4.5 sm:p-5 shadow-xl shadow-purple-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-purple-500/30 card-glow-hover relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Left: Purpose Statement */}
        <div className="flex items-start gap-3.5 z-10">
          <div className="w-9 h-9 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-200 border border-purple-400/30">
                Cheerio Product Assignment (Assignment A)
              </span>
              <span className="text-xs text-slate-300 font-medium">Candidate: <strong className="text-white">Kartick</strong></span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon shrink-0" />
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Neon PostgreSQL (GORM): Connected</span>
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1.5 font-medium leading-relaxed">
              Goal: <strong className="text-white">Scale customer support for non-technical users</strong> by intercepting setup errors and resolving 60% without human tickets.
            </p>
          </div>
        </div>

        {/* Right: Quick-Start Interviewer Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={onStartDemo}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <PlayCircle className="w-4 h-4 fill-slate-950 text-emerald-500" />
            <span>Run 3-Min Live Demo</span>
          </button>

          <button
            onClick={onOpenPmDock}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-purple-200" />
            <span>Open PM Rubric (Q1-Q6)</span>
          </button>
        </div>

      </div>
    </div>
  )
}
