import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  Minimize2,
  ChevronRight,
  Sparkles,
  Command,
  Info,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  FastForward,
} from 'lucide-react'
import { STORYBOARD_SCENES, StoryboardScene } from '../../data/videoStoryboardData'
import { Scene1Problems } from './scenes/Scene1Problems'
import { Scene2Introduction } from './scenes/Scene2Introduction'
import { Scene3ProductWalkthrough } from './scenes/Scene3ProductWalkthrough'
import { Scene4HumanSupport } from './scenes/Scene4HumanSupport'
import { Scene5Outcome } from './scenes/Scene5Outcome'

interface ProductWalkthroughVideoProps {
  onOpenWizard?: () => void
}

const TOTAL_DURATION = 165 // 2 minutes 45 seconds

export const ProductWalkthroughVideo: React.FC<ProductWalkthroughVideoProps> = ({ onOpenWizard }) => {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [showCaptions, setShowCaptions] = useState<boolean>(true)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpokenKeyRef = useRef<string>('')
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

  // Format seconds to MM:SS
  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = Math.floor(secs % 60)
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`
  }

  // Load available speech voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices()
      }
      updateVoices()
      window.speechSynthesis.onvoiceschanged = updateVoices
    }
  }, [])

  // Determine active scene based on currentTime
  const currentScene: StoryboardScene =
    STORYBOARD_SCENES.find(
      (scene) => currentTime >= scene.timestampStart && currentTime < scene.timestampEnd
    ) || STORYBOARD_SCENES[STORYBOARD_SCENES.length - 1]

  // Determine active sub-step if scene has subSteps
  let currentSubStepIndex = 0
  let currentCaption = currentScene.headline
  let currentNarration = currentScene.openingNarration

  if (currentScene.subSteps && currentScene.subSteps.length > 0) {
    const foundIndex = currentScene.subSteps.findIndex(
      (sub) => currentTime >= sub.timestampStart && currentTime < sub.timestampEnd
    )
    if (foundIndex !== -1) {
      currentSubStepIndex = foundIndex
      currentCaption = currentScene.subSteps[foundIndex].caption
      currentNarration = currentScene.subSteps[foundIndex].narration
    } else if (currentTime < currentScene.subSteps[0].timestampStart) {
      currentSubStepIndex = 0
      currentCaption = currentScene.openingNarration
      currentNarration = currentScene.openingNarration
    } else {
      currentSubStepIndex = currentScene.subSteps.length - 1
      currentCaption = currentScene.subSteps[currentSubStepIndex].caption
      currentNarration = currentScene.subSteps[currentSubStepIndex].narration
    }
  }

  // Audio Narration Engine using SpeechSynthesis
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (!isPlaying || isMuted) {
      window.speechSynthesis.cancel()
      lastSpokenKeyRef.current = ''
      return
    }

    const currentKey = `${currentScene.id}-${currentSubStepIndex}`
    if (currentKey !== lastSpokenKeyRef.current && currentNarration) {
      lastSpokenKeyRef.current = currentKey
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(currentNarration)
      utterance.rate = playbackSpeed === 1 ? 1.05 : 1.25 * playbackSpeed
      utterance.pitch = 1.0

      // Try selecting a natural sounding English voice
      const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices()
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))) ||
        voices.find((v) => v.lang.startsWith('en'))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      window.speechSynthesis.speak(utterance)
    }
  }, [isPlaying, isMuted, currentScene.id, currentSubStepIndex, currentNarration, playbackSpeed])

  // Timer loop for video playback
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25 * playbackSpeed
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false)
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel()
            }
            return TOTAL_DURATION
          }
          return next
        })
      }, 250)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed])

  // Playback control handlers
  const handleTogglePlay = useCallback(() => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0)
      setIsPlaying(true)
    } else {
      setIsPlaying((prev) => !prev)
    }
  }, [currentTime])

  const handleSeek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, TOTAL_DURATION))
    setCurrentTime(clamped)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      lastSpokenKeyRef.current = ''
    }
  }

  const handleJumpToScene = (scene: StoryboardScene) => {
    handleSeek(scene.timestampStart)
    if (!isPlaying) setIsPlaying(true)
  }

  const handleReplay = () => {
    handleSeek(0)
    setIsPlaying(true)
  }

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {})
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {})
    }
  }

  // Listen for fullscreen change events (e.g. Esc key pressed)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault()
        handleTogglePlay()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        handleSeek(currentTime + 5)
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        handleSeek(currentTime - 5)
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        setIsMuted((prev) => !prev)
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        setShowCaptions((prev) => !prev)
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        handleToggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTogglePlay, currentTime])

  // Scrub bar direct click / drag
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    handleSeek(clickRatio * TOTAL_DURATION)
  }

  return (
    <section id="product-walkthrough-video" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Product Walkthrough</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Meet FixFlow — Less Troubleshooting. More Growth.
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Watch the complete 2:45 walkthrough of how FixFlow prevents configuration friction, guides self-service recovery, and escalates with zero-repetition diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => setShowShortcutsHelp((prev) => !prev)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Keyboard shortcuts: Space, Arrows, M, C, F"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Shortcuts</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon" />
              <span>Runtime: 02:45</span>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Helper Drawer */}
        {showShortcutsHelp && (
          <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Video Player Keyboard Shortcuts:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Space: Play/Pause</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">← / → : ±5s Seek</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">M: Mute Audio</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">C: Captions</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">F: Fullscreen</span>
            </div>
          </div>
        )}

        {/* Chapter Navigation Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STORYBOARD_SCENES.map((scene) => {
            const isActive = currentScene.id === scene.id
            const isCompleted = currentTime >= scene.timestampEnd
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleJumpToScene(scene)}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10 text-white'
                    : isCompleted
                    ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    : 'bg-slate-950/30 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500 animate-pulse" />
                )}
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isActive ? 'text-indigo-400 font-bold' : 'text-slate-500'}>
                    {scene.chapterTitle.split('.')[0]}.
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {formatTime(scene.timestampStart)}
                  </span>
                </div>
                <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'group-hover:text-slate-300'}`}>
                  {scene.chapterTitle.split('. ')[1] || scene.chapterTitle}
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Video Presentation Player Container */}
        <div
          ref={containerRef}
          className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex flex-col justify-between ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full min-h-[580px] sm:min-h-[620px]'
          }`}
        >
          {/* Active Scene Display Viewport */}
          <div className="relative flex-1 w-full overflow-hidden flex flex-col">
            {currentScene.id === 'scene-1' && (
              <Scene1Problems
                currentSubStepIndex={currentSubStepIndex}
                onSelectSubStep={(idx) => {
                  if (currentScene.subSteps && currentScene.subSteps[idx]) {
                    handleSeek(currentScene.subSteps[idx].timestampStart)
                  }
                }}
              />
            )}

            {currentScene.id === 'scene-2' && <Scene2Introduction />}

            {currentScene.id === 'scene-3' && (
              <Scene3ProductWalkthrough
                currentSubStepIndex={currentSubStepIndex}
                onSelectSubStep={(idx) => {
                  if (currentScene.subSteps && currentScene.subSteps[idx]) {
                    handleSeek(currentScene.subSteps[idx].timestampStart)
                  }
                }}
              />
            )}

            {currentScene.id === 'scene-4' && <Scene4HumanSupport />}

            {currentScene.id === 'scene-5' && (
              <Scene5Outcome
                onExploreClick={onOpenWizard}
                onReplayClick={handleReplay}
              />
            )}

            {/* Play Overlay when paused and at time 0 */}
            {!isPlaying && currentTime === 0 && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 hover:scale-105 transition-all group"
                  aria-label="Start Product Walkthrough Video"
                >
                  <Play className="w-8 h-8 ml-1 group-hover:scale-110 transition-transform fill-current" />
                </button>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Start Product Walkthrough
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                    2:45 interactive demo covering common WhatsApp configuration problems, FixFlow self-service recovery, and specialist escalation.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Includes natural voice narration & synchronized captions</span>
                </div>
              </div>
            )}

            {/* Synchronized Closed Captions (CC) Overlay */}
            {showCaptions && isPlaying && currentCaption && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-12 sm:right-12 z-20 pointer-events-none flex justify-center">
                <div className="px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-center max-w-2xl animate-fade-in">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                    {currentCaption}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Player Chrome & Control Bar */}
          <div className="bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 p-3 sm:p-4 space-y-2 z-30">
            
            {/* Scrubbable Timeline Progress Bar */}
            <div
              onClick={handleProgressBarClick}
              className="relative w-full h-2.5 bg-slate-800 rounded-full cursor-pointer group hover:h-3.5 transition-all select-none"
            >
              {/* Played Fill */}
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 rounded-full relative"
                style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
              >
                {/* Playhead thumb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
              </div>

              {/* Chapter Markers along the scrub bar */}
              {STORYBOARD_SCENES.map((scene) => (
                <div
                  key={scene.id}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-600 pointer-events-none group-hover:bg-slate-400 transition-colors"
                  style={{ left: `${(scene.timestampStart / TOTAL_DURATION) * 100}%` }}
                  title={`${scene.chapterTitle} (${formatTime(scene.timestampStart)})`}
                />
              ))}
            </div>

            {/* Control Bar Actions */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              
              {/* Left Controls: Play/Pause, Rewind, Timer */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Time Display */}
                <div className="text-slate-300 font-mono text-[11px] sm:text-xs">
                  <span className="font-bold text-white">{formatTime(currentTime)}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-slate-400">{formatTime(TOTAL_DURATION)}</span>
                </div>

                {/* Active Chapter Label */}
                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="font-semibold text-slate-200">{currentScene.chapterTitle}</span>
                </div>
              </div>

              {/* Right Controls: CC, Mute, Speed, Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                
                {/* Captions Toggle */}
                <button
                  type="button"
                  onClick={() => setShowCaptions((prev) => !prev)}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-colors border flex items-center gap-1 ${
                    showCaptions
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                  title="Toggle Closed Captions (C)"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CC</span>
                </button>

                {/* Narration Audio Mute Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isMuted
                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                  title={isMuted ? 'Unmute voice narration (M)' : 'Mute voice narration (M)'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Playback Speed Selector */}
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300 font-semibold transition-colors"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Fullscreen (F)"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
