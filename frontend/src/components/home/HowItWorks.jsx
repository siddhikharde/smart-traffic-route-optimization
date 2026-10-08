import React from "react";

const steps = [
  { title: "Enter Your Trip", text: "Add your starting point, destination and departure time." },
  { title: "We Analyze Traffic", text: "Our model studies traffic patterns to predict congestion." },
  { title: "Get the Best Route", text: "See the fastest route with expected travel time." },
  { title: "Track Your History", text: "Past searches are saved so you can review them anytime." },
];

function HowItWorks() {
  return (
    <section style={{ backgroundColor: "#f4f1ff" }} className="py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <div className="fw-semibold text-uppercase small" style={{ color: "#4d0ff6" }}>
            How it works
          </div>
          <h2 className="fw-bold">From trip to best route in 4 steps</h2>
        </div>

        <div className="row g-4 text-center">
          {steps.map((s, i) => (
            <div className="col-12 col-sm-6 col-lg-3" key={s.title}>
              <div className="step-number">{i + 1}</div>
              <h5 className="fw-bold">{s.title}</h5>
              <p className="text-muted mb-0">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;