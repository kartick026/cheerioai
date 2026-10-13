import React, { useState } from 'react'
import { 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  FileCode, 
  Send, 
  Bot, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react'
import { StoryboardSubStep } from '../../../data/videoStoryboardData'

interface Scene1ProblemsProps {
  currentSubStepIndex?: number
  onSelectSubStep?: (index: number) => void
}

const PROBLEMS = [
  {
    number: '1',
    title: 'WhatsApp API Onboarding Gets Stuck',
    category: 'WABA Signup',
    icon: Smartphone,
    color: 'border-red-500/30 text-red-400 bg-red-950/40',
    obstacleText: 'Business verification pending, phone number already registered with consumer WhatsApp, or display name rejected by Meta.',
    fixflowSolution: 'FixFlow provides a plain-English checklist identifying phone number unlinking steps and direct Meta Security Center deep-links.',
    actionBadge: 'Guided Configuration Check',
    note: 'FixFlow guides configuration checks; it cannot override Meta verification decisions.'
  },
  {
    number: '2',
    title: 'Templates Rejected or Stuck in Review',
    category: 'Meta Policy 4.2',
    icon: FileCode,
    color: 'border-amber-500/30 text-amber-400 bg-amber-950/40',
    obstacleText: 'Template submitted without required opt-out copy. Meta rejects it with error 132001, leaving the founder confused.',
    fixflowSolution: 'In-wizard linting highlights the missing opt-out mechanism before submission and explains what Meta requires.',
    actionBadge: 'Central Prototype Scenario',
    note: 'Central scenario demonstrated in Step-by-Step product walkthrough.'
  },
  {
    number: '3',
    title: 'Campaigns Sent, but Delivery is Low',
    category: 'Delivery Diagnostics',
    icon: Send,
    color: 'border-sky-500/30 text-sky-400 bg-sky-950/40',
    obstacleText: 'The dashboard shows "Campaign Sent", but only 60% of recipients receive the message. Sent does not mean delivered.',
    fixflowSolution: 'FixFlow separates checks the user can make (invalid number formats, country codes) from platform-side carrier investigation.',
    actionBadge: 'Illustrative Diagnostic Checklist',
    note: 'Illustrative checklist: Separates user-side checks from platform carrier limits.'
  },
  {
    number: '4',
    title: 'Chatbot Flows Do Not Trigger',
    category: 'Automation Logic',
    icon: Bot,
    color: 'border-purple-500/30 text-purple-400 bg-purple-950/40',
    obstacleText: 'A replenishment bot fails to trigger after a Shopify purchase because the customer checked out with email only.',
    fixflowSolution: 'Guided trigger debugger highlights missing customer.phone payloads and displays a Shopify checkout setting fix.',
    actionBadge: 'Conceptual Guided Debugger',
    note: 'Conceptual debugger: Distinguishes trigger configuration from runtime errors.'
  },
  {
    number: '5',
    title: 'Shopify, CRM & Webhooks Break',
    category: 'Integrations',
    icon: Layers,
    color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/40',
    obstacleText: 'Shopify admin rotates app permissions, triggering 401 Unauthorized errors that silently halt automated order syncing.',
    fixflowSolution: 'Guided integration diagnostic verifies HMAC token signatures and provides a 1-click re-authorization handshake.',
    actionBadge: 'Integration Diagnostic',
    note: 'Illustrative diagnostic: Features immediate escalation when root cause is uncertain.'
  }
]

export const Scene1Problems: React.FC<Scene1ProblemsProps> = ({
  currentSubStepIndex = 0,
  onSelectSubStep
}) => {
  const activeIdx = Math.min(Math.max(currentSubStepIndex, 0), PROBLEMS.length - 1)
  const activeProblem = PROBLEMS[activeIdx]
  const IconComponent = activeProblem.icon

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-8 bg-slate-950 text-white select-none">
      
      {/* Top Scene Label */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            Scene 1 • The Customer Problem
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            5 Common Obstacles Non-Technical Founders Encounter
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Problem {activeIdx + 1} of 5
        </span>
      </div>

      {/* Main Interactive Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4 items-center">
        
        {/* Left Side: 5 Problem Selector Tabs */}
        <div className="lg:col-span-5 space-y-2">
          {PROBLEMS.map((prob, idx) => {
            const ItemIcon = prob.icon
            const isSelected = idx === activeIdx
            return (
              <button
                key={prob.number}
                type="button"
                onClick={() => onSelectSubStep && onSelectSubStep(idx)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500/80 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      Problem {prob.number} • {prob.category}
                    </div>
                    <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {prob.title}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
                )}
              </button>
            )
          })}
        </div>

        {/* Right Side: Deep-Dive Problem & FixFlow Solution Card */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeProblem.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Obstacle Breakdown
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {activeProblem.title}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeProblem.actionBadge}
              </span>
            </div>

            {/* The Obstacle (Red/Amber Box) */}
            <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs text-red-200">
              <div className="flex items-center gap-1.5 font-bold text-red-300 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>What Goes Wrong for Non-Technical Users:</span>
              </div>
              <p className="leading-relaxed text-[11px] text-red-200/90 font-medium">
                {activeProblem.obstacleText}
              </p>
            </div>

            {/* The FixFlow Solution (Green/Purple Box) */}
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
              <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>How FixFlow Resolves or Clarifies It:</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-300 font-medium">
                {activeProblem.fixflowSolution}
              </p>
            </div>
          </div>

          {/* Footnote distinguishing conceptual vs live */}
          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3 h-3 text-purple-400 shrink-0" />
            <span>{activeProblem.note}</span>
          </div>

        </div>

      </div>

      {/* Footer Insight */}
      <div className="text-center text-xs text-slate-400 bg-slate-900/60 py-2.5 px-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
        <span>FixFlow replaces confusing error codes with plain-English next actions.</span>
        <span className="text-purple-400 font-bold text-[11px]">Transitioning to Solution &rarr;</span>
      </div>

    </div>
  )
}
