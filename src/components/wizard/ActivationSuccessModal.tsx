import React, { useEffect } from 'react'
import { Sparkles, CheckCircle, ArrowRight, Zap, TrendingUp, X } from 'lucide-react'
import confetti from 'canvas-confetti'
import { ACTIVATION_BENCHMARKS } from '../../config/productConfig'

interface ActivationSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ActivationSuccessModal: React.FC<ActivationSuccessModalProps> = ({
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive celebratory confetti with configured benchmarks
      confetti({
        particleCount: ACTIVATION_BENCHMARKS.CONFETTI.particleCount,
        spread: ACTIVATION_BENCHMARKS.CONFETTI.spread,
        origin: { y: ACTIVATION_BENCHMARKS.CONFETTI.originY }
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 mb-4 ring-4 ring-emerald-500/20">
          <CheckCircle className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Workflow Published Successfully
        </span>

        <h2 className="text-xl font-bold text-white mt-3">
          Your Replenishment Flow is Live!
        </h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm mx-auto">
          Cheerio is now listening to Aura Skincare's Shopify orders. In 30 days, customers will automatically receive their personalized refill reminder on WhatsApp.
        </p>

        {/* Impact projection summary */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 my-5 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Projected Repeat Orders
            </span>
            <span className="text-emerald-400 font-bold">{ACTIVATION_BENCHMARKS.PROJECTED_REPEAT_ORDER_LIFT} lift</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Human Support Tickets
            </span>
            <span className="text-white font-semibold">0 Tickets Filed</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Meta Compliance
            </span>
            <span className="text-emerald-400 font-semibold">100% Verified</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
        >
          <span>Return to Cheerio Dashboard</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </div>
  )
}
