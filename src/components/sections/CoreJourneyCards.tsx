import React from 'react'
import { Users, Bot, TrendingUp, ArrowRight, ShieldCheck, Zap, DollarSign } from 'lucide-react'

interface CoreJourneyCardsProps {
  onOpenWizard: () => void
  onOpenPmDock: () => void
}

export const CoreJourneyCards: React.FC<CoreJourneyCardsProps> = ({
  onOpenWizard,
  onOpenPmDock
}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10">
      
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200">
          Executive Summary
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          How Cheerio FixFlow Solves Support Scaling in 3 Steps
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Clear, practical product logic connecting customer pain points to high-margin automation.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1: Persona & Pain Point */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-6 border-slate-200/90 flex flex-col justify-between hover:border-pink-300 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 font-extrabold text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                1
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                The User & Problem
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
              Maya Sharma (Aura Skincare)
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Non-technical D2C founder with <strong>14,250 WhatsApp contacts</strong> on Shopify. Struggles with Meta WhatsApp policies and raises support tickets for issues she could easily resolve herself with proactive guidance.
            </p>

            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5 shadow-inner">
              <div className="flex justify-between"><span>Meta Delivery Rate:</span> <strong>98.2%</strong></div>
              <div className="flex justify-between"><span>Repeat Order Rate:</span> <strong className="text-amber-600">2.1% (Untapped)</strong></div>
              <div className="flex justify-between"><span>Support Tickets Filed:</span> <strong>4.5 / month</strong></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400 font-semibold flex items-center justify-between">
            <span>Target: Eliminate 60% of setup tickets</span>
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          </div>
        </div>

        {/* Step 2: The Autonomous Solution */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-6 border-purple-300/90 bg-gradient-to-b from-white via-purple-50/30 to-purple-50/60 flex flex-col justify-between shadow-lg shadow-purple-500/5 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative">
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-600 text-white shadow-xs animate-pulse">
              Core Tech
            </span>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-[#7c3aed] font-extrabold text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                2
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c3aed]">
                The FixFlow Agent
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
              Inline Error Interception + 1-Click Fix
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              FixFlow guides Maya through a 4-step wizard, catches <strong>Meta Error 132001</strong> (missing opt-out copy) before launch, and auto-resolves it in 1 click without waiting 18 mins for human support.
            </p>

            <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-200/90 text-[11px] text-slate-700 space-y-1.5 shadow-inner">
              <div className="flex justify-between"><span>Pre-Submission Meta Linting:</span> <strong className="text-emerald-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />Active</strong></div>
              <div className="flex justify-between"><span>Verified 1-Click Solutions:</span> <strong className="text-emerald-700">92% Success</strong></div>
              <div className="flex justify-between"><span>Zero-Repetition Handoff:</span> <strong className="text-[#7c3aed]">Context Attached</strong></div>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-100 mt-4">
            <button
              onClick={onOpenWizard}
              className="w-full cheerio-btn-primary py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 group-hover:shadow-lg transition-all"
            >
              <span>Test Interactive Setup Wizard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Step 3: Business & Financial Impact */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-6 border-slate-200/90 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                3
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Numbers & Arbitrage
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              $18,000 / Month Net Savings
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              For Cheerio's 5,000 businesses generating 7,500 queries/mo, FixFlow resolves 4,500 queries self-service. AI running cost is $1.80/mo on Gemini 1.5 Flash, slashing support payroll by 60%.
            </p>

            <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/90 text-[11px] text-slate-700 space-y-1.5 shadow-inner">
              <div className="flex justify-between"><span>Baseline Support Payroll:</span> <strong>$30,000 / mo</strong></div>
              <div className="flex justify-between"><span>Human Cost with FixFlow:</span> <strong>$12,000 / mo</strong></div>
              <div className="flex justify-between"><span>Net Annual Savings:</span> <strong className="text-emerald-700 font-extrabold">$216,000 / year</strong></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={onOpenPmDock}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Inspect Financial Model</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  )
}
