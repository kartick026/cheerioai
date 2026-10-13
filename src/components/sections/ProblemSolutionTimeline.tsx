import React, { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Smartphone,
  FileCode,
  Bot,
  RefreshCw,
  LifeBuoy,
  Sparkles,
  Layers,
  Clock,
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react'
import { SupportIssue } from '../../types'

interface ProblemSolutionTimelineProps {
  onOpenWizard: () => void
  onSelectIssue?: (issue: SupportIssue) => void
  onOpenPmDock?: () => void
}

interface TimelineStep {
  stepNumber: string
  milestoneTitle: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  problem: {
    title: string
    code: string
    description: string
    quote: string
    frictionMetric: string
  }
  solution: {
    title: string
    badge: string
    description: string
    actionLabel: string
    outcomeMetric: string
    isAutomated: boolean
  }
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    stepNumber: '01',
    milestoneTitle: 'WABA Signup & Onboarding',
    category: 'Account Setup',
    icon: Smartphone,
    problem: {
      title: 'WhatsApp Business API Signup Stuck at 2FA / Verification',
      code: 'WABA_EMBEDDED_SIGNUP_HANG',
      description: 'Meta Business Manager blocks live message dispatches because 2-Factor Authentication is not enforced on the parent Meta Business account, or the phone number is still tethered to a personal WhatsApp account.',
      quote: '"My WhatsApp is verified, but Meta won\'t let me send broadcasts and gives me no clear reason why."',
      frictionMetric: '35 min wait • 24% of all setup tickets',
    },
    solution: {
      title: 'Guided Pre-Flight Verification & Direct Meta Deep-Links',
      badge: 'Guided Self-Service',
      description: 'FixFlow detects missing 2FA enforcement, generates an authenticated deep-link to Meta Security Center, and triggers an instant token status refresh once toggled.',
      actionLabel: 'Inspect Onboarding Check',
      outcomeMetric: '78% Resolved without support',
      isAutomated: true,
    },
  },
  {
    stepNumber: '02',
    milestoneTitle: 'Template Compliance & Linting',
    category: 'Meta Policy 4.2',
    icon: FileCode,
    problem: {
      title: 'Broadcast Template Rejected with Cryptic Error 132001',
      code: 'META_TEMPLATE_REJECT_OPT_OUT',
      description: 'The user drafts a promotional campaign without mandatory unsubscribe language. Meta Graph API rejects the template with opaque Error 132001, leaving the founder confused and unable to launch.',
      quote: '"Meta rejected my replenishment offer with error code 132001. I have no idea what needs to change."',
      frictionMetric: '18 min wait • 32% of all setup tickets',
    },
    solution: {
      title: 'In-Editor Syntax Linter + 1-Click Opt-Out Auto-Fix',
      badge: '1-Click Verified Fix',
      description: 'FixFlow continuously lints the message body as Maya types, detects missing opt-out copy, and offers an idempotent 1-click button that appends "Reply STOP to unsubscribe" and updates the live preview.',
      actionLabel: 'Try 1-Click Fix in Wizard',
      outcomeMetric: '92% 1-Click Success Rate',
      isAutomated: true,
    },
  },
  {
    stepNumber: '03',
    milestoneTitle: 'Dynamic Variable Formatting',
    category: 'Personalization',
    icon: Layers,
    problem: {
      title: 'Broken Variable Syntax Corrupts Customer Broadcasts',
      code: 'MALFORMED_VARIABLE_SYNTAX',
      description: 'Merge tags like {{first_name or empty brackets {{}} cause Meta template validation to fail or generate broken customer messages like "Hi {{1}}, here is your deal".',
      quote: '"My customers received messages with broken tags and unclosed brackets instead of their actual names."',
      frictionMetric: 'Damages brand trust • Message delivery failure',
    },
    solution: {
      title: 'Deterministic Token Linter & Live Phone Simulator',
      badge: 'Real-Time Guardrail',
      description: 'FixFlow validates token balance and schema mapping in real-time, showing Maya exactly how the personalized text appears on an interactive iPhone 16 mockup before submission.',
      actionLabel: 'Test Variable Preview',
      outcomeMetric: '100% Syntax Interception',
      isAutomated: true,
    },
  },
  {
    stepNumber: '04',
    milestoneTitle: 'Automation Triggers & Webhooks',
    category: 'Shopify Integration',
    icon: Bot,
    problem: {
      title: 'Replenishment Flows Fail Silently on Checkout',
      code: 'CHATBOT_TRIGGER_PAYLOAD_MISSING',
      description: 'Shopify order webhooks fail to trigger WhatsApp recovery flows because customer checked out with an email address instead of a mobile number, or the Shopify OAuth token expired.',
      quote: '"Orders are being placed on my store, but zero WhatsApp replenishment messages are being sent out."',
      frictionMetric: '22 min wait • Lost customer retention',
    },
    solution: {
      title: 'Interactive Trigger Debugger & Fallback Guardrails',
      badge: 'Guided Diagnostics',
      description: 'FixFlow isolates merchant-side configuration (Shopify phone required setting) from API tokens, offering a 1-click OAuth re-handshake and fallback SMS logic.',
      actionLabel: 'Diagnose Trigger Issue',
      outcomeMetric: '88% Guided Resolution',
      isAutomated: true,
    },
  },
  {
    stepNumber: '05',
    milestoneTitle: 'Specialist Escalation (When Automation Stops)',
    category: 'Human Support',
    icon: LifeBuoy,
    problem: {
      title: 'Complex Edge Cases Trapped in Frustrating Bot Loops',
      code: 'ACCOUNT_TIER_RESTRICTION_ESCALATION',
      description: 'Billing disputes, Meta account quality bans, and edge-case API timeouts cannot be self-served. Traditional chatbots keep users trapped in unhelpful loops where they must repeat themselves.',
      quote: '"I explained my problem to the bot 3 times, and then had to type everything again to a support agent."',
      frictionMetric: '4-6 repetitive messages • High churn risk',
    },
    solution: {
      title: 'Zero-Repetition Handoff with Pre-Attached Telemetry',
      badge: 'Zero-Repetition Handoff',
      description: 'FixFlow packages full pre-flight telemetry, sanitized Meta API traces, and step attempt history directly into the Cheerio specialist cockpit. Rahul V. resolves it in 1 touch with zero user repetition.',
      actionLabel: 'View Specialist Dossier',
      outcomeMetric: '1-Touch Human Resolution',
      isAutomated: false,
    },
  },
]

