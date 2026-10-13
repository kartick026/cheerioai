import React, { useState, useEffect } from 'react'
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Zap, 
  LifeBuoy, 
  Send, 
  CheckCircle2, 
  Tag, 
  Clock, 
  Store, 
  Layers, 
  HelpCircle, 
  FileCode, 
  Loader2, 
  Wand2, 
  AlertTriangle, 
  AlertCircle 
} from 'lucide-react'
import { PhoneMockup } from '../preview/PhoneMockup'
import { generateWhatsAppCopy } from '../../services/geminiService'
import { validateTemplateContent, applyOptOutFix } from '../../utils/templateValidation'
import { playSuccessChime } from '../../utils/audioFeedback'
import { DEFAULT_CAMPAIGN_CONFIG, UI_TIMINGS } from '../../config/productConfig'

export interface ActivatedCampaignPayload {
  name: string
  templateBody: string
  delayDays: number
  productName: string
  discountCode: string
}

interface CampaignWizardModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccessActivate: (data: ActivatedCampaignPayload) => void
  onOpenHandoff: () => void
  isErrorActive: boolean
  onApplyVerifiedFix: () => void
  initialStep?: number
  initialDraft?: Partial<ActivatedCampaignPayload>
}

export const CampaignWizardModal: React.FC<CampaignWizardModalProps> = ({
  isOpen,
  onClose,
  onSuccessActivate,
  onOpenHandoff,
  isErrorActive,
  onApplyVerifiedFix,
  initialStep = 1,
  initialDraft
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep)
  const [delayDays, setDelayDays] = useState<number>(initialDraft?.delayDays ?? DEFAULT_CAMPAIGN_CONFIG.delayDays)
  const [productName, setProductName] = useState<string>(initialDraft?.productName ?? DEFAULT_CAMPAIGN_CONFIG.productName)
  const [customerName, setCustomerName] = useState<string>(DEFAULT_CAMPAIGN_CONFIG.customerName)
  const [discountCode, setDiscountCode] = useState<string>(initialDraft?.discountCode ?? DEFAULT_CAMPAIGN_CONFIG.discountCode)
  const [testSent, setTestSent] = useState<boolean>(false)
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false)
  const [aiGeneratedTag, setAiGeneratedTag] = useState<string | null>(null)
  const [selectedTone, setSelectedTone] = useState<'retention' | 'urgent' | 'vip'>('retention')
  const [fixFeedback, setFixFeedback] = useState<{ applied: boolean; message: string } | null>(null)

  // Default template body (starts realistically without opt-out notice to reflect Maya's initial draft)
  const [bodyText, setBodyText] = useState<string>(initialDraft?.templateBody ?? DEFAULT_CAMPAIGN_CONFIG.defaultTemplateBody)

  // Sync draft and step when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialStep) setCurrentStep(initialStep)
      if (initialDraft?.templateBody) setBodyText(initialDraft.templateBody)
      if (initialDraft?.delayDays !== undefined) setDelayDays(initialDraft.delayDays)
      if (initialDraft?.productName) setProductName(initialDraft.productName)
      if (initialDraft?.discountCode) setDiscountCode(initialDraft.discountCode)
    }
  }, [isOpen, initialStep, initialDraft])

  // Reactive content validation derived directly from bodyText
  const validation = validateTemplateContent(bodyText)

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSendTest = () => {
    setTestSent(true)
    setTimeout(() => setTestSent(false), UI_TIMINGS.TEST_NOTIFICATION_DURATION_MS)
  }

  const handleInsertTag = (tag: string) => {
    setBodyText(prev => prev + ' ' + tag)
    if (fixFeedback) setFixFeedback(null)
  }

  const handleApplyFix = () => {
    const result = applyOptOutFix(bodyText)
    if (result.applied) {
      setBodyText(result.updatedText)
      setFixFeedback({ applied: true, message: result.message })
      playSuccessChime()
      onApplyVerifiedFix()
    } else {
      setFixFeedback({ applied: false, message: result.message })
    }
  }

  const handleGenerateAiCopy = async (tone: 'retention' | 'urgent' | 'vip') => {
    setIsGeneratingAi(true)
    setSelectedTone(tone)
    try {
      const res = await generateWhatsAppCopy(productName, discountCode, tone)
      setBodyText(res.copy)
      setAiGeneratedTag(res.isLiveGemini ? '✨ Powered by Gemini 3.8 Flash' : '⚡ Meta-Compliant Template')
    } catch (err) {
      console.error(err)
    } finally {
      setIsGeneratingAi(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-white">Cheerio FixFlow Setup Wizard</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Step {currentStep} of 4
                </span>
              </div>
              <p className="text-xs text-slate-400">Post-Purchase Automated Replenishment Flow</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Step Progress Bar */}
        <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>1</span>
            <span>Trigger & Delay</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-slate-800"></div>
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>2</span>
            <span>WhatsApp Template</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-slate-800"></div>
          <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>3</span>
            <span>Meta Pre-Check</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-slate-800"></div>
          <div className={`flex items-center gap-2 ${currentStep >= 4 ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>4</span>
            <span>Sandbox Test</span>
          </div>
        </div>

        {/* Main Content Area: Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Form Area (7 Cols) */}
          <div className="lg:col-span-7 p-6 space-y-5 border-r border-slate-800/80">
            
            {/* STEP 1: TRIGGER & TIMING */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">1. E-Commerce Order Trigger & Replenishment Timing</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    FixFlow monitors your Shopify order fulfillments and schedules a timely WhatsApp message right before the customer runs out.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shopify Store Webhook</label>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300 font-mono">auraskincare.myshopify.com</span>
                      </div>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Webhook Connected
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Skincare Product</label>
                    <select
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                    >
                      <option value="Skin Barrier Renewal Serum (50ml)">Skin Barrier Renewal Serum (50ml) — ⭐ Top Seller</option>
                      <option value="Ceramide Glow Moisturizer (100ml)">Ceramide Glow Moisturizer (100ml)</option>
                      <option value="Gentle Rice Cleanser (150ml)">Gentle Rice Cleanser (150ml)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">Auto-Replenish Delay</label>
                      <span className="text-xs font-bold text-indigo-400">{delayDays} Days After Fulfillment</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[30, 45, 60].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setDelayDays(days)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            delayDays === days
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 ring-1 ring-white/20'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {days} Days {days === 30 && '✨'}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      💡 <strong>D2C Skincare Insight:</strong> A 50ml serum bottle lasts approximately 30 days with twice-daily use. Triggering the reminder at Day 30 catches customers right as their bottle empties, lifting repeat orders by up to 24%.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: WHATSAPP TEMPLATE */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">2. Message Personalization & Dynamic Variables</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Meta requires variables to use <code className="text-indigo-300 font-mono">{'{{tag_name}}'}</code> syntax. Click any tag below to insert it!
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Dynamic Variable Chips */}
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Click to insert merge tag:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: '{{first_name}}', name: 'Customer Name' },
                        { label: '{{product_name}}', name: 'Product' },
                        { label: '{{discount_code}}', name: 'Refill Code' },
                        { label: '{{delay_days}}', name: 'Delay Days' }
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => handleInsertTag(chip.label)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors flex items-center gap-1"
                        >
                          <span>+ {chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Preview Customer Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">VIP Refill Discount Code</label>
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* AI Copy Generation Toolbar */}
                  <div className="p-3 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950 border border-purple-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Gemini 3.8 Flash • AI Copy Generator</span>
                      </div>
                      {aiGeneratedTag && (
                        <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800">
                          {aiGeneratedTag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        disabled={isGeneratingAi}
                        onClick={() => handleGenerateAiCopy('retention')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                          selectedTone === 'retention'
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isGeneratingAi && selectedTone === 'retention' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span>🌿 Habit Check-in</span>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingAi}
                        onClick={() => handleGenerateAiCopy('urgent')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                          selectedTone === 'urgent'
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isGeneratingAi && selectedTone === 'urgent' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span>⏳ Refill Alert</span>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={isGeneratingAi}
                        onClick={() => handleGenerateAiCopy('vip')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                          selectedTone === 'vip'
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isGeneratingAi && selectedTone === 'vip' ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <span>💎 VIP Perk</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">WhatsApp Template Body</label>
                      <span className="text-[10px] text-slate-400">Live preview on phone</span>
                    </div>
                    <textarea
                      rows={6}
                      value={bodyText}
                      onChange={(e) => {
                        setBodyText(e.target.value)
                        if (fixFeedback) setFixFeedback(null)
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Dynamic Content Validation Feedback in Step 2 */}
                  <div className="space-y-1.5">
                    {validation.isEmpty ? (
                      <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Template message body is empty. Please enter your campaign copy.</span>
                      </div>
                    ) : !validation.variableSyntax.valid ? (
                      <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block">Malformed Variable Syntax:</span>
                          <span className="text-[11px] text-red-300">
                            Found invalid tags: {validation.variableSyntax.malformedTokens.join(', ')}. Meta requires strict {'{{tag_name}}'} syntax with balanced double braces.
                          </span>
                        </div>
                      </div>
                    ) : !validation.hasOptOut ? (
                      <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>
                            <strong>Pre-Submission Warning:</strong> Missing opt-out copy (e.g. <em>"Reply STOP to unsubscribe"</em>). Meta will reject this in Step 3.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyFix}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span>+ Add Opt-Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Pre-Check Passed: Opt-out notice included and dynamic variables correctly formatted.</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Shopify integration will automatically populate these variables from real order history. Look at the phone screen to see how it renders!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: META VALIDATION & STUCK DETECTION */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">3. Pre-Launch Meta Compliance Verification</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    FixFlow runs autonomous compliance linting against Meta WhatsApp Business Platform policies to prevent template rejections before submission.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Shopify Webhook Payload Verification</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Passed
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Dynamic Parameter Enclosure Syntax</span>
                    {validation.variableSyntax.valid ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Passed
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Failed ({validation.variableSyntax.malformedTokens.join(', ')})
                      </span>
                    )}
                  </div>

                  {/* THE DYNAMIC ROADBLOCK AND STUCK DETECTOR */}
                  {!validation.hasOptOut || isErrorActive ? (
                    <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 space-y-3.5 shadow-xl shadow-red-950/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-red-200">
                              Meta Template Policy Violation (Error 132001)
                            </span>
                            <span className="text-[10px] bg-red-900/80 text-red-200 px-2 py-0.5 rounded-full font-mono font-bold">
                              HIGH SEVERITY
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                            {!validation.hasOptOut
                              ? 'Meta requires all marketing broadcast templates to provide an explicit opt-out mechanism (such as "Reply STOP to unsubscribe") and an approved quick-reply button. Without this, Meta will reject your template and degrade your WABA account quality rating.'
                              : 'External Meta Platform Simulation: Meta Cloud API returned Error 132001 during review. Click Apply Verified Fix to synchronize approval.'}
                          </p>
                        </div>
                      </div>

                      {/* FixFlow 1-Click Action */}
                      <div className="pt-2.5 border-t border-red-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          <span>FixFlow Verified Fix Ready</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyFix}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Apply Verified Fix (1-Click)</span>
                        </button>
                      </div>

                      {/* Fix notification message if clicked */}
                      {fixFeedback && (
                        <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                          fixFeedback.applied
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                            : 'bg-amber-950/60 border border-amber-500/40 text-amber-200'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                          <span>{fixFeedback.message}</span>
                        </div>
                      )}

                      {/* Escalation Option */}
                      <div className="text-[11px] text-slate-400 text-center sm:text-left pt-1">
                        Unsure or prefer human assistance?{' '}
                        <button
                          type="button"
                          onClick={onOpenHandoff}
                          className="text-indigo-400 hover:text-indigo-300 underline font-semibold inline-flex items-center gap-1"
                        >
                          <LifeBuoy className="w-3 h-3" /> Connect to Cheerio Specialist (Zero-Repetition Handoff)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Meta Marketing Opt-Out Compliance</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Passed (Opt-Out Configured)
                      </span>
                    </div>
                  )}
                </div>

                {validation.isValid && !isErrorActive && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium">All 3 pre-publication checks passed! This workflow is guaranteed compliant with Meta's official BSP rules.</span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: SANDBOX TEST */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">4. Sandbox Test & Final Activation</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Send a simulated test message to Maya's registered phone before taking the flow live to your 14,250 WhatsApp contacts.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">Test Recipient Phone</span>
                      <p className="text-[11px] text-slate-400">+91 98201 44521 (Maya Sharma - Store Admin)</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendTest}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{testSent ? 'Message Delivered! ✅' : 'Send Test WhatsApp'}</span>
                    </button>
                  </div>

                  {testSent && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>WhatsApp push notification simulated! Check the drop-down banner on the phone preview.</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                  <span className="font-bold text-white block">Projected 30-Day Impact for Aura Skincare:</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>• Estimated Repeat Orders: <strong className="text-emerald-400">+18% lift</strong></div>
                    <div>• Support Tickets Filed: <strong className="text-emerald-400">0 tickets</strong></div>
                    <div>• Est. Additional Revenue: <strong className="text-white">~$3,800/mo</strong></div>
                    <div>• Manual Effort Saved: <strong className="text-white">4.5 hours/wk</strong></div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Phone Mockup (5 Cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-950/60 flex items-center justify-center border-t lg:border-t-0">
            <PhoneMockup
              customerName={customerName}
              productName={productName}
              delayDays={delayDays}
              discountCode={discountCode}
              bodyText={bodyText}
              includeOptOut={validation.hasOptOut}
              hasError={!validation.isValid || (isErrorActive && currentStep >= 2)}
              errorMessage={
                !validation.hasOptOut
                  ? 'Pre-submission lint: Missing opt-out tag'
                  : !validation.variableSyntax.valid
                  ? 'Pre-submission lint: Malformed variable syntax'
                  : isErrorActive
                  ? 'Meta Error 132001: Missing opt-out tag'
                  : undefined
              }
              showNotificationBanner={testSent}
            />
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={(!validation.isValid || isErrorActive) && currentStep === 3}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
              >
                <span>
                  {(!validation.isValid || isErrorActive) && currentStep === 3
                    ? 'Resolve Compliance to Continue'
                    : 'Next Step'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  playSuccessChime()
                  onSuccessActivate({
                    name: `${productName} Replenishment Flow`,
                    templateBody: bodyText,
                    delayDays,
                    productName,
                    discountCode,
                  })
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Publish & Activate Workflow</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
