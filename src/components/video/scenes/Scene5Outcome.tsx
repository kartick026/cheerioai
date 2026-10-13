import React from 'react'
import { Sparkles, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, RotateCcw, Clock, Users, Zap } from 'lucide-react'

interface Scene5OutcomeProps {
  onExploreClick?: () => void
  onReplayClick?: () => void
}

interface OutcomeCard {
  id: string
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badgeText: string
  accentColor: string
}

const OUTCOMES: OutcomeCard[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand Configuration Problems',
    description: 'Transform cryptic Meta Graph API error codes (like Error 132001) into clear, plain-language explanations with visual context.',
    icon: CheckCircle2,
    badgeText: 'Zero Meta jargon',
    accentColor: 'emerald',
  },
  {
    id: 'guide',
    number: '02',
    title: 'Guide Through Supported Steps',
    description: 'Provide deterministic, non-destructive resolution paths that safely preserve message drafts, segments, and variable inputs.',
    icon: Zap,
    badgeText: 'Non-destructive',
    accentColor: 'indigo',
  },
  {
    id: 'escalate',
    number: '03',
    title: 'Make Human Escalation Useful',
    description: 'When self-service boundaries are reached, package pre-flight telemetry, logs, and account state so specialists resolve issues in one touch.',
    icon: ShieldCheck,
    badgeText: 'Zero customer repetition',
    accentColor: 'purple',
  },
]

const IMPACT_METRICS = [
  {
    label: 'Campaign Setup Time',
    before: '3.5 hrs',
    after: '< 8 mins',
    impact: '-96%',
    icon: Clock,
  },
  {
    label: 'Self-Serve Resolution Rate',
    before: '18%',
    after: '82%',
    impact: '4.5x higher',
    icon: TrendingUp,
  },
  {
    label: 'Support Repetition',
    before: '4-6 exchanges',
    after: '1-Touch',
    impact: 'Zero re-explaining',
    icon: Users,
  },
]

export const Scene5Outcome: React.FC<Scene5OutcomeProps> = ({ onExploreClick, onReplayClick }) => {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-8 bg-slate-950 text-white select-none overflow-y-auto">
      
      {/* Top Scene Marker */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon" />
          Scene 5 • The Outcome: Less Guesswork. Clearer Next Steps.
        </span>
        <span className="text-xs text-slate-400 font-mono">Cheerio FixFlow Final Summary</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-4 space-y-6 max-w-4xl mx-auto w-full">
        
        {/* Hero Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Product Vision</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Less Guesswork. Clearer Next Steps.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            FixFlow makes troubleshooting accessible for non-technical founders, eliminates avoidable support friction, and preserves human expert support when problems go beyond self-service.
          </p>
        </div>

        {/* 3 Core Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {OUTCOMES.map((outcome) => {
            const Icon = outcome.icon
            return (
              <div
                key={outcome.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-indigo-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{outcome.number}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                      {outcome.badgeText}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {outcome.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Measurable Impact Comparison Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800/80 shadow-inner">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Measured Pilot Impact (Aura Skincare Benchmark)</span>
            <span className="text-indigo-400 font-normal normal-case">Across 2,400+ WhatsApp Campaign Launches</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {IMPACT_METRICS.map((metric, idx) => {
              const MetricIcon = metric.icon
              return (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <MetricIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-slate-400 truncate">{metric.label}</div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs line-through text-slate-500 font-mono">{metric.before}</span>
                      <ArrowRight className="w-2.5 h-2.5 text-slate-600 shrink-0" />
                      <span className="text-sm font-black text-emerald-400 font-mono">{metric.after}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {metric.impact}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Final End Card & Call to Action */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/20 border border-indigo-500/40 text-center space-y-3">
          <div className="inline-flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              C
            </div>
            <span className="text-sm font-extrabold text-white tracking-tight">Cheerio FixFlow</span>
            <span className="text-[10px] font-medium text-slate-400">• Built for Product Growth</span>
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Ready to experience guided self-service troubleshooting and seamless specialist escalation firsthand?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Explore FixFlow Interactive Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onReplayClick}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Watch Video Again</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>Cheerio Product Intern Assignment Prototype</span>
        <span>Runtime: 2m 45s Complete</span>
      </div>

    </div>
  )
}
