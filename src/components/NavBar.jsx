import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <nav
        className="navbar bg-light navbar-expand-lg fixed-top"
        style={{ boxShadow: "0px 2px 10px 0px rgba(99, 99, 99, 0.1)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {user && user.isAdmin ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div
                    className="font-primary"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Admin Dashboard
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/colleges"
                  >
                    Colleges
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/courses"
                  >
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-lg-2 font-primary"
                    to="/user/blogs"
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            )}
            <form className="d-flex gap-2" role="search">
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle bg-transparent border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user.firstName}!
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/user/userProfile/:id"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/changepp">
                        Change password
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/contact">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="mt-3 mt-lg-0">
                  <Link
                    className="btn btn-blue me-2 font-primary"
                    to="/auth?mode=login"
                    style={{ width: "80px" }}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-blue font-primary"
                    to="/auth?mode=register"
                  >
                    Register
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
