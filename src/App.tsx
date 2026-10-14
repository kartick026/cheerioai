import React, { useState, useEffect, lazy, Suspense } from 'react'
import { CheerioNavbar } from './components/layout/CheerioNavbar'
import { InterviewerGuideBanner } from './components/sections/InterviewerGuideBanner'
import { CheerioHero } from './components/sections/CheerioHero'
import { CoreJourneyCards } from './components/sections/CoreJourneyCards'
import { AskCheerioSection } from './components/sections/AskCheerioSection'
import { WorkflowSection } from './components/sections/WorkflowSection'
import { IntegrationsSection } from './components/sections/IntegrationsSection'
import { ComparisonSection } from './components/sections/ComparisonSection'
import { ProblemSolutionTimeline } from './components/sections/ProblemSolutionTimeline'
import { InAppPortal } from './components/portal/InAppPortal'
import { ActivatedCampaignPayload } from './components/wizard/CampaignWizardModal'
import { AURA_SKINCARE_PROFILE, TOP_5_SUPPORT_ISSUES, DEFAULT_CAMPAIGNS } from './data/mockData'
import { SupportIssue, BusinessProfile, CampaignRecord, EscalationDossier } from './types'
import { UI_TIMINGS } from './config/productConfig'
import {
  checkBackendHealth,
  fetchBusinessProfile,
  fetchCampaigns,
  persistCampaign,
  logDiagnosticEvent,
} from './services/apiService'
import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react'

// Code-split heavy interactive modals and video scenes to optimize initial load & bundle size
const ProductWalkthroughVideo = lazy(() =>
  import('./components/video/ProductWalkthroughVideo').then((m) => ({ default: m.ProductWalkthroughVideo }))
)
const CampaignWizardModal = lazy(() =>
  import('./components/wizard/CampaignWizardModal').then((m) => ({ default: m.CampaignWizardModal }))
)
const SupportHandoffModal = lazy(() =>
  import('./components/escalation/SupportHandoffModal').then((m) => ({ default: m.SupportHandoffModal }))
)
const ActivationSuccessModal = lazy(() =>
  import('./components/wizard/ActivationSuccessModal').then((m) => ({ default: m.ActivationSuccessModal }))
)
const PmEvaluationDrawer = lazy(() =>
  import('./components/pm-dock/PmEvaluationDrawer').then((m) => ({ default: m.PmEvaluationDrawer }))
)
const RecruiterTourModal = lazy(() =>
  import('./components/modals/RecruiterTourModal').then((m) => ({ default: m.RecruiterTourModal }))
)
const IssueResolutionModal = lazy(() =>
  import('./components/modals/IssueResolutionModal').then((m) => ({ default: m.IssueResolutionModal }))
)

