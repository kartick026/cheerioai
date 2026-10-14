/**
 * Cheerio FixFlow - Backend API Service
 * 
 * Communicates with the live Go GORM REST API running on http://localhost:8080,
 * which is connected to the Neon Serverless PostgreSQL database.
 * 
 * Features:
 * - Real-time synchronization of BusinessProfile, SupportIssues, and Campaigns
 * - Diagnostic log persistence into PostgreSQL audit trail
 * - Secure server-side Gemini AI proxy execution (protects client-side API keys)
 * - Graceful fallback to local mock fixtures if backend is offline
 */

import { BusinessProfile, SupportIssue, CampaignRecord } from '../types'
import { AURA_SKINCARE_PROFILE, TOP_5_SUPPORT_ISSUES, DEFAULT_CAMPAIGNS } from '../data/mockData'

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api'

export interface ApiHealthResponse {
  status: string
  database: string
  version: string
  gorm: string
}

export interface DiagnosticLogPayload {
  userQuery: string
  errorCode: string
  isResolved: boolean
  resolvedBy: string
}

/**
 * Checks health of the Go + Neon PostgreSQL backend
 */
export async function checkBackendHealth(): Promise<{ isOnline: boolean; details?: ApiHealthResponse }> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return { isOnline: false }
    const details = await res.json()
    return { isOnline: true, details }
  } catch {
    return { isOnline: false }
  }
}

/**
 * Fetches the active BusinessProfile from Neon DB via Go GORM
 */
export async function fetchBusinessProfile(): Promise<{ profile: BusinessProfile; isLiveDb: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`, { credentials: 'omit', signal: AbortSignal.timeout(3000) })
    if (!res.ok) {
      return { profile: AURA_SKINCARE_PROFILE, isLiveDb: false }
    }
    const data = await res.json()
    const mappedProfile: BusinessProfile = {
      id: `CHEERIO-D2C-${data.id || '9842'}`,
      brandName: data.brandName || AURA_SKINCARE_PROFILE.brandName,
      ownerName: data.ownerName || AURA_SKINCARE_PROFILE.ownerName,
      industry: data.industry || AURA_SKINCARE_PROFILE.industry,
      eCommercePlatform: data.eCommercePlatform || AURA_SKINCARE_PROFILE.eCommercePlatform,
      whatsappNumber: data.whatsappNumber || AURA_SKINCARE_PROFILE.whatsappNumber,
      wabaStatus: (data.wabaStatus as any) || AURA_SKINCARE_PROFILE.wabaStatus,
      totalContacts: data.totalContacts || AURA_SKINCARE_PROFILE.totalContacts,
      monthlyActiveChats: data.monthlyActiveChats || AURA_SKINCARE_PROFILE.monthlyActiveChats,
      accountTier: 'Growth Plan ($79/mo)',
      activeAutomations: data.activeAutomations || AURA_SKINCARE_PROFILE.activeAutomations,
      openSupportTickets: data.openSupportTickets || 0,
    }
    return { profile: mappedProfile, isLiveDb: true }
  } catch {
    return { profile: AURA_SKINCARE_PROFILE, isLiveDb: false }
  }
}

/**
 * Fetches the Top 5 Support Roadblocks from Neon DB via Go GORM
 */
export async function fetchSupportIssues(): Promise<{ issues: SupportIssue[]; isLiveDb: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/issues`, { credentials: 'omit', signal: AbortSignal.timeout(3000) })
    if (!res.ok) {
      return { issues: TOP_5_SUPPORT_ISSUES, isLiveDb: false }
    }
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) {
      return { issues: TOP_5_SUPPORT_ISSUES, isLiveDb: false }
    }
    const mappedIssues: SupportIssue[] = data.map((item: any, idx: number) => ({
      id: `issue-${item.id || idx + 1}`,
      code: item.code || TOP_5_SUPPORT_ISSUES[idx]?.code || 'META_UNKNOWN',
      category: (item.category as any) || 'TEMPLATE_REJECTION',
      title: item.title || TOP_5_SUPPORT_ISSUES[idx]?.title || 'Support Roadblock',
      plainEnglishDescription: item.plainEnglishDescription || TOP_5_SUPPORT_ISSUES[idx]?.plainEnglishDescription || '',
      rootCause: item.rootCause || TOP_5_SUPPORT_ISSUES[idx]?.rootCause || '',
      cheerioOccurrenceRate: item.cheerioOccurrenceRate || TOP_5_SUPPORT_ISSUES[idx]?.cheerioOccurrenceRate || '20%',
      typicalHumanResolutionTimeMinutes: item.typicalHumanResolutionTimeMinutes || 25,
      fixFlowAutomatedResolutionRate: item.fixFlowAutomatedResolutionRate || '90%',
      verifiedFixTitle: item.verifiedFixTitle || TOP_5_SUPPORT_ISSUES[idx]?.verifiedFixTitle || 'Apply Verified Fix',
      verifiedFixAction: item.verifiedFixAction || TOP_5_SUPPORT_ISSUES[idx]?.verifiedFixAction || 'Resolve issue automatically',
    }))
    return { issues: mappedIssues, isLiveDb: true }
  } catch {
    return { issues: TOP_5_SUPPORT_ISSUES, isLiveDb: false }
  }
}

/**
 * Fetches Campaigns directly from Neon PostgreSQL
 */
export async function fetchCampaigns(): Promise<{ campaigns: CampaignRecord[]; isLiveDb: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/campaigns`, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return { campaigns: DEFAULT_CAMPAIGNS, isLiveDb: false }
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return { campaigns: DEFAULT_CAMPAIGNS, isLiveDb: false }
    const mapped: CampaignRecord[] = data.map((c: any) => ({
      id: c.campaignId || `camp-${c.id}`,
      name: c.name,
      type: c.type || 'AUTOMATION',
      status: c.status,
      trigger: c.trigger,
      targetAudienceCount: c.targetAudienceCount || 1000,
      lastUpdated: c.lastUpdated || 'Just now',
      templateBody: c.templateBody || '',
      delayDays: c.delayDays || 0,
      productName: c.productName || 'Serum',
      discountCode: c.discountCode || 'REFILL20',
      activeRoadblock: c.activeRoadblock || undefined,
    }))
    return { campaigns: mapped, isLiveDb: true }
  } catch {
    return { campaigns: DEFAULT_CAMPAIGNS, isLiveDb: false }
  }
}

/**
 * Persists an activated or edited campaign directly to Neon PostgreSQL
 */
export async function persistCampaign(campaign: CampaignRecord): Promise<boolean> {
  try {
    const payload = {
      campaignId: campaign.id,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      trigger: campaign.trigger,
      targetAudienceCount: campaign.targetAudienceCount,
      lastUpdated: campaign.lastUpdated,
      templateBody: campaign.templateBody,
      delayDays: campaign.delayDays,
      productName: campaign.productName,
      discountCode: campaign.discountCode,
      activeRoadblock: campaign.activeRoadblock || '',
    }
    const res = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
    return res.ok
  } catch {
    return false
  }
}

/**
 * Executes Gemini diagnostics securely via the Go backend (protects API keys)
 */
export async function diagnoseViaBackendProxy(query: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/diagnose/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/**
 * Writes an audit trail record directly to the Neon DB diagnostic_logs table
 */
export async function logDiagnosticEvent(payload: DiagnosticLogPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
    return res.ok
  } catch {
    return false
  }
}
