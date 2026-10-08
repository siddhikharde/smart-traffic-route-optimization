import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center px-3 py-5"
      style={{ minHeight: "80vh", backgroundColor: "#f4f1ff" }}
    >
      <style>{`
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

      <div
        className="card shadow border-0 w-100"
        style={{ maxWidth: "440px", borderRadius: "16px" }}
      >
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