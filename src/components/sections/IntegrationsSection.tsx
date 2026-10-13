import React from 'react'
import { CheckCircle2, Store, MessageSquare, Database, Sparkles } from 'lucide-react'
import { CheerioLogo } from '../brand/CheerioLogo'

export const IntegrationsSection: React.FC = () => {
  return (
    <section id="integrations" className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left: Visual Integration Ecosystem (Matching Image 4) */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-12">
          
          {/* Ambient Morphing Glow */}
          <div className="absolute w-80 h-80 bg-gradient-to-tr from-purple-300/30 via-indigo-200/20 to-pink-200/30 rounded-full blur-3xl pointer-events-none animate-morph-blob"></div>

          {/* Rotating Subtle Concentric Rings */}
          <div className="absolute w-64 h-64 rounded-full border border-purple-200/60 border-dashed animate-spin pointer-events-none" style={{ animationDuration: '40s' }} />
          <div className="absolute w-80 h-80 rounded-full border border-indigo-100/50 pointer-events-none" />

          {/* Central Cheerio Megaphone Circle */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-white shadow-2xl border-4 border-purple-100 flex items-center justify-center pulse-glow hover:scale-110 transition-transform cursor-pointer">
            <CheerioLogo iconOnly className="h-10 animate-pulse" />
          </div>

          {/* Orbiting Integration Badges Grid with Staggered Floats */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            {/* Top: Shopify */}
            <div className="absolute top-2 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-beacon"></span>
              <span>Shopify Plus</span>
            </div>

            {/* Top Right: WhatsApp */}
            <div className="absolute top-8 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float-delayed pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>WhatsApp Cloud API</span>
            </div>

            {/* Bottom Right: Meta Business */}
            <div className="absolute bottom-10 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Meta WABA</span>
            </div>

            {/* Bottom Left: HubSpot */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float-slow pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>HubSpot CRM</span>
            </div>

            {/* Top Left: WooCommerce */}
            <div className="absolute top-10 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float-delayed pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span>WooCommerce</span>
            </div>

            {/* Left: Google Sheets */}
            <div className="absolute left-0 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Google Sheets</span>
            </div>

            {/* Right: Salesforce */}
            <div className="absolute right-0 bg-white/95 backdrop-blur-sm rounded-2xl px-3.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800 animate-float-slow pointer-events-auto hover:scale-105 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span>Salesforce</span>
            </div>

          </div>

        </div>

        {/* Right: Text & Checklist (Matching Image 4) */}
        <div className="lg:col-span-6 space-y-5">
          
          <div>
            <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200">
              Integration
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            8000+ integrations that fit into your stack
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Cheerio integrates with over 8,000 platforms. CRMs, support systems, data warehouses, and communication tools. Your workflows execute where your business operates.
          </p>

          {/* Checklist with Purple Circles (Matching Image 4) */}
          <div className="space-y-3 pt-2">
            {[
              'Works with existing infrastructure',
              'Fast to adopt across teams and functions',
              'Scales without custom development',
              'Built for enterprise security and compliance'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  )
}
