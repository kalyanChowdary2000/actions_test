import React, { useMemo } from "react";
import "./App.css";

const BUBBLE_COUNT = 30;

function randomIn(min, max) {
  return Math.random() * (max - min) + min;
}

function createBubbles(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    size: randomIn(30, 140),
    left: randomIn(0, 100),
    top: randomIn(0, 100),
    delay: randomIn(0, 4),
    duration: randomIn(5, 14),
    opacity: randomIn(0.2, 0.6),
    hue: randomIn(180, 300),
  }));
}

export default function App() {
  // Re-generated on every browser refresh/reload.
  const bubbles = useMemo(() => createBubbles(BUBBLE_COUNT), []);

  return (
    <main className="app">
      <h1>Random Bubble Field</h1>
      <p>Refresh the page to generate a new bubble layout.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Refresh bubbles
      </button>

      <div className="bubble-area" aria-hidden>
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              opacity: bubble.opacity,
              background: `radial-gradient(circle at 30% 30%, hsla(${bubble.hue}, 90%, 80%, 0.9), hsla(${bubble.hue}, 90%, 55%, 0.2))`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>
    </main>
  );
}
