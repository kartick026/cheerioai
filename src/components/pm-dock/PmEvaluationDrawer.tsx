import React, { useState } from 'react'
import { 
  X, 
  FileText, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  TrendingUp,
  SlidersHorizontal,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react'
import { PART_1_ANSWERS, PART_3_AI_USAGE, PART_4_NUMBERS } from '../../data/pmAssignmentAnswers'
import { 
  DEFAULT_FINANCIAL_INPUTS, 
  FINANCIAL_SLIDER_RANGES, 
  calculateFinancialModel 
} from '../../config/financialModelConfig'

interface PmEvaluationDrawerProps {
  isOpen: boolean
  onClose: () => void
  onResetDemo: () => void
  onToggleError: () => void
  isErrorActive: boolean
}

export const PmEvaluationDrawer: React.FC<PmEvaluationDrawerProps> = ({
  isOpen,
  onClose,
  onResetDemo,
  onToggleError,
  isErrorActive
}) => {
  const [activeTab, setActiveTab] = useState<'PART_1' | 'PART_4' | 'PART_3' | 'DEMO_CONTROLS'>('PART_1')
  const [expandedQuestion, setExpandedQuestion] = useState<string>('Q1')

  // Interactive Financial Model Sliders (Initialized from centralized config)
  const [activeBusinesses, setActiveBusinesses] = useState<number>(DEFAULT_FINANCIAL_INPUTS.activeBusinesses)
  const [queriesPerBusiness, setQueriesPerBusiness] = useState<number>(DEFAULT_FINANCIAL_INPUTS.monthlyQueriesPerBusiness)
  const [targetResolutionRate, setTargetResolutionRate] = useState<number>(DEFAULT_FINANCIAL_INPUTS.targetResolutionRate)
  const [humanCostPerTicket, setHumanCostPerTicket] = useState<number>(DEFAULT_FINANCIAL_INPUTS.humanCostPerTicket)

  // Dynamic calculations derived from pure financial domain model
  const {
    totalQueries,
    automatedQueries,
    escalatedQueries,
    monthlyAiCost,
    baselineHumanCost,
    newHumanCost,
    netMonthlySavings,
    annualSavings,
  } = calculateFinancialModel({
    activeBusinesses,
    monthlyQueriesPerBusiness: queriesPerBusiness,
    targetResolutionRate,
    humanCostPerTicket,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-md">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-extrabold text-white">Cheerio PM Assignment Evaluation Dock</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Assignment A
                  </span>
                </div>
                <p className="text-xs text-slate-400">Candidate: Kartick • Interactive Evaluator Console</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('PART_1')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'PART_1'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Part 1: Solution (Q1-Q6)</span>
            </button>

            <button
              onClick={() => setActiveTab('PART_4')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'PART_4'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Part 4: Financial Model & Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('PART_3')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'PART_3'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Part 3: AI Prompts Log</span>
            </button>

            <button
              onClick={() => setActiveTab('DEMO_CONTROLS')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'DEMO_CONTROLS'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Demo Controls</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            
            {/* TAB 1: PART 1 SOLUTIONS (Q1 TO Q6) */}
            {activeTab === 'PART_1' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
                  <span className="font-bold text-white block mb-0.5">Assignment A — Make customer support scale for non-technical users</span>
                  All 6 core PM questions answered concisely. Expand any question below to inspect detailed rationale and metrics.
                </div>

                <div className="space-y-3">
                  {PART_1_ANSWERS.map((ans) => {
                    const isExpanded = expandedQuestion === ans.questionNumber
                    return (
                      <div
                        key={ans.questionNumber}
                        className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedQuestion(isExpanded ? '' : ans.questionNumber)}
                          className="w-full px-4 py-3.5 text-left flex items-center justify-between hover:bg-slate-800/40"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {ans.questionNumber}
                            </span>
                            <span className="text-xs font-bold text-white">
                              {ans.title}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
                            <p className="text-slate-200 font-medium bg-slate-900 p-3 rounded-xl border border-slate-800 leading-relaxed">
                              {ans.summary}
                            </p>
                            <div className="space-y-2.5 pt-1">
                              {ans.detailedPoints.map((pt, idx) => (
                                <div key={idx} className="space-y-0.5">
                                  <span className="font-bold text-purple-300 text-[11px]">{pt.subtitle}</span>
                                  <p className="text-slate-300 text-xs leading-relaxed">{pt.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE FINANCIAL SENSITIVITY CALCULATOR (PART 4) */}
            {activeTab === 'PART_4' && (
              <div className="space-y-5">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-white block mb-0.5">Interactive Financial & Sensitivity Model</span>
                    Adjust the sliders below or explore the validated Google Sheet audit model!
                  </div>
                  <a
                    href={PART_4_NUMBERS.sheetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                    <span>Live Google Sheet ↗</span>
                  </a>
                </div>

                {/* Live Sliders Container */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                      Dynamic Assumption Sliders
                    </span>
                    <button
                      onClick={() => {
                        setActiveBusinesses(DEFAULT_FINANCIAL_INPUTS.activeBusinesses)
                        setQueriesPerBusiness(DEFAULT_FINANCIAL_INPUTS.monthlyQueriesPerBusiness)
                        setTargetResolutionRate(DEFAULT_FINANCIAL_INPUTS.targetResolutionRate)
                        setHumanCostPerTicket(DEFAULT_FINANCIAL_INPUTS.humanCostPerTicket)
                      }}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Reset to Defaults
                    </button>
                  </div>

                  {/* Slider 1: Active Businesses */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Active Cheerio Businesses:</span>
                      <span className="text-white font-bold">{activeBusinesses.toLocaleString()} brands</span>
                    </div>
                    <input
                      type="range"
                      min={FINANCIAL_SLIDER_RANGES.activeBusinesses.min}
                      max={FINANCIAL_SLIDER_RANGES.activeBusinesses.max}
                      step={FINANCIAL_SLIDER_RANGES.activeBusinesses.step}
                      value={activeBusinesses}
                      onChange={(e) => setActiveBusinesses(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Queries / Business / Mo */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Monthly Queries / Business:</span>
                      <span className="text-white font-bold">{queriesPerBusiness.toFixed(1)} queries/mo</span>
                    </div>
                    <input
                      type="range"
                      min={FINANCIAL_SLIDER_RANGES.queriesPerBusiness.min}
                      max={FINANCIAL_SLIDER_RANGES.queriesPerBusiness.max}
                      step={FINANCIAL_SLIDER_RANGES.queriesPerBusiness.step}
                      value={queriesPerBusiness}
                      onChange={(e) => setQueriesPerBusiness(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Slider 3: FixFlow Self-Service Resolution Rate */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Self-Service Resolution Rate (Target):</span>
                      <span className="text-emerald-400 font-bold">{Math.round(targetResolutionRate * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={FINANCIAL_SLIDER_RANGES.targetResolutionRate.min}
                      max={FINANCIAL_SLIDER_RANGES.targetResolutionRate.max}
                      step={FINANCIAL_SLIDER_RANGES.targetResolutionRate.step}
                      value={targetResolutionRate}
                      onChange={(e) => setTargetResolutionRate(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Slider 4: Human Cost per Ticket */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">Human L1 Cost per Ticket:</span>
                      <span className="text-white font-bold">${humanCostPerTicket.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={FINANCIAL_SLIDER_RANGES.humanCostPerTicket.min}
                      max={FINANCIAL_SLIDER_RANGES.humanCostPerTicket.max}
                      step={FINANCIAL_SLIDER_RANGES.humanCostPerTicket.step}
                      value={humanCostPerTicket}
                      onChange={(e) => setHumanCostPerTicket(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Dynamic Calculated Financial Snapshot */}
                <div className="bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3.5">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block border-b border-emerald-900/40 pb-2">
                    Dynamic Financial Outcome
                  </span>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Total Monthly Inbound Queries:</span>
                      <span className="text-base font-extrabold text-white">{totalQueries.toLocaleString()} queries</span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Resolved via FixFlow (Zero Human):</span>
                      <span className="text-base font-extrabold text-emerald-400">{automatedQueries.toLocaleString()} queries</span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Monthly AI Token Cost (Gemini 1.5):</span>
                      <span className="text-base font-extrabold text-white">${monthlyAiCost.toFixed(2)} / mo</span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Remaining Human Support Cost:</span>
                      <span className="text-base font-extrabold text-slate-300">${newHumanCost.toLocaleString()} / mo</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-300 font-bold block">Net Monthly Human Payroll Saved:</span>
                      <span className="text-xs text-slate-400">Baseline (${baselineHumanCost.toLocaleString()}) - New (${newHumanCost.toLocaleString()}) - AI (${monthlyAiCost.toFixed(2)})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-emerald-400">+${Math.round(netMonthlySavings).toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-300 block font-medium">+${Math.round(annualSavings).toLocaleString()} / year</span>
                    </div>
                  </div>
                </div>

                {/* Structured Sections from Google Sheet Model */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Part 4 Structured Audit Tables (Google Sheet Model)
                    </span>
                    <a
                      href={PART_4_NUMBERS.sheetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium"
                    >
                      Open Full Sheet ↗
                    </a>
                  </div>

                  {PART_4_NUMBERS.sections.map((section, sIdx) => (
                    <div key={sIdx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                      <span className="font-bold text-emerald-300 text-[11px] uppercase tracking-wider block border-b border-slate-900 pb-1.5">
                        {section.heading}
                      </span>
                      <div className="space-y-1.5">
                        {section.rows.map((row, rIdx) => (
                          <div key={rIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-900/60 last:border-none">
                            <span className="text-slate-300 font-medium">{row.label}</span>
                            <div className="text-left sm:text-right">
                              <span className="text-white font-mono font-bold">{row.value}</span>
                              {row.note && <span className="block text-[10px] text-slate-500">{row.note}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 3: PART 3 AI USAGE & PROMPT LOG */}
            {activeTab === 'PART_3' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                  <span className="font-bold text-white block mb-0.5">Part 3: Genuine AI Usage Log & Human Contributions</span>
                  Documentation of prompts, failure cases, iterations, and manual product management contributions.
                </div>

                {/* AI Tools Used */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white uppercase tracking-wider">AI Tools Utilized:</span>
                    <a
                      href="https://chatgpt.com/share/6ad0fc68-4a44-83ee-8065-892b63ec5c01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[11px] font-bold transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-3 h-3 text-purple-400" />
                      <span>Live ChatGPT Chat ↗</span>
                    </a>
                  </div>
                  {PART_3_AI_USAGE.toolsUsed.map((tool, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 border-b border-slate-900 pb-2 last:border-none">
                      <span className="font-bold text-purple-300">{tool.tool}</span>
                      <span className="text-slate-400 text-right">{tool.purpose}</span>
                    </div>
                  ))}
                </div>

                {/* Prompts Portfolio */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Prompt Portfolio (3 Worked, 1 Failed):</span>
                  
                  {PART_3_AI_USAGE.prompts.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
                        p.type === 'FAILED'
                          ? 'bg-red-950/20 border-red-500/40'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{p.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.type === 'FAILED'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {p.type}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-800">
                        "{p.promptText}"
                      </div>

                      {p.whyItWorked && (
                        <p className="text-slate-400 text-[11px]">
                          <strong className="text-emerald-400 font-semibold">Why it worked:</strong> {p.whyItWorked}
                        </p>
                      )}

                      {p.whyItFailed && (
                        <div className="space-y-1 text-[11px]">
                          <p className="text-red-300"><strong className="text-red-400 font-semibold">Why it failed:</strong> {p.whyItFailed}</p>
                          <p className="text-emerald-300"><strong className="text-emerald-400 font-semibold">How I corrected it:</strong> {p.howCorrected}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Manual Contributions */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 space-y-2 text-xs">
                  <span className="font-bold text-white uppercase tracking-wider block mb-2">
                    What I Did Myself (Without AI):
                  </span>
                  {PART_3_AI_USAGE.humanContributions.map((contrib, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs py-1 border-b border-slate-900 last:border-none">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{contrib}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: DEMO CONTROLS */}
            {activeTab === 'DEMO_CONTROLS' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
                  <span className="font-bold text-white block">Presentation & Demo Controls:</span>
                  
                  <div className="space-y-2.5">
                    <button
                      onClick={onToggleError}
                      className={`w-full py-3 px-4 rounded-xl border font-bold flex items-center justify-between transition-all ${
                        isErrorActive
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <span>Simulate Pre-Publish Meta Error:</span>
                      <span className="font-mono">{isErrorActive ? '⚠️ Active (Error 132001)' : 'Inactive (Normal)'}</span>
                    </button>

                    <button
                      onClick={onResetDemo}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset Demo State to Initial Baseline</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300 text-xs leading-relaxed">
                  <strong className="text-white block text-sm">3-Minute Video / Interview Demo Sequence:</strong>
                  <p>1. <strong>Dashboard Context:</strong> Show Aura Skincare (14k contacts, 98% delivery, but only 2.1% repeat order rate).</p>
                  <p>2. <strong>FixFlow Guardian:</strong> Highlight proactive banner recommending automated replenishment.</p>
                  <p>3. <strong>Setup Wizard:</strong> Walk through steps, live-type in template to show iPhone screen sync.</p>
                  <p>4. <strong>Stuck Detector:</strong> Show Error 132001 intercepted. Click 1-Click Fix to resolve.</p>
                  <p>5. <strong>Human Handoff:</strong> Show pre-filled dossier with zero repetition.</p>
                  <p>6. <strong>Financial Arbitrage:</strong> Open this dock to demonstrate the $18k/month support savings!</p>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 text-xs text-slate-400 flex items-center justify-between">
            <span>Cheerio Product Intern Assignment</span>
            <span className="text-purple-300 font-mono font-medium">Assignment A • Kartick</span>
          </div>

        </div>
      </div>
    </div>
  )
}
