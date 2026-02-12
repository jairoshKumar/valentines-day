import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const hearts = useMemo(() => Array.from({ length: 20 }, (_, i) => i), [])

  return (
    <main className="valentine-page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart}
            className="heart"
            style={{
              '--left': `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`,
              '--duration': `${8 + Math.random() * 5}s`,
              '--size': `${14 + Math.random() * 24}px`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <section className="invite-card">
        <p className="eyebrow">For the most beautiful part of my world</p>
        <h1>Will You Be My Valentine?</h1>
        <p className="message">
          Every day with you feels warmer, softer, and brighter. I want this
          Valentine&apos;s Day to be ours.
        </p>

        {!isAccepted ? (
          <div className="actions">
            <button className="btn yes" onClick={() => setIsAccepted(true)}>
              Yes, absolutely
            </button>
            <button className="btn ghost" onClick={() => setShowHint(true)}>
              Let me think
            </button>
          </div>
        ) : (
          <div className="accepted" role="status">
            <p>You just made me the happiest person alive.</p>
            <p>It&apos;s a date. February 14 is ours. ❤</p>
          </div>
        )}

        {showHint && !isAccepted && (
          <p className="hint">No pressure. I&apos;ll keep choosing you, always.</p>
        )}

        <p className="signature">Forever yours</p>
      </section>
    </main>
  )
}

export default App
