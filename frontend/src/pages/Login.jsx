import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

      // Change this URL to match your backend
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Expected response: { token: "...", user: { name: "...", email: "..." } }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
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
        .auth-form .btn-show:hover {
          background-color: #4d0ff6 !important;
          color: #fff !important;
        }
      `}</style>

      <div
        className="card shadow border-0 w-100"
        style={{ maxWidth: "420px", borderRadius: "16px" }}
      >
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