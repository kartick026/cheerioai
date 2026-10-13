import React from 'react'
import { AlertTriangle, Terminal, ShieldAlert, Clock, Info } from 'lucide-react'

export interface SimulatedPlatformResponseProps {
  errorCode: string
  errorSubcode?: string | number
  errorTitle: string
  plainEnglishExplanation: string
  rawApiMessage?: string
  timestamp?: string
  className?: string
}

export const SimulatedPlatformResponse: React.FC<SimulatedPlatformResponseProps> = ({
  errorCode = '132001',
  errorSubcode = '2388091',
  errorTitle = 'WhatsApp Template Rejected (Missing Mandatory Opt-Out)',
  plainEnglishExplanation = 'Meta requires all promotional broadcast messages to provide an explicit opt-out mechanism (e.g., "Reply STOP to unsubscribe").',
  rawApiMessage = '(#132001) Template does not meet WhatsApp Business Messaging Policy 4.2: Missing opt-out tag or footer button.',
  timestamp = 'Just now (Simulated)',
  className = ''
}) => {
  return (
    <div
      className={`border-2 border-dashed border-purple-400 bg-purple-50/70 rounded-2xl p-4 sm:p-5 text-slate-800 shadow-sm relative overflow-hidden ${className}`}
    >
      {/* Prominent Visible Simulation Banner */}
      <div className="flex items-center justify-between gap-2 border-b border-purple-200 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-900 bg-purple-200/80 px-2.5 py-0.5 rounded-full border border-purple-300">
            SIMULATED PLATFORM RESPONSE • META GRAPH API v21.0 (SANDBOX)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-purple-700 font-medium">
          <Clock className="w-3 h-3" />
          <span>{timestamp}</span>
        </div>
      </div>

      {/* Main Error Detail */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">{errorTitle}</h4>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
              Error {errorCode}
            </span>
            {errorSubcode && (
              <span className="text-[10px] font-mono text-slate-500">
                subcode: {errorSubcode}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
            {plainEnglishExplanation}
          </p>

          {/* Raw Terminal / API Trace */}
          {rawApiMessage && (
            <div className="mt-2.5 bg-slate-950 text-slate-200 p-2.5 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 flex items-start gap-2 shadow-inner">
              <Terminal className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div className="overflow-x-auto select-all">
                <span className="text-purple-400">meta_api_response:</span> {rawApiMessage}
              </div>
            </div>
          )}

          <div className="mt-2 text-[10px] text-purple-800 flex items-center gap-1 font-semibold">
            <Info className="w-3 h-3 text-purple-600" />
            <span>Deterministic Test Sandbox: No actual request was dispatched to Meta Graph API.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