export const ProblemSolutionTimeline: React.FC<ProblemSolutionTimelineProps> = ({
  onOpenWizard,
  onOpenPmDock,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1) // Default to Step 2 (the central prototype scenario)

  return (
    <section id="problem-solution-timeline" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200 text-xs font-bold tracking-wide uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
          <span>Step-by-Step Problem & Solution Journey</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How FixFlow Solves Support Friction — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Step by Step</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Setting up WhatsApp campaigns shouldn't turn business owners into debugging engineers. See how FixFlow intercepts problems at every milestone of the campaign lifecycle.
        </p>

        {/* Milestone Quick Switcher Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {TIMELINE_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#7c3aed] text-white border-[#7c3aed] shadow-md shadow-purple-500/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{step.stepNumber}</span>
                <span>{step.milestoneTitle.split('&')[0].trim()}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Continuous Timeline */}
      <div className="relative">
        
        {/* Continuous Central Glowing Vertical Connector Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-indigo-500 to-emerald-400 rounded-full shadow-xs" />

        {/* Timeline Steps List */}
        <div className="space-y-10 sm:space-y-12">
          {TIMELINE_STEPS.map((step, idx) => {
            const StepIcon = step.icon
            const isHighlighted = activeStepIndex === idx
            const isEven = idx % 2 === 0

            return (
              <div
                key={step.stepNumber}
                id={`timeline-step-${idx}`}
                className={`relative transition-all duration-300 ${
                  isHighlighted ? 'scale-[1.01]' : 'opacity-90 hover:opacity-100'
                }`}
              >
                
                {/* Milestone Node Badge (Desktop Center) */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                  <div
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all cursor-pointer shadow-xl border-2 ${
                      isHighlighted
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white border-white ring-4 ring-purple-300 scale-110'
                        : 'bg-white text-slate-700 border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                </div>

                {/* Step Content: Responsive Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                  
                  {/* Left Column: The Problem (Roadblock) */}
                  <div
                    className={`p-5 sm:p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-red-50/60 via-amber-50/40 to-white border-red-200 shadow-xl shadow-red-500/5 ring-1 ring-red-200'
                        : 'bg-white/80 border-slate-200 hover:border-red-200 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Problem Header Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="lg:hidden w-7 h-7 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                            {step.stepNumber}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>The Problem / Roadblock</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {step.category}
                        </span>
                      </div>

                      {/* Problem Title & Code */}
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {step.problem.title}
                        </h3>
                        <div className="mt-1 font-mono text-[10px] text-red-800 font-semibold bg-red-100/70 inline-block px-2 py-0.5 rounded border border-red-200">
                          CODE: {step.problem.code}
                        </div>
                      </div>

                      {/* Problem Plain-English Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {step.problem.description}
                      </p>

                      {/* Founder Quote */}
                      <blockquote className="p-3 rounded-2xl bg-slate-50 border-l-4 border-amber-400 text-xs italic text-slate-600">
                        {step.problem.quote}
                      </blockquote>
                    </div>

                    {/* Problem Friction Footer */}
                    <div className="pt-3 border-t border-red-100/80 mt-4 flex items-center justify-between text-[11px] text-red-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Friction: {step.problem.frictionMetric}</span>
                      </span>
                    </div>

                  </div>

                  {/* Right Column: The FixFlow Solution */}
                  <div
                    className={`p-5 sm:p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-emerald-50/30 border-purple-300 shadow-xl shadow-purple-500/10 ring-1 ring-purple-200'
                        : 'bg-white/80 border-slate-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Solution Header Tag */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>FixFlow Guided Resolution</span>
                        </span>

                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200 shadow-2xs">
                          {step.solution.badge}
                        </span>
                      </div>

                      {/* Solution Title */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#7c3aed] flex items-center justify-center shrink-0 mt-0.5">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {step.solution.title}
                          </h3>
                        </div>
                      </div>

                      {/* Solution Plain-English Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {step.solution.description}
                      </p>

                      {/* Solution Outcome Badge */}
                      <div className="p-3 rounded-2xl bg-white border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between shadow-2xs">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Measured Outcome:</span>
                        </span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {step.solution.outcomeMetric}
                        </span>
                      </div>
                    </div>

                    {/* Solution Action Button */}
                    <div className="pt-4 border-t border-purple-100 mt-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={onOpenWizard}
                        className="w-full cheerio-btn-primary py-2.5 px-4 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{step.solution.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* Bottom Summary Callout */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white text-center space-y-3 shadow-xl">
        <h3 className="text-lg sm:text-xl font-black tracking-tight">
          Every Step Designed to Protect Marketing Velocity
        </h3>
        <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto leading-relaxed">
          From the first phone verification check to zero-repetition human escalation, FixFlow guarantees founders can launch without getting trapped in documentation or ticket queues.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenWizard}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#7c3aed] font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 hover:scale-105"
          >
            <span>Launch Live FixFlow Setup Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onOpenPmDock && (
            <button
              type="button"
              onClick={onOpenPmDock}
              className="px-5 py-2.5 rounded-full bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/40 font-bold text-xs transition-all"
            >
              <span>View $18,000/mo Financial Arbitrage</span>
            </button>
          )}
        </div>
      </div>

    </section>
  )
}
