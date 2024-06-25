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

  const customColors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A6", // Pink
    "#33FFF3", // Aqua
    "#f59e04", // Orange
    "#7e42b9", // Purple
    "#FF33C4", // Magenta
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * customColors.length);
    return customColors[randomIndex];
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <nav
        className="navbar bg-light navbar-expand-lg fixed-top"
        style={{ boxShadow: "0px 2px 10px 0px rgba(99, 99, 99, 0.1)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"></Link>
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
                <div className="dropdown d-flex align-items-center">
                  <div
                    className="tw-rounded-full tw-flex tw-items-center tw-justify-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: getRandomColor(),
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  <button
                    className="btn dropdown-toggle bg-transparent border-0 font-primary tw-me-5"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome, {user.firstName}!
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item font-primary"
                        to={`/user/userProfile/${user.id}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item font-primary"
                        to="/changepp"
                      >
                        Change password
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item font-primary"
                        to="/user/contact"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item font-primary"
                      >
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
