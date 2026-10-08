import React from "react";

const routes = [
  { name: "Route A", tag: "Recommended", time: "24 min", distance: "12.4 km", level: "Low", color: "success", best: true },
  { name: "Route B", tag: "", time: "31 min", distance: "10.8 km", level: "Moderate", color: "warning" },
  { name: "Route C", tag: "", time: "38 min", distance: "11.9 km", level: "Heavy", color: "danger" },
];

function RoutePreview() {
  return (
    <div className="glass-card mx-auto" style={{ maxWidth: "440px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Smart Route Preview</h5>
        <span className="small opacity-75">Sample data</span>
      </div>

      {routes.map((r) => (
        <div key={r.name} className={`route-item ${r.best ? "best" : ""}`}>
          <div>
            <div className="fw-semibold">
              {r.name}{" "}
              {r.tag && <span className="small text-accent">• {r.tag}</span>}
            </div>
            <div className="small opacity-75">{r.distance}</div>
          </div>
          <div className="text-end">
            <div className="fw-bold fs-5">{r.time}</div>
            <span className={`badge text-bg-${r.color}`}>{r.level}</span>
          </div>
        </div>
      ))}

      <div className="small opacity-75 mt-2">
        ⚡ Congestion predicted on Route C in the next 30 minutes.
      </div>
    </div>
  );
}

export default RoutePreview;