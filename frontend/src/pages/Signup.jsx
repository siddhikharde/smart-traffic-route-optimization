import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoadBackground from "../components/home/RoadBackground";
import "../components/home/home.css"; // styles for the road background

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Change this URL to match your backend
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Request failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        /* Light shades of #4d0ff6 */
        .login-page {
          position: relative;
          overflow: hidden;
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background: linear-gradient(135deg, #f1edff 0%, #c9b8ff 50%, #9d80f9 100%);
        }

        /* Road background (sharp, no blur) */
        .login-bg {
          position: absolute;
          inset: 0;
        }

        /* Roads recolored to purple so they show on the light background */
        .login-page .road-surface {
          stroke: rgba(77, 15, 246, 0.15);
        }
        .login-page .road-center {
          stroke: rgba(77, 15, 246, 0.45);
        }
        .login-page .road-bg circle[fill="#ffffff"] {
          fill: #4d0ff6;
        }

        /* Signup card above the background */
        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          border: 1px solid rgba(77, 15, 246, 0.15) !important;
          border-radius: 16px !important;
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 20px 50px rgba(77, 15, 246, 0.25) !important;
        }

        .auth-form .form-control::placeholder {
          color: #4d0ff6 !important;
          opacity: 1 !important;
        }
        .auth-form .form-control:focus {
          border-color: #4d0ff6 !important;
          box-shadow: 0 0 0 0.25rem rgba(77, 15, 246, 0.25) !important;
        }
        .auth-form .btn-show:hover,
        .auth-form .btn-show:focus,
        .auth-form .btn-show:active {
          background-color: #4d0ff6 !important;
          border-color: #4d0ff6 !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* Background */}
      <div className="login-bg">
        <RoadBackground />
      </div>

      {/* Signup form */}
      <div className="card login-card">
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold text-center mb-1" style={{ color: "#4d0ff6" }}>
            TrafficIQ
          </h2>
          <p className="text-center text-muted mb-4">Create your account</p>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2" role="alert">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-show"
                  style={{
                    color: "#4d0ff6",
                    borderColor: "#4d0ff6",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100 fw-semibold mt-2"
              style={{
                backgroundColor: "#4d0ff6",
                color: "white",
                borderColor: "#4d0ff6",
              }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-semibold text-decoration-none"
              style={{ color: "#4d0ff6" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;