/**
 * Cheerio FixFlow - Comprehensive Full-Stack Prototype Verification Suite
 * Tests Go Backend API + Neon PostgreSQL Serverless + GORM + Financial Model + Validation Engine
 */

import { calculateFinancialModel, getBaselineFinancialGuesstimate } from '../src/config/financialModelConfig.ts'
import { validateTemplateContent, applyOptOutFix } from '../src/utils/templateValidation.ts'
import { generateSupportTicketId } from '../src/config/productConfig.ts'

const API_BASE = 'http://localhost:8080/api'
const FRONTEND_BASE = 'http://localhost:5173'

let passed = 0
let failed = 0

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✅ PASS: ${testName}`)
    passed++
  } else {
    console.error(`❌ FAIL: ${testName} - ${details}`)
    failed++
  }
}

async function runTests() {
  console.log('===============================================================')
  console.log('🧪 RUNNING COMPREHENSIVE CHEERIO FIXFLOW PROTOTYPE AUDIT')
  console.log('===============================================================\n')

  // SECTION 1: GO REST BACKEND & NEON POSTGRESQL DATABASE
  console.log('--- 1. Backend REST API & Neon Serverless PostgreSQL Database ---')
  try {
    const healthRes = await fetch(`${API_BASE}/health`)
    assert(healthRes.status === 200, 'GET /api/health returns HTTP 200')
    const healthData = await healthRes.json()
    assert(healthData.status === 'CONNECTED', 'Database status is CONNECTED')
    assert(healthData.database === 'Neon PostgreSQL Serverless', 'Connected database is Neon PostgreSQL Serverless')
    assert(typeof healthData.version === 'string' && healthData.version.includes('PostgreSQL'), 'PostgreSQL version verified')

    const profileRes = await fetch(`${API_BASE}/profile`)
    assert(profileRes.status === 200, 'GET /api/profile returns HTTP 200')
    const profile = await profileRes.json()
    assert(profile.brandName === 'Aura Skincare', `Profile brandName matches Aura Skincare (got ${profile.brandName})`)
    assert(profile.ownerName === 'Maya Sharma', `Profile ownerName matches Maya Sharma (got ${profile.ownerName})`)
    assert(profile.totalContacts === 14250, `Profile totalContacts is 14,250 (got ${profile.totalContacts})`)
    assert(profile.wabaStatus === 'CONNECTED', 'WABA status is CONNECTED in DB')

    const issuesRes = await fetch(`${API_BASE}/issues`)
    assert(issuesRes.status === 200, 'GET /api/issues returns HTTP 200')
    const issues = await issuesRes.json()
    assert(Array.isArray(issues) && issues.length >= 5, `Seeded top support issues present in Neon DB (count: ${issues.length})`)
    assert(issues.some(i => i.code === 'META_132001'), 'Issue META_132001 (Template Policy 4.2) present')

    // POST /api/diagnose
    const testLogPayload = {
      errorCode: 'META_132001',
      userQuery: 'Template rejected due to missing opt-out copy',
      fixApplied: 'Auto-Inject Opt-Out Footer',
      status: 'RESOLVED',
      durationMs: 310
    }
    const diagRes = await fetch(`${API_BASE}/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLogPayload)
    })
    assert(diagRes.status === 200, 'POST /api/diagnose writes record to Neon DB (HTTP 200)')
    const diagData = await diagRes.json()
    assert(diagData.id > 0, `DiagnosticLog created with valid DB primary key (ID: ${diagData.id})`)
    assert(diagData.errorCode === 'META_132001', 'DiagnosticLog record persisted correct errorCode')
  } catch (err) {
    assert(false, 'Go Backend connection error', err.message)
  }

  // SECTION 2: FRONTEND VITE SERVER & BUILD INTEGRITY
  console.log('\n--- 2. Frontend Web Server & Bundle Health ---')
  try {
    const feRes = await fetch(FRONTEND_BASE)
    assert(feRes.status === 200, 'Vite dev server responding at http://localhost:5173 with HTTP 200')
    const htmlText = await feRes.text()
    assert(htmlText.includes('<div id="root"></div>'), 'Root HTML mounting point is present')
  } catch (err) {
    assert(false, 'Frontend Vite dev server connection error', err.message)
  }

  // SECTION 3: DYNAMIC CONTENT LINTER & AUTO-FIX
  console.log('\n--- 3. Dynamic Message Linting & 1-Click Auto-Fix Engine ---')
  const emptyRes = validateTemplateContent('')
  assert(emptyRes.isEmpty === true && emptyRes.isValid === false, 'Empty message identified as invalid')

  const noOptOutMsg = 'Hi {{first_name}}, get 15% off your next purchase!'
  const noOptOutRes = validateTemplateContent(noOptOutMsg)
  assert(noOptOutRes.hasOptOut === false, 'Missing opt-out correctly detected')
  assert(noOptOutRes.errors.some(e => e.type === 'MISSING_OPT_OUT'), 'MISSING_OPT_OUT warning generated')

  const fixResult = applyOptOutFix(noOptOutMsg)
  assert(fixResult.applied === true, 'applyOptOutFix marks applied: true')
  assert(fixResult.updatedText.includes('Reply STOP to unsubscribe.'), 'applyOptOutFix appends required WhatsApp opt-out notice')
  const fixedRes = validateTemplateContent(fixResult.updatedText)
  assert(fixedRes.isValid === true && fixedRes.hasOptOut === true, 'Fixed template passes all Meta policy checks')

  const doubleFixed = applyOptOutFix(fixResult.updatedText)
  assert(doubleFixed.applied === false && doubleFixed.updatedText === fixResult.updatedText, 'applyOptOutFix is strictly idempotent (zero duplicate text)')

  const brokenVarMsg = 'Hi {{first_name, use code {{discount_code}}'
  const brokenVarRes = validateTemplateContent(brokenVarMsg)
  assert(brokenVarRes.variableSyntax.valid === false, 'Unclosed variable {{first_name detected')

  // SECTION 4: FINANCIAL MODEL & ROI ENGINE
  console.log('\n--- 4. Financial Arbitrage & Guesstimate Model ---')
  const baseline = getBaselineFinancialGuesstimate()
  const calc = calculateFinancialModel()
  assert(baseline.activeBusinesses === 5000, 'Guesstimate baseline businesses = 5,000')
  assert(baseline.selfServiceResolutionRateTarget === 0.60, 'Target Self-Service Resolution Rate = 60%')
  assert(baseline.totalMonthlyQueries === 7500, 'Monthly queries = 7,500')
  assert(baseline.humanCostBaselineMonthly === 30000, 'Baseline support cost = $30,000')
  assert(baseline.totalAiCostMonthly === 1.80, 'Monthly AI running cost on Gemini Flash = $1.80')
  assert(baseline.netMonthlySavings === 17998, 'Net monthly support savings = $17,998')
  assert(calc.annualSavings === 215976 || Math.round(calc.annualSavings) === 215978, 'Net annual support savings = ~$216k/yr')

  // SECTION 5: SUPPORT ESCALATION & RULE 13 COMPLIANCE
  console.log('\n--- 5. Dynamic Support Ticket Generator & Rule 13 ---')
  const ticket1 = generateSupportTicketId()
  const ticket2 = generateSupportTicketId()
  assert(ticket1.startsWith('CHEERIO-ESC-'), `Ticket ID starts with prefix CHEERIO-ESC- (got ${ticket1})`)
  assert(ticket1 !== ticket2, `Ticket IDs are dynamically unique (${ticket1} vs ${ticket2})`)

  console.log('\n===============================================================')
  console.log(`📊 FINAL PROTOTYPE AUDIT RESULTS: ${passed} Passed, ${failed} Failed`)
  console.log('===============================================================')

  if (failed > 0) {
    process.exit(1)
  }
}

runTests()
