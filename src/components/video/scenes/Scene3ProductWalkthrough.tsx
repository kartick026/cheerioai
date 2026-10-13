import React, { useState } from 'react'
import { 
  Users, 
  FileText, 
  Edit3, 
  CheckSquare, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react'
import { KAVERI_NATURALS_SEGMENTS, KAVERI_NATURALS_TEMPLATES } from '../../../data/videoStoryboardData'
import { SimulatedPlatformResponse } from '../../common/SimulatedPlatformResponse'
import { validateTemplateContent } from '../../../utils/templateValidation'

interface Scene3ProductWalkthroughProps {
  currentSubStepIndex?: number
  onSelectSubStep?: (index: number) => void
}

export const Scene3ProductWalkthrough: React.FC<Scene3ProductWalkthroughProps> = ({
  currentSubStepIndex = 0,
  onSelectSubStep
}) => {
  // Step index maps to the 7 steps: 0=Audience, 1=Template, 2=Editor, 3=Review, 4=Rejection, 5=Recovery, 6=NextAction
  const activeStep = Math.min(Math.max(currentSubStepIndex, 0), 6)

  // Preserved state across the continuous walkthrough
  const [selectedSegment, setSelectedSegment] = useState<string>(KAVERI_NATURALS_SEGMENTS[0].id)
  const [selectedTemplate, setSelectedTemplate] = useState<string>(KAVERI_NATURALS_TEMPLATES[0].id)
  const [messageBody, setMessageBody] = useState<string>(
    'Hi {{first_name}}, your {{product_name}} is due for replenishment! Enjoy 15% off with code {{discount_code}}.'
  )
  const [hasInjectedOptOut, setHasInjectedOptOut] = useState<boolean>(false)
  const [simulatedResubmission, setSimulatedResubmission] = useState<boolean>(false)

  const validation = validateTemplateContent(messageBody)
  const currentTemplate = KAVERI_NATURALS_TEMPLATES.find(t => t.id === selectedTemplate) || KAVERI_NATURALS_TEMPLATES[0]
  const currentSegment = KAVERI_NATURALS_SEGMENTS.find(s => s.id === selectedSegment) || KAVERI_NATURALS_SEGMENTS[0]

  const handleApplyFix = () => {
    if (!messageBody.includes('Reply STOP')) {
      setMessageBody(prev => prev.trim() + '\n\nReply STOP to unsubscribe.')
      setHasInjectedOptOut(true)
    }
  }

  const handleSimulatedResubmit = () => {
    setSimulatedResubmission(true)
  }

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-slate-950 text-white select-none overflow-y-auto">
      
      {/* Top Breadcrumb Steps */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Scene 3 • Continuous Product Walkthrough
          </span>
          <span className="text-xs text-slate-400 font-semibold hidden md:inline">
            Aura Skincare / Kaveri Naturals Replenishment Campaign
          </span>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-bold">
          {['1. Audience', '2. Template', '3. Variables', '4. Review', '5. Rejection', '6. Recovery', '7. Next Step'].map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelectSubStep && onSelectSubStep(idx)}
              className={`px-2 py-0.5 rounded transition-all ${
                activeStep === idx
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-500 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Walkthrough Container (Reusing Campaign Builder Chassis) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl flex-1 flex flex-col justify-between min-h-[380px]">
        
        {/* Step 1: Choose an Audience */}
        {activeStep === 0 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Step 1 of 4 • Audience Selection</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Choose Target Customer Segment</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Kaveri Naturals customer segments organized by order frequency and purchase recency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {KAVERI_NATURALS_SEGMENTS.map((seg) => (
                <div
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedSegment === seg.id
                      ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-300 font-bold">{seg.size}</span>
                    {selectedSegment === seg.id && (
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white">{seg.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{seg.description}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Selected: <strong>{currentSegment.name}</strong> ({currentSegment.size})</span>
              <span className="text-emerald-400 font-semibold text-[11px]">Ready for Template Step &rarr;</span>
            </div>
          </div>
        )}

        {/* Step 2: Choose a WhatsApp Template */}
        {activeStep === 1 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Step 2 of 4 • Template Selection</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Select Pre-Approved Meta Template</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect template statuses. If a template has a policy rejection, FixFlow keeps it visible so you understand why.
              </p>
            </div>

            <div className="space-y-2.5">
              {KAVERI_NATURALS_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTemplate === tmpl.id
                      ? 'bg-purple-950/40 border-purple-500 shadow-md shadow-purple-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">{tmpl.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                        {tmpl.category}
                      </span>
                      {tmpl.status === 'REJECTED' ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-red-400" />
                          <span>Status: Rejected by Meta</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Status: Approved</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-1">{tmpl.body}</p>
                    {tmpl.status === 'REJECTED' && (
                      <div className="text-[10px] text-amber-400 mt-1 font-medium">
                        ⚠️ Reason: {tmpl.statusReason}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    <input
                      type="radio"
                      checked={selectedTemplate === tmpl.id}
                      onChange={() => setSelectedTemplate(tmpl.id)}
                      className="accent-purple-600 w-4 h-4"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Edit Message & Variables */}
        {activeStep === 2 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Step 3 of 4 • Message & Variables</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Customize Template & Check Syntax</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Insert supported customer variables. FixFlow inspects syntax in real time for unclosed brackets or missing tags.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Message Body (Variables: <code className="text-purple-300 font-mono">{'{{first_name}}'}</code>, <code className="text-purple-300 font-mono">{'{{product_name}}'}</code>, <code className="text-purple-300 font-mono">{'{{discount_code}}'}</code>)
              </label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-100 font-mono focus:border-purple-500 focus:outline-none"
              />

              {/* Dynamic Linting Feedback Banner */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  {validation.hasOptOut ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Opt-out wording detected ("Reply STOP")</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1 font-semibold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Warning: Missing opt-out tag per Meta Policy 4.2</span>
                    </span>
                  )}
                  {!validation.variableSyntax.valid && (
                    <span className="text-red-400 font-semibold text-[11px]">• Malformed syntax</span>
                  )}
                </div>

                {!validation.hasOptOut && (
                  <button
                    type="button"
                    onClick={handleApplyFix}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold shadow-xs transition-all flex items-center gap-1"
                  >
                    <span>+ Insert Compliant Opt-Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review Campaign Configuration */}
        {activeStep === 3 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Step 4 of 4 • Pre-Flight Review</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Review Campaign Configuration</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Catch configuration problems before launch. Rejected templates remain flagged.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Audience:</span>
                <span className="text-white font-semibold">{currentSegment.name}</span>
                <div className="text-[11px] text-purple-300 mt-0.5">{currentSegment.size}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Selected Template:</span>
                <span className="text-white font-semibold">{currentTemplate.name}</span>
                <div className="text-[11px] text-amber-400 mt-0.5 font-mono">Status: {currentTemplate.status}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Message Preview:</span>
              <div className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                {messageBody}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
              <span>⚠️ Configuration Warning: Template has an active Meta rejection on file.</span>
              <span className="font-bold text-[11px]">Next: Trigger Platform Rejection Check</span>
            </div>
          </div>
        )}

        {/* Step 5: Encounter Simulated Template Rejection */}
        {activeStep === 4 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Deterministic Sandbox Simulation</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Simulated Meta Template Rejection</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Demonstrating transparent error presentation. FixFlow displays the configured simulated response without hiding details.
              </p>
            </div>

            {/* Preserving existing SimulatedPlatformResponse component with dashed purple border */}
            <SimulatedPlatformResponse
              errorCode="132001"
              errorSubcode="2388091"
              errorTitle="WhatsApp Message Template Rejected (Missing Mandatory Opt-Out)"
              plainEnglishExplanation="Meta's Graph API rejected the template because marketing category broadcasts require an explicit unsubscribe mechanism (e.g. 'Reply STOP to opt out') per WhatsApp Policy 4.2."
              rawApiMessage="POST /v21.0/10492819284/message_templates -> (#132001) Template does not meet WhatsApp Business Messaging Policy 4.2: Missing opt-out tag or footer button."
              timestamp="Just now (Deterministic Sandbox)"
            />
          </div>
        )}

        {/* Step 6: Recover Without Losing Progress */}
        {activeStep === 5 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Zero-Loss Progress Recovery</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Return & Edit Without Starting Over</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Your previously selected audience, template, and custom variables remain completely preserved.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>Preserved Audience:</span>
                <strong className="text-white">{currentSegment.name}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                <span>Preserved Template:</span>
                <strong className="text-white">{currentTemplate.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Preserved Message Draft:</span>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300">
                  {messageBody}
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 flex items-center justify-between">
              <span>✓ All inputs intact. Opt-out correction applied to draft.</span>
              <button
                type="button"
                onClick={handleSimulatedResubmit}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-all"
              >
                {simulatedResubmission ? '✓ Simulated Resubmission Approved' : 'Simulated Resubmission'}
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Show the Appropriate Next Action */}
        {activeStep === 6 && (
          <div className="space-y-4 my-auto">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Clear Next Actions</span>
              <h3 className="text-sm sm:text-base font-bold text-white">Safe Next Steps & Human Escalation Boundary</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                FixFlow establishes clear guidance: safe self-service corrections vs. when to reach a human specialist.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Supported Safe Self-Service</span>
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Configuration corrections, variable syntax fixes, and opt-out additions that comply with Meta guidelines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" />
                  <span>When to Seek Human Help</span>
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Persistent Meta review delays, account verification rejections, or custom webhook schema mismatches.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Next up: Scene 4 explores the Zero-Repetition Human Support handoff.</span>
              <span className="text-indigo-400 font-bold text-[11px]">Proceed to Scene 4 &rarr;</span>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Step Navigation Controls */}
      <div className="pt-3 flex items-center justify-between text-xs text-slate-400">
        <button
          type="button"
          onClick={() => onSelectSubStep && onSelectSubStep(Math.max(activeStep - 1, 0))}
          disabled={activeStep === 0}
          className="px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 disabled:opacity-40 transition-all flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Step</span>
        </button>

        <span className="font-mono text-[11px] text-slate-500">
          Walkthrough Step {activeStep + 1} of 7
        </span>

        <button
          type="button"
          onClick={() => onSelectSubStep && onSelectSubStep(Math.min(activeStep + 1, 6))}
          disabled={activeStep === 6}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-40 transition-all flex items-center gap-1"
        >
          <span>Next Step</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  )
}
