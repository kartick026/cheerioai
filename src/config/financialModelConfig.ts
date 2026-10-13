/**
 * Cheerio FixFlow - Financial Model & Sensitivity Configuration
 * 
 * Centralizes all economic assumptions, pricing tiers, token costs, and slider limits
 * for Assignment A (Part 4 Numbers & Economics).
 * 
 * Complies with Rule 13 (No Magic Numbers) and Rule 1 (Nothing Hardcoded in UI).
 */

import { FinancialGuesstimate } from '../types'

/**
 * Configurable assumptions for the baseline support model
 */
export interface FinancialModelInputs {
  activeBusinesses: number
  monthlyQueriesPerBusiness: number
  targetResolutionRate: number // e.g. 0.60 (60%)
  humanCostPerTicket: number // e.g. 4.00 ($4.00)
}

/**
 * AI Token unit economics (Gemini Flash on Google Vertex / AI Studio)
 */
export const AI_TOKEN_PRICING = {
  MODEL_NAME: 'Gemini 1.5 Flash (via Antigravity / Vertex)',
  INPUT_PRICE_PER_1M: 0.075, // $0.075 per 1,000,000 input tokens
  OUTPUT_PRICE_PER_1M: 0.30,  // $0.30 per 1,000,000 output tokens
  AVG_INPUT_TOKENS_PER_SESSION: 1400,
  AVG_OUTPUT_TOKENS_PER_SESSION: 450,
  TOKENS_PER_MILLION: 1_000_000,
} as const

/**
 * Default baseline parameters aligned with Assignment A Brief
 */
export const DEFAULT_FINANCIAL_INPUTS: FinancialModelInputs = {
  activeBusinesses: 5000,
  monthlyQueriesPerBusiness: 1.5,
  targetResolutionRate: 0.60, // Target 60% Self-Service Resolution Rate (SSRR)
  humanCostPerTicket: 4.00,   // Standard B2B SaaS L1 support ticket cost ($4/ticket)
}

/**
 * Static baseline assumptions & audit thresholds
 */
export const FINANCIAL_BENCHMARKS = {
  BASELINE_SSRR: 0.22, // 22% self-served via static knowledge docs prior to FixFlow
  MONTHS_PER_YEAR: 12,
  SUGGESTED_ENTERPRISE_ADDON_PRICE: 29.00, // $29/mo for VIP human escalation SLA
  PROJECTED_GROSS_MARGIN_PERCENT: 98.5,
  
  // Monthly Audit & Alert Guardrails
  MIN_SSRR_ALERT_THRESHOLD_PERCENT: 50, // Flag if SSRR drops below 50% in any 48-hr window
  MAX_REPEAT_TICKET_RATE_PERCENT: 5,   // Flag if repeat tickets exceed 5%
  SESSION_TOKEN_KILLSWITCH: 10_000,    // Hard killswitch to prevent infinite loops
} as const

/**
 * Slider bounds and step resolutions for the interactive PM Evaluation Console
 */
export const FINANCIAL_SLIDER_RANGES = {
  activeBusinesses: {
    min: 1000,
    max: 20000,
    step: 500,
  },
  queriesPerBusiness: {
    min: 0.5,
    max: 5.0,
    step: 0.1,
  },
  targetResolutionRate: {
    min: 0.30,
    max: 0.90,
    step: 0.05,
  },
  humanCostPerTicket: {
    min: 2.00,
    max: 10.00,
    step: 0.50,
  },
} as const

/**
 * Output metrics computed dynamically from inputs
 */
export interface CalculatedFinancials {
  totalQueries: number
  automatedQueries: number
  escalatedQueries: number
  aiCostPerQuery: number
  monthlyAiCost: number
  baselineHumanCost: number
  newHumanCost: number
  netMonthlySavings: number
  annualSavings: number
}

/**
 * Pure calculation function: Derives all financial outputs from input assumptions.
 * Eliminates duplicate calculations between PM Evaluation Drawer and data models.
 */
