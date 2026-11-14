import { useState, useRef, useCallback, useEffect } from 'react'
import NoSleep from 'nosleep.js'
import './App.css'

export default function App() {
  // Wake Lock API - use refs to persist across renders
  const wakeLockRef = useRef(null)
  const noSleepRef = useRef(null)
  const noSleepEnabledRef = useRef(false)
  const shouldKeepAwakeRef = useRef(false)

  // Settings state
  const [workDuration, setWorkDuration] = useState(30)
  const [restDuration, setRestDuration] = useState(10)
  const [totalRounds, setTotalRounds] = useState(8)

  // Timer state
  const [currentPhase, setCurrentPhase] = useState('idle') // 'idle' | 'work' | 'rest' | 'done'
  const [timeLeft, setTimeLeft] = useState(workDuration)
  const [currentRound, setCurrentRound] = useState(1)
  const [timerInterval, setTimerInterval] = useState(null)

  // Wake lock state
  const [wakeLockStatus, setWakeLockStatus] = useState('unsupported') // 'unsupported' | 'active' | 'inactive' | 'error'

  // Input values
  const [workInput, setWorkInput] = useState('30')
  const [restInput, setRestInput] = useState('10')
  const [roundsInput, setRoundsInput] = useState('8')

  // Web Audio API - use refs to persist across renders
  const audioCtxRef = useRef(null)
  const continuousOscRef = useRef(null)
  const continuousGainRef = useRef(null)
  const continuousTickIntervalRef = useRef(null)
  const continuousTickCounterRef = useRef(0)
  const isFinalCountdownRef = useRef(false)
  const tickToneIndexRef = useRef(0)
  const phaseStartTimeRef = useRef(workDuration)

  // Distinct ping-pong tone pairs, one per 3-second block of the timer
  const TICK_TONE_PAIRS = [
    [700, 420],
    [900, 520],
    [1100, 640],
    [1300, 760],
    [1500, 880],
    [1700, 980],
  ]

  // Request Screen Wake Lock API sentinel to prevent the screen from sleeping.
  // Must be called in a secure context (HTTPS/localhost) and may require a user gesture.
  const requestWakeLockRef = useRef(null)
  const requestWakeLock = useCallback(async () => {
    shouldKeepAwakeRef.current = true

    if (!('wakeLock' in navigator)) {
      // Fallback for browsers without Screen Wake Lock API support
      try {
        if (!noSleepRef.current) {
          noSleepRef.current = new NoSleep()
        }
        if (!noSleepEnabledRef.current) {
          await noSleepRef.current.enable()
          noSleepEnabledRef.current = true
        }
        setWakeLockStatus('active')
      } catch (err) {
        console.log('Wake lock unsupported and NoSleep fallback failed:', err?.message || err)
        setWakeLockStatus('unsupported')
      }
      return
    }

    try {
      if (document.visibilityState !== 'visible') return
      if (wakeLockRef.current) {
        setWakeLockStatus('active')
        return
      }

      const sentinel = await navigator.wakeLock.request('screen')
      wakeLockRef.current = sentinel
      setWakeLockStatus('active')
      console.log('Screen Wake Lock acquired')

      sentinel.addEventListener('release', () => {
        if (wakeLockRef.current === sentinel) {
          wakeLockRef.current = null
        }
        console.log('Screen Wake Lock released')
        // Re-acquire when the page becomes active again if we still want to stay awake
        if (shouldKeepAwakeRef.current && document.visibilityState === 'visible') {
          requestWakeLockRef.current?.()
        } else if (shouldKeepAwakeRef.current) {
          setWakeLockStatus('inactive')
        }
      })
    } catch (err) {
      // Common causes: not a user gesture, page hidden, or platform restrictions
      console.log('Screen Wake Lock request failed:', err?.name, err?.message)
      if (wakeLockRef.current || noSleepEnabledRef.current) {
        setWakeLockStatus('active')
      } else {
        // Last-resort fallback for environments where Wake Lock is present but unreliable
        try {
          if (!noSleepRef.current) noSleepRef.current = new NoSleep()
          if (!noSleepEnabledRef.current) {
            await noSleepRef.current.enable()
            noSleepEnabledRef.current = true
          }
          setWakeLockStatus('active')
        } catch (fallbackErr) {
          console.log('NoSleep fallback failed:', fallbackErr?.message || fallbackErr)
          setWakeLockStatus('error')
        }
      }
    }
  }, [])

  useEffect(() => {
    requestWakeLockRef.current = requestWakeLock
  }, [requestWakeLock])

  // Release screen wake lock and any fallback
  const releaseWakeLock = useCallback(async () => {
    shouldKeepAwakeRef.current = false

    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release()
        console.log('Screen Wake Lock released')
      } catch (err) {
        console.log('Screen Wake Lock release failed:', err?.message || err)
      }
      wakeLockRef.current = null
    }

    if (noSleepRef.current && noSleepEnabledRef.current) {
      try {
        noSleepRef.current.disable()
      } catch (err) {
        console.log('NoSleep disable failed:', err?.message || err)
      }
      noSleepEnabledRef.current = false
    }

    setWakeLockStatus('inactive')
  }, [])

  // Keep the screen awake while the web app is running using the Screen Wake Lock API.
  // Re-acquire on visibility/focus changes because the browser releases locks when hidden.
  useEffect(() => {
    shouldKeepAwakeRef.current = true

    const handleVisibilityChange = () => {
      if (shouldKeepAwakeRef.current && document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }

    // Initial attempt (may require a user gesture in some browsers)
    requestWakeLock()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleVisibilityChange)
    window.addEventListener('pageshow', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleVisibilityChange)
      window.removeEventListener('pageshow', handleVisibilityChange)
    }
  }, [requestWakeLock])

  // Beep function using Web Audio API
  const playBeep = (frequency, duration, type = 'sine') => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    gainNode.gain.setValueAtTime(1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }

  // Play a single ping-pong style tick.
  // Each tick alternates between a high 'ping' and low 'pong' — creates a back-and-forth sound.
  const playTick = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    // Sine wave for a clean, digital retro-game blip
    oscillator.type = 'sine'

    const tickCount = continuousTickCounterRef.current
    const isPing = tickCount % 2 === 0
    tickToneIndexRef.current = Math.floor(tickCount / 3) % TICK_TONE_PAIRS.length

    if (isFinalCountdownRef.current) {
      // Final 3 seconds: higher, louder, faster ping-pong
      oscillator.frequency.setValueAtTime(isPing ? 2000 : 1300, ctx.currentTime)
      gainNode.gain.setValueAtTime(isPing ? 0.28 : 0.20, ctx.currentTime)
    } else {
      const [pingFreq, pongFreq] = TICK_TONE_PAIRS[tickToneIndexRef.current]
      oscillator.frequency.setValueAtTime(isPing ? pingFreq : pongFreq, ctx.currentTime)
      gainNode.gain.setValueAtTime(isPing ? 0.16 : 0.09, ctx.currentTime)
    }

    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.07)

    continuousTickCounterRef.current += 1
  }

  // Start a continuous background ticking sound (always on while timer runs)
  const startContinuousTick = (startTime = timeLeft) => {
    continuousTickCounterRef.current = 0
    isFinalCountdownRef.current = false
    phaseStartTimeRef.current = startTime
    tickToneIndexRef.current = 0
    // Tick 4 times per second, alternating ping-pong
    continuousTickIntervalRef.current = setInterval(playTick, 250)
    playTick()
  }

  // Stop the continuous background ticking sound
  const stopContinuousTick = () => {
    if (continuousTickIntervalRef.current) {
      clearInterval(continuousTickIntervalRef.current)
      continuousTickIntervalRef.current = null
    }
    continuousTickCounterRef.current = 0
    if (continuousOscRef.current) {
      try { continuousOscRef.current.stop() } catch (e) {}
      continuousOscRef.current = null
    }
    if (continuousGainRef.current) {
      try { continuousGainRef.current.gain.setValueAtTime(0, continuousGainRef.current.context.currentTime) } catch (e) {}
      continuousGainRef.current = null
    }
  }

  // Update settings when user changes inputs (only when idle)
  const updateSettings = () => {
    if (currentPhase !== 'idle') return
    const work = parseInt(workInput) || 30
    const rest = parseInt(restInput) || 10
    const rounds = parseInt(roundsInput) || 8
    setWorkDuration(work)
    setRestDuration(rest)
    setTotalRounds(rounds)
    setTimeLeft(work)
    updateUI()
  }

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // Update UI based on current phase
  const updateUI = () => {
    let bodyColor = '#0f172a'

    if (currentPhase === 'work') {
      bodyColor = '#064e3b'
    } else if (currentPhase === 'rest') {
      bodyColor = '#7f1d1d'
    } else if (currentPhase === 'done') {
      bodyColor = '#0f172a'
    }

    document.body.style.backgroundColor = bodyColor
  }

  // Tick function - called every second
  const tick = () => {
    setTimeLeft((prev) => {
      const next = prev - 1

      // Keep tone progression aligned with tick count; no extra 3-second marker beep
      if (next <= 0) {
        tickToneIndexRef.current = 0
      }

      // Countdown beeps (3, 2, 1) with different tones each second
      if (next <= 3 && next > 0) {
        // Different tone for each second: 3=high, 2=mid, 1=low
        const frequencies = [null, null, null, 880, 660, 440] // index by countdown number
        const duration = next === 3 ? 0.2 : next === 2 ? 0.15 : 0.1
        playBeep(frequencies[next], duration, 'sine')

        isFinalCountdownRef.current = true
        continuousTickCounterRef.current = 0
        // Faster ticking during final 3 seconds (twice as fast)
        if (continuousTickIntervalRef.current) {
          clearInterval(continuousTickIntervalRef.current)
          continuousTickIntervalRef.current = setInterval(playTick, 125)
        }
      } else if (next < 0) {
        isFinalCountdownRef.current = false
        // Return to normal ticking speed
        if (continuousTickIntervalRef.current) {
          clearInterval(continuousTickIntervalRef.current)
          continuousTickIntervalRef.current = setInterval(playTick, 250)
        }
      } else {
        isFinalCountdownRef.current = false
      }

      if (next < 0) {
        playBeep(880, 0.4, 'triangle')
        tickToneIndexRef.current = 0

        if (currentPhase === 'work') {
          if (currentRound >= totalRounds) {
            // Finish workout
            setCurrentPhase('done')
            return prev
          } else {
            // Switch to Rest
            setCurrentPhase('rest')
            setTimeLeft(restDuration)
            phaseStartTimeRef.current = restDuration
            return restDuration
          }
        } else if (currentPhase === 'rest') {
          // Switch to Work
          setCurrentPhase('work')
          setCurrentRound((prevRound) => prevRound + 1)
          setTimeLeft(workDuration)
          phaseStartTimeRef.current = workDuration
          return workDuration
        }
      }

      return next
    })
  }

  // Toggle timer (start / pause / resume)
  const toggleTimer = () => {
    if (currentPhase === 'done') {
      resetTimer()
      return
    }

    if (timerInterval) {
      // Pause
      clearInterval(timerInterval)
      setTimerInterval(null)
      stopContinuousTick()
      // Keep screen awake while the web app is running
      requestWakeLock()
      playBeep(880, 0.4, 'triangle')
    } else {
      // Start / Resume
      if (currentPhase === 'idle') {
        setCurrentPhase('work')
        phaseStartTimeRef.current = workDuration
        startContinuousTick(workDuration)
      } else {
        startContinuousTick(timeLeft)
      }
      const intervalId = setInterval(tick, 1000)
      setTimerInterval(intervalId)
      playBeep(920, 0.4, 'triangle')
      // Ensure screen stays awake while running
      requestWakeLock()
    }
  }

  // Reset timer
  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    stopContinuousTick()
    tickToneIndexRef.current = 0
    phaseStartTimeRef.current = workDuration
    setCurrentPhase('idle')
    setCurrentRound(1)
    setTimeLeft(workDuration)
    setWorkInput(workDuration.toString())
    setRestInput(restDuration.toString())
    setRoundsInput(totalRounds.toString())
    // Keep screen awake while the web app is running
    requestWakeLock()
  }

  // Handle input changes
  const handleWorkInputChange = (e) => setWorkInput(e.target.value)
  const handleRestInputChange = (e) => setRestInput(e.target.value)
  const handleRoundsInputChange = (e) => setRoundsInput(e.target.value)

  // Handle start/reset button click
  const handleStartClick = () => {
    if (currentPhase === 'idle') {
      updateSettings()
    }
    toggleTimer()
  }

  const handleResetClick = () => {
    resetTimer()
  }

  // Determine if inputs should be disabled
  const inputsDisabled = currentPhase !== 'idle'

  // Render phase text
  const renderPhase = () => {
    let phaseClass = 'phase text-idle'
    if (currentPhase === 'work') {
      phaseClass = 'phase text-work'
    } else if (currentPhase === 'rest') {
      phaseClass = 'phase text-rest'
    } else if (currentPhase === 'done') {
      phaseClass = 'phase text-idle'
    }
    return <div className={phaseClass}>{phaseClass === 'phase text-work' ? 'WORK' : phaseClass === 'phase text-rest' ? 'REST' : phaseClass === 'phase text-idle' ? 'DONE' : 'READY'}</div>
  }

  // Render round info
  const renderRoundInfo = () => {
    if (currentPhase === 'done') {
      return <div className="round-info">Workout Complete!</div>
    }
    return (
      <div className="round-info">
        Round {currentRound} / {totalRounds}
      </div>
    )
  }

  // Get time display
  const timeDisplay = formatTime(timeLeft)

  // Button style based on phase
  const getButtonStyle = () => {
    if (currentPhase === 'idle' || currentPhase === 'done') {
      return { backgroundColor: 'var(--accent)' }
    }
    return { backgroundColor: 'rgba(255,255,255,0.1)' }
  }

  // Wake lock indicator class
  const getWakeLockClass = () => {
    let classes = 'wake-lock-indicator'
    if (wakeLockStatus === 'active') {
      classes += ' active'
    } else if (wakeLockStatus === 'error') {
      classes += ' wake-lock-error'
    } else if (wakeLockStatus === 'unsupported') {
      classes += ' wake-lock-not-supported'
    } else {
      classes += ' inactive'
    }
    return classes
  }

  // Wake lock indicator text
  const getWakeLockText = () => {
    if (wakeLockStatus === 'active') return 'Screen Awake'
    if (wakeLockStatus === 'unsupported') return 'Tap to Keep Awake'
    if (wakeLockStatus === 'error') return 'Tap to Keep Awake'
    return 'Tap to Keep Awake'
  }

  return (
    <>
      <div className="app-container">
        <div className="timer-section">
          {renderPhase()}
          <div id="time-display" className="time-display">
            {timeDisplay}
          </div>
          {renderRoundInfo()}
          <div
            className={getWakeLockClass()}
            onClick={() => requestWakeLock()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') requestWakeLock()
            }}
            role="button"
            tabIndex={0}
            title="Keep screen awake"
          >
            <div className="wake-lock-icon"></div>
            <span className="wake-lock-text">{getWakeLockText()}</span>
          </div>
        </div>

        <div className="side-panel">
          <div className="settings-grid">
            <div className="input-group">
              <label htmlFor="work-time">Work (s)</label>
              <input
                type="number"
                id="work-time"
                value={workInput}
                min="1"
                disabled={inputsDisabled}
                onChange={handleWorkInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rest-time">Rest (s)</label>
              <input
                type="number"
                id="rest-time"
                value={restInput}
                min="1"
                disabled={inputsDisabled}
                onChange={handleRestInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rounds">Rounds</label>
              <input
                type="number"
                id="rounds"
                value={roundsInput}
                min="1"
                disabled={inputsDisabled}
                onChange={handleRoundsInputChange}
              />
            </div>
          </div>

          <div className="controls">
            <button
              id="start-btn"
              className="btn-primary"
              onClick={handleStartClick}
              disabled={inputsDisabled && currentPhase !== 'done'}
            >
              {currentPhase === 'done' ? 'Start Workout' : 'Pause'}
            </button>
            <button
              id="reset-btn"
              className="btn-secondary"
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}