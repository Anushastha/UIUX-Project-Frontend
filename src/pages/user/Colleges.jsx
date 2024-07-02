import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const Colleges = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/colleges/search?query=${query}`);
      setResults(response.data.colleges);
    } catch (error) {
      console.error("Error searching colleges:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div style={{ margin: "15vh" }}>
          <p
            className="flex font-primary"
            style={{
              textAlign: "center",
              fontSize: "30px",
              position: "absolute",
            }}
          >
            Discover colleges that
            <br />
            fit your criteria
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className=" items-center overflow-hidden mx-auto w-full max-w-lg"
            style={{
              position: "absolute",
              marginTop: "20vh",
              left: "35%",
              display: "flex",
            }}
          >
            <input
              type="text"
              placeholder="Search college names"
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
              {results.map((college, index) => (
                <li key={index} className="mb-2">
                  {college.collegeName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Colleges;
