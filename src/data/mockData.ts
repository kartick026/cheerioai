import { BusinessProfile, SupportIssue, FinancialGuesstimate, CampaignRecord } from '../types'
import { getBaselineFinancialGuesstimate } from '../config/financialModelConfig'
import { DEFAULT_CAMPAIGN_CONFIG } from '../config/productConfig'

export const AURA_SKINCARE_PROFILE: BusinessProfile = {
  id: 'CHEERIO-D2C-9842',
  brandName: 'Aura Skincare',
  ownerName: 'Maya Sharma (Founder)',
  industry: 'D2C Cosmetics & Skincare',
  eCommercePlatform: 'Shopify Plus',
  whatsappNumber: '+91 98201 44521',
  wabaStatus: 'CONNECTED',
  totalContacts: 14250,
  monthlyActiveChats: 4890,
  accountTier: 'Growth Plan ($79/mo)',
  activeAutomations: 1, // Only 1 basic broadcast!
  openSupportTickets: 0
}

export const TOP_5_SUPPORT_ISSUES: SupportIssue[] = [
  {
    id: 'issue-1',
    code: 'META_TEMPLATE_REJECT_OPT_OUT',
    category: 'TEMPLATE_REJECTION',
    title: 'WhatsApp Message Template Rejected (Missing Mandatory Opt-Out)',
    plainEnglishDescription: 'Meta rejected your broadcast template because WhatsApp requires all promotional messages to offer a clear way for customers to unsubscribe.',
    rootCause: 'Meta Business Platform Policy requires Marketing Category templates to include an explicit unsubscribe button or "Reply STOP to opt out" copy.',
    cheerioOccurrenceRate: '32% of all setup tickets',
    typicalHumanResolutionTimeMinutes: 18,
    fixFlowAutomatedResolutionRate: '92% 1-Click Fix Success',
    verifiedFixTitle: 'Add WhatsApp-Compliant Quick Opt-Out Tag',
    verifiedFixAction: 'Append "Reply STOP to unsubscribe anytime" and insert a compliant quick-reply STOP button.'
  },
  {
    id: 'issue-2',
    code: 'WABA_EMBEDDED_SIGNUP_HANG',
    category: 'WABA_SIGNUP',
    title: 'Meta Embedded Signup Stuck at "Payment Method / 2FA Verification"',
    plainEnglishDescription: 'Your WhatsApp Business API number is verified, but Meta Business Manager is blocking live sends until 2-Factor Authentication is toggled on.',
    rootCause: 'Meta Business API requires admin 2FA enforcement on the parent Meta Business Manager ID before lifting the 250 conversations/day tier limit.',
    cheerioOccurrenceRate: '24% of all setup tickets',
    typicalHumanResolutionTimeMinutes: 35,
    fixFlowAutomatedResolutionRate: '78% Guided Resolution',
    verifiedFixTitle: 'Deep-Link to Meta Security Center with 1-Click Status Re-sync',
    verifiedFixAction: 'Generate authenticated direct URL to Meta 2FA toggle and initiate real-time Cheerio WABA token refresh.'
  },
  {
    id: 'issue-3',
    code: 'CHATBOT_TRIGGER_PAYLOAD_MISSING',
    category: 'CHATBOT_LOGIC',
    title: 'Replenishment Bot Inactive: Customer Phone Number Missing from Trigger',
    plainEnglishDescription: 'Your automation trigger received an order from Shopify, but the message cannot send because the customer checked out with an email address instead of a mobile number.',
    rootCause: 'Shopify "Orders/Fulfilled" payload lacks `customer.phone` when default Shopify checkout does not mark phone number as required.',
    cheerioOccurrenceRate: '19% of all setup tickets',
    typicalHumanResolutionTimeMinutes: 22,
    fixFlowAutomatedResolutionRate: '88% Guided Resolution',
    verifiedFixTitle: 'Enable Shopify Phone Collection Guardrail & Fallback SMS/Email',
    verifiedFixAction: 'Inject fallback logic to check customer SMS profile and display Shopify checkout field config checklist.'
  },
  {
    id: 'issue-4',
    code: 'SHOPIFY_WEBHOOK_EXPIRATION',
    category: 'SHOPIFY_INTEGRATION',
    title: 'Shopify Webhook Sync Paused: API Access Token Re-authorization Required',
    plainEnglishDescription: 'Cheerio stopped receiving new order notifications from Shopify because Shopify rotated the store app permissions.',
    rootCause: 'Shopify OAuth access token invalidation following store theme or admin permission update.',
    cheerioOccurrenceRate: '14% of all setup tickets',
    typicalHumanResolutionTimeMinutes: 15,
    fixFlowAutomatedResolutionRate: '95% 1-Click Reconnect',
    verifiedFixTitle: '1-Click Shopify OAuth Re-Handshake',
    verifiedFixAction: 'Trigger silent background OAuth handshake with Shopify Admin without re-entering credentials.'
  },
  {
    id: 'issue-5',
    code: 'BROADCAST_QUALITY_WARNING',
    category: 'DELIVERY_QUALITY',
    title: 'Meta Account Quality Dropped: High Customer Block Rate Alert',
    plainEnglishDescription: 'Meta warned your account that too many recipients blocked your last message. Your sending rate may be throttled if quality drops further.',
    rootCause: 'Broadcast sent to inactive contacts who purchased over 180 days ago without opt-in consent.',
    cheerioOccurrenceRate: '11% of all setup tickets',
    typicalHumanResolutionTimeMinutes: 40,
    fixFlowAutomatedResolutionRate: '84% Guided Resolution',
    verifiedFixTitle: 'Apply RFM Smart Suppression (Exclude Inactive 90+ Days)',
    verifiedFixAction: 'Automatically suppress unengaged contacts and apply intelligent send-pacing (max 500 msgs/hr).'
  }
]

