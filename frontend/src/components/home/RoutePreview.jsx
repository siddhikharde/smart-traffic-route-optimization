import React from "react";
import { Link } from "react-router-dom";

const routes = [
  { name: "Route A", tag: "Recommended", time: "24 min", distance: "12.4 km", level: "Low", color: "success", best: true },
  { name: "Route B", tag: "", time: "31 min", distance: "10.8 km", level: "Moderate", color: "warning" },
  { name: "Route C", tag: "", time: "38 min", distance: "11.9 km", level: "Heavy", color: "danger" },
];

function RoutePreview() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="glass-card mx-auto" style={{ maxWidth: "440px" }}>
      <style>{`
        .rp-btn {
          color: #ffffff;
          background-color: #4d0ff6;
          border: 2px solid #4d0ff6;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }

        .rp-btn:hover,
        .rp-btn:focus,
        .rp-btn:active {
          color: #4d0ff6 !important;
          background-color: #ffffff !important;
          border-color: #4d0ff6 !important;
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .rp-btn { transition: none; }
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Smart Route Preview</h5>
        <span className="small opacity-75">Sample data</span>
      </div>

      {routes.map((r) => (
        <div key={r.name} className={`route-item ${r.best ? "best" : ""}`}>
          <div>
            <div className="fw-semibold">
              {r.name}{" "}
              {r.tag && (
                <span className="small" style={{ color: "#0a8f6c" }}>
                  • {r.tag}
                </span>
              )}
            </div>
            <div className="small opacity-75">{r.distance}</div>
          </div>
          <div className="text-end">
            <div className="fw-bold fs-5">{r.time}</div>
            <span className={`badge text-bg-${r.color}`}>{r.level}</span>
          </div>
        </div>
      ))}

      <div className="small opacity-75 mt-2 mb-3">
        ⚡ Congestion predicted on Route C in the next 30 minutes.
      </div>

      {/* Button: logged in goes to the planner, logged out goes to login */}
      <Link
        to={user ? "/planner" : "/login"}
        className="btn rp-btn w-100 fw-semibold"
      >
        {user ? "Plan My Route" : "Login to Try It Now"}
      </Link>
    </div>
  );
}

export default RoutePreview;