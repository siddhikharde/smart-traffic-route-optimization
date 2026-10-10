import React, { useEffect, useRef, useState } from "react";

const stats = [
  { icon: "📡", title: "Real-time", text: "Traffic monitoring" },
  { icon: "🧠", title: "ML-Powered", text: "Congestion prediction" },
  { icon: "🛣️", title: "Multiple", text: "Route options" },
  { icon: "🕒", title: "Saved", text: "Travel history" },
];

function Stats() {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the animation when the card scrolls into view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container">
      <style>{`
        .stats-box {
          position: relative;
          z-index: 3;
          margin-top: -3rem;
          padding: 1.5rem;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(77, 15, 246, 0.18);
        }

        /* Keeps the sliding items inside the card while they travel */
        .stats-clip {
          overflow: hidden;
          padding: 0.75rem;
        }

        /* Outer wrapper: handles the scroll entrance */
        .stat-slot {
          opacity: 0;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.9s ease;
        }

        .stat-slot.from-left {
          transform: translateX(-120px);
        }

        .stat-slot.from-right {
          transform: translateX(120px);
        }

        .stats-visible .stat-slot {
          opacity: 1;
          transform: translateX(0);
        }

        /* Inner wrapper: handles the hover zoom */
        .stat-item {
          padding: 1rem 0.5rem;
          border-radius: 16px;
          cursor: pointer;
          transition: transform 0.3s ease,
                      box-shadow 0.3s ease,
                      background-color 0.3s ease;
        }

        .stat-item:hover {
          transform: scale(1.15);
          background-color: rgba(77, 15, 246, 0.08);
          box-shadow: 0 10px 25px rgba(77, 15, 246, 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-slot,
          .stat-item {
            transition: none;
          }
          .stat-slot {
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>

      <div
        ref={cardRef}
        className={`stats-box ${visible ? "stats-visible" : ""}`}
      >
        <div className="stats-clip">
          <div className="row g-3 text-center">
            {stats.map((s, i) => (
              <div className="col-6 col-md-3" key={s.title}>
                {/* First two slide from the left, last two from the right */}
                <div
                  className={`stat-slot ${i < 2 ? "from-left" : "from-right"}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="stat-item">
                    <div className="fs-2">{s.icon}</div>
                    <div
                      className="fw-bold fs-5"
                      style={{ color: "#4d0ff6" }}
                    >
                      {s.title}
                    </div>
                    <div className="text-muted small">{s.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;