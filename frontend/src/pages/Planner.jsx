import React, { useState } from "react";
import { Link } from "react-router-dom";
import RouteMap from "../components/planner/RouteMap";
import RouteResults, { formatTime } from "../components/planner/RouteResults";
import { saveSearch } from "../utils/routeHistory";

/* ---------- Helpers ---------- */

// Turns a place name into coordinates (free OpenStreetMap search)
const geocode = async (query) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  if (!data.length) throw new Error(`Could not find "${query}". Try a more specific place name.`);
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
};

// Gets real driving routes between two points (free OSRM demo server)
const fetchRoutes = async (a, b) => {
  const url =
    `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}` +
    `?overview=full&geometries=geojson&alternatives=3`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error("No driving route found between these places.");
  }
  return data.routes.map((r) => ({
    distanceKm: r.distance / 1000,
    baseMinutes: r.duration / 60,
    coords: r.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  }));
};

// SAMPLE prediction. Replace this with the real prediction API
// from the backend when it is ready (it should return a congestion
// level and a predicted time for each route).
const SAMPLE = [
  { level: "Low", factor: 1.05 },
  { level: "Moderate", factor: 1.3 },
  { level: "Heavy", factor: 1.55 },
];

const addSamplePrediction = (routes) =>
  routes.slice(0, 3).map((r, i) => ({
    ...r,
    name: `Route ${String.fromCharCode(65 + i)}`,
    level: SAMPLE[i].level,
    minutes: Math.max(1, Math.round(r.baseMinutes * SAMPLE[i].factor)),
  }));

/* ---------- Page ---------- */

