/**
 * Cheerio FixFlow - Product Walkthrough Video Storyboard
 * 
 * Working title: "Meet FixFlow — Less Troubleshooting. More Growth."
 * Total Run Time: 2 minutes 45 seconds (165 seconds)
 */

export interface StoryboardSubStep {
  id: string
  title: string
  narration: string
  solutionSummary: string
  caption: string
  timestampStart: number
  timestampEnd: number
}

export interface StoryboardScene {
  id: string
  sceneNumber: number
  chapterTitle: string
  sceneTitle: string
  headline: string
  subheadline: string
  openingNarration: string
  timestampStart: number
  timestampEnd: number
  subSteps?: StoryboardSubStep[]
}

export const KAVERI_NATURALS_SEGMENTS = [
  { id: 'seg-1', name: 'Recent Buyers (Last 30 Days)', size: '3,840 contacts', description: 'Customers who ordered in the past 30 days', recommended: true },
  { id: 'seg-2', name: 'High-Value VIP Replenish Club', size: '1,420 contacts', description: '2+ orders with average basket size > $65', recommended: false },
  { id: 'seg-3', name: 'Festival Skincare Shoppers', size: '9,200 contacts', description: 'Seasonal promotional opt-in audience', recommended: false },
]

export const KAVERI_NATURALS_TEMPLATES = [
  {
    id: 'tmpl-1',
    name: 'ceramide_barrier_replenish_v2',
    category: 'MARKETING',
    language: 'en_US',
    status: 'REJECTED',
    statusReason: 'Meta Policy 4.2 Error 132001: Missing mandatory opt-out notice',
    body: 'Hi {{first_name}}, your {{product_name}} is due for replenishment! Enjoy 15% off with code {{discount_code}}.',
  },
  {
    id: 'tmpl-2',
    name: 'order_delivery_utility_update',
    category: 'UTILITY',
    language: 'en_US',
    status: 'APPROVED',
    statusReason: 'Meets Meta utility messaging standards',
    body: 'Your Aura order #{{order_number}} is out for delivery! Track driver in real time here: {{tracking_link}}',
  },
  {
    id: 'tmpl-3',
    name: 'welcome_onboarding_vip_intro',
    category: 'MARKETING',
    language: 'en_US',
    status: 'APPROVED',
    statusReason: 'Pre-approved marketing broadcast with opt-out footer',
    body: 'Welcome to Kaveri Naturals, {{first_name}}! 🌿 Use code {{discount_code}} for 10% off.\n\nReply STOP to unsubscribe.',
  },
]

