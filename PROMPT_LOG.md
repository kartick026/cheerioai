# Cheerio FixFlow: AI Prompt Engineering Log & Iteration Dossier

> **Cheerio Product Intern Assignment — Assignment A**  
> **Candidate:** Kartick  
> **Role Applied For:** Product Management Intern  
> **Direct ChatGPT Conversation Transcript:** [https://chatgpt.com/share/6ad0fc68-4a44-83ee-8065-892b63ec5c01](https://chatgpt.com/share/6ad0fc68-4a44-83ee-8065-892b63ec5c01)  
> **Live Prototype:** [https://cheerioai.vercel.app/](https://cheerioai.vercel.app/)  
> **Financial Model (Google Sheet):** [https://docs.google.com/spreadsheets/d/1JPS5AtFv6epSatNyO_EmN1uC-V4nztyJ9xA2hc8TkKw/edit?gid=1#gid=1](https://docs.google.com/spreadsheets/d/1JPS5AtFv6epSatNyO_EmN1uC-V4nztyJ9xA2hc8TkKw/edit?gid=1#gid=1)

---

## 📋 Executive Summary of Prompting Methodology

To build **Cheerio FixFlow**, AI was utilized not as a passive search engine, but as an **adversarial sparring partner**, **domain taxonomist**, and **full-stack code accelerator**. 

This document chronicles the chronological evolution of the key prompts, highlighting:
1. The **initial prompt**.
2. Where the AI gave **weak, generic, or flawed output**.
3. The **specific pivot and constraints applied** in the subsequent prompt.
4. The **final winning outcome** integrated into the product.

---

## 🔁 Iteration Cycle 1: Problem Definition & Root-Cause Failure Modes

### Initial Prompt (Failed / Weak)
> *"Design a customer support system for Cheerio that solves all support tickets."*

* **What the AI Outputted:**  
  A generic overview recommending off-the-shelf ticketing systems (Zendesk, Intercom, Freshdesk) paired with an automated FAQ bot.
* **Why It Was Weak:**  
  Zero domain awareness of Meta's strict WhatsApp Cloud API ecosystem, WABA onboarding friction, webhook drops, or the non-technical psychology of SMB merchants. It treated customer support as a post-failure reactive conversation rather than an engineering workflow problem.
* **What I Changed:**  
  Shifted from generic customer service to deep domain roleplay. Anchored the model into an official Meta Business Solution Provider (BSP) persona, defined a specific non-technical merchant archetype, and forced a strict separation between *platform policy barriers* and *user configuration mistakes*.

### Refined Prompt (Winning Prompt 1)
> *"Act as a Senior Support Engineer at an official Meta BSP like Cheerio. For non-technical D2C Shopify brands, what are the top 5 distinct technical failure modes where users file support tickets during WhatsApp setup? Separate platform limitations (Meta policies) from configuration errors."*

* **Winning Result:**  
  Delivered high-fidelity, realistic failure modes that formed the backbone of Part 1:
  1. `META_132001`: Promotional template rejection due to missing WhatsApp Policy 4.2 opt-out text.
  2. `META_2FA_REQ`: WhatsApp Business Account lock requiring Business Manager 2FA enforcement.
  3. `BOT_NULL_PARAM`: Shopify checkout webhook missing customer phone numbers.
  4. `SHOPIFY_WEBHOOK_401`: Expired OAuth access token invalidating HMAC signatures.
  5. `META_QUALITY_RED`: Unsegmented broadcasts triggering spam blocks (>0.4%).

---

## 🔁 Iteration Cycle 2: Solution Architecture (Chatbot vs In-Workflow Linting)

### Initial Prompt (Flawed / High Risk)
> *"How can an AI agent automatically fix Meta template rejection errors for users on Cheerio?"*

* **What the AI Outputted:**  
  Proposed a background AI bot that intercepts Meta rejections, rewrites the template text using an LLM, and immediately re-submits the template to Meta's Graph API on behalf of the user.
* **Why It Was Flawed:**  
  1. **Compliance Violation:** Meta strictly penalizes repeated automated submissions; unapproved programmatic submission loops downgrade WABA quality to "RED".
  2. **Loss of User Trust:** Non-technical merchants like Maya feel immense anxiety about broadcast costs and copy. Silently altering marketing messages without explicit user review is unacceptable.
* **What I Changed:**  
  Rejected background auto-submission in favor of **in-workflow linting and explicit 1-click self-healing**. Instructed the AI to design a solution that stops errors *at keystroke time* while keeping the merchant firmly in control with a live preview.

### Refined Prompt (Winning Prompt 2)
> *"Design a pre-submission linting and 1-click self-healing UX for WhatsApp template creation in Cheerio. How can we detect missing opt-out clauses and unclosed merge syntax before submission, explain the issue in plain English without jargon, and allow 1-click fixes with a live iPhone simulator preview?"*

* **Winning Result:**  
  Produced the architectural specification for the **Cheerio FixFlow Guardian**:
  * Real-time client-side regex linting for missing opt-outs and unclosed tags (`{{variable`).
  * Idempotent 1-click repairs ("Apply Verified Fix").
  * Instant visual confirmation via a synchronized iPhone 16 Pro WhatsApp chat preview.

---

## 🔁 Iteration Cycle 3: Guardrails & Human Escalation Boundaries

### Initial Prompt (Weak / Unbounded)
> *"How should Cheerio FixFlow handle escalations when users are stuck?"*

* **What the AI Outputted:**  
  Suggested the AI chatbot keep asking clarifying questions until the user either resolves the issue or asks to speak with an agent.
* **Why It Was Weak:**  
  Failed to address the #1 complaint in customer support: **user fatigue from repeating their story**. Leaving AI escalation unbounded leads to frustrating customer loops and bot hallucinations.
* **What I Changed:**  
  Enforced strict negative constraints ("what it will NEVER do"), codified the **2-Strike Rule**, and demanded an automated telemetry dossier format.

### Refined Prompt (Winning Prompt 3)
> *"Design the boundary criteria for an autonomous support agent called Cheerio FixFlow. Specify strictly: what will it do, what will it NEVER do, and what exact conditions trigger an immediate human handoff? Format the handoff as a zero-repetition technical dossier for a human specialist."*

* **Winning Result:**  
  Established the ironclad support guardrails:
  * **Strict Boundaries:** FixFlow will NEVER bypass Meta policy, never touch credit card/billing transactions, and never retry a failed fix more than twice.
  * **Zero-Repetition Dossier:** Automatically pre-compiles store context, sanitized Meta raw error codes (`code: 132001, subcode: 2494010`), and session click telemetry so human specialists (Rahul V.) take over with 100% context.

---

## 🔁 Iteration Cycle 4: Financial Arbitrage & Token Economics

### Initial Prompt (Inaccurate / Vague)
> *"Estimate the cost savings of using an AI support agent for Cheerio's 5,000 businesses."*

* **What the AI Outputted:**  
  A broad estimate claiming Cheerio would "save 50-70% on customer support costs" without showing input/output token calculations, model list pricing, or human agent salary benchmarks.
* **Why It Was Inaccurate:**  
  Unusable for an executive PM presentation. Lacked verifiable mathematical rigor and ignored token consumption unit economics.
* **What I Changed:**  
  Introduced exact B2B SaaS operational benchmarks ($4/ticket human L1 cost, 1.5 queries/merchant/month) and forced the model to calculate exact token pricing for Gemini 1.5 Flash ($0.075 input / $0.30 output per 1M tokens) with clear algebraic formulas.

### Refined Prompt (Winning Prompt 4)
> *"Calculate the monthly unit economics of resolving 7,500 support queries using Gemini 1.5 Flash (1,400 input tokens, 450 output tokens at $0.075/$0.30 per 1M) vs human support reps at $4/ticket. Show exact formulas, infrastructure overhead, and net margin."*

* **Winning Result:**  
  Generated the transparent mathematical formulas incorporated into Part 4:
  $$\text{Cost per Query} = \frac{1,400 \times \$0.075 + 450 \times \$0.300}{1,000,000} = \mathbf{\$0.00024\text{ per query}}$$
  $$\text{Monthly AI Cost} = 7,500 \times \$0.00024 = \mathbf{\$1.80 / \text{month}}$$
  $$\text{Net Monthly Support Savings} = \$18,000 - \$1.80 = \mathbf{\$17,998.20 / \text{month}}\quad (\mathbf{\$215,978 / \text{year}})$$

---

## 🔁 Iteration Cycle 5: Code Scaffolding & Eliminating Hardcoded Shortcuts

### Initial Output from Code Generation (Caught During Audit)
When generating the initial prototype code, the AI took several bad shortcuts:
1. **Hardcoded Ticket IDs:** Placed static string `"CHEERIO-ESC-90210"` inside the escalation modal.
2. **Hardcoded Financial Output:** Displayed static text (`"$18,000/mo"`) in the PM dock rather than binding to slider state.
3. **Non-Idempotent String Mutation:** Appended `Reply STOP to unsubscribe.` unconditionally on every click.

* **How I Caught It:**  
  During multi-session testing, 3 consecutive escalation tickets produced identical ticket IDs (which would corrupt CRM routing in production). Dragging the sliders didn't recalculate outputs, and clicking the fix button twice duplicated the compliance text.
* **What I Changed:**  
  Enforced **Rule 1 (Nothing Hardcoded)** and **Rule 13 (No Magic Numbers)**:
  * Prompted for a deterministic dynamic ticket generator with random entropy: `generateSupportTicketId()`.
  * Moved all financial constants and formulas into `financialModelConfig.ts`.
  * Added regex checking `/\b(stop|unsubscribe)\b/i` to ensure idempotency.

---

## 📊 Summary of Meta-Prompting Principles Applied

| Principle | How Applied in This Project |
|---|---|
| **Role & Persona Anchoring** | Forced model to speak from the perspective of an official Meta BSP Senior Engineer and non-technical merchant Maya Sharma. |
| **Negative Constraints** | Specifically instructed what the agent must **NEVER** do (no auto-submission without consent, no billing access). |
| **Formula-First Math** | Mandated step-by-step arithmetic formulas for token costs and human support payroll arbitrage. |
| **Anti-Shortcut Audits** | Explicitly audited and rejected hardcoded static IDs, non-idempotent handlers, and magic numbers. |

---

*End of Prompt Log. All conversations can be reviewed in the live transcript link provided above.*