export function calculateFinancialModel(
  inputs: FinancialModelInputs = DEFAULT_FINANCIAL_INPUTS
): CalculatedFinancials {
  const totalQueries = Math.round(inputs.activeBusinesses * inputs.monthlyQueriesPerBusiness)
  const automatedQueries = Math.round(totalQueries * inputs.targetResolutionRate)
  const escalatedQueries = totalQueries - automatedQueries

  // AI cost per query calculation based on Vertex pricing
  const inputCost = (AI_TOKEN_PRICING.AVG_INPUT_TOKENS_PER_SESSION * AI_TOKEN_PRICING.INPUT_PRICE_PER_1M) / AI_TOKEN_PRICING.TOKENS_PER_MILLION
  const outputCost = (AI_TOKEN_PRICING.AVG_OUTPUT_TOKENS_PER_SESSION * AI_TOKEN_PRICING.OUTPUT_PRICE_PER_1M) / AI_TOKEN_PRICING.TOKENS_PER_MILLION
  const aiCostPerQuery = inputCost + outputCost

  const monthlyAiCost = totalQueries * aiCostPerQuery
  const baselineHumanCost = totalQueries * inputs.humanCostPerTicket
  const newHumanCost = escalatedQueries * inputs.humanCostPerTicket
  const netMonthlySavings = baselineHumanCost - newHumanCost - monthlyAiCost
  const annualSavings = netMonthlySavings * FINANCIAL_BENCHMARKS.MONTHS_PER_YEAR

  return {
    totalQueries,
    automatedQueries,
    escalatedQueries,
    aiCostPerQuery,
    monthlyAiCost,
    baselineHumanCost,
    newHumanCost,
    netMonthlySavings,
    annualSavings,
  }
}

/**
 * Generates full FinancialGuesstimate structure matching types/index.ts
 */
export function getBaselineFinancialGuesstimate(): FinancialGuesstimate {
  const calc = calculateFinancialModel(DEFAULT_FINANCIAL_INPUTS)
  return {
    activeBusinesses: DEFAULT_FINANCIAL_INPUTS.activeBusinesses,
    monthlyQueriesPerBusiness: DEFAULT_FINANCIAL_INPUTS.monthlyQueriesPerBusiness,
    totalMonthlyQueries: calc.totalQueries,
    humanResolutionCostPerTicket: DEFAULT_FINANCIAL_INPUTS.humanCostPerTicket,
    selfServiceResolutionRateBaseline: FINANCIAL_BENCHMARKS.BASELINE_SSRR,
    selfServiceResolutionRateTarget: DEFAULT_FINANCIAL_INPUTS.targetResolutionRate,
    modelName: AI_TOKEN_PRICING.MODEL_NAME,
    inputPricePer1M: AI_TOKEN_PRICING.INPUT_PRICE_PER_1M,
    outputPricePer1M: AI_TOKEN_PRICING.OUTPUT_PRICE_PER_1M,
    avgInputTokensPerSession: AI_TOKEN_PRICING.AVG_INPUT_TOKENS_PER_SESSION,
    avgOutputTokensPerSession: AI_TOKEN_PRICING.AVG_OUTPUT_TOKENS_PER_SESSION,
    aiCostPerSession: Number(calc.aiCostPerQuery.toFixed(5)),
    totalAiCostMonthly: Number(calc.monthlyAiCost.toFixed(2)),
    humanCostBaselineMonthly: calc.baselineHumanCost,
    humanCostWithFixFlowMonthly: calc.newHumanCost,
    netMonthlySavings: Math.round(calc.netMonthlySavings),
    suggestedAddonPrice: FINANCIAL_BENCHMARKS.SUGGESTED_ENTERPRISE_ADDON_PRICE,
    projectedGrossMarginPercent: FINANCIAL_BENCHMARKS.PROJECTED_GROSS_MARGIN_PERCENT,
  }
}
