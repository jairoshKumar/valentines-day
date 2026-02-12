import { useMemo, useState } from "react";
import "./App.css";

const sadSeries = [
  {
    image: "/valentines-day/sad1.png",
    message: "Nah bruh! Not happening, don't press it.",
  },
  {
    image: "/valentines-day/sad1.png",
    message: "Don't press this! I will bite you! >:(",
  },
  {
    image: "/valentines-day/sad-bite.png",
    message: "You click on this again and I will burn it down!",
  },
  {
    image: "/valentines-day/sad-burn-it-down.png",
    message: "Khud jal jayunga! Mat kar click.",
  },
  {
    image: "/valentines-day/sad-burn-myself.png",
    message: "Kar click kar! Kar ke to dikha. Hehehehehe!",
  },
];

function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noStage, setNoStage] = useState(-1);
  const [burnMode, setBurnMode] = useState(false);
  const [sadBursts, setSadBursts] = useState([]);
  const [pinnedSad, setPinnedSad] = useState([]);
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 5}s`,
        size: `${70 + Math.random() * 34}px`,
      })),
    [],
  );
  const currentSad = noStage >= 0 ? sadSeries[noStage] : null;
  const showNoDecor = !isAccepted && noStage >= 0;
  const isNoLocked = !isAccepted && noStage === sadSeries.length - 1;
  const winHearts = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.85}s`,
        duration: `${1.9 + Math.random() * 1.6}s`,
        size: `${14 + Math.random() * 22}px`,
      })),
    [],
  );

  const handleNoClick = () => {
    setNoStage((prev) => {
      if (prev === 2) {
        setBurnMode(true);
      }
      const next = (prev + 1) % sadSeries.length;
      setSadBursts((current) => [
        ...current,
        {
          id: Date.now() + Math.random(),
          image: sadSeries[next].image,
          left: `${18 + Math.random() * 64}%`,
          stage: next,
        },
      ]);
      return next;
    });
  };

  const handleSadFloatEnd = (burst) => {
    setSadBursts((current) => current.filter((item) => item.id !== burst.id));
    setPinnedSad((current) => [...current, burst].slice(-8));
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setBurnMode(false);
    setNoStage(-1);
    setSadBursts([]);
    setPinnedSad([]);
  };

  return (
    <main className={`valentine-page ${burnMode ? "burn-mode" : ""}`}>
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="photo-heart"
            style={{
              "--left": heart.left,
              "--delay": heart.delay,
              "--duration": heart.duration,
              "--size": heart.size,
            }}
          />
        ))}
      </div>

      {!isAccepted &&
        sadBursts.map((burst) => (
          <div
            key={burst.id}
            className="sad-float"
            style={{
              "--sad-image": `url(${burst.image})`,
              "--burst-left": burst.left,
            }}
            aria-hidden="true"
            onAnimationEnd={() => handleSadFloatEnd(burst)}
          />
        ))}

      {!isAccepted && pinnedSad.length > 0 && (
        <div className="pinned-sad-layer" aria-hidden="true">
          {pinnedSad.map((item, index) => (
            <div
              key={item.id}
              className="pinned-sad-heart"
              style={{
                "--sad-image": `url(${item.image})`,
                "--side-left": index % 2 === 0 ? "2.5%" : "auto",
                "--side-right": index % 2 === 1 ? "2.5%" : "auto",
                "--top": `${2 + (index % 4) * 22}%`,
              }}
            />
          ))}
        </div>
      )}

      {burnMode && !isAccepted && (
        <div className="fire-strip" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              key={index}
              className="flame"
              style={{
                "--flame-delay": `${(index % 7) * 0.18}s`,
                "--flame-duration": `${1.35 + (index % 4) * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {isAccepted && (
        <>
          <div className="win-hearts-layer" aria-hidden="true">
            {winHearts.map((heart) => (
              <span
                key={heart.id}
                className="win-heart"
                style={{
                  "--win-left": heart.left,
                  "--win-delay": heart.delay,
                  "--win-duration": heart.duration,
                  "--win-size": heart.size,
                }}
              >
                ❤
              </span>
            ))}
          </div>
          <img
            className="win-side left"
            src="/valentines-day/lets-go.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="win-side right"
            src="/valentines-day/lets-goo.png"
            alt=""
            aria-hidden="true"
          />
        </>
      )}

      <section className="invite-card">
        {showNoDecor && (
          <>
            <img
              className="card-chaos left"
              src="/valentines-day/angry-cat-fight.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="card-chaos right"
              src="/valentines-day/angry-knife-teddy.png"
              alt=""
              aria-hidden="true"
            />
          </>
        )}

        <p className="eyebrow">For the most beautiful part of my world</p>
        <h1>Will You Be My Valentine?</h1>
        <p className="message">
          Every day with you feels warmer, softer, and brighter. I want this
          Valentine&apos;s Day to be ours.
        </p>

        {!isAccepted ? (
          <div className="actions">
            <button className="btn yes" onClick={handleYesClick}>
              Yes, absolutely
            </button>
            <button
              className="btn ghost"
              onClick={handleNoClick}
              disabled={isNoLocked}
            >
              {currentSad ? currentSad.message : "Let me think"}
            </button>
          </div>
        ) : (
          <div className="accepted" role="status">
            <p>You just made me the happiest person alive.</p>
            <p>It&apos;s a date. February 14 is ours. ❤</p>
          </div>
        )}

        {currentSad && !isAccepted && (
          <p className="hint">{currentSad.message}</p>
        )}

        <p className="signature">Forever yours</p>
      </section>
    </main>
  );
}

export default App;
