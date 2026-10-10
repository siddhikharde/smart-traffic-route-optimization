import React from "react";

const COLORS = { Low: "#0fb98d", Moderate: "#ffb020", Heavy: "#ff4d6d" };

function BarChart({ data, unit = "min" }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="bc-wrap">
      <style>{`
        .bc-wrap {
          overflow-x: auto;
        }

        .bc-bars {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          min-width: 360px;
          height: 210px;
        }

        .bc-col {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          cursor: default;
        }

        .bc-value {
          font-size: 0.8rem;
          font-weight: 700;
          color: #4d0ff6;
          margin-bottom: 4px;
        }

        .bc-bar {
          width: 100%;
          max-width: 46px;
          border-radius: 8px 8px 0 0;
          transform-origin: bottom;
          animation: bcGrow 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .bc-col:hover .bc-bar {
          filter: brightness(1.1);
          transform: scaleY(1.04) scaleX(1.08);
        }

        .bc-label {
          margin-top: 6px;
          font-size: 0.75rem;
          color: #6c5ba8;
          white-space: nowrap;
        }

        @keyframes bcGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bc-bar { animation: none; transition: none; }
        }
      `}</style>

      <div className="bc-bars">
        {data.map((d, i) => (
          <div
            className="bc-col"
            key={`${d.label}-${i}`}
            title={`${d.label}: ${d.value} ${unit} (${d.level} congestion)`}
          >
            <div className="bc-value">{d.value}</div>
            <div
              className="bc-bar"
              style={{
                height: `${Math.max(8, Math.round((d.value / max) * 150))}px`,
                background: COLORS[d.level],
                animationDelay: `${i * 0.07}s`,
              }}
            />
            <div className="bc-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;