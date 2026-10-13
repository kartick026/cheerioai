import React, { useState } from 'react'
import { Clock, Sliders, GitBranch, Terminal, CheckCircle2, ArrowRight, Smartphone, MessageSquare, Zap, CreditCard, RefreshCw } from 'lucide-react'
import { PhoneMockup } from '../preview/PhoneMockup'

interface WorkflowSectionProps {
  onOpenWizard: () => void
  isErrorActive: boolean
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  onOpenWizard,
  isErrorActive
}) => {
  const [activeTab, setActiveTab] = useState<'FLOWCHART' | 'PHONE'>('FLOWCHART')

  return (
    <section id="workflow-section" className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Badge Pill (Matching Image 3) */}
      <div className="mb-3">
        <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-purple-100 text-[#7c3aed] border border-purple-200">
          Automation
        </span>
      </div>

      {/* Main Headline (Matching Image 3) */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-10 max-w-2xl">
        Workflows that adapt to how your business runs
      </h2>

      {/* Grid: 4 Feature points on left, Flowchart/Phone on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: 4 Features with colorful icons (Matching Image 3) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Plug-and-play no-code workflows for enterprises that do not require internal IT bandwidth.
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center shrink-0 mt-0.5">
              <Sliders className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              User-friendly workflow editing with ready libraries to help teams get started quickly.
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <GitBranch className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Create workflows using simple prompts instead of complex drag-and-drop builders.
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <Terminal className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Use NLP, static, fuzzy, or generic keyword triggers with reliable AI-based exception handling.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenWizard}
              className="cheerio-btn-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-2"
            >
              <span>Build Automated Replenishment Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Side: Interactive Flowchart Canvas (Matching Image 3) */}
        <div className="lg:col-span-6">
          <div className="cheerio-card rounded-3xl p-6 shadow-xl relative bg-gradient-to-br from-white via-purple-50/20 to-white overflow-hidden">
            
            {/* View Switcher: Interactive Flowchart vs Phone */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-slate-700">Workflow Execution Canvas:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
                <button
                  onClick={() => setActiveTab('FLOWCHART')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    activeTab === 'FLOWCHART' ? 'bg-white shadow text-[#7c3aed]' : 'text-slate-600'
                  }`}
                >
                  Agent Flowchart
                </button>
                <button
                  onClick={() => setActiveTab('PHONE')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    activeTab === 'PHONE' ? 'bg-white shadow text-[#7c3aed]' : 'text-slate-600'
                  }`}
                >
                  WhatsApp Phone
                </button>
              </div>
            </div>

            {activeTab === 'FLOWCHART' ? (
              /* Exact flowchart from Image 3 with animated pulses */
              <div className="space-y-3.5 py-2">
                
                {/* Node 1: New Lead Response */}
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl border border-purple-100/90 shadow-sm flex items-center gap-2.5 max-w-xs card-glow-hover hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">New lead response</div>
                      <div className="text-[10px] text-slate-400">WhatsApp • Instagram • Messenger</div>
                    </div>
                  </div>
                </div>

                {/* Animated Data Stream Connector 1 */}
                <div className="relative w-0.5 h-4 bg-purple-200 ml-7 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600 to-transparent animate-data-stream" />
                </div>

                {/* Node 2: AI-Checks if qualified */}
                <div className="flex items-center gap-3">
                  <div className="p-3.5 bg-white rounded-2xl border border-purple-200/90 shadow-sm flex items-center justify-between gap-4 max-w-sm card-glow-hover hover:border-purple-400 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#7c3aed] flex items-center justify-center shadow-xs">
                        <GitBranch className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">AI-Checks if qualified?</div>
                        <div className="text-[10px] text-slate-400">branch-2 • FixFlow Linter</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-beacon" />
                      Yes
                    </span>
                  </div>
                </div>

                {/* Animated Data Stream Connector 2 */}
                <div className="relative w-0.5 h-4 bg-purple-200 ml-7 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600 to-transparent animate-data-stream" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Node 3 & 4: Write Email/WhatsApp & Update CRM */}
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <div className="p-3 bg-white rounded-2xl border border-purple-100/90 shadow-sm card-glow-hover hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="text-xs font-bold text-slate-800">Write Email/WhatsApp</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">AI-agent (Gemini 3.8 Flash)</div>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-purple-100/90 shadow-sm card-glow-hover hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="text-xs font-bold text-slate-800">Update CRM</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">send webhook • Shopify Sync</div>
                  </div>
                </div>

                {/* Animated Data Stream Connector 3 */}
                <div className="relative w-0.5 h-4 bg-purple-200 ml-7 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600 to-transparent animate-data-stream" style={{ animationDelay: '0.8s' }} />
                </div>

                {/* Node 5: Collect Payment */}
                <div className="p-3 bg-white rounded-2xl border border-purple-100/90 shadow-sm flex items-center gap-2.5 max-w-xs card-glow-hover hover:border-purple-300 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Collect Payment</div>
                    <div className="text-[10px] text-slate-400">Send 1-click refill payment link</div>
                  </div>
                </div>

              </div>
            ) : (
              /* Live Phone View */
              <div className="flex justify-center py-2">
                <PhoneMockup
                  customerName="Ananya"
                  productName="Skin Barrier Serum"
                  delayDays={30}
                  discountCode="REFILL20"
                  bodyText="Hey {{first_name}}! 🌿 Maya from Aura Skincare here.\n\nIt has been {{delay_days}} days since you ordered your {{product_name}}.\n\nUse code {{discount_code}} for 20% off your refill:"
                  includeOptOut={!isErrorActive}
                  hasError={isErrorActive}
                  errorMessage={isErrorActive ? 'Meta Error 132001: Missing opt-out tag' : undefined}
                />
              </div>
            )}

          </div>
        </div>

      </div>

    </section>
  )
}
