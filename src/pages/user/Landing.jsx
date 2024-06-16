import React from "react";
import "../../scss/customs.scss";
const Landing = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <h1 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
              CollegeSeek
            </h1>
            <div className="flex items-center mb-4">
              <p className="font-secondary" style={{ textAlign: "justify" }}>
                <b>CollegeSeek</b> simplifies your college search journey,
                providing a seamless experience to help you discover the perfect
                fit for your future aspirations and academic goals.
              </p>
            </div>
            <div className="row items-center">
              <a
                href="/#"
                className="text-blue flex items-center"
                style={{ textDecoration: "none", fontSize: "20px" }}
              >
                <u className="me-2">Learn More</u>
                <img src="/assets/svg/info_circle.svg" height={20} />
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/assets/images/landing.png"
              alt="CollegeSeek"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
