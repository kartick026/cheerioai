import React from 'react'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { CheerioLogo } from '../brand/CheerioLogo'

interface ComparisonSectionProps {
  onOpenWizard: () => void
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenWizard }) => {
  return (
    <section id="comparison" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header matching Image 5 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
          Traditional Support vs Cheerio FixFlow
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
          Discover how Cheerio FixFlow differs from traditional support and manual setup through proactive error interception and verified 1-click solutions.
        </p>
      </div>

      {/* Comparison Split Cards matching Image 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        
        {/* Left Box: Traditional Growth Automation & Support Tools */}
        <div className="bg-[#edece9] rounded-3xl p-6 sm:p-8 space-y-4 text-slate-700 border border-slate-300/80">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-300 pb-3">
            Traditional Support & Setup Tools
          </h3>
          
          <ul className="space-y-3.5 text-xs sm:text-sm">
            {[
              'Rule-heavy setup and maintenance',
              'Channel-specific logic',
              'Manual updates and repetitive support handoffs',
              'Errors discovered only after campaigns fail',
              'High ticket backlog & 18+ min human response times',
              'Heavy dependence on engineering & support hires',
              'Users forced to repeat context on every ticket',
              'Disconnected reporting across tools'
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center V/S Badge (Hidden on mobile, absolute center on desktop) */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center font-extrabold text-xs shadow-2xl ring-4 ring-[#faf7f2] pulse-glow">
            V/S
          </div>
        </div>

        {/* Right Box: Cheerio AI & FixFlow (Matching Image 5) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-purple-400/90 shadow-2xl shadow-purple-900/10 relative card-glow-hover hover:border-purple-600 hover:shadow-purple-500/15 transition-all duration-300">
          
          <div className="border-b border-purple-100 pb-3 flex items-center justify-between">
            <CheerioLogo />
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-[#7c3aed] flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-beacon-purple" />
              FixFlow Guardian
            </span>
          </div>

          <ul className="space-y-3.5 text-xs sm:text-sm">
            {[
              'Prompt-driven workflow & setup creation',
              'One autonomous workflow engine across channels',
              'Structured execution from business intent',
              'Errors proactively intercepted before publishing',
              'Instant 1-click verified fixes (<10 seconds)',
              'Zero-repetition human handoff with telemetry logs',
              'Fast updates through editable workflows',
              'Saves $18,000/month in human support payroll'
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-800 font-medium">
                <div className="w-5 h-5 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>

        </div>

      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={onOpenWizard}
          className="cheerio-btn-primary px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 mx-auto hover:scale-105 transition-all"
        >
          <span>Try Cheerio FixFlow for Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  )
}
