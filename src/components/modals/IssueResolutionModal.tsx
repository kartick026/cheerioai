import React, { useState } from 'react'
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Loader2,
  RefreshCw,
  ExternalLink,
  LifeBuoy,
  Lock,
  Phone,
  Webhook,
  Activity
} from 'lucide-react'
import { SupportIssue } from '../../types'
import { playSuccessChime } from '../../utils/audioFeedback'
import { logDiagnosticEvent } from '../../services/apiService'

interface IssueResolutionModalProps {
  isOpen: boolean
  onClose: () => void
  issue: SupportIssue | null
  onOpenHandoff: () => void
  onResolutionSuccess?: (issueCode: string) => void
}

export const IssueResolutionModal: React.FC<IssueResolutionModalProps> = ({
  isOpen,
  onClose,
  issue,
  onOpenHandoff,
  onResolutionSuccess,
}) => {
  const [isResolving, setIsResolving] = useState<boolean>(false)
  const [isResolved, setIsResolved] = useState<boolean>(false)
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([])

  if (!isOpen || !issue) return null

  const is2FaIssue = issue.code.includes('2FA') || issue.category === 'WABA_SIGNUP'
  const isShopifyWebhookIssue = issue.code.includes('WEBHOOK') || issue.category === 'SHOPIFY_INTEGRATION'
  const isPhonePayloadIssue = issue.code.includes('PARAM') || issue.code.includes('PAYLOAD') || issue.category === 'CHATBOT_LOGIC'
  const isQualityIssue = issue.code.includes('QUALITY') || issue.category === 'DELIVERY_QUALITY'

  const handleExecuteFix = async () => {
    setIsResolving(true)
    setSimulatedLogs(['[Init] Negotiating automated self-healing protocol...'])

    setTimeout(() => {
      if (isShopifyWebhookIssue) {
        setSimulatedLogs((prev) => [
          ...prev,
          '[Shopify OAuth] HMAC SHA-256 handshake initiated with Aura Skincare store admin...',
          '[Token] New scoped app access token generated: shpat_live_9842... (Expires: 365d)',
          '[Webhook] Subscribed topics: orders/fulfilled, customers/update, checkouts/create',
          '[Verified] Health check ping: 200 OK (Latency: 84ms)',
        ])
      } else if (is2FaIssue) {
        setSimulatedLogs((prev) => [
          ...prev,
          '[Meta Graph API] Inspecting WhatsApp Business Account (WABA: 1098421095)...',
          '[2FA] Verified Business Manager two-step verification policy active.',
          '[Security] Injected verified app session token.',
          '[Status] WABA Sending Tier upgraded to 1,000 conversations/day.',
        ])
      } else if (isPhonePayloadIssue) {
        setSimulatedLogs((prev) => [
          ...prev,
          '[Shopify Settings] Inspecting Checkout -> Customer Contact preferences...',
          '[Policy] Updated Checkout rule: Phone Number set to REQUIRED.',
          '[Fallback] Enabled Cheerio SMS fallback for existing email-only orders.',
          '[Verified] Test payload validated: customer.phone field is populated.',
        ])
      } else {
        setSimulatedLogs((prev) => [
          ...prev,
          '[RFM Engine] Scanning 14,250 WhatsApp contacts for engagement decay...',
          '[Filter] Suppressed 5,350 contacts with zero interaction in past 90 days.',
          '[Pacing] Enforced adaptive sending speed: 450 msgs/hr (Meta Safe Tier).',
          '[Protection] Meta Quality Shield active: Account Green status restored.',
        ])
      }

      setIsResolving(false)
      setIsResolved(true)
      playSuccessChime()

      logDiagnosticEvent({
        userQuery: `1-Click Verified Fix Applied for ${issue.code}`,
        errorCode: issue.code,
        isResolved: true,
        resolvedBy: 'FixFlow Contextual Healing Engine',
      })

      if (onResolutionSuccess) {
        onResolutionSuccess(issue.code)
      }
    }, 1400)
  }

  const handleClose = () => {
    setIsResolved(false)
    setIsResolving(false)
    setSimulatedLogs([])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              {isShopifyWebhookIssue && <Webhook className="w-5 h-5 text-purple-400" />}
              {is2FaIssue && <Lock className="w-5 h-5 text-amber-400" />}
              {isPhonePayloadIssue && <Phone className="w-5 h-5 text-indigo-400" />}
              {isQualityIssue && <Activity className="w-5 h-5 text-emerald-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-white">FixFlow Contextual Guardian</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {issue.code}
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Setup Diagnostics & 1-Click Repair</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Issue Summary Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">{issue.title}</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {issue.plainEnglishDescription}
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
                {issue.cheerioOccurrenceRate}
              </span>
            </div>

            {/* Technical Root Cause */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Technical Root Cause:
              </span>
              <p className="text-slate-300 text-[11px] font-mono leading-relaxed">
                {issue.rootCause}
              </p>
            </div>
          </div>

          {/* Interactive Fix Section */}
          {!isResolved ? (
            <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white">Recommended Autonomous Solution</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {issue.verifiedFixAction}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
                    <span>• Automated Success Rate: <strong className="text-emerald-400">{issue.fixFlowAutomatedResolutionRate}</strong></span>
                    <span>• Human Time Saved: <strong className="text-white">~{issue.typicalHumanResolutionTimeMinutes} mins</strong></span>
                  </div>
                </div>
              </div>

              {isResolving ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Executing autonomous verification protocol...</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-slate-400">
                    {simulatedLogs.map((log, i) => (
                      <div key={i} className="text-emerald-400/90">• {log}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleExecuteFix}
                  className="w-full py-3 px-4 rounded-xl cheerio-btn-primary font-bold text-xs text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>{issue.verifiedFixTitle}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-emerald-300">Issue Resolved Automatically!</h3>
                  <p className="text-xs text-emerald-200/80 mt-0.5">
                    FixFlow verified your store configuration and realigned platform credentials without filing a human support ticket.
                  </p>
                </div>
              </div>

              {/* Verified Trace */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-[11px] text-slate-300 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Verification Audit Log (Saved to Neon DB):
                </div>
                {simulatedLogs.map((log, i) => (
                  <div key={i} className="text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-xs text-slate-950 transition-all shadow-md shadow-emerald-500/20"
              >
                Done • Return to Cheerio Console
              </button>
            </div>
          )}

          {/* Fallback to Human Escalation */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Still experiencing unexpected behavior?</span>
            <button
              onClick={() => {
                handleClose()
                onOpenHandoff()
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 hover:underline"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Escalate to Human Specialist (Rahul V.)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
