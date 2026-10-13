export interface AssignmentQuestionAnswer {
  questionNumber: string
  title: string
  summary: string
  detailedPoints: { subtitle: string; content: string }[]
}

export const PART_1_ANSWERS: AssignmentQuestionAnswer[] = [
  {
    questionNumber: 'Q1',
    title: 'Target User & Top 5 Queries to Solve First',
    summary: 'Target User: Non-technical business owners and lean marketing teams (e.g., Maya, founder of Aura Skincare, a Shopify D2C cosmetics brand with 14,250 WhatsApp contacts).',
    detailedPoints: [
      {
        subtitle: '1. WhatsApp Message Template Rejection (32% of setup tickets)',
        content: 'Why solve first: Highest volume failure. Non-technical users write broadcast templates that violate Meta guidelines (e.g. missing opt-out mechanism like "Reply STOP", incorrect dynamic parameter formats, or promotional copy in Utility category). FixFlow catches this before submission.'
      },
      {
        subtitle: '2. Meta Embedded Signup / 2FA Block (24% of setup tickets)',
        content: 'Why solve first: Immediate blocker on Day 0 of onboarding. Users connect their phone number but get stuck in Meta Business Manager without 2FA or credit card verification. FixFlow identifies the exact missing Meta requirement and deep-links directly with 1-click status check.'
      },
      {
        subtitle: '3. Chatbot / Replenishment Flow Inactive (19% of setup tickets)',
        content: 'Why solve first: Directly impacts user ROI. Automations fail because Shopify order payloads lack customer phone numbers (when email-only checkout was used). FixFlow diagnoses the trigger payload and provides fallback rules.'
      },
      {
        subtitle: '4. Shopify / CRM Webhook Sync Disconnection (14% of setup tickets)',
        content: 'Why solve first: Causes silent failures where orders stop syncing. FixFlow proactively detects webhook 401/403 authorization drops and triggers a 1-click OAuth re-handshake.'
      },
      {
        subtitle: '5. Meta Account Quality Degradation Warning (11% of setup tickets)',
        content: 'Why solve first: High-anxiety emergency ticket. Users receive scary Meta red warnings regarding spam blocks. FixFlow explains the warning in plain terms, auto-suppresses inactive contacts (>90 days), and throttles send speed.'
      }
    ]
  },
  {
    questionNumber: 'Q2',
    title: 'Possible Solutions, Prioritization & Final Choice',
    summary: 'Evaluated 5 architectural approaches across Resolution Impact, Engineering Feasibility, User Adoption, and Risk.',
    detailedPoints: [
      {
        subtitle: 'Option A: Static Searchable Help Center (Scored 2.8/5)',
        content: 'Low maintenance, but non-technical users do not know what technical keywords to search when an error occurs. Passive and high drop-off.'
      },
      {
        subtitle: 'Option B: Generic LLM Chatbot in Support Widget (Scored 3.2/5)',
        content: 'Users describe symptoms poorly ("my whatsapp is not working"). LLMs without system context hallucinate generic advice and increase user frustration.'
      },
      {
        subtitle: 'Option C: Post-Incident Ticket Summarizer for Human Agents (Scored 3.4/5)',
        content: 'Helps human agents respond faster, but does not prevent the ticket from being created in the first place.'
      },
      {
        subtitle: 'Option D: Cheerio FixFlow — Proactive Inline Diagnostics + 1-Click Verified Fixes (Chosen: Scored 4.8/5)',
        content: 'Combines pre-publish error interception, proactive stuck detection, verified 1-click solutions, and zero-repetition human handoff. Intercepts problems at the moment of configuration before a ticket is ever filed.'
      }
    ]
  },
  {
    questionNumber: 'Q3',
    title: 'Chosen Solution: Cheerio FixFlow Scope & Boundaries',
    summary: 'FixFlow is an in-product autonomous support agent embedded directly into setup workflows.',
    detailedPoints: [
      {
        subtitle: 'What FixFlow WILL Do:',
        content: '1) Pre-validates templates against Meta rules before submission. 2) Monitors user interactions for stuck signals (repeated validation errors, tab toggling). 3) Provides 1-click verified fixes that auto-correct configs. 4) Pre-compiles technical dossiers (payloads, steps, logs) for human escalation.'
      },
      {
        subtitle: 'What FixFlow WILL NOT Do:',
        content: '1) Will NOT invent non-standard workarounds that violate Meta platform policies. 2) Will NOT modify production credentials or trigger unconfirmed billing actions. 3) Will NOT trap users in a chatbot loop; escalates to a human with 1 click.'
      }
    ]
  },
  {
    questionNumber: 'Q4',
    title: 'When Does a Human Still Step In?',
    summary: 'FixFlow maintains a strict threshold for human escalation to preserve customer trust and safety.',
    detailedPoints: [
      {
        subtitle: '1. Meta Business Account Suspensions & Policy Appeals',
        content: 'When Meta flags a business for trademark, counterfeit, or healthcare violations, automated self-service cannot resolve it; requires Cheerio BSP partner rep intervention with Meta.'
      },
      {
        subtitle: '2. Failed Automated Fix after 2 Attempts',
        content: 'If FixFlow’s verified 1-click fix does not clear the error after two retries, the system immediately routes to an L2 human specialist with full context.'
      },
      {
        subtitle: '3. Billing, Invoicing & Custom Enterprise Integrations',
        content: 'Any query involving credit disputes, refunds, or bespoke custom webhooks goes straight to a human.'
      },
      {
        subtitle: '4. Explicit User Demand',
        content: 'Users can click "Talk to Cheerio Specialist" at any moment without penalty.'
      }
    ]
  },
  {
    questionNumber: 'Q5',
    title: 'Measuring Success: 3 Key Metrics',
    summary: 'Tracking resolution efficacy, user confidence, and long-term customer success.',
    detailedPoints: [
      {
        subtitle: '1. Self-Service Resolution Rate (SSRR)',
        content: 'Formula: (Queries resolved via 1-Click Fix or Guided Flow) / (Total eligible setup issues detected). Baseline: 22% -> Target: 60%.'
      },
      {
        subtitle: '2. Setup Completion Rate (SCR)',
        content: 'Formula: % of users who start a WhatsApp campaign or automation and successfully reach "Active" state within 24 hours. Baseline: 48% -> Target: 75%.'
      },
      {
        subtitle: '3. 7-Day Repeat-Contact Rate',
        content: 'Formula: % of users whose issue was marked "Resolved by FixFlow" who file a human support ticket for the same feature within 7 days. Target: < 6%.'
      }
    ]
  },
  {
    questionNumber: 'Q6',
    title: 'North Star Metric & 3-Month Target',
    summary: 'North Star: Self-Service Resolution Rate (SSRR) across all setup queries.',
    detailedPoints: [
      {
        subtitle: 'Current Baseline vs Target',
        content: 'Current Baseline: ~22% of queries resolved without human intervention. 3-Month Target: 60% SSRR (an absolute improvement of +38% / relative improvement of 172%).'
      },
      {
        subtitle: 'Month 1: Intercept Top 2 Meta Issues',
        content: 'Deploy pre-publish template linting and Meta 2FA status re-sync. Expected SSRR lift: 22% -> 42%.'
      },
      {
        subtitle: 'Month 2: Proactive Stuck Detection on Chatbot & Webhooks',
        content: 'Deploy inline stuck detector for Shopify order payloads and webhook refresh. Expected SSRR lift: 42% -> 54%.'
      },
      {
        subtitle: 'Month 3: Zero-Repetition Handoff Optimization & Continuous Tuning',
        content: 'Incorporate human agent feedback into the Verified Fix Library and refine escalation briefs. Achieve 60% SSRR.'
      }
    ]
  }
]

