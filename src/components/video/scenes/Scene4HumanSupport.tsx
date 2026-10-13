import React, { useState } from 'react'
import { LifeBuoy, ShieldCheck, Terminal, CheckCircle2, UserCheck, AlertCircle, ArrowRight } from 'lucide-react'

export const Scene4HumanSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CUSTOMER_VIEW' | 'AGENT_COCKPIT'>('CUSTOMER_VIEW')

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-8 bg-slate-950 text-white select-none">
      
      {/* Top Scene Marker */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-beacon" />
          Scene 4 • Why Human Support Still Matters
        </span>
        <span className="text-xs text-slate-400 font-mono">Specialist Escalation Architecture</span>
      </div>

      {/* Main Dual-Cockpit Visual */}
      <div className="my-auto py-4 space-y-4 max-w-4xl mx-auto w-full">
        
        {/* Core Philosophical Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-indigo-500/30 text-xs text-slate-300 flex items-start gap-3 shadow-lg">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Good Automation Knows Its Limits</h3>
            <p className="mt-1 leading-relaxed text-slate-300 text-[11px]">
              Billing disputes, security reviews, Meta Business Manager account restrictions, and repeated edge-case errors should never be trapped in infinite bot loops. FixFlow routes them directly to senior Meta BSP specialists.
            </p>
          </div>
        </div>

        {/* View Switcher: Customer Screen vs Agent Cockpit */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400">Zero-Repetition Handoff Engine:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('CUSTOMER_VIEW')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === 'CUSTOMER_VIEW' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Maya's Handoff Modal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('AGENT_COCKPIT')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === 'AGENT_COCKPIT' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cheerio Specialist Cockpit (Rahul V.)
            </button>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        {activeTab === 'CUSTOMER_VIEW' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Repetition Guarantee</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Context Pre-Attached
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              When Maya Sharma clicks "Connect to Specialist", FixFlow automatically packages her goal, the exact step reached (Step 3: Meta Compliance), error codes, and attempted fixes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-[11px]">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Business ID:</span>
                <span className="text-white font-mono font-medium">CHEERIO-D2C-9842</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Target Workflow:</span>
                <span className="text-white font-medium truncate block">Replenishment Flow</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Error Code:</span>
                <span className="text-amber-400 font-mono font-bold">META_132001</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Avg Handle Time:</span>
                <span className="text-emerald-400 font-bold">35m &rarr; 6m (-83%)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl font-mono text-xs space-y-2 text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span className="text-purple-400 font-bold">[TELEMETRY TRACE #CHEERIO-ESC-5061101]</span>
              <span className="text-emerald-400">STATUS: QUEUED_FOR_SPECIALIST</span>
            </div>
            <div>ACCOUNT: <span className="text-white">Aura Skincare (Maya Sharma • Growth Tier)</span></div>
            <div>TARGET_WORKFLOW: <span className="text-white">Post-Purchase 30-Day Replenishment</span></div>
            <div>FAILED_FIELD: <span className="text-amber-300">template.components[OPT_OUT_BUTTON]</span></div>
            <div>TELEMETRY_LOGS: <span className="text-slate-400">[Opt-out check: FAIL, Auto-fix: ATTEMPTED 1X]</span></div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
              Specialist receives 100% of telemetry upfront: zero back-and-forth asking "What were you trying to do?"
            </div>
          </div>
        )}

      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-between">
        <span>Sensitive cases transition immediately to experts with zero context loss.</span>
        <span className="text-purple-400 font-bold text-[11px]">Proceed to Outcome &rarr;</span>
      </div>

    </div>
  )
}
