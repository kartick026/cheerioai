import React from 'react'
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle, Clock, Zap, X } from 'lucide-react'
import { SupportIssue } from '../../types'

interface FixFlowGuardianBannerProps {
  onStartSetup: () => void
  onTriggerIssueModal: (issue: SupportIssue) => void
  currentStuckIssue: SupportIssue | null
  isDismissed: boolean
  onDismiss: () => void
  onRestore: () => void
}

export const FixFlowGuardianBanner: React.FC<FixFlowGuardianBannerProps> = ({
  onStartSetup,
  onTriggerIssueModal,
  currentStuckIssue,
  isDismissed,
  onDismiss,
  onRestore
}) => {
  if (isDismissed) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>FixFlow Proactive Guide is snoozed.</span>
        </div>
        <button
          onClick={onRestore}
          className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
        >
          Restore Guide
        </button>
      </div>
    )
  }

  // If there is an active simulated roadblock
  if (currentStuckIssue) {
    return (
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl shadow-amber-950/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3">
          <button
            onClick={onDismiss}
            className="text-slate-500 hover:text-slate-300 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  FixFlow Stuck Detector Active
                </span>
                <span className="text-xs text-slate-400">Pre-launch issue intercepted</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {currentStuckIssue.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {currentStuckIssue.plainEnglishDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onTriggerIssueModal(currentStuckIssue)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Review & 1-Click Fix</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Normal Recommended Next Flow (Goal-to-Setup)
  return (
    <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl shadow-indigo-950/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-slate-300 transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Recommended for Aura Skincare
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> High Impact for D2C
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Automated Post-Purchase Replenishment Flow (30-Day Refill)
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Skincare serums empty within 30-45 days. Auto-triggering a WhatsApp reminder with a 1-click reorder discount captures <strong className="text-white">+18% repeat orders</strong> with zero manual work. FixFlow guides you step-by-step and validates Meta compliance before launch.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2.5">
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~3 mins setup
              </span>
              <span>•</span>
              <span className="text-slate-300">Shopify Trigger: Order Fulfilled</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Meta Verified Templates</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onStartSetup}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 group"
          >
            <span>Start Guided Setup</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
