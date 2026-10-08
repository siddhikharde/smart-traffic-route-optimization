import React, { useEffect, useRef, useState } from "react";

const features = [
  { icon: "🚦", title: "Traffic Prediction", text: "Forecast congestion ahead of time using traffic patterns and machine learning models." },
  { icon: "🧭", title: "Route Optimization", text: "Compare multiple routes and get the fastest, most efficient option for your trip." },
  { icon: "📊", title: "Congestion Analysis", text: "Understand where and when traffic builds up with clear, easy-to-read insights." },
  { icon: "⏰", title: "Best Time to Leave", text: "Find the ideal departure time to avoid peak-hour delays." },
  { icon: "🕘", title: "Travel History", text: "Every search is saved so you can review and revisit your past routes." },
  { icon: "🌱", title: "Save Time and Fuel", text: "Smarter routes mean shorter trips, lower fuel use and fewer emissions." },
];

function Features() {
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the animation when the cards scroll into view
  useEffect(() => {
    const el = gridRef.current;
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
    <section className="container py-5 my-4">
      <style>{`
        /* Keeps the sliding cards inside the page while they travel */
        .feat-clip {
          overflow: hidden;
          padding: 1rem 0.75rem;
        }

        /* Outer wrapper: scroll entrance (one by one, from the left) */
        .feat-slot {
          height: 100%;
          opacity: 0;
          transform: translateX(-90px);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.8s ease;
        }

        .feat-visible .feat-slot {
          opacity: 1;
          transform: translateX(0);
        }

        /* Inner card: hover effect */
        .feat-card {
          height: 100%;
          padding: 1.75rem;
          background: #ffffff;
          border: 1px solid #ece8ff;
          border-radius: 16px;
          cursor: pointer;
          transition: transform 0.3s ease,
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }

        .feat-card:hover {
          transform: translateY(-8px) scale(1.04);
          border-color: #4d0ff6;
          box-shadow: 0 16px 35px rgba(77, 15, 246, 0.25);
        }

        .feat-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          border-radius: 14px;
          background: rgba(77, 15, 246, 0.1);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .feat-card:hover .feat-icon {
          background: rgba(77, 15, 246, 0.2);
          transform: scale(1.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .feat-slot,
          .feat-card,
          .feat-icon {
            transition: none;
          }
          .feat-slot {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="text-center mb-5">
        <div
          className="fw-semibold text-uppercase small"
          style={{ color: "#4d0ff6" }}
        >
          Features
        </div>
        <h2 className="fw-bold">Everything you need for smarter travel</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "560px" }}>
          From predicting congestion to choosing the best route, TrafficIQ
          keeps every trip efficient.
        </p>
      </div>

      <div className="feat-clip">
        <div
          ref={gridRef}
          className={`row g-4 ${visible ? "feat-visible" : ""}`}
        >
          {features.map((f, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={f.title}>
              <div
                className="feat-slot"
                style={{ transitionDelay: `${i * 0.18}s` }}
              >
                <div className="feat-card">
                  <div className="feat-icon">{f.icon}</div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted mb-0">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;