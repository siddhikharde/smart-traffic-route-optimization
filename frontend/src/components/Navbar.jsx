import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
      <div className="container-fluid">

        {/* Logo */}
        <NavLink
          className="navbar-brand fw-bold fs-2"
          to="/"
          style={{ color: "#4d0ff6" }}
        >
          TrafficIQ
        </NavLink>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile Menu */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >

          {/* Pages */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink
                className="nav-link fs-5 m-2"
                to="/"
                style={{ color: "#8b65f6" }}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link fs-5 m-2"
                to="/history"
                style={{ color: "#8b65f6" }}
              >
                History
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link fs-5 m-2"
                to="/about"
                style={{ color: "#8b65f6" }}
              >
                About
              </NavLink>
            </li>

          </ul>

          {/* Login / User Section */}
          <div className="d-flex align-items-center gap-3">

            {user ? (
              <>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    backgroundColor: "#4d0ff6",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold"
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="fw-bold">
                  {user.name}
                </span>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  style={{
                    color: "#4d0ff6",
                    borderColor: "#4d0ff6"
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

                <button
                  className="btn"
                  style={{
                    backgroundColor: "#4d0ff6",
                    color: "white",
                    borderColor: "#4d0ff6"
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar