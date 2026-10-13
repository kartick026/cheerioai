import React, { useState } from 'react'
import { CheckCheck, ShieldCheck, AlertCircle, Wifi, Battery, Signal, Bell, ExternalLink, ArrowRight } from 'lucide-react'
import { DEFAULT_CAMPAIGN_CONFIG } from '../../config/productConfig'

interface PhoneMockupProps {
  customerName: string
  productName: string
  delayDays: number
  discountCode: string
  bodyText: string
  includeOptOut: boolean
  hasError: boolean
  errorMessage?: string
  showNotificationBanner?: boolean
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  customerName,
  productName,
  delayDays,
  discountCode,
  bodyText,
  includeOptOut,
  hasError,
  errorMessage,
  showNotificationBanner = false
}) => {
  const [clickedReorder, setClickedReorder] = useState<boolean>(false)

  // Replace variable placeholders with values using domain defaults
  const formattedText = bodyText
    .replace(/{{first_name}}/g, customerName || DEFAULT_CAMPAIGN_CONFIG.customerName)
    .replace(/{{product_name}}/g, productName || DEFAULT_CAMPAIGN_CONFIG.productName)
    .replace(/{{discount_code}}/g, discountCode || DEFAULT_CAMPAIGN_CONFIG.discountCode)
    .replace(/{{delay_days}}/g, String(delayDays || DEFAULT_CAMPAIGN_CONFIG.delayDays))

  return (
    <div className="flex flex-col items-center select-none">
      
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-2.5 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span className="font-semibold text-slate-200">Interactive iPhone 16 Pro Sandbox</span>
        <span className="text-slate-500">•</span>
        <span className="text-[11px] text-slate-400">Live WhatsApp Engine</span>
      </div>

      {/* iPhone Outer Chassis with Gentle Floating Motion */}
      <div className="w-[310px] sm:w-[335px] bg-[#0b141a] border-[10px] border-[#1e293b] rounded-[48px] shadow-2xl shadow-indigo-950/80 overflow-hidden relative ring-1 ring-slate-700/60 animate-float-slow hover:shadow-purple-900/50 transition-all duration-500">
        
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
          <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
        </div>

        {/* Incoming Push Notification Banner (When Test Message is Sent) */}
        {showNotificationBanner && (
          <div className="absolute top-9 left-2 right-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl z-50 animate-slide-down">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bell className="w-4 h-4 fill-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-white">WHATSAPP • Aura Skincare</span>
                  <span>Now</span>
                </div>
                <div className="text-[11px] font-semibold text-white truncate mt-0.5">
                  Hey {customerName || 'Ananya'}! 🌿 Time for your skin refill?
                </div>
                <div className="text-[10px] text-slate-300 truncate">
                  Use your exclusive code {discountCode || 'REFILL20'} for 20% off...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="h-10 bg-[#075E54] pt-2 px-6 flex items-center justify-between text-[11px] text-white/90 z-20">
          <span className="font-semibold tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* WhatsApp Chat Header */}
        <div className="bg-[#075E54] px-4 py-2 flex items-center justify-between border-b border-[#054c44] text-white shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs ring-1 ring-white/30 text-white shadow-sm">
              AS
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold leading-none">Aura Skincare</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" />
              </div>
              <span className="text-[10px] text-emerald-100/80 leading-none">Official Business Account</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Chat Background & Canvas */}
        <div className="bg-[#0b141a] p-3.5 min-h-[410px] flex flex-col justify-between relative bg-opacity-95">
          
          {/* Top Date Badge */}
          <div className="text-center my-1">
            <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#182229] text-slate-400 font-medium shadow-sm border border-slate-800/40">
              Today • 30 Days After Purchase
            </span>
          </div>

          {/* Message Bubble Canvas */}
          <div className="my-auto space-y-2">
            
            {/* The WhatsApp Message Bubble */}
            <div className="bg-[#005c4b] text-white rounded-xl rounded-tl-none p-3 shadow-md max-w-[94%] relative border border-emerald-600/20">
              
              {/* Message text with variables rendered */}
              <div className="text-[12px] leading-relaxed whitespace-pre-wrap text-slate-100 font-normal">
                {formattedText}
              </div>

              {/* Opt-out compliance notice */}
              {includeOptOut ? (
                <div className="mt-2.5 pt-2 border-t border-emerald-600/40 text-[10px] text-emerald-200/90 italic flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>Meta Policy 4.2 Verified: Opt-out active</span>
                </div>
              ) : (
                <div className="mt-2.5 pt-2 border-t border-red-500/40 text-[10px] text-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="font-semibold">Missing required opt-out copy</span>
                </div>
              )}

              {/* Timestamp & Double Blue Read Ticks */}
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-emerald-200/70">
                <span>9:41 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
              </div>
            </div>

            {/* Quick Action Button: Reorder in 1-Click */}
            <div className="max-w-[94%]">
              <button
                type="button"
                onClick={() => setClickedReorder(true)}
                className={`w-full border rounded-xl p-2.5 text-center text-xs font-semibold cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5 ${
                  clickedReorder
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-[#1f2c34] hover:bg-[#2a3942] border-[#2a3942] text-sky-400'
                }`}
              >
                <span>{clickedReorder ? '✓ Redirecting to Shopify Refill Cart...' : '📦 Reorder in 1-Click (-20%)'}</span>
                {!clickedReorder && <ExternalLink className="w-3 h-3" />}
              </button>
            </div>

            {/* Quick Action Button: Stop receiving reminders */}
            {includeOptOut && (
              <div className="max-w-[94%]">
                <div className="bg-[#1f2c34]/70 border border-[#2a3942] rounded-xl p-1.5 text-center text-[11px] text-slate-300 font-medium cursor-pointer hover:bg-[#1f2c34]">
                  Stop receiving reminders
                </div>
              </div>
            )}
          </div>

          {/* Validation Linter Status Pill at Bottom of Phone */}
          <div className="mt-2 pt-2 border-t border-slate-800">
            {hasError ? (
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-[11px] flex items-start gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Meta Compliance Violation:</span>
                  <p className="text-[10px] text-red-300 mt-0.5">
                    {errorMessage || 'Marketing template missing mandatory opt-out copy'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">Meta Verified: 100% Policy Compliant</span>
              </div>
            )}
          </div>

        </div>

        {/* Home Indicator */}
        <div className="h-5 bg-slate-950 flex items-center justify-center">
          <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
        </div>

      </div>
    </div>
  )
}
