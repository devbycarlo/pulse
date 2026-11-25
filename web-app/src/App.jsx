import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import NoSleep from 'nosleep.js'
import './App.css'

const STORAGE_KEY = 'pulse.presets.v1'

const DEFAULT_CONFIG = {
  name: 'Quick HIIT',
  prepare: 5,
  warmup: 0,
  work: 30,
  rest: 10,
  rounds: 8,
  sets: 1,
  setRest: 60,
  cooldown: 0,
  voice: true,
  flash: true,
}

function clampInt(value, min, max, fallback) {
  const n = parseInt(value, 10)
  if (Number.isNaN(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function parseTimeInput(value, fallback = 0) {
  if (typeof value === 'number') return Math.max(0, Math.floor(value))
  const raw = String(value ?? '').trim()
  if (!raw) return fallback
  if (raw.includes(':')) {
    const parts = raw.split(':').map((p) => p.trim())
    if (parts.some((p) => p === '' || /[^0-9]/.test(p))) return fallback
    const nums = parts.map((p) => parseInt(p, 10))
    if (nums.length === 2) return Math.max(0, nums[0] * 60 + nums[1])
    if (nums.length === 3) return Math.max(0, nums[0] * 3600 + nums[1] * 60 + nums[2])
    return fallback
  }
  if (/^\d+$/.test(raw)) return Math.max(0, parseInt(raw, 10))
  return fallback
}

function formatTime(seconds) {
  const total = Math.max(0, Math.ceil(seconds))
  const m = Math.floor(total / 60).toString().padStart(2, '0')
  const s = (total % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function formatInputTime(seconds) {
  const total = Math.max(0, Math.floor(seconds))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function buildSequence(config) {
  const seq = []
  const sets = Math.max(1, config.sets || 1)
  const rounds = Math.max(1, config.rounds || 1)

  if (config.prepare > 0) {
    seq.push({ type: 'prepare', label: 'GET READY', duration: config.prepare, set: 0, round: 0, totalRounds: rounds, totalSets: sets })
  }
  if (config.warmup > 0) {
    seq.push({ type: 'warmup', label: 'WARM UP', duration: config.warmup, set: 0, round: 0, totalRounds: rounds, totalSets: sets })
  }

  for (let set = 1; set <= sets; set++) {
    for (let round = 1; round <= rounds; round++) {
      if (config.work > 0) {
        seq.push({ type: 'work', label: 'WORK', duration: config.work, set, round, totalRounds: rounds, totalSets: sets })
      }
      const isLastRoundOfSet = round === rounds
      const isLastSet = set === sets
      if (!isLastRoundOfSet && config.rest > 0) {
        seq.push({ type: 'rest', label: 'REST', duration: config.rest, set, round, totalRounds: rounds, totalSets: sets })
      } else if (isLastRoundOfSet && !isLastSet && config.setRest > 0) {
        seq.push({ type: 'setRest', label: 'SET REST', duration: config.setRest, set, round, totalRounds: rounds, totalSets: sets })
      } else if (isLastRoundOfSet && !isLastSet && config.setRest <= 0 && config.rest > 0) {
        // fallback to rest between sets if no set rest configured
        seq.push({ type: 'rest', label: 'REST', duration: config.rest, set, round, totalRounds: rounds, totalSets: sets })
      }
    }
  }

  if (config.cooldown > 0) {
    seq.push({ type: 'cooldown', label: 'COOL DOWN', duration: config.cooldown, set: sets, round: rounds, totalRounds: rounds, totalSets: sets })
  }

  if (seq.length === 0) {
    seq.push({ type: 'work', label: 'WORK', duration: 30, set: 1, round: 1, totalRounds: 1, totalSets: 1 })
  }
  return seq
}

function phaseColor(type) {
  switch (type) {
    case 'prepare': return '#1d4ed8'
    case 'warmup': return '#b45309'
    case 'work': return '#064e3b'
    case 'rest': return '#7f1d1d'
    case 'setRest': return '#6d28d9'
    case 'cooldown': return '#0e7490'
    case 'done': return '#0f172a'
    default: return '#0f172a'
  }
}

function speak(text, enabled) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1
    u.pitch = 1
    window.speechSynthesis.speak(u)
  } catch {
    // ignore
  }
}

export default function App() {
  const [preventZoom, setPreventZoom] = useState(() => {
    try {
      const v = localStorage.getItem('pulse.preventZoom')
      return v === null ? true : v === 'true'
    } catch {
      return true
    }
  })
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [inputs, setInputs] = useState({
    name: DEFAULT_CONFIG.name,
    prepare: formatInputTime(DEFAULT_CONFIG.prepare),
    warmup: formatInputTime(DEFAULT_CONFIG.warmup),
    work: formatInputTime(DEFAULT_CONFIG.work),
    rest: formatInputTime(DEFAULT_CONFIG.rest),
    rounds: String(DEFAULT_CONFIG.rounds),
    sets: String(DEFAULT_CONFIG.sets),
    setRest: formatInputTime(DEFAULT_CONFIG.setRest),
    cooldown: formatInputTime(DEFAULT_CONFIG.cooldown),
  })
  const [presets, setPresets] = useState([])
  const [selectedPresetId, setSelectedPresetId] = useState('')
  const [setupOpen, setSetupOpen] = useState(false)

  const [sequence, setSequence] = useState(() => buildSequence(DEFAULT_CONFIG))
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState('idle') // idle | running | paused | done
  const [timeLeft, setTimeLeft] = useState(sequence[0]?.duration || DEFAULT_CONFIG.work)
  const [flashOn, setFlashOn] = useState(false)

  // Wake lock
  const wakeLockRef = useRef(null)
  const noSleepRef = useRef(null)
  const noSleepEnabledRef = useRef(false)
  const shouldKeepAwakeRef = useRef(false)
  const requestWakeLockRef = useRef(null)
  const [wakeLockStatus, setWakeLockStatus] = useState('unsupported')

  // Timing/audio refs
  const rafRef = useRef(null)
  const endAtRef = useRef(0)
  const audioCtxRef = useRef(null)
  const lastWholeRef = useRef(null)
  const flashTimeoutRef = useRef(null)
  const fillRef = useRef(null)

  const current = status === 'done' ? null : sequence[index] || null
  const next = status === 'done' ? null : sequence[index + 1] || null

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setPresets(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  const persistPresets = (nextPresets) => {
    setPresets(nextPresets)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPresets)) } catch {}
  }

  const applyConfig = useCallback((nextConfig, opts = { resetTimer: true }) => {
    const merged = {
      ...DEFAULT_CONFIG,
      ...nextConfig,
      prepare: Math.max(0, nextConfig.prepare ?? 0),
      warmup: Math.max(0, nextConfig.warmup ?? 0),
      work: Math.max(1, nextConfig.work ?? 30),
      rest: Math.max(0, nextConfig.rest ?? 0),
      rounds: Math.max(1, nextConfig.rounds ?? 1),
      sets: Math.max(1, nextConfig.sets ?? 1),
      setRest: Math.max(0, nextConfig.setRest ?? 0),
      cooldown: Math.max(0, nextConfig.cooldown ?? 0),
    }
    const seq = buildSequence(merged)
    setConfig(merged)
    setInputs({
      name: merged.name || 'Custom Timer',
      prepare: formatInputTime(merged.prepare),
      warmup: formatInputTime(merged.warmup),
      work: formatInputTime(merged.work),
      rest: formatInputTime(merged.rest),
      rounds: String(merged.rounds),
      sets: String(merged.sets),
      setRest: formatInputTime(merged.setRest),
      cooldown: formatInputTime(merged.cooldown),
    })
    if (opts.resetTimer) {
      setSequence(seq)
      setIndex(0)
      setStatus('idle')
      setTimeLeft(seq[0]?.duration || merged.work)
      lastWholeRef.current = null
    }
    return merged
  }, [])

  const ensureAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume().catch(() => {})
    return audioCtxRef.current
  }, [])

  const playBeep = useCallback((frequency = 880, duration = 0.12, type = 'sine', gain = 0.12) => {
    try {
      const ctx = ensureAudio()
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      g.gain.setValueAtTime(gain, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }, [ensureAudio])

  const triggerFlash = useCallback(() => {
    if (!config.flash) return
    setFlashOn(true)
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    flashTimeoutRef.current = setTimeout(() => setFlashOn(false), 180)
  }, [config.flash])

  const announce = useCallback((step, opts = {}) => {
    if (!step) return
    triggerFlash()
    if (opts.transitionBeep !== false) playBeep(920, 0.18, 'triangle', 0.14)
    if (config.voice) {
      const parts = [step.label]
      if (step.set && step.totalSets > 1) parts.push(`set ${step.set} of ${step.totalSets}`)
      if (step.round && step.totalRounds > 1 && (step.type === 'work' || step.type === 'rest')) parts.push(`round ${step.round} of ${step.totalRounds}`)
      if (opts.prefix) parts.unshift(opts.prefix)
      speak(parts.join('. '), true)
    }
  }, [config.voice, playBeep, triggerFlash])

  const requestWakeLock = useCallback(async () => {
    shouldKeepAwakeRef.current = true
    if (!('wakeLock' in navigator)) {
      try {
        if (!noSleepRef.current) noSleepRef.current = new NoSleep()
        if (!noSleepEnabledRef.current) {
          await noSleepRef.current.enable()
          noSleepEnabledRef.current = true
        }
        setWakeLockStatus('active')
      } catch {
        setWakeLockStatus('unsupported')
      }
      return
    }
    try {
      if (document.visibilityState !== 'visible') return
      if (wakeLockRef.current) { setWakeLockStatus('active'); return }
      const sentinel = await navigator.wakeLock.request('screen')
      wakeLockRef.current = sentinel
      setWakeLockStatus('active')
      sentinel.addEventListener('release', () => {
        if (wakeLockRef.current === sentinel) wakeLockRef.current = null
        if (shouldKeepAwakeRef.current && document.visibilityState === 'visible') {
          requestWakeLockRef.current?.()
        } else if (shouldKeepAwakeRef.current) {
          setWakeLockStatus('inactive')
        }
      })
    } catch {
      try {
        if (!noSleepRef.current) noSleepRef.current = new NoSleep()
        if (!noSleepEnabledRef.current) {
          await noSleepRef.current.enable()
          noSleepEnabledRef.current = true
        }
        setWakeLockStatus('active')
      } catch {
        setWakeLockStatus(wakeLockRef.current || noSleepEnabledRef.current ? 'active' : 'error')
      }
    }
  }, [])

  useEffect(() => { requestWakeLockRef.current = requestWakeLock }, [requestWakeLock])

  const releaseWakeLock = useCallback(async () => {
    shouldKeepAwakeRef.current = false
    if (wakeLockRef.current) {
      try { await wakeLockRef.current.release() } catch {}
      wakeLockRef.current = null
    }
    if (noSleepRef.current && noSleepEnabledRef.current) {
      try { noSleepRef.current.disable() } catch {}
      noSleepEnabledRef.current = false
    }
    setWakeLockStatus('inactive')
  }, [])

  useEffect(() => {
    shouldKeepAwakeRef.current = true
    const onVis = () => { if (shouldKeepAwakeRef.current && document.visibilityState === 'visible') requestWakeLock() }
    requestWakeLock()
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onVis)
    window.addEventListener('pageshow', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onVis)
      window.removeEventListener('pageshow', onVis)
      shouldKeepAwakeRef.current = false
    }
  }, [requestWakeLock])

  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const finishWorkout = useCallback(() => {
    stopLoop()
    setStatus('done')
    setTimeLeft(0)
    triggerFlash()
    playBeep(740, 0.18, 'triangle', 0.14)
    setTimeout(() => playBeep(988, 0.25, 'triangle', 0.14), 120)
    speak('Workout complete', config.voice)
  }, [config.voice, playBeep, speak, stopLoop, triggerFlash])

  const goToStep = useCallback((nextIndex, opts = {}) => {
    if (nextIndex >= sequence.length) {
      finishWorkout()
      return
    }
    const step = sequence[nextIndex]
    setIndex(nextIndex)
    setTimeLeft(step.duration)
    endAtRef.current = performance.now() + step.duration * 1000
    lastWholeRef.current = Math.ceil(step.duration)
    if (opts.announce !== false) announce(step)
  }, [announce, finishWorkout, sequence])

  const tick = useCallback((now) => {
    if (status !== 'running') return
    const remaining = Math.max(0, (endAtRef.current - now) / 1000)
    setTimeLeft(remaining)

    // Paint the meter straight from the animation clock. Relying on React's
    // state render plus a CSS width transition made the bar appear frozen
    // until a status change (pause/resume) forced a fresh paint.
    if (fillRef.current && sequence.length) {
      const before = sequence.slice(0, index).reduce((sum, step) => sum + step.duration, 0)
      const total = sequence.reduce((sum, step) => sum + step.duration, 0)
      const stepDuration = sequence[index]?.duration || 0
      const elapsed = before + Math.max(0, stepDuration - remaining)
      const pct = total > 0 ? Math.min(100, Math.max(0, (elapsed / total) * 100)) : 0
      fillRef.current.style.width = `${pct}%`
    }

    const whole = Math.ceil(remaining)
    if (whole !== lastWholeRef.current && whole >= 0) {
      lastWholeRef.current = whole
      if (whole > 0) {
        if (whole <= 3) {
          const f = whole === 3 ? 880 : whole === 2 ? 700 : 560
          playBeep(f, 0.1, 'sine', 0.14)
        } else {
          // Ticking sound every second
          playBeep(1200, 0.03, 'square', 0.035)
        }
      }
    }
    if (remaining <= 0.01) {
      const nextIndex = index + 1
      if (nextIndex >= sequence.length) {
        finishWorkout()
        return
      }
      goToStep(nextIndex)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [finishWorkout, goToStep, index, playBeep, sequence, status])

  useEffect(() => {
    if (status === 'running') {
      rafRef.current = requestAnimationFrame(tick)
      return () => stopLoop()
    }
    stopLoop()
    return undefined
  }, [status, tick, stopLoop])

  useEffect(() => {
    const bg = status === 'done' ? phaseColor('done') : phaseColor(current?.type)
    document.body.style.backgroundColor = bg
  }, [current, status])

  useEffect(() => () => {
    stopLoop()
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
  }, [stopLoop])

  useEffect(() => {
    try { localStorage.setItem('pulse.preventZoom', String(preventZoom)) } catch {}
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) {
      meta.setAttribute(
        'content',
        preventZoom
          ? 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
          : 'width=device-width, initial-scale=1.0, viewport-fit=cover'
      )
    }
    document.documentElement.style.touchAction = preventZoom ? 'manipulation' : ''
  }, [preventZoom])

  const readConfigFromInputs = useCallback(() => {
    const next = {
      name: (inputs.name || 'Custom Timer').trim() || 'Custom Timer',
      prepare: parseTimeInput(inputs.prepare, 0),
      warmup: parseTimeInput(inputs.warmup, 0),
      work: Math.max(1, parseTimeInput(inputs.work, 30)),
      rest: Math.max(0, parseTimeInput(inputs.rest, 0)),
      rounds: clampInt(inputs.rounds, 1, 999, 1),
      sets: clampInt(inputs.sets, 1, 99, 1),
      setRest: Math.max(0, parseTimeInput(inputs.setRest, 0)),
      cooldown: Math.max(0, parseTimeInput(inputs.cooldown, 0)),
      voice: config.voice,
      flash: config.flash,
    }
    return applyConfig(next)
  }, [applyConfig, config.flash, config.voice, inputs])

  const start = async () => {
    await requestWakeLock()
    ensureAudio()
    const cfg = status === 'idle' ? readConfigFromInputs() : config
    let seq = sequence
    let startIndex = index
    if (status === 'idle' || status === 'done') {
      seq = buildSequence(cfg)
      setSequence(seq)
      startIndex = 0
      setIndex(0)
      setTimeLeft(seq[0].duration)
      endAtRef.current = performance.now() + seq[0].duration * 1000
      lastWholeRef.current = Math.ceil(seq[0].duration)
      announce(seq[0], { prefix: 'Start' })
    } else {
      // resume
      endAtRef.current = performance.now() + timeLeft * 1000
      if (config.voice) speak('Resumed', true)
    }
    setStatus('running')
  }

  const pause = () => {
    if (status !== 'running') return
    setStatus('paused')
    stopLoop()
    if (config.voice) speak('Paused', true)
  }

  const reset = () => {
    stopLoop()
    const seq = buildSequence(config)
    setSequence(seq)
    setIndex(0)
    setStatus('idle')
    setTimeLeft(seq[0]?.duration || config.work)
    lastWholeRef.current = null
  }

  const skip = (dir) => {
    if (status === 'idle' || status === 'done') return
    const nextIndex = index + dir
    if (nextIndex < 0) {
      goToStep(0)
      return
    }
    if (nextIndex >= sequence.length) {
      finishWorkout()
      return
    }
    goToStep(nextIndex)
    if (status === 'paused') {
      endAtRef.current = performance.now() + sequence[nextIndex].duration * 1000
    }
  }

  const restartInterval = () => {
    if (!current) return
    setTimeLeft(current.duration)
    endAtRef.current = performance.now() + current.duration * 1000
    lastWholeRef.current = Math.ceil(current.duration)
    triggerFlash()
    playBeep(760, 0.1, 'sine', 0.1)
  }

  const savePreset = () => {
    const cfg = readConfigFromInputs()
    const name = cfg.name || 'Custom Timer'
    const existingIdx = presets.findIndex((p) => p.id === selectedPresetId)
    let nextPresets
    if (existingIdx >= 0) {
      nextPresets = presets.map((p) => (p.id === selectedPresetId ? { ...p, ...cfg, name } : p))
    } else {
      const id = uid()
      nextPresets = [{ id, ...cfg, name }, ...presets]
      setSelectedPresetId(id)
    }
    persistPresets(nextPresets)
  }

  const loadPreset = (id) => {
    const p = presets.find((x) => x.id === id)
    if (!p) return
    setSelectedPresetId(id)
    applyConfig({ ...DEFAULT_CONFIG, ...p }, { resetTimer: true })
  }

  const deletePreset = (id) => {
    const nextPresets = presets.filter((p) => p.id !== id)
    persistPresets(nextPresets)
    if (selectedPresetId === id) setSelectedPresetId('')
  }

  const newPreset = () => {
    setSelectedPresetId('')
    applyConfig({ ...DEFAULT_CONFIG, name: 'Custom Timer' })
  }

  const totalDuration = useMemo(() => sequence.reduce((a, s) => a + s.duration, 0), [sequence])
  const elapsed = useMemo(() => {
    if (status === 'done') return totalDuration
    if (!current) return 0
    const before = sequence.slice(0, index).reduce((a, s) => a + s.duration, 0)
    return before + Math.max(0, current.duration - timeLeft)
  }, [current, index, sequence, status, timeLeft, totalDuration])

  const progress = totalDuration > 0 ? Math.min(1, Math.max(0, elapsed / totalDuration)) : 0
  const intervalProgress = current && current.duration > 0 ? Math.min(1, Math.max(0, (current.duration - timeLeft) / current.duration)) : 0

  // While running the rAF loop paints the meter directly (see tick). For
  // idle/paused/done, keep it in sync with the derived progress value.
  useLayoutEffect(() => {
    if (status !== 'running' && fillRef.current) {
      fillRef.current.style.width = `${progress * 100}%`
    }
  }, [progress, status])

  const isIdle = status === 'idle'
  const displayLabel = status === 'done' ? 'DONE' : status === 'idle' ? 'READY' : (current?.label || 'READY')
  const displayType = status === 'done' ? 'done' : status === 'idle' ? 'idle' : (current?.type || 'idle')

  const roundInfo = (() => {
    if (status === 'done') return 'Workout complete'
    if (!current || current.type === 'prepare' || current.type === 'warmup' || current.type === 'cooldown') {
      if (next && next.round) return `Next: Round ${next.round}/${next.totalRounds}${next.totalSets > 1 ? ` · Set ${next.set}/${next.totalSets}` : ''}`
      return 'Press start to begin'
    }
    if (current.totalSets > 1) return `Round ${current.round}/${current.totalRounds} · Set ${current.set}/${current.totalSets}`
    return `Round ${current.round}/${current.totalRounds}`
  })()

  const nextInfo = (() => {
    if (status === 'done') return 'Nice work!'
    if (!next) return status === 'running' || status === 'paused' ? 'Last interval' : 'Configure your workout'
    return `Next: ${next.label} ${formatTime(next.duration)}`
  })()

  const wakeText = wakeLockStatus === 'active' ? 'Screen Awake' : 'Tap to Keep Awake'
  const wakeClass = `wake-lock-indicator ${wakeLockStatus === 'active' ? 'active' : wakeLockStatus === 'error' ? 'wake-lock-error' : wakeLockStatus === 'unsupported' ? 'wake-lock-not-supported' : 'inactive'}`
  const displayTime = formatTime(status === 'idle' ? (sequence[0]?.duration || config.work) : timeLeft)
  const timeClass = `time-display${displayTime.length > 5 ? ' time-display--long' : ''}`

  const onInput = (key) => (e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <div className={`app-shell ${flashOn ? 'flash' : ''}`}>
      <div className="app-container">
        <div className="timer-section">
          <div className={`phase text-${displayType}`}>{displayLabel}</div>
          <div className={timeClass}>{displayTime}</div>
          <div className="round-info">{roundInfo}</div>
          <div className="next-info">{nextInfo}</div>

          <div className="progress-wrap" aria-label="Workout progress">
            <div className="progress-bar"><div className="progress-fill" ref={fillRef} /></div>
            <div className="progress-meta">
              <span>{formatTime(elapsed)} / {formatTime(totalDuration)}</span>
              <span>Interval {Math.round(intervalProgress * 100)}%</span>
            </div>
          </div>

          <div className={wakeClass} onClick={() => requestWakeLock()} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') requestWakeLock() }} role="button" tabIndex={0} title="Keep screen awake">
            <div className={`wake-lock-icon ${wakeLockStatus === 'active' ? 'active' : 'inactive'}`}></div>
            <span className="wake-lock-text">{wakeText}</span>
          </div>
        </div>

        <div className="side-panel">
          <div className={`panel-card accordion ${setupOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="accordion-header"
              onClick={() => setSetupOpen((o) => !o)}
              aria-expanded={setupOpen}
              aria-controls="workout-setup-content"
            >
              <div className="accordion-title-wrap">
                <h2>Workout Setup</h2>
                <span className="accordion-summary">{inputs.name || 'Custom Timer'} · {formatTime(totalDuration)}</span>
              </div>
              <span className={`accordion-chevron ${setupOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
            </button>

            <div id="workout-setup-content" className="accordion-content">
              <div className="accordion-body">
                <div className="toggles toggles-inline">
                  <label className="toggle"><input type="checkbox" checked={config.voice} onChange={(e) => setConfig((c) => ({ ...c, voice: e.target.checked }))} /> Voice</label>
                  <label className="toggle"><input type="checkbox" checked={config.flash} onChange={(e) => setConfig((c) => ({ ...c, flash: e.target.checked }))} /> Flash</label>
                  <label className="toggle" title="Disable pinch/double-tap zoom on mobile (better for app-like use; turn off for accessibility)">
                    <input type="checkbox" checked={preventZoom} onChange={(e) => setPreventZoom(e.target.checked)} /> Prevent Zoom
                  </label>
                </div>

                <div className="settings-grid settings-grid-advanced">
                  <div className="input-group input-wide">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={inputs.name} disabled={!isIdle} onChange={onInput('name')} placeholder="Workout name" />
                  </div>
                  <div className="input-group"><label htmlFor="prepare">Prepare</label><input id="prepare" type="text" value={inputs.prepare} disabled={!isIdle} onChange={onInput('prepare')} placeholder="0:05" /></div>
                  <div className="input-group"><label htmlFor="warmup">Warm-up</label><input id="warmup" type="text" value={inputs.warmup} disabled={!isIdle} onChange={onInput('warmup')} placeholder="0:00" /></div>
                  <div className="input-group"><label htmlFor="work">Work</label><input id="work" type="text" value={inputs.work} disabled={!isIdle} onChange={onInput('work')} placeholder="0:30" /></div>
                  <div className="input-group"><label htmlFor="rest">Rest</label><input id="rest" type="text" value={inputs.rest} disabled={!isIdle} onChange={onInput('rest')} placeholder="0:10" /></div>
                  <div className="input-group"><label htmlFor="rounds">Rounds</label><input id="rounds" type="number" min="1" value={inputs.rounds} disabled={!isIdle} onChange={onInput('rounds')} /></div>
                  <div className="input-group"><label htmlFor="sets">Sets</label><input id="sets" type="number" min="1" value={inputs.sets} disabled={!isIdle} onChange={onInput('sets')} /></div>
                  <div className="input-group"><label htmlFor="setRest">Set Rest</label><input id="setRest" type="text" value={inputs.setRest} disabled={!isIdle} onChange={onInput('setRest')} placeholder="1:00" /></div>
                  <div className="input-group"><label htmlFor="cooldown">Cool-down</label><input id="cooldown" type="text" value={inputs.cooldown} disabled={!isIdle} onChange={onInput('cooldown')} placeholder="0:00" /></div>
                </div>

                <div className="hint">Times use seconds or mm:ss. Configure prepare, warm-up/cool-down, and sets/cycles for Timer Plus-style workouts.</div>
              </div>
            </div>
          </div>

          <div className="controls primary-controls">
            {status === 'running' ? (
              <button className="btn-primary" onClick={pause}>Pause</button>
            ) : (
              <button className="btn-primary" onClick={start}>{status === 'paused' ? 'Resume' : status === 'done' ? 'Restart' : 'Start Workout'}</button>
            )}
          </div>

          <div className="controls secondary-controls compact-controls">
            <button className="btn-secondary" onClick={reset}>Reset</button>
            <button className="btn-secondary" onClick={() => skip(-1)} disabled={isIdle || status === 'done'}>Prev</button>
            <button className="btn-secondary" onClick={restartInterval} disabled={isIdle || status === 'done'}>Restart Int.</button>
            <button className="btn-secondary" onClick={() => skip(1)} disabled={isIdle || status === 'done'}>Skip</button>
          </div>

          <div className="panel-card presets-card">
            <div className="panel-header">
              <h2>Saved Timers</h2>
              <div className="preset-actions">
                <button className="btn-mini" onClick={newPreset} disabled={!isIdle}>New</button>
                <button className="btn-mini" onClick={savePreset} disabled={!isIdle}>Save</button>
              </div>
            </div>
            {presets.length === 0 ? (
              <div className="empty-presets">No saved timers yet. Set up a workout and tap Save.</div>
            ) : (
              <ul className="preset-list">
                {presets.map((p) => {
                  const summary = `${p.work}s/${p.rest}s · ${p.rounds}r${p.sets > 1 ? ` · ${p.sets}s` : ''}`
                  return (
                    <li key={p.id} className={`preset-item ${selectedPresetId === p.id ? 'selected' : ''}`}>
                      <button className="preset-load" onClick={() => loadPreset(p.id)} disabled={!isIdle}>
                        <span className="preset-name">{p.name}</span>
                        <span className="preset-meta">{summary}</span>
                      </button>
                      <button className="preset-delete" onClick={() => deletePreset(p.id)} disabled={!isIdle} aria-label={`Delete ${p.name}`}>×</button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