export const FINANCIAL_MODEL_DATA: FinancialGuesstimate = getBaselineFinancialGuesstimate()

export const DEFAULT_CAMPAIGNS: CampaignRecord[] = [
  {
    id: 'camp-replenish-1',
    name: '30-Day Skincare Serum Replenishment Flow',
    type: 'AUTOMATION',
    status: 'DRAFT_ROADBLOCK',
    trigger: 'Shopify Order Fulfilled (+30 Days)',
    targetAudienceCount: 1420,
    lastUpdated: 'Just now',
    templateBody: DEFAULT_CAMPAIGN_CONFIG.defaultTemplateBody,
    delayDays: DEFAULT_CAMPAIGN_CONFIG.delayDays,
    productName: DEFAULT_CAMPAIGN_CONFIG.productName,
    discountCode: DEFAULT_CAMPAIGN_CONFIG.discountCode,
    activeRoadblock: 'Meta Policy 4.2 Error 132001: Missing Opt-Out Notice',
  },
  {
    id: 'camp-welcome-2',
    name: 'New Customer Welcome & 15% VIP Perk',
    type: 'AUTOMATION',
    status: 'ACTIVE',
    trigger: 'Shopify Customer Created',
    targetAudienceCount: 3840,
    lastUpdated: '3 days ago',
    templateBody: 'Welcome to the Aura Skincare family, {{first_name}}! 🌿 Your glowing skin journey starts today.',
    delayDays: 0,
    productName: 'Aura VIP Welcome Box',
    discountCode: 'GLOW15',
  },
  {
    id: 'camp-broadcast-3',
    name: 'Diwali Festive Skincare Barrier Launch',
    type: 'BROADCAST',
    status: 'COMPLETED',
    trigger: 'Manual Broadcast (14,250 contacts)',
    targetAudienceCount: 14250,
    lastUpdated: '12 days ago',
    templateBody: 'Celebrate Diwali with glowing, hydrated skin! ✨ 30% off site-wide for Aura insiders.\n\nReply STOP to unsubscribe.',
    delayDays: 0,
    productName: 'Ceramide Barrier Cream',
    discountCode: 'DIWALI30',
  },
]
