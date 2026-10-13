export type IssueCategory = 
  | 'WABA_SIGNUP'
  | 'TEMPLATE_REJECTION'
  | 'CHATBOT_LOGIC'
  | 'SHOPIFY_INTEGRATION'
  | 'DELIVERY_QUALITY'

export interface SupportIssue {
  id: string
  code: string
  category: IssueCategory
  title: string
  plainEnglishDescription: string
  rootCause: string
  cheerioOccurrenceRate: string
  typicalHumanResolutionTimeMinutes: number
  fixFlowAutomatedResolutionRate: string
  verifiedFixTitle: string
  verifiedFixAction: string
}

export interface BusinessProfile {
  id: string
  brandName: string
  ownerName: string
  industry: string
  eCommercePlatform: string
  whatsappNumber: string
  wabaStatus: 'CONNECTED' | 'NEEDS_VERIFICATION' | 'RESTRICTED'
  totalContacts: number
  monthlyActiveChats: number
  accountTier: 'Growth Plan ($79/mo)'
  activeAutomations: number
  openSupportTickets: number
}

export interface WorkflowTemplate {
  templateName: string
  category: 'MARKETING' | 'UTILITY'
  bodyText: string
  variables: Record<string, string>
  includeOptOut: boolean
  hasValidDynamicUrl: boolean
  buttonText: string
  buttonUrl: string
}

export interface CampaignRecord {
  id: string
  name: string
  type: 'AUTOMATION' | 'BROADCAST'
  status: 'ACTIVE' | 'DRAFT_ROADBLOCK' | 'DRAFT_READY' | 'COMPLETED'
  trigger: string
  targetAudienceCount: number
  lastUpdated: string
  templateBody: string
  delayDays: number
  productName: string
  discountCode: string
  activeRoadblock?: string
}

export interface StuckDetectionState {
  isTriggered: boolean
  issue: SupportIssue
  failureCount: number
  contextSnippet: string
  canAutoFix: boolean
  isFixed: boolean
}

export interface EscalationDossier {
  ticketId: string
  businessId: string
  brandName: string
  ownerName: string
  contactChannel: string
  attemptedGoal: string
  workflowStep: string
  errorCode: string
  errorSummary: string
  plainEnglishExplanation: string
  attemptedFixes: string[]
  telemetryLogs: {
    timestamp: string
    event: string
    status: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'
  }[]
  createdAt: string
  status: 'QUEUED_FOR_SPECIALIST' | 'RESOLVED'
  assignedAgent?: string
}

export interface FinancialGuesstimate {
  activeBusinesses: number
  monthlyQueriesPerBusiness: number
  totalMonthlyQueries: number
  humanResolutionCostPerTicket: number
  selfServiceResolutionRateBaseline: number
  selfServiceResolutionRateTarget: number
  modelName: string
  inputPricePer1M: number
  outputPricePer1M: number
  avgInputTokensPerSession: number
  avgOutputTokensPerSession: number
  aiCostPerSession: number
  totalAiCostMonthly: number
  humanCostBaselineMonthly: number
  humanCostWithFixFlowMonthly: number
  netMonthlySavings: number
  suggestedAddonPrice: number
  projectedGrossMarginPercent: number
}