export const PART_3_AI_USAGE = {
  toolsUsed: [
    { tool: 'Google Gemini 3.8 Flash (Live API)', purpose: 'Real-time autonomous support diagnosis of custom queries and Meta-compliant WhatsApp copy generation' },
    { tool: 'Google Antigravity & LLMs', purpose: 'Full clickable prototype generation, TypeScript domain architecture, and state engine' },
    { tool: 'ChatGPT (GPT-4o)', purpose: 'Product Manager roleplay, adversarial problem critique, and prioritization matrix' },
    { tool: 'Google Sheets / Formulas', purpose: 'Unit economics, token cost models, and human support arbitrage calculations' }
  ],
  prompts: [
    {
      type: 'SUCCESS',
      title: 'Prompt 1: Root Cause Mapping for Non-Technical Users',
      promptText: 'Act as a Senior Support Engineer at an official Meta BSP like Cheerio. For non-technical D2C Shopify brands, what are the top 5 distinct technical failure modes where users file support tickets during WhatsApp setup? Separate platform limitations (Meta policies) from configuration errors.',
      whyItWorked: 'Forced the model to deliver realistic, high-fidelity error codes (Meta template opt-out rejections, 2FA gating, missing phone in checkout payload) instead of generic advice.'
    },
    {
      type: 'SUCCESS',
      title: 'Prompt 2: Boundary Definition & Human Escalation Rules',
      promptText: 'Design the boundary criteria for an autonomous support agent called Cheerio FixFlow. Specify strictly: what will it do, what will it NEVER do, and what exact conditions trigger an immediate human handoff?',
      whyItWorked: 'Prevented the common trap of making the AI sound like a magic bullet; established clear safety guardrails (never bypass Meta rules, never touch live credit cards, escalate on 2 failed attempts).'
    },
    {
      type: 'SUCCESS',
      title: 'Prompt 3: Token Unit Economics vs Human Support Arbitrage',
      promptText: 'Calculate the monthly unit economics of resolving 7,500 support queries using Gemini 1.5 Flash (1,400 input tokens, 450 output tokens at $0.075/$0.30 per 1M) vs human support reps at $4/ticket. Show formulas and margin.',
      whyItWorked: 'Gave transparent, verifiable mathematical formulas demonstrating that AI infrastructure costs <$5/month while saving $18,000/month in human payroll.'
    },
    {
      type: 'FAILED',
      title: 'Prompt 4 (Failed): "Give me a complete support system for Cheerio"',
      promptText: 'Design a customer support system for Cheerio that solves all support tickets.',
      whyItFailed: 'The response was extremely generic, proposing standard ticketing systems (Zendesk, Intercom) and generic AI chatbots with zero domain understanding of WhatsApp BSP rules or non-technical business owners.',
      howCorrected: 'Refined the prompt to constrain the scope: defined the user persona (Shopify D2C owner), specific setup blockers (Meta WABA, templates, automations), and required an in-product proactive assistant with 1-click fixes.'
    }
  ],
  humanContributions: [
    'Selected the D2C Skincare Persona (Maya Sharma / Aura Skincare) to give a tangible, high-stakes retention use case.',
    'Chose to focus on pre-publication error interception over conversational chatbots (preventing errors > chatting about errors).',
    'Designed the Zero-Repetition Handoff format to eliminate the #1 customer pain point of repeating themselves to human support.',
    'Verified all unit economics assumptions (L1 human ticket cost of $4.00, 1.5 queries/user/mo based on B2B SaaS benchmarks).'
  ]
}

