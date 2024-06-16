import React from "react";
import { Link, useNavigate } from "react-router-dom";


const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg fixed-top bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="logo.png"
                alt="Logo"
                height="120"
                width="150"
              />
            </a>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active text-black" aria-current="page" to="#">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-black" to="#">
                    Products
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-black"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="#">
                        Armchairs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Lights
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Rugs and Carpets
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        Beds
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex gap-2" role="search">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome, {user.firstName}!
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/user/userProfile/:id">
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
                  <>
                    <Link className="btn btn-outline-danger" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-outline-success" to="/register">
                      Register
                    </Link>
                  </>
                )}
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
