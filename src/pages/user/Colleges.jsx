import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "../../styles/tailwind.css";

const Colleges = () => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen">
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
        <div className="tw-w-full tw-max-w-lg tw-shadow-md tw-px-4 tw-py-2">
          <form className="tw-flex">
            <div className="tw-relative tw-flex tw-items-center tw-w-full">
              <FiSearch className="tw-absolute tw-left-3 tw-text-gray-400" />
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Search college name"
                className="tw-w-full tw-pl-10 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500"
                onChange={handleInputChange}
                value={query}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Colleges;
