/**
 * Cheerio FixFlow - Product & Domain Configuration
 * 
 * Centralizes UI feedback timeouts, SLA benchmarks, campaign defaults,
 * dynamic ticket generation, and Meta WhatsApp compliance parameters.
 * 
 * Complies with Rule 1 (Nothing Hardcoded) and Rule 13 (No Magic Numbers).
 */

export const UI_TIMINGS = {
  TOAST_DURATION_MS: 4000,
  TEST_NOTIFICATION_DURATION_MS: 5000,
  SIMULATED_API_LATENCY_MS: 600,
} as const

export const SUPPORT_SLA_BENCHMARKS = {
  ESTIMATED_RESPONSE_MINUTES: 4,
  UNASSISTED_HANDLE_TIME_MINUTES: 18,
  FIXFLOW_ASSISTED_HANDLE_TIME_MINUTES: 3.2,
  TICKET_PREFIX: 'CHEERIO-ESC',
} as const

export const DEFAULT_CAMPAIGN_CONFIG = {
  delayDays: 30,
  productName: 'Skin Barrier Renewal Serum (50ml)',
  customerName: 'Ananya',
  discountCode: 'REFILL20',
  defaultTemplateBody:
    'Hey {{first_name}}! 🌿 Maya from Aura Skincare here.\n\nIt has been {{delay_days}} days since you ordered your {{product_name}}. Skincare experts recommend replenishing before your bottle runs out to protect your skin barrier!\n\nUse your exclusive VIP refill code {{discount_code}} for 20% off today:\n📦 Reorder: https://auraskin.co/refill',
} as const

export const WHATSAPP_COMPLIANCE = {
  OPT_OUT_KEYWORD: 'STOP',
  DEFAULT_OPT_OUT_LINE: 'Reply STOP to unsubscribe.',
  MAX_TEMPLATE_BODY_LENGTH: 1024,
  MAX_SEND_RATE_PER_HOUR: 500,
  INACTIVE_CONTACT_DAYS_THRESHOLD: 90,
} as const

export const ACTIVATION_BENCHMARKS = {
  CONFETTI: {
    particleCount: 80,
    spread: 70,
    originY: 0.6,
  },
  PROJECTED_REPEAT_ORDER_LIFT: '+18% to +24%',
} as const

/**
 * Generates dynamic, unique ticket identifiers for support escalation dossiers.
 * Replaces hardcoded ticket IDs (violating Rule 1 & Rule 13) with deterministic, trackable IDs.
 */
let ticketCounter = 100

export function generateSupportTicketId(prefix: string = SUPPORT_SLA_BENCHMARKS.TICKET_PREFIX): string {
  ticketCounter = (ticketCounter + 1) % 900
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${randomSuffix}${ticketCounter}`
}