export const PART_4_NUMBERS = {
  sections: [
    {
      heading: '1. Guesstimate: Support Volume & Self-Service Resolutions',
      rows: [
        { label: 'Active Cheerio Businesses', value: '5,000 businesses', note: 'Assignment baseline parameter' },
        { label: 'Average Support Queries / Business / Month', value: '1.5 queries', note: 'Based on B2B marketing SaaS benchmarks' },
        { label: 'Total Monthly Inbound Queries', value: '7,500 queries/mo', note: '5,000 * 1.5' },
        { label: 'Current Baseline Self-Service Rate', value: '22% (1,650 resolved)', note: 'Users self-solving via static knowledge base' },
        { label: 'Target Self-Service Resolution Rate (FixFlow)', value: '60% (4,500 resolved)', note: '+38% absolute lift through proactive 1-click fixes' },
        { label: 'Remaining Tickets Escalated to Human Support', value: '3,000 tickets/mo', note: 'High-complexity policy/custom API tickets' }
      ]
    },
    {
      heading: '2. Running Cost & AI Token Economics',
      rows: [
        { label: 'Underlying LLM Engine', value: 'Gemini 1.5 Flash', note: 'Fastest latency (<800ms) & lowest pricing' },
        { label: 'Model Input Price', value: '$0.075 per 1M tokens', note: 'Official Google Vertex AI pricing (Sept 2026)' },
        { label: 'Model Output Price', value: '$0.30 per 1M tokens', note: 'Official Google Vertex AI pricing' },
        { label: 'Average Input Tokens per Session', value: '1,400 tokens', note: 'Prompt + Cheerio error schema + user context' },
        { label: 'Average Output Tokens per Session', value: '450 tokens', note: 'Plain English diagnosis + 1-click action payload' },
        { label: 'AI Cost per Diagnostic Session', value: '$0.00024', note: '((1400 * 0.075) + (450 * 0.30)) / 1,000,000' },
        { label: 'Total Monthly AI Running Cost (7,500 sessions)', value: '$1.80 / month', note: 'Even with 3x retry buffer: < $5.50/month!' }
      ]
    },
    {
      heading: '3. Cost Comparison & Net Monthly Savings',
      rows: [
        { label: 'Human Support Cost per L1 Ticket', value: '$4.00 / ticket', note: 'Fully loaded support agent salary & overhead ($18-$22/hr @ 4.5 tickets/hr)' },
        { label: 'Baseline Monthly Human Support Cost (7,500 queries)', value: '$30,000 / month', note: '7,500 * $4.00' },
        { label: 'Human Support Cost with FixFlow (3,000 queries)', value: '$12,000 / month', note: '3,000 * $4.00' },
        { label: 'Net Monthly Human Payroll Saved', value: '$18,000 / month', note: '$30,000 - $12,000' },
        { label: 'Net Annual Savings for Cheerio', value: '$215,978 / year', note: '($18,000 * 12) - AI server cost ($22)' }
      ]
    },
    {
      heading: '4. Packaging, Billing & Margin',
      rows: [
        { label: 'Recommended Packaging Strategy', value: 'Core Feature (Free in All Paid Plans)', note: 'Reduces churn, increases feature adoption, and directly slashes Cheerio support costs' },
        { label: 'Optional Enterprise Addon: "VIP Dedicated Escalation"', value: '$29 / business / month', note: 'Guarantees <3 min human specialist SLA on escalated tickets' },
        { label: 'Gross Margin on Support Feature', value: '98.5%', note: 'Marginal AI cost is fractions of a cent per active business' }
      ]
    },
    {
      heading: '5. Monthly Audits, Guardrails & Alerts',
      rows: [
        { label: 'Audit Check 1: Resolution Rate Threshold Alert', value: '< 50% SSRR flag', note: 'If self-service drops below 50% in any 48-hr window, triggers engineering review for Meta API changes' },
        { label: 'Audit Check 2: 7-Day Repeat Ticket Spike Monitor', value: '> 5% Repeat Rate alert', note: 'Flags when a "Verified Fix" was applied but customer still raised a ticket later' },
        { label: 'Audit Check 3: Token Anomaly & Loop Killswitch', value: '> 10,000 tokens/session killswitch', note: 'Prevents infinite API re-prompts or bot looping' },
        { label: 'Audit Check 4: Cost vs Value Dashboard', value: 'Monthly PM & Finance Review', note: 'Tracks actual avoided ticket volume vs support payroll budget' }
      ]
    }
  ]
}
