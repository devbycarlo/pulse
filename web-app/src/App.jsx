import { useState } from 'react'
import './App.css'

export default function App() {
  // Settings state
  const [workDuration, setWorkDuration] = useState(30)
  const [restDuration, setRestDuration] = useState(10)
  const [totalRounds, setTotalRounds] = useState(8)

  // Timer state
  const [currentPhase, setCurrentPhase] = useState('idle') // 'idle' | 'work' | 'rest' | 'done'
  const [timeLeft, setTimeLeft] = useState(workDuration)
  const [currentRound, setCurrentRound] = useState(1)
  const [timerInterval, setTimerInterval] = useState(null)

  // Input values
  const [workInput, setWorkInput] = useState('30')
  const [restInput, setRestInput] = useState('10')
  const [roundsInput, setRoundsInput] = useState('8')

  // Web Audio API - use ref to persist across renders
  const audioCtxRef = useRef(null)

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
    let phaseClass = 'phase text-idle'
    let bodyColor = '#0f172a'

    if (currentPhase === 'work') {
      phaseClass = 'phase text-work'
      bodyColor = '#064e3b'
    } else if (currentPhase === 'rest') {
      phaseClass = 'phase text-rest'
      bodyColor = '#7f1d1d'
    } else if (currentPhase === 'done') {
      phaseClass = 'phase text-idle'
      bodyColor = '#0f172a'
    }

    document.body.style.backgroundColor = bodyColor
  }

  // Tick function - called every second
  const tick = () => {
    setTimeLeft((prev) => {
      const next = prev - 1
      // Countdown beeps (3, 2, 1)
      if (next <= 3 && next > 0) {
        playBeep(440, 0.15)
      }

      if (next < 0) {
        playBeep(880, 0.4, 'triangle')

        if (currentPhase === 'work') {
          if (currentRound >= totalRounds) {
            // Finish workout
            setCurrentPhase('done')
            return prev
          } else {
            // Switch to Rest
            setCurrentPhase('rest')
            setTimeLeft(restDuration)
            return restDuration
          }
        } else if (currentPhase === 'rest') {
          // Switch to Work
          setCurrentPhase('work')
          setCurrentRound((prevRound) => prevRound + 1)
          setTimeLeft(workDuration)
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
      playBeep(880, 0.4, 'triangle')
    } else {
      // Start / Resume
      if (currentPhase === 'idle') {
        setCurrentPhase('work')
      }
      const intervalId = setInterval(tick, 1000)
      setTimerInterval(intervalId)
      playBeep(920, 0.4, 'triangle')
    }
  }

  // Reset timer
  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    setCurrentPhase('idle')
    setCurrentRound(1)
    setTimeLeft(workDuration)
    setWorkInput(workDuration.toString())
    setRestInput(restDuration.toString())
    setRoundsInput(totalRounds.toString())
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

  return (
    <>
      <div className="app-container">
        <div className="timer-section">
          {renderPhase()}
          <div id="time-display" className="time-display">
            {timeDisplay}
          </div>
          {renderRoundInfo()}
        </div>

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
    </>
  )
}
