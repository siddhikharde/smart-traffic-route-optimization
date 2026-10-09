import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BarChart from "../components/history/BarChart";
import {
  getSearches,
  clearSearches,
  buildSampleHistory,
} from "../utils/routeHistory";

const BADGE = { Low: "success", Moderate: "warning", Heavy: "danger" };

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function History() {
  const [params, setParams] = useSearchParams();
  const [searches, setSearches] = useState(getSearches());

  // The route opened from the Planner (?id=...), or the latest search
  const selected =
    searches.find((s) => s.id === params.get("id")) || searches[0] || null;

  const sample = useMemo(
    () => (selected ? buildSampleHistory(selected) : null),
    [selected]
  );

  const handleClear = () => {
    clearSearches();
    setSearches([]);
    setParams({});
  };

  return (
    <div className="hs-page">
      <style>{`
        .hs-page {
          overflow-x: hidden;
          min-height: 100vh;
          padding: 110px 0 60px;
          background: linear-gradient(135deg, #f1edff 0%, #c9b8ff 50%, #9d80f9 100%);
        }

        .hs-card {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(77, 15, 246, 0.15);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.2);
        }

        .hs-fade {
          animation: hsFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes hsFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hs-stat {
          height: 100%;
          padding: 1rem;
          text-align: center;
          border-radius: 14px;
          background: rgba(77, 15, 246, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hs-stat:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(77, 15, 246, 0.2);
        }

        .hs-insight {
          padding: 1rem 1.25rem;
          border-radius: 14px;
          color: #0a5c45;
          background: #d8fbef;
          border: 2px solid #0fb98d;
        }

        .hs-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          padding: 0.8rem 1rem;
          text-align: left;
          color: #4d0ff6;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 12px;
          background: rgba(77, 15, 246, 0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .hs-item:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(77, 15, 246, 0.2);
        }
        .hs-item.active {
          border-color: #4d0ff6;
          background: rgba(77, 15, 246, 0.12);
        }

        .hs-legend span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-right: 1rem;
          font-size: 0.85rem;
        }
        .hs-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .hs-btn {
          color: #ffffff;
          background-color: #4d0ff6;
          border: 2px solid #4d0ff6;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .hs-btn:hover {
          color: #4d0ff6;
          background-color: #ffffff;
          transform: translateY(-2px);
        }

        .hs-clear {
          color: #dc3545;
          border-color: #dc3545;
          background: transparent;
        }
        .hs-clear:hover {
          color: #ffffff;
          background: #dc3545;
          border-color: #dc3545;
        }

        @media (prefers-reduced-motion: reduce) {
          .hs-fade { animation: none; }
          .hs-stat, .hs-item, .hs-btn { transition: none; }
        }
      `}</style>

      <div className="container">
        <div className="text-center mb-4 hs-fade">
          <h1 className="fw-bold" style={{ color: "#4d0ff6" }}>
            Route History
          </h1>
          <p className="lead mb-0" style={{ color: "#4d0ff6", fontWeight: 500 }}>
            Past traffic behind your recommended routes
          </p>
        </div>

        {/* No searches yet */}
        {!selected && (
          <div className="hs-card hs-fade text-center py-5">
            <div style={{ fontSize: "3rem" }}>🕘</div>
            <h5 className="fw-bold" style={{ color: "#4d0ff6" }}>
              No history yet
            </h5>
            <p className="text-muted">
              Find a route on the Planner page and it will appear here.
            </p>
            <div>
              <Link to="/planner" className="btn hs-btn fw-semibold px-4">
                Plan a Route
              </Link>
            </div>
          </div>
        )}

        {selected && sample && (
          <div className="row g-4 hs-fade">
            {/* Selected route history */}
            <div className="col-12 col-lg-8">
              <div className="hs-card">
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: "#4d0ff6" }}>
                      {selected.from} → {selected.to}
                    </h4>
                    <div className="text-muted small">
                      Searched on {formatDate(selected.date)} · Recommended{" "}
                      {selected.routeName} · {selected.distanceKm.toFixed(1)} km
                    </div>
                  </div>
                  <span className="small" style={{ color: "#6c5ba8" }}>
                    Sample data
                  </span>
                </div>

                {/* Summary numbers */}
                <div className="row g-3 mb-4 text-center">
                  <div className="col-12 col-sm-4">
                    <div className="hs-stat">
                      <div className="small text-muted">Best time to leave</div>
                      <div className="fw-bold fs-5" style={{ color: "#0a8f6c" }}>
                        {sample.best.label}
                      </div>
                      <div className="small">≈ {sample.best.value} min</div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="hs-stat">
                      <div className="small text-muted">Busiest time</div>
                      <div className="fw-bold fs-5" style={{ color: "#dc3545" }}>
                        {sample.peak.label}
                      </div>
                      <div className="small">≈ {sample.peak.value} min</div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="hs-stat">
                      <div className="small text-muted">Average trip</div>
                      <div className="fw-bold fs-5" style={{ color: "#4d0ff6" }}>
                        {sample.average} min
                      </div>
                      <div className="small">across the day</div>
                    </div>
                  </div>
                </div>

                {/* Chart 1 */}
                <h6 className="fw-bold" style={{ color: "#4d0ff6" }}>
                  Travel time by time of day (minutes)
                </h6>
                <BarChart data={sample.hourly} />

                {/* Chart 2 */}
                <h6 className="fw-bold mt-4" style={{ color: "#4d0ff6" }}>
                  Last 7 days (minutes)
                </h6>
                <BarChart data={sample.daily} />

                {/* Legend */}
                <div className="hs-legend mt-3">
                  <span><i className="hs-dot" style={{ background: "#0fb98d" }} /> Low</span>
                  <span><i className="hs-dot" style={{ background: "#ffb020" }} /> Moderate</span>
                  <span><i className="hs-dot" style={{ background: "#ff4d6d" }} /> Heavy</span>
                </div>

                {/* Insight */}
                <div className="hs-insight mt-3">
                  <div className="fw-bold">💡 What the history suggests</div>
                  Past traffic on this route is lightest around{" "}
                  <strong>{sample.best.label}</strong> and heaviest around{" "}
                  <strong>{sample.peak.label}</strong>. If you can, leave near
                  the lighter time and follow the recommended route.
                </div>
              </div>
            </div>

            {/* Past searches */}
            <div className="col-12 col-lg-4">
              <div className="hs-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0" style={{ color: "#4d0ff6" }}>
                    Your past searches
                  </h5>
                  <span className="small text-muted">{searches.length}</span>
                </div>

                {searches.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className={`hs-item ${s.id === selected.id ? "active" : ""}`}
                    onClick={() => setParams({ id: s.id })}
                  >
                    <div>
                      <div className="fw-semibold">
                        {s.from} → {s.to}
                      </div>
                      <div className="small" style={{ opacity: 0.75 }}>
                        {formatDate(s.date)}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">{s.minutes} min</div>
                      <span className={`badge text-bg-${BADGE[s.level]}`}>
                        {s.level}
                      </span>
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  className="btn hs-clear btn-sm w-100 mt-2"
                  onClick={handleClear}
                >
                  Clear history
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;