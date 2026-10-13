import React from 'react'
import { 
  Users, 
  Send, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Activity,
  Layers,
  ArrowRight,
  Store,
  FileText,
  LifeBuoy
} from 'lucide-react'
import { BusinessProfile, SupportIssue, CampaignRecord, EscalationDossier } from '../../types'
import { TOP_5_SUPPORT_ISSUES } from '../../data/mockData'

interface InAppPortalProps {
  profile: BusinessProfile
  isErrorActive: boolean
  activeIssue: SupportIssue
  campaigns: CampaignRecord[]
  activeTicket: EscalationDossier | null
  isDbConnected: boolean
  onStartSetup: () => void
  onResumeDraft: (campaign: CampaignRecord) => void
  onSelectIssue: (issue: SupportIssue) => void
  onApplyVerifiedFix: () => void
  onOpenPmDrawer: () => void
  onOpenTicketDossier: () => void
}

export const InAppPortal: React.FC<InAppPortalProps> = ({
  profile,
  isErrorActive,
  activeIssue,
  campaigns,
  activeTicket,
  isDbConnected,
  onStartSetup,
  onResumeDraft,
  onSelectIssue,
  onApplyVerifiedFix,
  onOpenPmDrawer,
  onOpenTicketDossier,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Top Welcome & Store Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6366f1] to-[#7c3aed] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Aura Skincare • Cheerio In-App Portal
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Shopify Live Sync
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7c3aed] border border-purple-200 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`}></span>
                {isDbConnected ? 'Neon PostgreSQL (GORM): Connected' : 'Local Database Cache'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Admin: <strong>Maya Sharma (Founder)</strong> • Account: <strong>Growth Tier ($79/mo)</strong> • WhatsApp: <strong>+91 98201 44521</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenPmDrawer}
            className="px-4 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-[#7c3aed] border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Assignment A Rubric & Model</span>
          </button>

          <button
            onClick={onStartSetup}
            className="cheerio-btn-primary px-5 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>+ New Automation Flow</span>
          </button>
        </div>
      </div>

      {/* Zero-Repetition Open Support Ticket Banner (If Escalated) */}
      {activeTicket && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/50 rounded-3xl p-5 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 uppercase tracking-wider font-mono border border-indigo-400/30">
                  Priority Escalation #{activeTicket.ticketId}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">• SLA: &lt; 4 min response</span>
                <span className="text-[10px] text-slate-400 font-mono">Assigned to: {activeTicket.assignedAgent}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">
                {activeTicket.errorSummary}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-3xl leading-relaxed">
                FixFlow transferred your exact goal, step reached, Shopify payload, and Meta API trace. You will not have to describe or repeat your problem.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTicketDossier}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5 self-start md:self-center"
          >
            <span>View Specialist Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">WhatsApp Audience</span>
            <div className="p-2 rounded-xl bg-purple-50 text-[#7c3aed] group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {profile.totalContacts.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Shopify customer profiles synced</p>
        </div>

        {/* Metric 2 */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Meta Delivery Rate</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">98.2%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />
              High Tier ⭐
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Meta WABA Tier: 25k msgs/day</p>
        </div>

        {/* Metric 3 */}
        <div className="cheerio-card card-glow-hover rounded-3xl p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Automations</span>
            <div className="p-2 rounded-xl bg-pink-50 text-pink-600 group-hover:scale-110 transition-transform">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {profile.activeAutomations}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {profile.activeAutomations > 1 ? 'Growing 🚀' : 'Baseline'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Autonomous WhatsApp workflows</p>
        </div>

        {/* Metric 4: FixFlow Guardian */}
        <div className={`card-glow-hover rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group ${
          isErrorActive 
            ? 'bg-amber-50/80 border-amber-300 shadow-md shadow-amber-500/10' 
            : 'cheerio-card'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">FixFlow Guardian</span>
            <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform ${isErrorActive ? 'bg-amber-200 text-amber-800' : 'bg-emerald-50 text-emerald-600'}`}>
              {isErrorActive ? <AlertTriangle className="w-4 h-4 animate-bounce" /> : <Bot className="w-4 h-4" />}
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isErrorActive ? '1 Error Caught' : '100% Protected'}
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 mt-1 flex items-center gap-1.5">
            {isErrorActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                <span>Pre-launch Meta error intercepted</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon shrink-0" />
                <span>0 human tickets needed</span>
              </>
            )}
          </p>
        </div>

      </div>

      {/* Proactive Guardian Opportunity Banner */}
      <div className={`rounded-3xl p-6 border transition-all ${
        isErrorActive
          ? 'bg-amber-50/90 border-amber-300 shadow-md'
          : 'bg-white border-purple-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              isErrorActive ? 'bg-amber-200 text-amber-800' : 'bg-purple-100 text-[#7c3aed]'
            }`}>
              {isErrorActive ? <AlertTriangle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isErrorActive ? 'bg-amber-200 text-amber-800' : 'bg-purple-100 text-[#7c3aed]'
                }`}>
                  {isErrorActive ? 'Stuck Detector Active (Pre-Publish Interception)' : 'Proactive Feature Recommendation'}
                </span>
                <span className="text-xs text-slate-400">Assignment A Core Innovation</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {isErrorActive ? activeIssue.title : 'Automated 30-Day Skincare Refill Flow Ready for Aura Skincare'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {isErrorActive 
                  ? activeIssue.plainEnglishDescription
                  : 'Skincare serums empty within 30-45 days. Auto-triggering a WhatsApp reminder with a 1-click reorder discount captures +18% repeat orders with zero manual work.'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isErrorActive ? (
              <button
                onClick={onApplyVerifiedFix}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Apply 1-Click Fix</span>
              </button>
            ) : null}

            <button
              onClick={onStartSetup}
              className="cheerio-btn-primary px-5 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <span>{isErrorActive ? 'Inspect in Wizard' : 'Start Guided Setup'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Maya's Active Campaigns & Automations List (Rule 4: One Source of Truth) */}
      <div className="cheerio-card rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900">
                Maya's WhatsApp Campaigns & Automations
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7c3aed]">
                {campaigns.length} Configured
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live and drafted customer communication workflows for Aura Skincare.
            </p>
          </div>
          <button
            onClick={onStartSetup}
            className="cheerio-btn-primary px-4 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>+ Create New Automation</span>
          </button>
        </div>

        <div className="space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  camp.status === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-600'
                    : camp.status === 'DRAFT_ROADBLOCK'
                    ? 'bg-amber-100 text-amber-700'
                    : camp.status === 'DRAFT_READY'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {camp.type === 'AUTOMATION' ? <Zap className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{camp.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      camp.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : camp.status === 'DRAFT_ROADBLOCK'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                        : camp.status === 'DRAFT_READY'
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {camp.status === 'ACTIVE' && '● Active Flow'}
                      {camp.status === 'DRAFT_ROADBLOCK' && '⚠️ Roadblock Intercepted'}
                      {camp.status === 'DRAFT_READY' && '● Pre-Checked (Ready)'}
                      {camp.status === 'COMPLETED' && '✓ Broadcast Sent'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
                    <span>• Trigger: <strong>{camp.trigger}</strong></span>
                    <span>• Audience: <strong>{camp.targetAudienceCount.toLocaleString()} customers</strong></span>
                    <span>• Updated: <strong>{camp.lastUpdated}</strong></span>
                  </div>
                  {camp.activeRoadblock && camp.status === 'DRAFT_ROADBLOCK' && (
                    <p className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{camp.activeRoadblock}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                {camp.status === 'DRAFT_ROADBLOCK' && (
                  <button
                    onClick={onApplyVerifiedFix}
                    className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 fill-white" />
                    <span>1-Click Fix</span>
                  </button>
                )}
                <button
                  onClick={() => onResumeDraft(camp)}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-purple-600 hover:text-white border border-slate-300 hover:border-purple-600 text-slate-700 font-bold text-xs transition-all flex items-center gap-1"
                >
                  <span>{camp.status === 'ACTIVE' ? 'Edit Flow' : 'Resume Setup & Preview'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Support Roadblocks Solved by FixFlow Table */}
      <div className="cheerio-card rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900">
                Top 5 Support Roadblocks Intercepted by FixFlow
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7c3aed]">
                Assignment A Q1
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Accounting for 85% of setup tickets across Cheerio's 5,000 businesses.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            SSRR Target: 60% Self-Service
          </span>
        </div>

        <div className="space-y-3">
          {TOP_5_SUPPORT_ISSUES.map((issue, idx) => (
            <div
              key={issue.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-purple-100 text-[#7c3aed] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{issue.title}</span>
                    <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                      {issue.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{issue.plainEnglishDescription}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
                    <span className="text-amber-600 font-semibold">• Volume: {issue.cheerioOccurrenceRate}</span>
                    <span>• Human Time: ~{issue.typicalHumanResolutionTimeMinutes} min</span>
                    <span className="text-emerald-600 font-semibold">• FixFlow: {issue.fixFlowAutomatedResolutionRate}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectIssue(issue)}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-purple-600 hover:text-white border border-slate-300 hover:border-purple-600 text-slate-700 font-bold text-xs transition-all shrink-0 self-start lg:self-center"
              >
                Simulate & Fix
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
