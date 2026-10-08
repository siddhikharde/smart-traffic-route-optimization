import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto pt-5 pb-3"
      style={{ backgroundColor: "#1a0b4d", color: "#d9d2f7" }}
    >
      <div className="container">
        <div className="row g-4">

          {/* About */}
          <div className="col-12 col-md-5">
            <h4 className="fw-bold" style={{ color: "#8b65f6" }}>
              TrafficIQ
            </h4>
            <p className="mb-0">
              Smart Traffic Prediction and Intelligent Route Optimization.
              We analyze traffic patterns to forecast congestion and suggest
              the fastest, most efficient routes, saving you time and fuel.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3">
            <h5 className="fw-bold text-white">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <NavLink to="/" className="text-decoration-none footer-link">
                  Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/history" className="text-decoration-none footer-link">
                  History
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/about" className="text-decoration-none footer-link">
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-6 col-md-4">
            <h5 className="fw-bold text-white">Features</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">Real-time Traffic Prediction</li>
              <li className="mb-2">Smart Route Optimization</li>
              <li className="mb-2">Travel History Tracking</li>
              <li className="mb-2">Congestion Analysis</li>
            </ul>
          </div>

        </div>

        <hr style={{ borderColor: "#4d0ff6" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">
          <span>© {year} TrafficIQ. All rights reserved.</span>
          <span>Built with React, Node.js and Machine Learning</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;