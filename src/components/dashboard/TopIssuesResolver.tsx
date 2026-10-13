import React from 'react'
import { ShieldCheck, Zap, AlertCircle, Clock, ChevronRight, Activity } from 'lucide-react'
import { SupportIssue } from '../../types'

interface TopIssuesResolverProps {
  issues: SupportIssue[]
  onSelectIssue: (issue: SupportIssue) => void
  activeIssueId?: string
}

export const TopIssuesResolver: React.FC<TopIssuesResolverProps> = ({
  issues,
  onSelectIssue,
  activeIssueId
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Top 5 Customer Support Roadblocks Solved by FixFlow
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Assignment A Q1
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            These 5 failure modes account for over 85% of all non-technical setup tickets across Cheerio's 5,000 businesses.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-2.5 py-1 rounded-lg">
          <Activity className="w-3.5 h-3.5" />
          <span>FixFlow Target Resolution: 60% Self-Service</span>
        </div>
      </div>

      <div className="space-y-3">
        {issues.map((issue, idx) => {
          const isActive = issue.id === activeIssueId
          return (
            <div
              key={issue.id}
              className={`p-4 rounded-xl border transition-all ${
                isActive
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-md shadow-amber-950/30'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">
                        {issue.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-800 text-slate-300">
                        {issue.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {issue.plainEnglishDescription}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 flex-wrap">
                      <span className="text-amber-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Volume: {issue.cheerioOccurrenceRate}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Human Time: ~{issue.typicalHumanResolutionTimeMinutes} min
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> FixFlow: {issue.fixFlowAutomatedResolutionRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 lg:self-center">
                  <button
                    onClick={() => onSelectIssue(issue)}
                    className="w-full lg:w-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5 group"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
                    <span>Simulate & Solve</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
