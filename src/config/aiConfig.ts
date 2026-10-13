/**
 * Cheerio FixFlow - AI Engine Configuration
 * 
 * Centralizes AI model identifiers, generation parameters, token limits,
 * network timeouts, and fallback presets.
 * 
 * Complies with Rule 13 (No Magic Numbers or Scattered Configuration).
 */

export const AI_CONFIG = {
  // Primary live model and fallback model
  MODELS: {
    PRIMARY: import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.8-flash',
    FALLBACK: 'gemini-1.5-flash',
  },

  // Diagnostic Service Parameters (low temperature for deterministic root cause analysis)
  DIAGNOSTICS: {
    TEMPERATURE: 0.2,
    MAX_OUTPUT_TOKENS: 500,
    RESPONSE_MIME_TYPE: 'application/json',
    TIMEOUT_MS: 12000,
  },

  // WhatsApp Marketing Copy Generator Parameters (moderate temperature for natural variations)
  COPY_GENERATOR: {
    TEMPERATURE: 0.7,
    MAX_OUTPUT_TOKENS: 250,
    TIMEOUT_MS: 8000,
    MAX_WORDS: 60,
  },

  // Telemetry and loop safeguards
  SAFEGUARDS: {
    MAX_CONSECUTIVE_FAILURES_BEFORE_ESCALATION: 2,
    TOKEN_ANOMALY_LIMIT: 10000,
  },
} as const
