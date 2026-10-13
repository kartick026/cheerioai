/**
 * Cheerio FixFlow - Dynamic WhatsApp Template Validation
 * Pure, reactive validation functions for WhatsApp campaign message bodies.
 * 
 * Rules enforced:
 * 1. Meta Business Policy 4.2: Marketing broadcasts require opt-out copy (e.g., "Reply STOP")
 * 2. Dynamic Variable Syntax: {{tag_name}} must have balanced double braces and non-empty keys
 * 3. Non-empty template body
 */

import { WHATSAPP_COMPLIANCE } from '../config/productConfig'

export interface VariableSyntaxCheck {
  valid: boolean
  malformedTokens: string[]
  unclosedBraces: boolean
  validVariablesFound: string[]
}

export interface ValidationErrorItem {
  type: 'EMPTY_BODY' | 'MISSING_OPT_OUT' | 'MALFORMED_VARIABLE'
  severity: 'ERROR' | 'WARNING'
  title: string
  description: string
  canAutoFix: boolean
}

export interface TemplateValidationResult {
  isValid: boolean
  isEmpty: boolean
  hasOptOut: boolean
  variableSyntax: VariableSyntaxCheck
  errors: ValidationErrorItem[]
}

export const KNOWN_VARIABLES = ['first_name', 'product_name', 'discount_code', 'delay_days']

/**
 * Checks whether the text contains recognizable WhatsApp opt-out language
 * as mandated by Meta Business Messaging Policy 4.2.
 */
export function checkOptOutCompliance(text: string): boolean {
  if (!text || typeof text !== 'string') return false
  // Matches "Reply STOP", "text STOP", "STOP to unsubscribe", "Reply STOP to opt out", etc.
  const stopRegex = /\b(reply\s+stop|text\s+stop|stop\s+to\s+unsubscribe|stop\s+to\s+opt\s*out)\b/i
  return stopRegex.test(text)
}

/**
 * Validates dynamic merge tag syntax ({{tag_name}}).
 * Catches unclosed braces like "{{first_name" or empty tags like "{{}}".
 */
export function checkVariableSyntax(text: string): VariableSyntaxCheck {
  if (!text) {
    return { valid: true, malformedTokens: [], unclosedBraces: false, validVariablesFound: [] }
  }

  // Count occurrences of {{ and }}
  const openCount = (text.match(/\{\{/g) || []).length
  const closeCount = (text.match(/\}\}/g) || []).length
  const unclosedBraces = openCount !== closeCount

  // Find all closed tokens {{...}}
  const closedMatches = text.match(/\{\{([^}]*)\}\}/g) || []
  const malformedTokens: string[] = []
  const validVariablesFound: string[] = []

  closedMatches.forEach((token) => {
    const inner = token.replace(/[{}]/g, '').trim()
    if (!inner) {
      malformedTokens.push('{{}}')
    } else {
      validVariablesFound.push(inner)
    }
  })

  // Detect unclosed or dangling braces
  if (unclosedBraces) {
    const danglingMatch = text.match(/\{\{[^}\n]*$/m)
    if (danglingMatch) {
      malformedTokens.push(danglingMatch[0].trim())
    } else {
      malformedTokens.push('unclosed {{')
    }
  }

  const valid = !unclosedBraces && malformedTokens.length === 0

  return {
    valid,
    malformedTokens,
    unclosedBraces,
    validVariablesFound,
  }
}

/**
 * Analyzes Maya's template body text and returns structured validation status.
 * Derived completely from text state—never stale.
 */
export function validateTemplateContent(text: string): TemplateValidationResult {
  const trimmed = (text || '').trim()
  const isEmpty = trimmed.length === 0
  const hasOptOut = checkOptOutCompliance(trimmed)
  const variableSyntax = checkVariableSyntax(text || '')

  const errors: ValidationErrorItem[] = []

  if (isEmpty) {
    errors.push({
      type: 'EMPTY_BODY',
      severity: 'ERROR',
      title: 'Template Message Body is Empty',
      description: 'Your WhatsApp broadcast template must have content before it can be validated or submitted.',
      canAutoFix: false,
    })
  }

  if (!variableSyntax.valid) {
    const tokens = variableSyntax.malformedTokens.join(', ') || 'unclosed {{ braces'
    errors.push({
      type: 'MALFORMED_VARIABLE',
      severity: 'ERROR',
      title: 'Malformed Variable Syntax',
      description: `Meta requires dynamic variables to be formatted strictly as {{tag_name}}. Found invalid syntax: "${tokens}".`,
      canAutoFix: false,
    })
  }

  if (!isEmpty && !hasOptOut) {
    errors.push({
      type: 'MISSING_OPT_OUT',
      severity: 'WARNING',
      title: 'Pre-Submission Lint: Missing Mandatory Opt-Out Notice',
      description: 'Meta WhatsApp Business Messaging Policy 4.2 requires marketing templates to provide explicit unsubscribe wording (e.g. "Reply STOP to unsubscribe"). Without this, Meta Cloud API will reject your template with Error 132001.',
      canAutoFix: true,
    })
  }

  const hasBlockingError = errors.some((e) => e.severity === 'ERROR')
  const isValid = !hasBlockingError && hasOptOut

  return {
    isValid,
    isEmpty,
    hasOptOut,
    variableSyntax,
    errors,
  }
}

/**
 * 1-Click Verified Fix:
 * Safely appends "Reply STOP to unsubscribe." to the template body if missing.
 * Prevents duplicate appends if already present.
 */
export function applyOptOutFix(currentText: string): {
  updatedText: string
  applied: boolean
  message: string
} {
  if (checkOptOutCompliance(currentText)) {
    return {
      updatedText: currentText,
      applied: false,
      message: 'Opt-out wording is already present in your message.',
    }
  }

  const optOutLine = WHATSAPP_COMPLIANCE.DEFAULT_OPT_OUT_LINE
  const trimmed = (currentText || '').trimEnd()
  const updatedText = trimmed.length > 0 ? `${trimmed}\n\n${optOutLine}` : optOutLine

  return {
    updatedText,
    applied: true,
    message: "Verified Fix Applied: Appended 'Reply STOP to unsubscribe.' to message body.",
  }
}
