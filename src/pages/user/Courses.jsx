import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { getAllCoursesApi } from "../../apis/Apis";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCoursesApi()
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
      });
  }, []);
  console.log(jobs);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/courses/search?query=${query}`);
      setResults(response.data.courses);
    } catch (error) {
      console.error("Error searching courses:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="container my-5 w-full max-w-md">
        <div style={{ marginLeft: "10vh" }}>
          <p
            className="flex font-primary"
            style={{
              textAlign: "left",
              fontSize: "30px",
              position: "relative",
            }}
          >
            Find the Perfect Course
            <br />
            for Your Career Path
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className="items-center overflow-hidden mx-auto w-full max-w-lg"
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search course names"
              className="bg-white me-1 border border-white rounded-md shadow-sm px-2 py-2 text-gray-900 focus:outline-none w-full sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-3/4"
              onChange={handleInputChange}
              style={{
                width: "60vh",
              }}
              value={query}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-white border border-white rounded-md shadow-sm text-gray-900 hover:bg-gray-100"
            >
              <FiSearch className="text-xl text-[#2E266D]" />
            </button>
          </div>
        </form>
        <div className="mt-4">
          {results.length > 0 && (
            <ul className="list-disc pl-5">
              {results.map((courses, index) => (
                <li key={index} className="mb-2">
                  {courses.courseName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-5xl mt-8 space-x-4">
        <div className="bg-white p-4 rounded-md shadow-md w-1/3">
          <img
            src="/path-to-your-image.jpg"
            alt="Course"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="bg-white p-4 rounded-md shadow-md w-2/3">
          {courses.length > 0 ? (
            <ul>
              {courses.map((item) => (
                <li key={item} className="mb-2">
                  <p className="font-bold">{courses.courseName}</p>
                  <p>{courses.courseDescription}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No course details available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
