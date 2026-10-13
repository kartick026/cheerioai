import React from 'react'
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, CheckCircle2, PlayCircle, FileText, Check, AlertTriangle } from 'lucide-react'

interface CheerioHeroProps {
  onStartSetup: () => void
  onOpenPmDrawer: () => void
}

export const CheerioHero: React.FC<CheerioHeroProps> = ({
  onStartSetup,
  onOpenPmDrawer
}) => {
  return (
    <section id="hero" className="py-10 sm:py-16 text-center max-w-5xl mx-auto px-4 relative overflow-visible">
      
      {/* Ambient Moving Gradient Aura Blobs in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-gradient-to-tr from-purple-300/30 via-indigo-200/25 to-pink-200/20 blur-3xl pointer-events-none -z-10 animate-morph-blob" />
      <div className="absolute top-1/3 left-10 w-44 h-44 bg-purple-400/15 rounded-full blur-2xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-emerald-300/15 rounded-full blur-2xl pointer-events-none -z-10 animate-float-delayed" />

      {/* Floating Micro-Card (Left): Autonomous Interception */}
      <div className="hidden xl:flex absolute top-12 -left-12 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200/90 shadow-xl text-left animate-float">
        <div className="w-7 h-7 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm shrink-0">
          <Zap className="w-3.5 h-3.5 fill-purple-600" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />
            FixFlow Interceptor
          </div>
          <div className="text-xs font-bold text-slate-800">Pre-Submission Lint: Active</div>
        </div>
      </div>

      {/* Floating Micro-Card (Right): 1-Click Resolution */}
      <div className="hidden xl:flex absolute bottom-20 -right-12 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-200/90 shadow-xl text-left animate-float-delayed">
        <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-beacon-purple" />
            Meta Policy 4.2
          </div>
          <div className="text-xs font-bold text-slate-800">1-Click Opt-Out Injected</div>
        </div>
      </div>

      {/* Product Identifier Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100/90 via-indigo-50/90 to-purple-100/90 border border-purple-200 text-[#7c3aed] text-xs font-extrabold mb-5 shadow-sm hover:scale-105 transition-transform cursor-pointer">
        <Sparkles className="w-3.5 h-3.5 text-[#7c3aed] animate-spin" style={{ animationDuration: '6s' }} />
        <span>Introducing Cheerio FixFlow • Assignment A Solution</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
      </div>

      {/* Main Punchy Value Headline with Shimmer Gradient */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15] max-w-3xl mx-auto">
        From Confusion to Resolution —{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 animate-shimmer-text">
          Without Support Tickets
        </span>
      </h1>

      {/* Clear Plain-English Subtitle */}
      <p className="mt-5 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
        Cheerio's 5,000+ businesses are run by non-technical founders and marketers. When they get stuck on WhatsApp API setup, template rejections, or chatbot triggers, <strong className="text-slate-800 font-bold">FixFlow proactively intercepts errors, provides 1-click verified fixes</strong>, and escalates to human agents with full context pre-attached.
      </p>

      {/* Triple Clear CTA Buttons with Micro-Interactions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onStartSetup}
          className="group w-full sm:w-auto cheerio-btn-primary px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all relative overflow-hidden"
        >
          <PlayCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Launch Interactive Setup Demo</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <a
          href="#product-walkthrough-video"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon" />
          <span>Watch Product Video (2:45)</span>
        </a>

        <button
          onClick={onOpenPmDrawer}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <FileText className="w-4 h-4 text-[#7c3aed]" />
          <span>PM Rubric & Model</span>
        </button>
      </div>

      {/* Quick 3-Metric Summary Pills with Live Status Beacons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
        <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 shadow-xs hover:scale-105 transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-beacon" />
          North Star: 60% Self-Service Resolution Rate
        </span>
        <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/90 text-purple-800 border border-purple-200/80 shadow-xs hover:scale-105 transition-all">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7c3aed]" />
          Official Meta BSP Compliant
        </span>
        <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 text-amber-800 border border-amber-200/80 shadow-xs hover:scale-105 transition-all">
          <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
          $18,000 / Month Support Payroll Saved
        </span>
      </div>

    </section>
  )
}
