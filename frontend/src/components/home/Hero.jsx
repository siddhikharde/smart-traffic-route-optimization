import React from "react";
import { Link } from "react-router-dom";
import RoadBackground from "./RoadBackground";
import RoutePreview from "./RoutePreview";

function Hero() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="hero-section hero-light">
      <style>{`
        /* Light background so purple text is readable */
        .hero-section.hero-light {
          color: #4d0ff6;
          background: linear-gradient(135deg, #f1edff 0%, #c9b8ff 50%, #9d80f9 100%);
        }

        .hero-light .hero-overlay {
          background: linear-gradient(
            90deg,
            rgba(241, 237, 255, 0.75) 0%,
            rgba(241, 237, 255, 0.25) 60%,
            transparent 100%
          );
        }

        /* All hero text in #4d0ff6 */
        .hero-light h1,
        .hero-light .hero-lead {
          color: #4d0ff6;
        }

        .hero-light .hero-lead {
          font-weight: 500;
        }

        .hero-light .hero-badge {
          color: #4d0ff6;
          background: rgba(77, 15, 246, 0.1);
          border: 1px solid rgba(77, 15, 246, 0.3);
        }

        .hero-light .text-accent {
          color: #2de8ee;
        }

        /* Buttons: shared style */
        .hero-btn {
          border: 2px solid #4d0ff6;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }

        /* Get Started: white background, purple text */
        .hero-btn-solid {
          color: #4d0ff6;
          background-color: #ffffff;
        }

        .hero-btn-solid:hover {
          color: #4d0ff6;
          background-color: #e3dbff;
          border-color: #4d0ff6;
          transform: translateY(-2px);
        }

        /* Learn More: purple background, white text */
        .hero-btn-outline {
          color: #ffffff !important;
          background-color: #4d0ff6 !important;
          border-color: #4d0ff6 !important;
        }

        /* Learn More on hover: white background, purple text */
        .hero-btn-outline:hover,
        .hero-btn-outline:focus,
        .hero-btn-outline:active {
          color: #4d0ff6 !important;
          background-color: #ffffff !important;
          border-color: #4d0ff6 !important;
          transform: translateY(-2px);
        }

        /* Roads recolored to purple */
        .hero-light .road-surface {
          stroke: rgba(77, 15, 246, 0.15);
        }
        .hero-light .road-center {
          stroke: rgba(77, 15, 246, 0.45);
        }
        .hero-light .route-line {
          stroke: #0fb98d;
        }
        .hero-light .road-bg circle[fill="#ffffff"] {
          fill: #4d0ff6;
        }

        /* Route preview card: purple text on a light glass card */
        .hero-light .glass-card {
          color: #4d0ff6;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(77, 15, 246, 0.2);
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.2);
        }

        .hero-light .route-item {
          background: rgba(77, 15, 246, 0.06);
        }

        .hero-light .route-item.best {
          background: rgba(34, 227, 181, 0.2);
          border-color: #0fb98d;
        }
      `}</style>

      <RoadBackground />
      <div className="hero-overlay" />

      <div className="container position-relative hero-content py-5">
        <div className="row align-items-center g-5">
          {/* Text: slides in from the left */}
          <div className="col-12 col-lg-7 text-center text-lg-start slide-in-left">
            <span className="hero-badge">🚦 AI-Powered Traffic Intelligence</span>

            <h1 className="display-4 fw-bold mt-3">
              Predict Traffic.
              <br />
              <span className="text-accent">Optimize</span> Every Route.
            </h1>

            <p className="lead hero-lead mx-auto mx-lg-0 mt-3">
              TrafficIQ analyzes traffic patterns to forecast congestion before
              it happens and recommends the fastest, smartest route, so you save
              time, fuel and stress on every trip.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mt-4">
              <Link
                to={user ? "/history" : "/signup"}
                className="btn btn-lg fw-semibold px-4 hero-btn hero-btn-solid"
              >
                {user ? "View My History" : "Get Started"}
              </Link>
              <Link
                to="/about"
                className="btn btn-lg fw-semibold px-4 hero-btn hero-btn-outline"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Preview card: slides in from the right */}
          <div className="col-12 col-lg-5 slide-in-right">
            <RoutePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;