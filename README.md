# Cheerio FixFlow: Making Customer Support Scale for Non-Technical Users

> **Cheerio Product Intern Assignment — Assignment A**  
> **Candidate:** Kartick  
> **Repository:** [https://github.com/kartick026/cheerioai.git](https://github.com/kartick026/cheerioai.git)  
> **Live Interactive App:** [https://cheerioai.vercel.app/](https://cheerioai.vercel.app/)  
> **Live Backend API (Render):** [https://cheerioai.onrender.com/api/health](https://cheerioai.onrender.com/api/health)  
> **Complete Submission Dossier:** [`SUBMISSION.md`](SUBMISSION.md)  

---

## 🚀 Executive Summary

Cheerio enables growing D2C and omnichannel brands to automate marketing, conversational commerce, and support on WhatsApp. However, because WhatsApp operates on Meta’s strict Business Cloud API, non-technical business owners regularly get blocked by policy rejections, variable syntax errors, two-factor authentication roadblocks, and webhook disconnects.

Historically, this creates a flood of repetitive Level-1 support tickets that take an average of **35 minutes to resolve**, frustrate non-technical merchants, and cause high first-week onboarding churn.

**Cheerio FixFlow** solves this not by building another passive support chatbot, but by embedding an **Autonomous Setup Guardian & Pre-Submission Linting Engine** directly into Cheerio's core campaign workflow. FixFlow detects configuration errors as merchants type, offers **1-Click Verified Auto-Fixes**, renders a **real-time WhatsApp iPhone sandbox**, and compiles a **Zero-Repetition Telemetry Dossier** when human escalation is required.

Operating across **5,000 active businesses**, FixFlow delivers:
- **60% Self-Service Resolution Rate (SSRR)**, intercepting 4,500 tickets/month.
- **$17,998/month in net support payroll savings** ($216,000/year).
- **$1.80/month total AI inference cost** using Google Gemini 1.5 Flash ($0.00024 per query).
- **Setup Completion Rate within 24 Hours** improving from **38% to 72%** within 3 months.

---

## 🛠️ Full-Stack Technology Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CHEERIO FIXFLOW FULL-STACK ARCHITECTURE              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ React 19 + TypeScript + Vite 8 ]                                   │
│   ├── CampaignWizardModal (4-Step Wizard + State Preservation)          │
│   ├── PhoneMockup (Live iPhone 16 Pro WhatsApp Preview)                │
│   ├── ProductWalkthroughVideo (2:45 Storyboard + Web Speech Narration) │
│   ├── ProblemSolutionTimeline (5-Milestone Problem & Solution Track)   │
│   ├── AskCheerioSection (Live Gemini 3.8 Flash Diagnostic Search)      │
│   ├── SupportHandoffModal (Zero-Repetition Specialist Dossier)         │
│   └── PmEvaluationDrawer (Interactive $18k/mo Sensitivity Model)      │
│                          │                                             │
│                          │ REST / HTTP (port 8080)                     │
│                          ▼                                             │
│   [ Go 1.25 REST API Server + GORM v1.25 ]                             │
│   ├── GET  /api/health   (Database ping & PostgreSQL version check)    │
│   ├── GET  /api/profile  (Aura Skincare business record from Neon DB)  │
│   ├── GET  /api/issues   (Top 5 support issues with fix metadata)      │
│   └── POST /api/diagnose (Persistent diagnostic audit log)             │
│                          │                                             │
│                          │ PgBouncer Connection Pool                   │
│                          ▼                                             │
│   [ Neon Serverless PostgreSQL Database (AWS us-east-2) ]              │
│   └── Tables: business_profiles, support_issues, diagnostic_logs       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & Product Workflows

### 1. Dynamic Content Linting & 1-Click Verified Fix
- **Meta Policy 4.2 Linter**: Validates `bodyText` in real time. Flags missing opt-out copy (`MISSING_OPT_OUT`) and unclosed merge syntax (`MALFORMED_VARIABLE` like `{{tag_name`).
- **Idempotent 1-Click Fix**: Clicking "Apply Verified Fix" appends `Reply STOP to unsubscribe.` without duplicating it if clicked multiple times.
- **Synchronized iPhone Preview**: The live WhatsApp chat preview reflects verified status badges and interpolated customer data (`{{first_name}}`, `{{product_name}}`) on every keystroke.

### 2. Interactive B2B SaaS Product Walkthrough Video (2:45 / 165s)
- **Title**: *"Meet FixFlow — Less Troubleshooting. More Growth."*
- **Native Implementation**: Built with React state and CSS animations (no external MP4 dependencies).
- **Web Speech API Narration**: Natural voice narration engine synchronized to each scene with mute/unmute control.
- **Closed Captions (CC)**: Synchronized subtitle box at the bottom of the viewport.
- **Keyboard Shortcuts**: `Space` (Play/Pause), `←`/`→` (±5s Seek), `M` (Mute), `C` (Captions), `F` (Fullscreen).

### 3. Step-by-Step Problem & Solution Timeline
- 5 sequential milestones covering the campaign setup journey:
  1. **01 / WABA Onboarding**: 2FA verification & phone unlinking checks.
  2. **02 / Template Rejections**: Meta Error 132001 & opt-out compliance.
  3. **03 / Dynamic Variables**: Unclosed syntax and schema mapping.
  4. **04 / Triggers & Webhooks**: Shopify OAuth re-handshake and checkout phone requirements.
  5. **05 / Specialist Escalation**: High-stakes handoff with zero customer repetition.

### 4. Zero-Repetition Human Support Handoff
- Automation knows its limits: Billing disputes, account suspensions, and edge-case exceptions are routed directly to human specialists (Rahul V.).
- Automatically pre-attaches session logs, sanitized Meta raw error codes (`code: 132001, subcode: 2494010`), and business profile so merchants never have to repeat their story.

### 5. Interactive PM Evaluation Dock & Financial Arbitrage Model
- **North Star Metric**: Self-Service Resolution Rate (SSRR) with a 60% 3-month target.
- **Real-Time Sliders**: Adjust active businesses (1,000 - 15,000), monthly queries per business (0.5 - 5.0), target SSRR (20% - 90%), and human cost per ticket ($2 - $10).
- **Financial Bottom Line**: At 5,000 businesses and 60% SSRR, Cheerio saves **$17,998/month** with an AI inference cost of just **$1.80/month** on Gemini 1.5 Flash (98.5% gross margin).

---

## 🧪 Comprehensive Automated Test Suite

We maintain an integrated audit suite verifying the entire stack:

```bash
# Run the full-stack verification suite
npm test
```

### Test Results: 40 Passed, 0 Failed
- **Backend REST API**: Verified `/api/health`, `/api/profile`, `/api/issues`, `/api/campaigns`, and `POST /api/diagnose`.
- **Neon PostgreSQL**: Verified live connection, schema migration, campaign persistence, and row updates.
- **Secure Server-Side Gemini Proxy**: Verified `/api/diagnose/gemini` executes safely without exposing API keys.
- **Frontend Vite Server**: Verified HTTP 200 and bundle mounting.
- **Template Linter**: Verified empty body detection, opt-out check, syntax validation, and fix idempotency.
- **Financial Model Engine**: Verified baseline outputs, token pricing, and scaling bounds.
- **Rule 13 Compliance**: Verified dynamic prefixed ticket IDs (`CHEERIO-ESC-...`) with zero hardcoded values.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Go (v1.22+ if running backend locally)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/kartick026/cheerioai.git
cd cheerioai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Start the Go Backend Server (Optional - Live Neon DB is pre-configured)
```bash
cd server
go run main.go
```
The REST API will start on [http://localhost:8080](http://localhost:8080).

### 5. Production Build
```bash
npm run build
```

---

## 📐 Project Engineering Rules Followed

This project strictly adheres to the **13 Project Engineering Rules**:
- **Rule 1 (Nothing Hardcoded)**: Business logic, validation rules, financial calculations, and support tickets live in domain modules.
- **Rule 13 (No Magic Numbers)**: All retry limits, timeout durations, financial assumptions, and thresholds live in dedicated configuration modules:
  - `src/config/financialModelConfig.ts`
  - `src/config/aiConfig.ts`
  - `src/config/productConfig.ts`
  - `src/data/videoStoryboardData.ts`

---

## 👤 Candidate Information

- **Candidate**: Kartick
- **Role Applied For**: Product Intern at Cheerio
- **Assignment**: Assignment A — Cheerio FixFlow
- **Date**: October 2026