export function App() {
  const [profile, setProfile] = useState<BusinessProfile>(AURA_SKINCARE_PROFILE)
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(DEFAULT_CAMPAIGNS)
  const [activeTicket, setActiveTicket] = useState<EscalationDossier | null>(null)
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<'WEBSITE' | 'PORTAL'>('WEBSITE')
  const [isEvaluatorMode, setIsEvaluatorMode] = useState<boolean>(true)

  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false)
  const [isHandoffOpen, setIsHandoffOpen] = useState<boolean>(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false)
  const [isPmDrawerOpen, setIsPmDrawerOpen] = useState<boolean>(false)
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)
  const [isIssueModalOpen, setIsIssueModalOpen] = useState<boolean>(false)

  // Wizard draft state for editing/resuming
  const [wizardInitialStep, setWizardInitialStep] = useState<number>(1)
  const [wizardDraft, setWizardDraft] = useState<Partial<ActivatedCampaignPayload> | undefined>(undefined)

  // Simulated roadblock state (Default true to showcase the Stuck Detector in action)
  const [isErrorActive, setIsErrorActive] = useState<boolean>(true)
  const [activeIssue, setActiveIssue] = useState<SupportIssue>(TOP_5_SUPPORT_ISSUES[0])

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Synchronize with Neon DB Go REST Backend on mount
  useEffect(() => {
    let isMounted = true
    const initBackend = async () => {
      const health = await checkBackendHealth()
      if (!isMounted) return
      setIsDbConnected(health.isOnline)
      if (health.isOnline) {
        const { profile: liveProfile } = await fetchBusinessProfile()
        if (isMounted && liveProfile) {
          setProfile(liveProfile)
        }
        const { campaigns: liveCampaigns } = await fetchCampaigns()
        if (isMounted && liveCampaigns && liveCampaigns.length > 0) {
          setCampaigns(liveCampaigns)
        }
      }
    }
    initBackend()
    return () => {
      isMounted = false
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), UI_TIMINGS.TOAST_DURATION_MS)
  }

  const handleStartSetup = () => {
    setWizardInitialStep(1)
    setWizardDraft(undefined)
    setIsWizardOpen(true)
  }

  const handleResumeDraft = (campaign: CampaignRecord) => {
    setWizardDraft({
      name: campaign.name,
      templateBody: campaign.templateBody,
      delayDays: campaign.delayDays,
      productName: campaign.productName,
      discountCode: campaign.discountCode,
    })
    setWizardInitialStep(campaign.status === 'DRAFT_ROADBLOCK' ? 3 : 1)
    setIsWizardOpen(true)
  }

  const handleApplyVerifiedFix = () => {
    setIsErrorActive(false)
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.status === 'DRAFT_ROADBLOCK') {
          const updated = {
            ...c,
            status: 'DRAFT_READY' as const,
            activeRoadblock: undefined,
            lastUpdated: 'Just now',
          }
          persistCampaign(updated)
          return updated
        }
        return c
      })
    )
    logDiagnosticEvent({
      userQuery: 'Apply Verified Fix: WhatsApp opt-out compliance restored',
      errorCode: activeIssue?.code || 'META_TEMPLATE_REJECT_OPT_OUT',
      isResolved: true,
      resolvedBy: 'FixFlow 1-Click Autonomous Healing Engine',
    })
    showToast('✨ FixFlow Verified Solution Applied: WhatsApp opt-out compliance restored!')
  }

  const handleSuccessActivate = (payload: ActivatedCampaignPayload) => {
    setIsWizardOpen(false)
    setIsSuccessOpen(true)
    setProfile((prev) => ({
      ...prev,
      activeAutomations: prev.activeAutomations + 1,
    }))
    setCampaigns((prev) => {
      const idx = prev.findIndex(
        (c) => c.id === 'camp-replenish-1' || c.status === 'DRAFT_ROADBLOCK' || c.status === 'DRAFT_READY'
      )
      if (idx !== -1) {
        const updated = [...prev]
        const activated: CampaignRecord = {
          ...updated[idx],
          name: payload.name,
          status: 'ACTIVE',
          lastUpdated: 'Just now',
          delayDays: payload.delayDays,
          templateBody: payload.templateBody,
          productName: payload.productName,
          discountCode: payload.discountCode,
          activeRoadblock: undefined,
        }
        updated[idx] = activated
        persistCampaign(activated)
        return updated
      }
      const newCampaign: CampaignRecord = {
        id: `c-${Date.now()}`,
        name: payload.name,
        type: 'AUTOMATION',
        trigger: 'Shopify: Order Fulfilled',
        delayDays: payload.delayDays,
        templateBody: payload.templateBody,
        productName: payload.productName,
        discountCode: payload.discountCode,
        status: 'ACTIVE',
        lastUpdated: 'Just now',
        targetAudienceCount: 1420,
      }
      persistCampaign(newCampaign)
      return [newCampaign, ...prev]
    })
    logDiagnosticEvent({
      userQuery: `Campaign Activated: ${payload.name}`,
      errorCode: 'NONE',
      isResolved: true,
      resolvedBy: 'Maya Sharma via FixFlow Setup Wizard',
    })
    showToast(`🚀 Campaign "${payload.name}" is now live!`)
  }

  const handleDispatchTicket = (dossier: EscalationDossier) => {
    setActiveTicket(dossier)
    setProfile((prev) => ({
      ...prev,
      openSupportTickets: prev.openSupportTickets + 1,
    }))
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.status === 'DRAFT_ROADBLOCK' || c.id === 'camp-replenish-1') {
          return {
            ...c,
            activeRoadblock: `Escalated #${dossier.ticketId}: Assigned to ${dossier.assignedAgent}`,
            lastUpdated: 'Just now',
          }
        }
        return c
      })
    )
    logDiagnosticEvent({
      userQuery: `Zero-Repetition Escalation Dispatched: ${dossier.ticketId}`,
      errorCode: dossier.errorCode,
      isResolved: false,
      resolvedBy: `Queued for ${dossier.assignedAgent}`,
    })
    showToast(`🎫 Support Ticket #${dossier.ticketId} created with complete system trace!`)
  }

  const handleOpenTicketDossier = () => {
    setIsHandoffOpen(true)
  }

  // Contextual issue routing: Template rejection opens Wizard; other 4 issues open dedicated resolution modal
  const handleSelectIssue = (issue: SupportIssue) => {
    setActiveIssue(issue)
    if (
      issue.category === 'TEMPLATE_REJECTION' ||
      issue.code.includes('132001') ||
      issue.code.includes('OPT_OUT')
    ) {
      setIsErrorActive(true)
      setIsWizardOpen(true)
    } else {
      setIsIssueModalOpen(true)
    }
  }

  const handleResetDemo = () => {
    setProfile(AURA_SKINCARE_PROFILE)
    setIsErrorActive(true)
    setActiveIssue(TOP_5_SUPPORT_ISSUES[0])
    setCampaigns(DEFAULT_CAMPAIGNS)
    setActiveTicket(null)
    setWizardInitialStep(1)
    setWizardDraft(undefined)
    showToast('Demo state reset to initial baseline.')
  }

  return (
    <div className="cheerio-bg min-h-screen text-slate-900 font-sans selection:bg-purple-500/20 selection:text-purple-900">
      
      {/* Top Floating Cheerio Pill Navbar with Perspective Switcher & Evaluator Toggle */}
      <CheerioNavbar
        onOpenPmDrawer={() => setIsPmDrawerOpen(true)}
        onOpenWizard={handleStartSetup}
        onOpenTour={() => setIsTourOpen(true)}
        onToggleDemoError={() => {
          setIsErrorActive(!isErrorActive)
          showToast(isErrorActive ? 'Simulated error disabled.' : '⚠️ Simulated Meta Compliance Error enabled.')
        }}
        isErrorActive={isErrorActive}
        currentView={currentView}
        onToggleView={(view) => setCurrentView(view)}
        isEvaluatorMode={isEvaluatorMode}
        onToggleEvaluatorMode={() => setIsEvaluatorMode(!isEvaluatorMode)}
      />

      {/* Evaluator Quick-Start Banner (Visible only in Evaluator Mode) */}
      {isEvaluatorMode && (
        <InterviewerGuideBanner
          onStartDemo={handleStartSetup}
          onOpenPmDock={() => setIsPmDrawerOpen(true)}
          onOpenTour={() => setIsTourOpen(true)}
          isDbConnected={isDbConnected}
        />
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-24 right-8 z-50 bg-white/95 border border-purple-300 text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Render: Website Showcase vs Maya's In-App Portal */}
      {currentView === 'WEBSITE' ? (
        <main className="space-y-4 sm:space-y-10 pb-16">
          {/* Section 1: Hero */}
          <CheerioHero
            onStartSetup={handleStartSetup}
            onOpenPmDrawer={() => setIsPmDrawerOpen(true)}
          />

          {/* Section 2: Interactive Product Walkthrough Video Player (165s / 2:45) */}
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-400">Loading Walkthrough Player...</div>}>
            <ProductWalkthroughVideo onOpenWizard={handleStartSetup} />
          </Suspense>

          {/* Section 3: Core Journey Cards */}
          <CoreJourneyCards
            onOpenWizard={handleStartSetup}
            onOpenPmDock={() => setIsPmDrawerOpen(true)}
          />

          {/* Section 4: Problem vs Solution Timeline */}
          <ProblemSolutionTimeline
            onOpenWizard={handleStartSetup}
            onOpenPmDock={() => setIsPmDrawerOpen(true)}
          />

          {/* Section 5: Ask Cheerio Autonomous Diagnostics */}
          <AskCheerioSection
            onSelectIssue={handleSelectIssue}
            onOpenWizard={handleStartSetup}
          />

          {/* Section 6: Workflow Interactive Demonstration */}
          <WorkflowSection
            onOpenWizard={handleStartSetup}
            isErrorActive={isErrorActive}
          />

          {/* Section 7: Integrations (Shopify & Meta) */}
          <IntegrationsSection />

          {/* Section 8: Feature Comparison Matrix */}
          <ComparisonSection
            onOpenWizard={handleStartSetup}
          />
        </main>
      ) : (
        <main className="pb-16">
          <InAppPortal
            profile={profile}
            isErrorActive={isErrorActive}
            activeIssue={activeIssue}
            campaigns={campaigns}
            activeTicket={activeTicket}
            isDbConnected={isDbConnected}
            onStartSetup={handleStartSetup}
            onResumeDraft={handleResumeDraft}
            onSelectIssue={handleSelectIssue}
            onApplyVerifiedFix={handleApplyVerifiedFix}
            onOpenPmDrawer={() => setIsPmDrawerOpen(true)}
            onOpenTicketDossier={handleOpenTicketDossier}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Cheerio AI FixFlow</span>
            <span>•</span>
            <span>Product Intern Assignment (Assignment A)</span>
          </div>
          <div className="text-slate-500 font-medium">
            Candidate: Kartick • Official Meta Business Solution Provider
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Right PM Evaluator Dock Trigger (Visible only in Evaluator Mode) */}
      {isEvaluatorMode && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsPmDrawerOpen(true)}
            className="cheerio-btn-primary px-4 py-3 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 pulse-glow"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="text-left pr-1">
              <div className="text-[10px] text-purple-200 uppercase tracking-wider font-semibold">Evaluator Console</div>
              <div className="text-xs text-white">Interactive Model & Rubric ($18k/mo Saved)</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-purple-200" />
          </button>
        </div>
      )}

      {/* Lazy Suspense Wrapper for Modals */}
      <Suspense fallback={null}>
        {/* 4-Step Interactive Setup Wizard with Live Phone Preview */}
        <CampaignWizardModal
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
          onSuccessActivate={handleSuccessActivate}
          onOpenHandoff={() => {
            setIsWizardOpen(false)
            setIsHandoffOpen(true)
          }}
          isErrorActive={isErrorActive}
          onApplyVerifiedFix={handleApplyVerifiedFix}
          initialStep={wizardInitialStep}
          initialDraft={wizardDraft}
        />

        {/* Dedicated Contextual Resolution Modal for Non-Campaign Issues */}
        <IssueResolutionModal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
          issue={activeIssue}
          onOpenHandoff={() => {
            setIsIssueModalOpen(false)
            setIsHandoffOpen(true)
          }}
          onResolutionSuccess={(code) => {
            showToast(`✨ FixFlow verified fix applied for ${code}!`)
            setIsErrorActive(false)
          }}
        />

        {/* Zero-Repetition Human Support Handoff Modal */}
        <SupportHandoffModal
          isOpen={isHandoffOpen}
          onClose={() => setIsHandoffOpen(false)}
          activeIssue={activeIssue}
          existingTicket={activeTicket}
          onDispatchTicket={handleDispatchTicket}
        />

        {/* Celebratory Activation Modal */}
        <ActivationSuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
        />

        {/* PM Evaluation Console Drawer */}
        <PmEvaluationDrawer
          isOpen={isPmDrawerOpen}
          onClose={() => setIsPmDrawerOpen(false)}
          onResetDemo={handleResetDemo}
          onToggleError={() => {
            setIsErrorActive(!isErrorActive)
            showToast(isErrorActive ? 'Simulated error disabled.' : '⚠️ Simulated error enabled.')
          }}
          isErrorActive={isErrorActive}
        />

        {/* Recruiter & Evaluator 60-Second Fast Tour Modal */}
        <RecruiterTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onLaunchWizard={handleStartSetup}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          onOpenPmDock={() => setIsPmDrawerOpen(true)}
        />
      </Suspense>

    </div>
  )
}

export default App
