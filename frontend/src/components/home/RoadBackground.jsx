import React from "react";

const ROUTE = "M-50 520 C 200 420, 350 620, 600 480 S 1000 300, 1250 380";

const roads = [
  ROUTE,
  "M150 -50 C 250 150, 450 250, 520 450 S 700 650, 760 760",
  "M-50 150 C 250 220, 600 80, 900 200 S 1150 120, 1250 60",
  "M950 -50 C 900 200, 1000 400, 880 560 S 950 700, 1000 760",
];

function RoadBackground() {
  return (
    <svg
      className="road-bg"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22e3b5" />
          <stop offset="100%" stopColor="#9bf7e1" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Roads */}
      {roads.map((d, i) => (
        <g key={i}>
          <path d={d} className="road-surface" />
          <path d={d} className="road-center" />
        </g>
      ))}

      {/* Optimized route */}
      <path d={ROUTE} className="route-glow" filter="url(#glow)" />
      <path
        d={ROUTE}
        className="route-line"
        stroke="url(#routeGradient)"
      />

      {/* Start and destination markers */}
      <circle cx="90" cy="491" r="9" fill="#22e3b5" className="pulse" />
      <circle cx="90" cy="491" r="8" fill="#22e3b5" stroke="#fff" strokeWidth="3" />
      <circle cx="1110" cy="346" r="9" fill="#ffffff" className="pulse" />
      <circle cx="1110" cy="346" r="8" fill="#ffffff" stroke="#22e3b5" strokeWidth="3" />

      {/* Congestion hotspots */}
      <circle cx="520" cy="450" r="10" fill="#ffb020" className="pulse" />
      <circle cx="520" cy="450" r="6" fill="#ffb020" />
      <circle cx="900" cy="200" r="10" fill="#ff4d6d" className="pulse" />
      <circle cx="900" cy="200" r="6" fill="#ff4d6d" />
      <circle cx="880" cy="560" r="10" fill="#ffb020" className="pulse" />
      <circle cx="880" cy="560" r="6" fill="#ffb020" />

      {/* Moving vehicles */}
      <circle r="5" fill="#ffffff">
        <animateMotion dur="9s" repeatCount="indefinite" path={roads[0]} />
      </circle>
      <circle r="5" fill="#ffffff">
        <animateMotion dur="11s" begin="2s" repeatCount="indefinite" path={roads[1]} />
      </circle>
      <circle r="5" fill="#ffffff">
        <animateMotion dur="13s" begin="1s" repeatCount="indefinite" path={roads[2]} />
      </circle>
      <circle r="5" fill="#ffffff">
        <animateMotion dur="10s" begin="3s" repeatCount="indefinite" path={roads[3]} />
      </circle>
    </svg>
  );
}

export default RoadBackground;