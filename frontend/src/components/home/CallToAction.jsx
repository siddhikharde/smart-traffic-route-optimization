import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function CallToAction() {
  const user = JSON.parse(localStorage.getItem("user"));
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the animation when the section scrolls into view
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container py-5 my-4">
      <style>{`
        /* Outer wrapper: scroll entrance */
        .cta-enter {
          opacity: 0;
          transform: scale(0.75);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.9s ease;
        }

        .cta-enter.cta-visible {
          opacity: 1;
          transform: scale(1);
        }

        /* Inner box: hover zoom */
        .cta-box {
          color: #ffffff;
          border-radius: 24px;
          background: linear-gradient(135deg, #4d0ff6, #8b65f6);
          box-shadow: 0 20px 40px rgba(77, 15, 246, 0.3);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .cta-box:hover {
          transform: scale(1.04);
          box-shadow: 0 28px 55px rgba(77, 15, 246, 0.45);
        }

        /* Button: its own zoom on hover */
        .cta-btn {
          color: #4d0ff6;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .cta-btn:hover {
          color: #4d0ff6;
          background-color: #e3dbff;
          transform: scale(1.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-enter,
          .cta-box,
          .cta-btn {
            transition: none;
          }
          .cta-enter {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div ref={ref} className={`cta-enter ${visible ? "cta-visible" : ""}`}>
        <div className="cta-box text-center p-4 p-md-5">
          <h2 className="fw-bold">Ready to beat the traffic?</h2>
          <p className="lead mb-4" style={{ opacity: 0.9 }}>
            Join TrafficIQ and start planning smarter, faster journeys today.
          </p>
          <Link
            to={user ? "/planner" : "/signup"}
            className="btn btn-light btn-lg fw-semibold px-5 cta-btn"
          >
            {user ? "Plan a Route" : "Create Free Account"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;