import React from 'react'
import { Users, Send, CheckCircle2, Bot, TrendingUp, AlertTriangle } from 'lucide-react'
import { BusinessProfile } from '../../types'

interface StatCardsProps {
  profile: BusinessProfile
  hasPendingFix: boolean
}

export const StatCards: React.FC<StatCardsProps> = ({ profile, hasPendingFix }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Metric 1: Total Contacts */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium">WhatsApp Audience</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">
            {profile.totalContacts.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +12% this month
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Shopify customer sync active</p>
      </div>

      {/* Metric 2: Message Delivery Rate */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium">Meta Delivery Rate</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">98.2%</span>
          <span className="text-xs font-medium text-emerald-400">High Quality Tier</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Meta WABA Tier: 25k msgs/day</p>
      </div>

      {/* Metric 3: Repeat Order Rate (The Opportunity) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700/80 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium">Repeat Purchase Rate</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Send className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">2.1%</span>
          <span className="text-xs font-medium text-amber-400">Untapped Potential</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Industry avg for skincare is 18-24%</p>
      </div>

      {/* Metric 4: FixFlow Guardian Status */}
      <div className={`rounded-xl p-4.5 border transition-all ${
        hasPendingFix 
          ? 'bg-amber-950/30 border-amber-500/40' 
          : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">FixFlow Guardian</span>
          <div className={`p-1.5 rounded-lg ${hasPendingFix ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            {hasPendingFix ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white tracking-tight">
            {hasPendingFix ? '1 Roadblock Caught' : '100% Protected'}
          </span>
        </div>
        <p className="text-[11px] mt-1 font-medium text-slate-400">
          {hasPendingFix ? 'Pre-publish error intercepted' : '0 open support tickets needed'}
        </p>
      </div>

    </div>
  )
}
