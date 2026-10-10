import React from "react";

const BADGE = { Low: "success", Moderate: "warning", Heavy: "danger" };

export function formatTime(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}

function RouteResults({ routes, selected, bestIndex, onSelect }) {
  return (
    <div className="pr-card">
      <style>{`
        .pr-card {
          height: 100%;
          padding: 1.5rem;
          color: #4d0ff6;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(77, 15, 246, 0.2);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.2);
        }

        .pr-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          border-radius: 12px;
          background: rgba(77, 15, 246, 0.06);
          border: 2px solid transparent;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .pr-item:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(77, 15, 246, 0.2);
        }

        .pr-item.best {
          background: rgba(34, 227, 181, 0.2);
        }

        .pr-item.selected {
          border-color: #4d0ff6;
        }

        .pr-tag {
          color: #0a8f6c;
          font-size: 0.85rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .pr-item { transition: none; }
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Route Options</h5>
        <span className="small" style={{ opacity: 0.75 }}>Sample data</span>
      </div>

      {routes.map((r, i) => (
        <div
          key={r.name}
          role="button"
          tabIndex={0}
          className={`pr-item ${i === bestIndex ? "best" : ""} ${i === selected ? "selected" : ""}`}
          onClick={() => onSelect(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect(i);
          }}
        >
          <div>
            <div className="fw-semibold">
              {r.name}{" "}
              {i === bestIndex && <span className="pr-tag">• Recommended</span>}
            </div>
            <div className="small" style={{ opacity: 0.75 }}>
              {r.distanceKm.toFixed(1)} km
            </div>
          </div>
          <div className="text-end">
            <div className="fw-bold fs-5">{formatTime(r.minutes)}</div>
            <span className={`badge text-bg-${BADGE[r.level]}`}>{r.level}</span>
          </div>
        </div>
      ))}

      <div className="small" style={{ opacity: 0.75 }}>
        Click a route to highlight it on the map.
      </div>
    </div>
  );
}

export default RouteResults;