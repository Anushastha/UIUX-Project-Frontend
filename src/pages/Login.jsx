import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../apis/Apis";

const Login = () => {
  // make useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // make change function
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    // api call
    loginApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // set token and user data in local storage
          localStorage.setItem("token", res.data.token);

          // Check if user is admin
          const isAdmin = res.data.isAdmin;
          if (isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }

          // Converting incomming json
          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedJson);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!");
      });
  };

  return (
    <>
      <div className="row vh-100 align-items-center">
        {/* Login Form */}
        <div className="col-md-6">
          <h1 className="display-4 text-center my-5">
            Sign in to your account
          </h1>
          <form className="px-5">
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                onChange={changeEmail}
                className="form-control"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={changePassword}
                className="form-control"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-success w-100"
              type="submit"
            >
              Login
            </button>

            <Link
              to={`/sendemail`}
              type="button"
              className="btn btn-outline-success w-100 mt-3"
            >
              Forgot Password
            </Link>

            <p className="text-center mt-3">
              Do not have an account?{" "}
              <a
                href="/register"
                className="text-decoration-none text-success text-bold"
              >
                Register here
              </a>
            </p>
          </form>
        </div>

        {/* Image */}
        <div className="col-md-6">
          <img
            src="/assets/images/decoimg.jpg"
            alt="image"
            className="img-fluid"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
