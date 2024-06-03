import React, { useState } from "react";
import { registerApi } from "../apis/Apis";
import { toast } from "react-toastify";

const Register = () => {
  // step 1 : Create a state variable
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // step 2 : Create a function for changing the state variable
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  //  After clicking the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // step 1 : Check data in console
    console.log(firstName, lastName, email, password);

    // Creating json data (fieldName-)
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    // Send data to backend
    registerApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <>
      <div className="row vh-100 align-items-center">
        {/* Form */}
        <div className="col-md-6">
          <h1 className="display-4 text-center my-4">Create an Account</h1>
          <form className="px-5">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Firstname
              </label>
              <input
                onChange={changeFirstName}
                className="form-control"
                type="text"
                id="firstName"
                placeholder="Enter your firstname"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Lastname
              </label>
              <input
                onChange={changeLastName}
                className="form-control"
                type="text"
                id="lastName"
                placeholder="Enter your lastname"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
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
              className="btn btn-success w-100 mt-3"
              type="submit"
            >
              Submit
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-decoration-none text-success text-bold"
              >
                Log in here
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

export default Register;
