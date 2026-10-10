import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RoadBackground from "../components/home/RoadBackground";
import "../components/home/home.css"; // styles for the road background

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, from = "up", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ab-reveal ab-from-${from} ${visible ? "ab-in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ---------- Content ---------- */
const objectives = [
  "Predict congestion before it happens",
  "Compare routes using predicted travel time",
  "Recommend the best route clearly",
  "Save every search in the user's history",
];

const steps = [
  {
    icon: "📡",
    title: "Collect Traffic Data",
    text: "Traffic patterns are gathered and prepared as input for the prediction model.",
  },
  {
    icon: "🧠",
    title: "Predict Congestion",
    text: "A machine learning model forecasts how busy each road will be at the time of travel.",
  },
  {
    icon: "🧭",
    title: "Optimize the Route",
    text: "Available routes are compared using the predicted congestion, and the best one is chosen.",
  },
  {
    icon: "🏠",
    title: "Show the Result",
    text: "The recommended route and its alternatives appear on the Home page with time and congestion level.",
  },
];

const levels = [
  { badge: "success", name: "Low", text: "Roads are moving freely. Best choice for the fastest trip." },
  { badge: "warning", name: "Moderate", text: "Some slowdowns expected. Still a reasonable option." },
  { badge: "danger", name: "Heavy", text: "High congestion predicted. Better to avoid this route." },
];

const benefits = [
  { icon: "⏱️", title: "Save Time", text: "Skip the roads predicted to be jammed." },
  { icon: "⛽", title: "Save Fuel", text: "Less time in stop-and-go traffic means lower fuel use." },
  { icon: "😌", title: "Less Stress", text: "Know the best route before you leave." },
  { icon: "📈", title: "Smarter Decisions", text: "Choices based on predictions, not guesses." },
];

const tech = ["React", "React Router", "Bootstrap", "Machine Learning", "REST API"];

/* ---------- Page ---------- */
function About() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          overflow-x: hidden;
        }

        /* ----- Hero ----- */
        .ab-hero {
          position: relative;
          overflow: hidden;
          padding: 140px 0 90px;
          text-align: center;
          color: #4d0ff6;
          background: linear-gradient(135deg, #f1edff 0%, #c9b8ff 50%, #9d80f9 100%);
        }

        .ab-overlay {
          position: absolute;
          inset: 0;
          background: rgba(241, 237, 255, 0.55);
        }

        .ab-hero-content {
          position: relative;
          z-index: 2;
        }

        .ab-hero .road-surface { stroke: rgba(77, 15, 246, 0.15); }
        .ab-hero .road-center { stroke: rgba(77, 15, 246, 0.45); }
        .ab-hero .route-line { stroke: #0fb98d; }
        .ab-hero .road-bg circle[fill="#ffffff"] { fill: #4d0ff6; }

        .ab-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: #4d0ff6;
          background: rgba(77, 15, 246, 0.1);
          border: 1px solid rgba(77, 15, 246, 0.3);
        }

        /* ----- Shared ----- */
        .ab-kicker {
          color: #4d0ff6;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .ab-title {
          color: #12063a;
          font-weight: 700;
        }

        .ab-soft-section {
          background-color: #f4f1ff;
        }

        /* ----- Scroll reveal ----- */
        .ab-reveal {
          height: 100%;
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.9s ease;
        }
        .ab-from-up { transform: translateY(50px); }
        .ab-from-left { transform: translateX(-100px); }
        .ab-from-right { transform: translateX(100px); }

        .ab-reveal.ab-in {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* ----- Cards (hover zoom) ----- */
        .ab-card {
          height: 100%;
          padding: 1.75rem;
          background: #ffffff;
          border: 1px solid #ece8ff;
          border-radius: 16px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .ab-card:hover {
          transform: translateY(-8px) scale(1.04);
          border-color: #4d0ff6;
          box-shadow: 0 16px 35px rgba(77, 15, 246, 0.25);
        }

        .ab-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          border-radius: 14px;
          background: rgba(77, 15, 246, 0.1);
        }

        /* ----- Aim list ----- */
        .ab-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px dashed #d9d0ff;
        }
        .ab-list-item:last-child { border-bottom: none; }

        .ab-check {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          border-radius: 50%;
          background: #4d0ff6;
        }

        /* ----- Flow steps ----- */
        .ab-step-number {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          border-radius: 50%;
          background: #4d0ff6;
        }

        @media (min-width: 992px) {
          .ab-step-col { position: relative; }
          .ab-step-col:not(:last-child)::after {
            content: "→";
            position: absolute;
            top: 50%;
            right: -1.05rem;
            transform: translateY(-50%);
            font-size: 1.6rem;
            font-weight: 700;
            color: #4d0ff6;
            z-index: 2;
          }
        }

        /* ----- Chips ----- */
        .ab-chip {
          display: inline-block;
          margin: 0.35rem;
          padding: 0.5rem 1.1rem;
          font-weight: 600;
          color: #4d0ff6;
          border: 2px solid #4d0ff6;
          border-radius: 50px;
          background: #ffffff;
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .ab-chip:hover {
          transform: scale(1.1);
          color: #ffffff;
          background: #4d0ff6;
        }

        /* ----- Call to action ----- */
        .ab-cta {
          color: #ffffff;
          border-radius: 24px;
          background: linear-gradient(135deg, #4d0ff6, #8b65f6);
          box-shadow: 0 20px 40px rgba(77, 15, 246, 0.3);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .ab-cta:hover {
          transform: scale(1.03);
          box-shadow: 0 28px 55px rgba(77, 15, 246, 0.45);
        }

        .ab-btn {
          border: 2px solid #ffffff;
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .ab-btn-solid {
          color: #4d0ff6;
          background-color: #ffffff;
        }
        .ab-btn-solid:hover {
          color: #4d0ff6;
          background-color: #e3dbff;
          border-color: #e3dbff;
          transform: scale(1.08);
        }
        .ab-btn-outline {
          color: #ffffff;
          background-color: transparent;
        }
        .ab-btn-outline:hover {
          color: #4d0ff6;
          background-color: #ffffff;
          transform: scale(1.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-reveal,
          .ab-card,
          .ab-chip,
          .ab-cta,
          .ab-btn {
            transition: none;
          }
          .ab-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* ---------- Hero ---------- */}
      <section className="ab-hero">
        <RoadBackground />
        <div className="ab-overlay" />

        <div className="container ab-hero-content">
          <span className="ab-badge">🚦 About TrafficIQ</span>
          <h1 className="display-4 fw-bold mt-3">
            Predict the traffic.
            <br />
            Find the best route.
          </h1>
          <p
            className="lead mx-auto mt-3 mb-0"
            style={{ maxWidth: "680px", fontWeight: 500 }}
          >
            TrafficIQ forecasts congestion first, then uses that prediction to
            choose the route that gets you there fastest.
          </p>
        </div>
      </section>

      {/* ---------- Our aim ---------- */}
      <section className="container py-5 my-4">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <Reveal from="left">
              <div className="ab-kicker">Our aim</div>
              <h2 className="ab-title">Predict first. Then optimize.</h2>
              <p className="text-muted">
                A good route is not always the shortest one. It is the one with
                the least congestion at the time you travel. TrafficIQ is built
                around this idea: we first predict how traffic will behave, and
                then use that prediction to find the optimized route.
              </p>
              <p className="text-muted mb-0">
                The final result is displayed on the Home page, so users see the
                recommended route, its travel time and the expected congestion
                level right away.
              </p>
            </Reveal>
          </div>

          <div className="col-12 col-lg-6">
            <Reveal from="right">
              <div className="ab-card" style={{ cursor: "default" }}>
                <h5 className="fw-bold mb-3" style={{ color: "#4d0ff6" }}>
                  What TrafficIQ does
                </h5>
                {objectives.map((o) => (
                  <div className="ab-list-item" key={o}>
                    <span className="ab-check">✓</span>
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="ab-soft-section py-5">
        <div className="container py-4">
          <Reveal>
            <div className="text-center mb-5">
              <div className="ab-kicker">How it works</div>
              <h2 className="ab-title">From traffic data to the best route</h2>
            </div>
          </Reveal>

          <div className="row g-4">
            {steps.map((s, i) => (
              <div className="col-12 col-md-6 col-lg-3 ab-step-col" key={s.title}>
                <Reveal from={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
                  <div className="ab-card">
                    <span className="ab-step-number">{i + 1}</span>
                    <div className="ab-icon">{s.icon}</div>
                    <h5 className="fw-bold">{s.title}</h5>
                    <p className="text-muted mb-0">{s.text}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Reading the route preview ---------- */}
      <section className="container py-5 my-4">
        <Reveal>
          <div className="text-center mb-5">
            <div className="ab-kicker">On the Home page</div>
            <h2 className="ab-title">Understanding the Smart Route Preview</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "640px" }}>
              Each route shows its distance, predicted travel time and a
              congestion level. The route marked Recommended is the one our
              prediction finds best for your trip.
            </p>
          </div>
        </Reveal>

        <div className="row g-4">
          {levels.map((l, i) => (
            <div className="col-12 col-md-4" key={l.name}>
              <Reveal delay={i * 0.15}>
                <div className="ab-card text-center">
                  <span className={`badge text-bg-${l.badge} fs-6 mb-3`}>
                    {l.name}
                  </span>
                  <p className="text-muted mb-0">{l.text}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className="ab-soft-section py-5">
        <div className="container py-4">
          <Reveal>
            <div className="text-center mb-5">
              <div className="ab-kicker">Why it matters</div>
              <h2 className="ab-title">Better trips, every day</h2>
            </div>
          </Reveal>

          <div className="row g-4">
            {benefits.map((b, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={b.title}>
                <Reveal from={i < 2 ? "left" : "right"} delay={i * 0.12}>
                  <div className="ab-card text-center">
                    <div className="ab-icon mx-auto">{b.icon}</div>
                    <h5 className="fw-bold">{b.title}</h5>
                    <p className="text-muted mb-0">{b.text}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tech ---------- */}
      <section className="container py-5 my-4 text-center">
        <Reveal>
          <div className="ab-kicker">Built with</div>
          <h2 className="ab-title mb-4">Technology behind TrafficIQ</h2>
          <div>
            {tech.map((t) => (
              <span className="ab-chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="container pb-5 mb-4">
        <Reveal>
          <div className="ab-cta text-center p-4 p-md-5">
            <h2 className="fw-bold">See your best route today</h2>
            <p className="lead mb-4" style={{ opacity: 0.9 }}>
              Let TrafficIQ predict the traffic so you don't have to.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                to={user ? "/history" : "/signup"}
                className="btn btn-lg fw-semibold px-4 ab-btn ab-btn-solid"
              >
                {user ? "Go to History" : "Create Free Account"}
              </Link>
              <Link
                to="/"
                className="btn btn-lg fw-semibold px-4 ab-btn ab-btn-outline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default About;