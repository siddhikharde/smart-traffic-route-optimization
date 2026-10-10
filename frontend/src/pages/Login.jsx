import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoadBackground from "../components/home/RoadBackground";
import "../components/home/home.css"; // styles for the road background
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
  setLoading(true);
  const { token, user } = await loginUser(formData);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  navigate("/planner");
} catch (err) {
  setError(err.message);
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

        /* Login card above the background */
        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
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

      {/* Login form */}
      <div className="card login-card">
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold text-center mb-1" style={{ color: "#4d0ff6" }}>
            TrafficIQ
          </h2>
          <p className="text-center text-muted mb-4">Login to your account</p>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="fw-semibold text-decoration-none"
              style={{ color: "#4d0ff6" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;