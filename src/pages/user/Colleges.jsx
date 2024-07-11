import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getAllCollegesApi } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { Link } from "react-router-dom";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    getAllCollegesApi()
      .then((res) => {
        setColleges(res.data.colleges);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div style={{ marginLeft: "11vh" }}>
          <p
            className="font-primary"
            style={{
              display: "flex",
              flex: "start",
              textAlign: "center",
              fontSize: "30px",
              position: "relative",
            }}
          >
            Discover colleges that
            <br />
            fit your criteria
          </p>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            id="search-bar"
            className="items-center overflow-hidden mx-auto w-full max-w-lg"
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search college names"
              className="bg-white me-1 focus:tw-outline-none border border-white rounded-md shadow-sm px-2 py-2 text-gray-900 focus:outline-none w-full sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-3/4"
              style={{
                width: "60vh",
                marginLeft: "40vh",
              }}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-white border border-white rounded-md shadow-sm text-gray-900 hover:bg-gray-100"
            >
              <FiSearch className="text-xl text-blue" />
            </button>
          </div>
          <div
            className="save-and-compare-buttons"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="items-center overflow-hidden mx-auto w-full max-w-lg me-3"
              style={{
                marginTop: "5vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="bg-white text-blue font-secondary me-1"
                style={{
                  padding: "10px",
                  width: "max-content",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Saved Colleges
              </div>
              <div
                className="bg-white text-blue font-secondary me-1"
                style={{
                  padding: "10px",
                  width: "max-content",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/assets/svg/cards.svg"
                  style={{ height: "25px", marginRight: "5px" }}
                />
                Compare
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "fit-content",
          display: "flex",
          padding: "8px 20px 20px 20px",
        }}
      >
        <div
          className="bg-blue me-2"
          style={{ maxWidth: "200px", padding: "10px" }}
        >
          <img src="/assets/images/ad.png" alt="Ad" />
        </div>
        <div
          className="bg-white"
          style={{
            marginBottom: "100px",
            height: "max-content",
            padding: "20px 50px 40px 50px",
          }}
        >
          <div className="custom-container mt-3">
            <div className="row row-cols-1 row-cols-md-1 g-3">
              <p className="text-blue font-primary tw-text-2xl tw-ml-3 mb-3">
                {colleges.length} Results
              </p>
              <div className="row">
                {colleges.map((college) => (
                  <div
                    key={college.id}
                    className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <Link
                      to={`/user/colleges/collegeDetails/${college.id}`}
                      className="card-link"
                    >
                      <div
                        className="card h-100"
                        style={{
                          boxShadow:
                            "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                          borderRadius: "0px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={college.collegeImageUrl}
                          alt={college.collegeName}
                          className="card-img-top"
                          style={{
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "0px",
                          }}
                        />
                        <div className="card-body">
                          <p
                            className="card-title font-primary text-blue"
                            style={{
                              fontSize: "18px",
                              marginBottom: "5vh",
                            }}
                          >
                            {college.collegeName}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src="/assets/svg/location.svg"
                              alt="phone"
                              style={{
                                height: "15px",
                              }}
                            />
                            <p
                              className="card-text font-secondary"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {college.location.address}
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src="/assets/svg/phone-black.svg"
                              alt="location"
                              style={{
                                height: "15px",
                              }}
                            />
                            <p
                              className="card-text font-secondary"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {college.collegeNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleges;
