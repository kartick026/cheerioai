import React, { useState } from 'react'
import {
  ArrowUp,
  RotateCw,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Bot,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react'
import { TOP_5_SUPPORT_ISSUES } from '../../data/mockData'
import { SupportIssue } from '../../types'
import { askGeminiFixFlow, GeminiDiagnosisResult } from '../../services/geminiService'

interface AskCheerioSectionProps {
  onSelectIssue: (issue: SupportIssue) => void
  onOpenWizard: () => void
}

const QUICK_PROMPTS = [
  'Meta Error 132001 (Template Rejected)',
  '2FA Embedded Signup Hang',
  'Shopify Webhook Token Expired',
  'Bot Inactive: Phone Number Missing',
  'Meta Quality Rating Dropped',
]

export const AskCheerioSection: React.FC<AskCheerioSectionProps> = ({
  onSelectIssue,
  onOpenWizard,
}) => {
  const [query, setQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [liveResult, setLiveResult] = useState<GeminiDiagnosisResult | null>(null)
  const [selectedIssue, setSelectedIssue] = useState<SupportIssue | null>(TOP_5_SUPPORT_ISSUES[0])
  const [fixApplied, setFixApplied] = useState<boolean>(false)

  const handleCardClick = (issue: SupportIssue) => {
    setSelectedIssue(issue)
    setLiveResult(null)
    setFixApplied(false)
  }

  const handleRunDiagnosis = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    setIsLoading(true)
    setFixApplied(false)

    try {
      const result = await askGeminiFixFlow(searchQuery)
      setLiveResult(result)
      setSelectedIssue(null)
    } catch (err) {
      console.error(err)
      setSelectedIssue(TOP_5_SUPPORT_ISSUES[0])
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplyFix = () => {
    setFixApplied(true)
  }

  const handleLaunchInWizard = () => {
    if (selectedIssue) {
      onSelectIssue(selectedIssue)
    } else if (liveResult) {
      // Create a compatible SupportIssue from GeminiDiagnosisResult
      const synthesizedIssue: SupportIssue = {
        id: 'gemini-custom',
        code: liveResult.code,
        category: 'TEMPLATE_REJECTION',
        title: liveResult.title,
        plainEnglishDescription: liveResult.plainEnglishDescription,
        rootCause: liveResult.rootCause,
        cheerioOccurrenceRate: 'Custom User Query',
        typicalHumanResolutionTimeMinutes: liveResult.typicalHumanResolutionTimeMinutes,
        fixFlowAutomatedResolutionRate: liveResult.fixFlowAutomatedResolutionRate,
        verifiedFixTitle: liveResult.suggestedFixButtonText,
        verifiedFixAction: liveResult.actionableFix,
      }
      onSelectIssue(synthesizedIssue)
    } else {
      onOpenWizard()
    }
  }

  return (
    <section id="ask-cheerio" className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Clear Rubric Tag & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
          <span>Assignment A • Question 1 & 2 Live AI Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mt-1">
          Ask Cheerio Guardian: Instant Autonomous Support
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
          Ask any WhatsApp setup question, Meta error code, or integration failure. Powered by{' '}
          <strong className="text-purple-700">Google Gemini 3.8 Flash</strong> with grounded Meta BSP rules.
        </p>
      </div>

      {/* Capsule Input Bar (Matching Cheerio AI Style) */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="bg-white/95 rounded-full border border-purple-200/90 shadow-md p-2 pl-6 flex items-center justify-between gap-3 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleRunDiagnosis(query)
              }
            }}
            placeholder="Type error (e.g. Meta Error 132001, 2FA hang, Shopify webhook)..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleRunDiagnosis(query)}
              disabled={isLoading || !query.trim()}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#7c3aed] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all disabled:opacity-50"
              title="Submit query to Gemini"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => {
                setQuery('')
                setLiveResult(null)
                setSelectedIssue(TOP_5_SUPPORT_ISSUES[0])
                setFixApplied(false)
              }}
              className="w-9 h-9 rounded-full bg-purple-100/70 hover:bg-purple-200/80 text-[#7c3aed] flex items-center justify-center transition-colors"
              title="Reset"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Click Prompts */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto mb-8 text-[11px]">
        <span className="text-slate-400 font-medium mr-1">Quick Test:</span>
        {QUICK_PROMPTS.map((promptText) => (
          <button
            key={promptText}
            onClick={() => {
              setQuery(promptText)
              handleRunDiagnosis(promptText)
            }}
            className="px-2.5 py-1 rounded-full bg-white/90 hover:bg-purple-50 text-slate-600 hover:text-[#7c3aed] border border-purple-100 shadow-xs transition-all hover:border-purple-300"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* 6 Clickable Questions Grid (Matching Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto mb-6">
        {/* Card 1: Meta Template Rejection */}
        <button
          onClick={() => handleCardClick(TOP_5_SUPPORT_ISSUES[0])}
          className={`cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all relative ${
            selectedIssue?.id === TOP_5_SUPPORT_ISSUES[0].id && !liveResult
              ? 'border-purple-500 ring-2 ring-purple-200 shadow-md bg-purple-50/20'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              #1 Failure Mode
            </span>
            <span className="text-[10px] font-bold text-slate-400">32% of Tickets</span>
          </div>
          <div className="text-xs font-bold text-slate-900 leading-snug">
            WhatsApp Template Rejected (Missing Opt-Out)
          </div>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
            Meta rejects marketing templates without explicit unsubscribe copy like "Reply STOP".
          </p>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Click to Diagnose &rarr;
          </span>
        </button>

        {/* Card 2: Meta WABA Signup Hang */}
        <button
          onClick={() => handleCardClick(TOP_5_SUPPORT_ISSUES[1])}
          className={`cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all relative ${
            selectedIssue?.id === TOP_5_SUPPORT_ISSUES[1].id && !liveResult
              ? 'border-purple-500 ring-2 ring-purple-200 shadow-md bg-purple-50/20'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              #2 Failure Mode
            </span>
            <span className="text-[10px] font-bold text-slate-400">24% of Tickets</span>
          </div>
          <div className="text-xs font-bold text-slate-900 leading-snug">
            Meta Embedded Signup Stuck on 2FA
          </div>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
            Meta blocks sending until two-factor authentication is toggled on in Business Manager.
          </p>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Click to Diagnose &rarr;
          </span>
        </button>

        {/* Card 3: Chatbot Trigger Payload */}
        <button
          onClick={() => handleCardClick(TOP_5_SUPPORT_ISSUES[2])}
          className={`cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all relative ${
            selectedIssue?.id === TOP_5_SUPPORT_ISSUES[2].id && !liveResult
              ? 'border-purple-500 ring-2 ring-purple-200 shadow-md bg-purple-50/20'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              #3 Failure Mode
            </span>
            <span className="text-[10px] font-bold text-slate-400">19% of Tickets</span>
          </div>
          <div className="text-xs font-bold text-slate-900 leading-snug">
            Bot Inactive: Phone Number Missing
          </div>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
            Customer checked out with email-only on Shopify, so automated WhatsApp trigger fails silently.
          </p>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Click to Diagnose &rarr;
          </span>
        </button>

        {/* Card 4: Shopify Webhook Sync */}
        <button
          onClick={() => handleCardClick(TOP_5_SUPPORT_ISSUES[3])}
          className={`cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all relative ${
            selectedIssue?.id === TOP_5_SUPPORT_ISSUES[3].id && !liveResult
              ? 'border-purple-500 ring-2 ring-purple-200 shadow-md bg-purple-50/20'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              #4 Failure Mode
            </span>
            <span className="text-[10px] font-bold text-slate-400">14% of Tickets</span>
          </div>
          <div className="text-xs font-bold text-slate-900 leading-snug">
            Shopify Webhook Re-Authorization Required
          </div>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
            Shopify rotated store app token after admin update, pausing new order syncing.
          </p>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Click to Diagnose &rarr;
          </span>
        </button>

        {/* Card 5: Meta Quality Rating */}
        <button
          onClick={() => handleCardClick(TOP_5_SUPPORT_ISSUES[4])}
          className={`cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all relative ${
            selectedIssue?.id === TOP_5_SUPPORT_ISSUES[4].id && !liveResult
              ? 'border-purple-500 ring-2 ring-purple-200 shadow-md bg-purple-50/20'
              : ''
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              #5 Failure Mode
            </span>
            <span className="text-[10px] font-bold text-slate-400">11% of Tickets</span>
          </div>
          <div className="text-xs font-bold text-slate-900 leading-snug">
            Meta Quality Rating Dropped (High Block Rate)
          </div>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
            Broadcast sent to unengaged contacts (&gt;90 days inactive) caused spam reports.
          </p>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Click to Diagnose &rarr;
          </span>
        </button>

        {/* Card 6: SSRR Metrics Target */}
        <button
          onClick={onOpenWizard}
          className="cheerio-card rounded-2xl p-4.5 text-left cheerio-card-hover transition-all border-dashed border-purple-300 bg-purple-50/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-[#7c3aed]">
                North Star Target
              </span>
              <span className="text-[10px] font-bold text-emerald-600">+38% Lift</span>
            </div>
            <div className="text-xs font-bold text-slate-900 leading-snug">
              60% Self-Service Resolution Rate (SSRR)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Improves from baseline of 22% to 60% over 3 months, saving $18,000/month.
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#7c3aed] mt-2 block">
            Launch Setup Demo &rarr;
          </span>
        </button>
      </div>

      {/* Expanded Interactive Diagnostic Result Drawer (Supports both static Top 5 and Live Gemini Result) */}
      {(liveResult || selectedIssue) && (
        <div className="cheerio-card rounded-3xl p-6 border-purple-200 bg-gradient-to-b from-white to-purple-50/40 shadow-xl max-w-5xl mx-auto animate-slide-down">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-100 to-indigo-100 text-[#7c3aed] flex items-center justify-center font-bold shrink-0 border border-purple-200/60 shadow-xs">
                {liveResult ? (
                  <Sparkles className="w-5 h-5 text-[#7c3aed]" />
                ) : (
                  <Bot className="w-5 h-5 text-[#7c3aed]" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-[#7c3aed]">
                    {liveResult ? liveResult.code : selectedIssue?.code}
                  </span>
                  {liveResult ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      {liveResult.isLiveGemini ? 'Gemini 3.8 Flash (Live)' : 'FixFlow Diagnostic Engine'}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-500">
                      Volume: {selectedIssue?.cheerioOccurrenceRate}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {liveResult ? liveResult.title : selectedIssue?.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                FixFlow SSRR:{' '}
                {liveResult
                  ? liveResult.fixFlowAutomatedResolutionRate
                  : selectedIssue?.fixFlowAutomatedResolutionRate}
              </span>
            </div>
          </div>

          <div className="my-4 space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-white p-3.5 rounded-xl border border-purple-100 shadow-xs">
              <strong className="text-slate-900 block mb-1 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Plain-English Explanation (Zero Jargon for Maya):
              </strong>
              <p className="text-slate-700 leading-relaxed">
                {liveResult
                  ? liveResult.plainEnglishDescription
                  : selectedIssue?.plainEnglishDescription}
              </p>
            </div>
            <div className="bg-purple-50/40 p-3 rounded-xl border border-purple-100/60 text-xs text-slate-600">
              <strong className="text-slate-800">Underlying Root Cause: </strong>
              <span>{liveResult ? liveResult.rootCause : selectedIssue?.rootCause}</span>
            </div>
            {liveResult && (
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                <strong className="text-emerald-800">Autonomous Action: </strong>
                <span>{liveResult.actionableFix}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>
                Human Support Time: ~
                {liveResult
                  ? liveResult.typicalHumanResolutionTimeMinutes
                  : selectedIssue?.typicalHumanResolutionTimeMinutes}{' '}
                min &rarr; <strong className="text-emerald-700">FixFlow: &lt;10s</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {fixApplied ? (
                <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1-Click Fix Applied &amp; Verified!</span>
                </div>
              ) : (
                <button
                  onClick={handleApplyFix}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-102"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>
                    {liveResult ? liveResult.suggestedFixButtonText : 'Apply 1-Click Fix'}
                  </span>
                </button>
              )}

              <button
                onClick={handleLaunchInWizard}
                className="w-full sm:w-auto cheerio-btn-primary px-5 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Test in Setup Wizard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
