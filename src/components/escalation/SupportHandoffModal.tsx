import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, LifeBuoy, ArrowRight, ShieldCheck, Terminal, AlertCircle } from 'lucide-react'
import { SupportIssue, EscalationDossier } from '../../types'
import { SUPPORT_SLA_BENCHMARKS, generateSupportTicketId } from '../../config/productConfig'

interface SupportHandoffModalProps {
  isOpen: boolean
  onClose: () => void
  activeIssue: SupportIssue | null
  existingTicket?: EscalationDossier | null
  onDispatchTicket?: (dossier: EscalationDossier) => void
}

export const SupportHandoffModal: React.FC<SupportHandoffModalProps> = ({
  isOpen,
  onClose,
  activeIssue,
  existingTicket,
  onDispatchTicket
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [agentViewTab, setAgentViewTab] = useState<'USER_VIEW' | 'AGENT_VIEW'>('USER_VIEW')
  const [ticketId, setTicketId] = useState<string>(() => existingTicket?.ticketId || generateSupportTicketId())

  useEffect(() => {
    if (isOpen) {
      if (existingTicket) {
        setTicketId(existingTicket.ticketId)
        setSubmitted(true)
        setAgentViewTab('AGENT_VIEW')
      } else {
        setSubmitted(false)
        setTicketId(generateSupportTicketId())
        setAgentViewTab('USER_VIEW')
      }
    }
  }, [isOpen, existingTicket])

  if (!isOpen) return null

  const handleSubmitTicket = () => {
    setSubmitted(true)
    const dossier: EscalationDossier = {
      ticketId,
      businessId: 'CHEERIO-D2C-9842',
      brandName: 'Aura Skincare',
      ownerName: 'Maya Sharma (Founder)',
      contactChannel: 'WhatsApp (+91 98201 44521)',
      attemptedGoal: 'Post-Purchase Replenishment Automation',
      workflowStep: 'Step 3 of 4: Pre-Launch Meta Compliance',
      errorCode: activeIssue?.code || 'META_TEMPLATE_REJECT_OPT_OUT',
      errorSummary: activeIssue?.title || 'WhatsApp Message Template Rejected (Missing Mandatory Opt-Out)',
      plainEnglishExplanation: activeIssue?.plainEnglishDescription || 'Meta rejected template due to missing opt-out mechanism.',
      attemptedFixes: ['FixFlow 1-Click Opt-Out Tag (Attempted 1x)', 'Shopify Webhook Payload Verified'],
      telemetryLogs: [
        { timestamp: new Date().toISOString(), event: 'Template validation triggered', status: 'WARN' },
        { timestamp: new Date().toISOString(), event: 'Missing opt-out notice detected', status: 'ERROR' },
        { timestamp: new Date().toISOString(), event: 'User escalated to human specialist via Zero-Repetition Handoff', status: 'INFO' }
      ],
      createdAt: new Date().toISOString(),
      status: 'QUEUED_FOR_SPECIALIST',
      assignedAgent: 'Rahul V. (Senior Meta BSP Specialist)'
    }
    if (onDispatchTicket) {
      onDispatchTicket(dossier)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setTicketId(generateSupportTicketId())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Zero-Repetition Human Support Handoff</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Assignment A Innovation
                </span>
              </div>
              <p className="text-xs text-slate-400">Context, error codes, and attempted actions transferred automatically</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher: Customer View vs Cheerio Agent Internal Dossier */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Perspective Switcher:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setAgentViewTab('USER_VIEW')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                agentViewTab === 'USER_VIEW' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Maya's Escalation Modal
            </button>
            <button
              onClick={() => setAgentViewTab('AGENT_VIEW')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                agentViewTab === 'AGENT_VIEW' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cheerio Support Agent Screen
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Priority Escalation Dispatched</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Ticket <strong>#{ticketId}</strong> has been routed to Senior Meta BSP Specialist <strong>Rahul V.</strong>
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-w-lg mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Response Time:</span>
                  <span className="text-emerald-400 font-bold">&lt; {SUPPORT_SLA_BENCHMARKS.ESTIMATED_RESPONSE_MINUTES} minutes</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Context Attached:</span>
                  <span className="text-slate-200 font-medium">Full workflow state, payload, and Meta API trace</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Repetition Guarantee:</span>
                  <span className="text-indigo-400 font-medium">You will NEVER be asked "What were you trying to do?"</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
              >
                Close & Return to Dashboard
              </button>
            </div>
          ) : agentViewTab === 'USER_VIEW' ? (
            /* USER VIEW: Plain English, No Repetition Required */
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Zero-Repetition Guarantee:</span>
                  <p className="mt-0.5 leading-relaxed">
                    FixFlow has already compiled your exact goal, current setup step, error code, and attempted actions. You don't need to describe the issue or take screenshots.
                  </p>
                </div>
              </div>

              {/* Pre-collected Context Dossier */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Pre-Collected Support Dossier:</span>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Business & Account:</span>
                    <span className="text-slate-200 font-medium">Aura Skincare (Maya Sharma • Growth Plan)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Target Workflow:</span>
                    <span className="text-slate-200 font-medium">Post-Purchase Replenishment Automation</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Exact Step Reached:</span>
                    <span className="text-slate-200 font-medium">Step 3 of 4: Pre-Launch Meta Compliance</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Roadblock Code:</span>
                    <span className="text-amber-400 font-mono font-medium">{activeIssue?.code || 'META_TEMPLATE_REJECT_OPT_OUT'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-500 block text-[11px]">Automated Diagnostics Summary:</span>
                  <p className="text-slate-300 mt-0.5">
                    {activeIssue?.plainEnglishDescription || 'Meta marketing template rejected due to missing opt-out mechanism.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-500 block text-[11px]">Attached Telemetry & Attempts:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[11px] text-slate-300 font-mono">1-Click Fix Triggered (1x)</span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[11px] text-slate-300 font-mono">Shopify Webhook Payload: Valid</span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded text-[11px] text-slate-300 font-mono">Meta API Error Log: Attached</span>
                  </div>
                </div>
              </div>

              {/* Optional note from user */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Additional Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please also check if our festival campaign next week is affected"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitTicket}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <span>Dispatch Escalation with Context</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* CHEERIO AGENT VIEW: What the human specialist sees */
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-purple-200">
                <span className="font-bold">Cheerio Internal Support Cockpit (Specialist Screen):</span>
                <p className="mt-0.5 text-[11px] text-slate-300">
                  Agent Rahul V. receives this ticket with 100% of telemetry already loaded. Average handle time drops from {SUPPORT_SLA_BENCHMARKS.UNASSISTED_HANDLE_TIME_MINUTES} min to {SUPPORT_SLA_BENCHMARKS.FIXFLOW_ASSISTED_HANDLE_TIME_MINUTES} min!
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-slate-300">
                <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-1">
                  <span>[SYSTEM TRACE #{ticketId}]</span>
                  <span className="text-emerald-400 font-bold">STATUS: {existingTicket?.status || 'QUEUED_FOR_SPECIALIST'}</span>
                </div>
                <div>ACCOUNT_ID: <span className="text-white">{existingTicket?.businessId || 'CHEERIO-D2C-9842 (Aura Skincare)'}</span></div>
                <div>CONTACT_PHONE: <span className="text-white">{existingTicket?.contactChannel || '+91 98201 44521 (Maya Sharma)'}</span></div>
                <div>ASSIGNED_AGENT: <span className="text-indigo-400">{existingTicket?.assignedAgent || 'Rahul V. (Senior Meta BSP Specialist)'}</span></div>
                <div>TARGET_WORKFLOW: <span className="text-white">{existingTicket?.attemptedGoal || 'Post-Purchase Replenishment Automation'}</span></div>
                <div>ERROR_CODE: <span className="text-amber-400">{existingTicket?.errorCode || activeIssue?.code || 'META_TEMPLATE_REJECT_OPT_OUT'}</span></div>
                <div>FAILED_FIELD: <span className="text-amber-300">template.components[OPT_OUT_BUTTON]</span></div>
                <div>FIXFLOW_ATTEMPTS: <span className="text-white">1 auto-fix tried; user escalated</span></div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  RECOMMENDED AGENT ACTION: Review Meta template category (Marketing vs Utility) or force-sync Cheerio WABA template token.
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setAgentViewTab('USER_VIEW')}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs hover:bg-slate-700"
                >
                  Switch back to Customer View
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
