import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getAllCoursesApi, searchCoursesApi } from "../../apis/Apis";
import "../../styles/tailwind.css";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [searchQuery, setSearchQuery] = useState(""); // State for storing the search query
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const [showResults, setShowResults] = useState(false); // State to control when to display search results

  useEffect(() => {
    getAllCoursesApi()
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchCoursesApi(searchQuery);
      setSearchResults(response.data.courses);
      setShowResults(true); // Show search results after submitting the form
    } catch (error) {
      console.error("Error searching courses:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  // Determine which array to map based on whether there's a search query
  const displayedCourses = showResults ? searchResults : courses;

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
            Find the Perfect Course
            <br />
            for Your Career Path
          </p>
        </div>
        <div
          style={{
            marginRight: "100px",
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="items-center overflow-hidden mx-auto w-full max-w-lg me-5"
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search course names"
              value={searchQuery}
              onChange={handleSearchInputChange}
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
          </form>
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
          className="bg-white me-2"
          id="ad-container"
          style={{
            minWidth: "200px",
            padding: "10px",
            width: "20%",
            position: "fixed",
          }}
        >
          <img src="/assets/images/ad.png" alt="Ad" />
        </div>
        <div
          className="bg-white"
          style={{
            marginBottom: "100px",
            height: "max-content",
            padding: "20px 50px 40px 50px",
            width: "85%",
            minHeight: "50vh",
            minWidth: "75vw",
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="custom-container mt-3">
                <div className="row row-cols-1 row-cols-md-1 g-3">
                  <p className="text-blue font-primary tw-text-2xl tw-ml-3">
                    {displayedCourses.length} Results
                  </p>
                  {displayedCourses.map((item) => (
                    <div key={item.courseId} className="col">
                      <div className="container">
                        <div
                          className="card d-flex flex-column tw-px-5"
                          style={{
                            height: "100%",
                            boxShadow:
                              "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                            borderRadius: "0px",
                            border: "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {/*main info*/}
                            <div
                              className="card-body d-flex flex-column"
                              style={{
                                width: "80%",
                              }}
                            >
                              <p
                                className="card-title font-primary text-blue"
                                style={{
                                  fontSize: "18px",
                                }}
                              >
                                {item.courseName}
                              </p>
                              <p
                                className="card-text font-secondary text-blue"
                                style={{
                                  fontSize: "14px",
                                  marginBottom: "10px",
                                  textAlign: "justify",
                                  textJustify: "inter-word",
                                }}
                              >
                                {item.courseDescription.slice(0, 200) + "..."}
                              </p>
                              <Link
                                className="btn btn-blue font-primary"
                                to={`/user/courses/courseDetails/${item._id}`}
                                style={{
                                  width: "fit-content",
                                }}
                              >
                                See More
                              </Link>
                            </div>

                            {/* additional info */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                padding: "10px",
                              }}
                            >
                              <div className="mb-2">
                                <div className="tw-flex items-center">
                                  <img
                                    className="me-2"
                                    src="/assets/svg/money.svg"
                                    alt="money"
                                    style={{
                                      height: "20px",
                                    }}
                                  />
                                  <p
                                    className="font-primary text-blue"
                                    style={{
                                      fontSize: "14px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Expected Fees
                                  </p>
                                </div>

                                <div
                                  className="font-secondary text-green"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    marginLeft: "26px",
                                  }}
                                >
                                  {item.expectedFeesMin} -{" "}
                                  {item.expectedFeesMax}
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="tw-flex items-center">
                                  <img
                                    className="me-2"
                                    src="/assets/svg/clock.svg"
                                    alt="clock"
                                    style={{
                                      height: "20px",
                                    }}
                                  />
                                  <p
                                    className="font-primary text-blue"
                                    style={{
                                      fontSize: "14px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Average Duration
                                  </p>
                                </div>

                                <div
                                  className="font-secondary text-green"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    marginLeft: "26px",
                                  }}
                                >
                                  {item.averageDurationMin} -{" "}
                                  {item.averageDurationMax}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