function Planner() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(0);
  const [historyId, setHistoryId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    setFromCoords(null); // typed text replaces "my location"
  };

  const useMyLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Location is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFromCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setFrom("My current location");
      },
      () => setError("Could not get your location. Please type your start point.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!from.trim() || !to.trim()) {
      setError("Please enter both a start point and a destination.");
      return;
    }

    try {
      setLoading(true);

      const start = fromCoords || (await geocode(from));
      const end = await geocode(to);
      const rawRoutes = await fetchRoutes(start, end);
      const routes = addSamplePrediction(rawRoutes);

      const bestIndex = routes.reduce(
        (best, r, i) => (r.minutes < routes[best].minutes ? i : best),
        0
      );

      // Save this search so it shows up on the History page
      const id = saveSearch({
        from: from.trim(),
        to: to.trim(),
        routeName: routes[bestIndex].name,
        minutes: routes[bestIndex].minutes,
        level: routes[bestIndex].level,
        distanceKm: routes[bestIndex].distanceKm,
      });
      setHistoryId(id);

      setResult({ start, end, routes, bestIndex });
      setSelected(bestIndex);
    } catch (err) {
      console.error("Planner error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const best = result ? result.routes[result.bestIndex] : null;
  const heavy = result ? result.routes.filter((r) => r.level === "Heavy") : [];

  return (
    <div className="pl-page">
      <style>{`
        .pl-page {
          overflow-x: hidden;
          min-height: 100vh;
          padding: 110px 0 60px;
          background: linear-gradient(135deg, #f1edff 0%, #c9b8ff 50%, #9d80f9 100%);
        }

        .pl-card {
          padding: 1.75rem;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(77, 15, 246, 0.15);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.2);
        }

        .pl-fade {
          animation: plFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes plFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pl-form .form-control::placeholder {
          color: #4d0ff6 !important;
          opacity: 1 !important;
        }
        .pl-form .form-control:focus {
          border-color: #4d0ff6 !important;
          box-shadow: 0 0 0 0.25rem rgba(77, 15, 246, 0.25) !important;
        }

        .pl-btn {
          color: #ffffff;
          background-color: #4d0ff6;
          border: 2px solid #4d0ff6;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .pl-btn:hover:not(:disabled) {
          color: #4d0ff6;
          background-color: #ffffff;
          transform: translateY(-2px);
        }

        .pl-loc-btn {
          color: #4d0ff6;
          border-color: #4d0ff6;
          background: transparent;
        }
        .pl-loc-btn:hover {
          color: #ffffff;
          background-color: #4d0ff6;
          border-color: #4d0ff6;
        }

        .pl-banner {
          padding: 1rem 1.25rem;
          border-radius: 16px;
          color: #0a5c45;
          background: #d8fbef;
          border: 2px solid #0fb98d;
        }

        .pl-history-link {
          display: inline-block;
          margin-top: 0.75rem;
          padding: 0.45rem 1.1rem;
          font-weight: 600;
          text-decoration: none;
          color: #ffffff;
          background: #4d0ff6;
          border: 2px solid #4d0ff6;
          border-radius: 50px;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .pl-history-link:hover {
          color: #4d0ff6;
          background: #ffffff;
          transform: scale(1.05);
        }

        .pl-map-wrap {
          isolation: isolate;
          height: 460px;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(77, 15, 246, 0.2);
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.2);
        }

        @media (max-width: 991.98px) {
          .pl-map-wrap { height: 360px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pl-fade { animation: none; }
          .pl-btn, .pl-history-link { transition: none; }
        }
      `}</style>

      <div className="container">
        {/* Heading */}
        <div className="text-center mb-4 pl-fade">
          <h1 className="fw-bold" style={{ color: "#4d0ff6" }}>
            Plan Your Route
          </h1>
          <p className="lead mb-0" style={{ color: "#4d0ff6", fontWeight: 500 }}>
            {user?.name ? `Hi ${user.name}, where` : "Where"} do you want to go today?
          </p>
        </div>

        {/* Form */}
        <div className="pl-card pl-fade mb-4">
          <form onSubmit={handleSubmit} noValidate className="pl-form">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-lg-5">
                <label htmlFor="from" className="form-label fw-semibold">
                  Start point
                </label>
                <div className="input-group">
                  <input
                    id="from"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Central Railway Station"
                    value={from}
                    onChange={handleFromChange}
                  />
                  <button
                    type="button"
                    className="btn pl-loc-btn"
                    onClick={useMyLocation}
                    title="Use my current location"
                  >
                    📍 My location
                  </button>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <label htmlFor="to" className="form-label fw-semibold">
                  Destination
                </label>
                <input
                  id="to"
                  type="text"
                  className="form-control"
                  placeholder="e.g. City Airport"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="col-12 col-lg-2">
                <button
                  type="submit"
                  className="btn pl-btn w-100 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Finding..." : "Find Best Route"}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Before searching */}
        {!result && !loading && (
          <div className="pl-card pl-fade text-center py-5">
            <div style={{ fontSize: "3rem" }}>🗺️</div>
            <h5 className="fw-bold" style={{ color: "#4d0ff6" }}>
              Your optimized route will appear here
            </h5>
            <p className="text-muted mb-0">
              Enter a start point and a destination, then click Find Best Route.
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="pl-fade">
            {/* Recommendation message + history link */}
            <div className="pl-banner mb-4" role="status">
              <div className="fw-bold fs-5">
                ✅ Please follow {best.name}, the recommended route.
              </div>
              <div>
                It is predicted to take {formatTime(best.minutes)} with{" "}
                {best.level.toLowerCase()} congestion.
                {heavy.length > 0 &&
                  ` Avoid ${heavy.map((r) => r.name).join(", ")}: heavy congestion is predicted.`}
              </div>

              <Link to={`/history?id=${historyId}`} className="pl-history-link">
                📊 View past traffic history of this route →
              </Link>
            </div>

            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="pl-map-wrap">
                  <RouteMap
                    start={result.start}
                    end={result.end}
                    routes={result.routes}
                    selected={selected}
                    bestIndex={result.bestIndex}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <RouteResults
                  routes={result.routes}
                  selected={selected}
                  bestIndex={result.bestIndex}
                  onSelect={setSelected}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;