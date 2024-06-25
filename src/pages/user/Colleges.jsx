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
            className="flex items-center overflow-hidden"
            style={{
              position: "absolute",
              marginTop: "20vh",
              left: "35%",
              display: "flex",
              width: "400px",
            }}
          >
            <input
              type="text"
              placeholder="Search college names"
              className="me-1 bg-white border border-white rounded-md shadow-sm px-4 py-2 text-gray-900 bg-white border-none focus:outline-none"
              onChange={handleInputChange}
              value={query}
              style={{
                width: "100%",
              }}
            />
            <button
              type="submit"
              className="items-center justify-center py-1 bg-white h-full"
              style={{
                border: "none",
                height: "42px",
              }}
            >
              <FiSearch
                style={{
                  height: "20px",
                  width: "35px",
                  color: "#2E266D",
                }}
              />
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
      <div>
        
      </div>
    </div>
  );
};

export default Colleges;