export const STORYBOARD_SCENES: StoryboardScene[] = [
  {
    id: 'scene-1',
    sceneNumber: 1,
    chapterTitle: '1. The Problem',
    sceneTitle: 'The Problem: Too Many Things Can Go Wrong',
    headline: 'Too Many Things Can Go Wrong',
    subheadline: 'Setting up WhatsApp campaigns shouldn\'t turn founders into debugging engineers.',
    openingNarration:
      "Running a business is already complicated. Setting up WhatsApp campaigns shouldn't make it harder. But sometimes, before you can even reach your customers, you're stuck troubleshooting configuration errors, rejected templates, broken automations, and integrations that refuse to cooperate.",
    timestampStart: 0,
    timestampEnd: 42,
    subSteps: [
      {
        id: 'prob-1',
        title: 'Problem 1: WhatsApp API Onboarding Gets Stuck',
        narration:
          "First, there's onboarding. Business verification, phone-number registration, and display-name issues can prevent a business from getting started. FixFlow is designed to make these obstacles easier to understand, guide customers through supported configuration checks, and identify when they need help from a specialist.",
        solutionSummary: 'Guided checklist explaining Meta Business Manager verification & phone portability checks.',
        caption: 'First, onboarding friction: verification and registered phone issues block businesses from starting.',
        timestampStart: 5,
        timestampEnd: 12,
      },
      {
        id: 'prob-2',
        title: 'Problem 2: Templates Rejected or Stuck in Review',
        narration:
          "Next, a template gets rejected or remains under review. The customer may not know what went wrong or what to do next. FixFlow helps the customer understand the current state, inspect their configuration, and follow the appropriate next step instead of guessing.",
        solutionSummary: 'In-wizard inspection detecting Meta Policy 4.2 opt-out compliance requirements.',
        caption: 'Templates get rejected by Meta with opaque codes. FixFlow explains why instead of guessing.',
        timestampStart: 12,
        timestampEnd: 20,
      },
      {
        id: 'prob-3',
        title: 'Problem 3: Campaigns Sent, but Delivery is Low',
        narration:
          "A campaign can be submitted without reaching every intended customer. The cause may require configuration checks or investigation beyond the user's control. FixFlow shows a diagnostic checklist that separates checks the user can perform from issues requiring platform-side investigation.",
        solutionSummary: 'Separates user-side opt-in/number format checks from platform-side Meta tier limits.',
        caption: 'Sent does not equal delivered. FixFlow isolates merchant checks from carrier-side limits.',
        timestampStart: 20,
        timestampEnd: 27,
      },
      {
        id: 'prob-4',
        title: 'Problem 4: Chatbot Flows Do Not Trigger',
        narration:
          "An automation may fail because a trigger, condition, or configuration isn't behaving as expected. For a non-technical user, finding the exact problem can be difficult. FixFlow provides a guided debugging experience that helps the user inspect the relevant trigger and configuration.",
        solutionSummary: 'Guided trigger debugger flags missing phone payloads and webhook condition mismatches.',
        caption: 'Automation triggers fail silently when customer phone numbers are missing from checkout.',
        timestampStart: 27,
        timestampEnd: 34,
      },
      {
        id: 'prob-5',
        title: 'Problem 5: Integrations & Webhooks Break',
        narration:
          "Finally, integrations can break the connection between customer data and business workflows. Finding the source of the problem shouldn't require the customer to understand every technical detail. FixFlow provides guided integration diagnostics with a clear escalation option when the system cannot safely identify the cause.",
        solutionSummary: 'OAuth re-handshake diagnostics and immediate specialist handoff for custom ERPs.',
        caption: 'Shopify token rotations break webhooks without warning. FixFlow pinpoints the exact failure.',
        timestampStart: 34,
        timestampEnd: 42,
      },
    ],
  },
  {
    id: 'scene-2',
    sceneNumber: 2,
    chapterTitle: '2. Meet FixFlow',
    sceneTitle: 'Introducing FixFlow: Less Troubleshooting. More Growth.',
    headline: 'Meet FixFlow.',
    subheadline:
      'A guided troubleshooting copilot that helps customers understand configuration problems, take the next safe step, and reach a human specialist when needed.',
    openingNarration:
      'Instead of searching through documentation, guessing at the solution, or starting a support conversation from scratch, FixFlow is designed to guide customers through common problems in the product workflow itself.',
    timestampStart: 42,
    timestampEnd: 68,
  },
  {
    id: 'scene-3',
    sceneNumber: 3,
    chapterTitle: '3. Product Demo',
    sceneTitle: 'Step-by-Step Product Demonstration',
    headline: 'Continuous Campaign Creation Walkthrough',
    subheadline: 'From audience selection to deterministic simulated rejection recovery.',
    openingNarration:
      "Let's create a campaign. First, choose the audience you want to reach. FixFlow keeps the setup organized into clear steps so you always know what you need to do next.",
    timestampStart: 68,
    timestampEnd: 122,
    subSteps: [
      {
        id: 'step-1-audience',
        title: 'Step 1: Choose an Audience',
        narration:
          "First, choose the audience you want to reach. FixFlow keeps the setup organized into clear steps so you always know what you need to do next.",
        solutionSummary: 'Select from available customer segments (e.g. Recent Buyers - 30 Days).',
        caption: 'Step 1: Choose audience segment. FixFlow keeps setup organized into clear milestones.',
        timestampStart: 68,
        timestampEnd: 76,
      },
      {
        id: 'step-2-template',
        title: 'Step 2: Choose a WhatsApp Template',
        narration:
          "Next, select the message template. If the template has a problem, its status should remain visible, and the customer should understand why the campaign cannot proceed normally.",
        solutionSummary: 'Inspect template statuses. Notice the rejected replenishment template.',
        caption: 'Step 2: Select template. Status remains visible so the user understands any roadblock.',
        timestampStart: 76,
        timestampEnd: 84,
      },
      {
        id: 'step-3-editor',
        title: 'Step 3: Edit Message & Variables',
        narration:
          "Now customize the message. Variables allow supported customer or product information to be inserted into the template. FixFlow should help users identify configuration problems without requiring them to understand the underlying implementation.",
        solutionSummary: 'Custom variables inserted with syntax validation detecting unclosed brackets.',
        caption: 'Step 3: Customize text. FixFlow lints {{variable}} syntax in real time as you type.',
        timestampStart: 84,
        timestampEnd: 93,
      },
      {
        id: 'step-4-review',
        title: 'Step 4: Review Campaign Configuration',
        narration:
          "Before proceeding, review the campaign configuration. The goal is to catch problems early and make the next action clear.",
        solutionSummary: 'Validation summary checks audience, template, and Meta compliance status.',
        caption: 'Step 4: Pre-flight review. Catches configuration issues before campaign launch.',
        timestampStart: 93,
        timestampEnd: 101,
      },
      {
        id: 'step-5-simulated-error',
        title: 'Step 5: Encounter Simulated Template Rejection',
        narration:
          "Let's see what happens when a template is rejected. Instead of hiding the error or presenting a vague failure, FixFlow shows the configured simulated response and explains what it means for the customer.",
        solutionSummary: 'SimulatedPlatformResponse component displays Meta Error 132001 in plain English.',
        caption: 'Step 5: Simulated rejection. Transparent platform sandbox response makes the issue clear.',
        timestampStart: 101,
        timestampEnd: 110,
      },
      {
        id: 'step-6-recovery',
        title: 'Step 6: Recover Without Losing Progress',
        narration:
          "The customer can return to the relevant step, inspect the problem, and make an appropriate correction without starting over.",
        solutionSummary: 'Previous audience, template, and message text remain 100% intact during editing.',
        caption: 'Step 6: Recover without losing progress. All inputs are safely preserved.',
        timestampStart: 110,
        timestampEnd: 116,
      },
      {
        id: 'step-7-next-action',
        title: 'Step 7: Show the Appropriate Next Action',
        narration:
          "Not every issue can be resolved automatically. FixFlow should make the next step clear, and when a problem needs further investigation, the customer should know when to seek human assistance.",
        solutionSummary: 'Clear guided resolution path with 1-click human escalation available.',
        caption: 'Step 7: Clear next steps. Guidance on safe self-service vs human specialist support.',
        timestampStart: 116,
        timestampEnd: 122,
      },
    ],
  },
  {
    id: 'scene-4',
    sceneNumber: 4,
    chapterTitle: '4. Human Support',
    sceneTitle: 'Why Human Support Still Matters',
    headline: 'Zero-Repetition Specialist Handoff',
    subheadline: 'Automation should know its boundaries. High-stakes cases belong to human experts.',
    openingNarration:
      'Good automation also knows its limits. Billing disputes, security issues, account restrictions, repeated failed attempts, and uncertain diagnoses may require a human specialist. FixFlow packages full context so the customer never has to repeat themselves.',
    timestampStart: 122,
    timestampEnd: 145,
  },
  {
    id: 'scene-5',
    sceneNumber: 5,
    chapterTitle: '5. The Outcome',
    sceneTitle: 'The Outcome: Less Guesswork. Clearer Next Steps.',
    headline: 'Less Guesswork. Clearer Next Steps.',
    subheadline: 'Empowering non-technical founders to launch WhatsApp campaigns with confidence.',
    openingNarration:
      'FixFlow is designed to make troubleshooting easier for non-technical users, reduce avoidable support friction, and preserve the human support customers need when a problem goes beyond self-service.',
    timestampStart: 145,
    timestampEnd: 165,
  },
]
