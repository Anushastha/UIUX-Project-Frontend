import React, { useEffect, useState } from "react";
import { getAllCollegesApi, searchCollegesApi } from "../../apis/Apis";
import { FaSync, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../../styles/compare.css";

const CompareColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchResults1, setSearchResults1] = useState(null);
  const [searchResults2, setSearchResults2] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [searched1, setSearched1] = useState(false); // Track if search 1 performed
  const [searched2, setSearched2] = useState(false); // Track if search 2 performed
  const navigate = useNavigate();

  useEffect(() => {
    getAllCollegesApi()
      .then((res) => {
        setColleges(res.data.colleges);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
      });
  }, []);

  const handleSearchInputChange1 = (e) => {
    setSearchQuery1(e.target.value);
  };

  const handleSearchInputChange2 = (e) => {
    setSearchQuery2(e.target.value);
  };

  const handleSearchSubmit1 = async (e) => {
    e.preventDefault();
    if (!searchQuery1.trim()) {
      setError1("Enter a college name first");
      return;
    }
    setLoading1(true);
    try {
      const response = await searchCollegesApi(searchQuery1);
      setTimeout(() => {
        setSearchResults1(response.data.colleges);
        setLoading1(false);
        setError1("");
        setSearched1(true); // Mark search 1 as performed
      }, 2000); // 1 second delay
    } catch (error) {
      console.error("Error searching colleges:", error);
      setLoading1(false);
      setError1("Error searching colleges. Please try again.");
    }
  };

  const handleSearchSubmit2 = async (e) => {
    e.preventDefault();
    if (!searchQuery2.trim()) {
      setError2("Enter a college name first");
      return;
    }
    setLoading2(true);
    try {
      const response = await searchCollegesApi(searchQuery2);
      setTimeout(() => {
        setSearchResults2(response.data.colleges);
        setLoading2(false);
        setError2("");
        setSearched2(true);
      }, 1000);
    } catch (error) {
      console.error("Error searching colleges:", error);
      setLoading2(false);
      setError2("Error searching colleges. Please try again.");
    }
  };

  const handleRefresh1 = () => {
    setSearchQuery1("");
    setSearchResults1(null);
    setSearched1(false);
  };

  const handleRefresh2 = () => {
    setSearchQuery2("");
    setSearchResults2(null);
    setSearched2(false);
  };

  const handleNavigate1 = () => {
    if (searchResults1 && searchResults1.length > 0) {
      navigate(`/user/colleges/collegeDetails/${searchResults1[0]._id}`);
    }
  };

  const handleNavigate2 = () => {
    if (searchResults2 && searchResults2.length > 0) {
      navigate(`/user/colleges/collegeDetails/${searchResults2[0]._id}`);
    }
  };

  const renderCollegeInformation = (
    searchResults,
    handleNavigate,
    loading,
    searchQuery,
    error,
    searched
  ) => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (searchResults === null) {
      return null;
    }

    if (searchResults.length === 0) {
      return (
        <div>
          <h3>No college with this name found</h3>
        </div>
      );
    }

    // Function to format date
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString("en-CA", options);
    };

    return (
      <div
        className="font-primary college-container"
        style={{
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          position: "relative",
          minHeight: "300px",
          marginBottom: "20px",
        }}
        onClick={handleNavigate}
      >
        {searchResults[0].collegeImageUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={searchResults[0].collegeImageUrl}
              alt="College Image"
              style={{
                maxWidth: "40%",
                height: "auto",
                marginBottom: "20px",
              }}
            />
          </div>
        )}
        <p>Established On: {formatDate(searchResults[0].establishedAt)}</p>
        <p>Affiliation: {searchResults[0].affiliation}</p>
        <u>Facilities</u>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {searchResults[0].galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{ maxWidth: "20%", objectFit: "cover", margin: "0 10px" }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-10 container flex items-center justify-center min-h-screen">
        <div
          className="tw-bg-white tw-max-w-5xl tw-mx-4 md:tw-mx-auto tw-relative"
          style={{
            height: "fit-content",
            padding: "40px",
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "center",
                position: "relative",
                minHeight: "60vh",
              }}
            >
              {!searched1 && (
                <form
                  className="container"
                  onSubmit={handleSearchSubmit1}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="search-container">
                    <input
                      type="text"
                      onChange={handleSearchInputChange1}
                      value={searchQuery1}
                      placeholder="Search college 1"
                      className="search-input"
                    />
                    <button type="submit" className="btn-search">
                      <FaSearch />
                    </button>
                  </div>
                </form>
              )}
              {renderCollegeInformation(
                searchResults1,
                handleNavigate1,
                loading1,
                searchQuery1,
                error1,
                searched1
              )}
              {searchResults1 && searchResults1.length > 0 && (
                <button
                  type="button"
                  onClick={handleRefresh1}
                  className="btn-refresh"
                  style={{
                    position: "relative",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaSync />
                    Refresh
                  </div>
                </button>
              )}
            </div>
            <div
              style={{
                width: "2px",
                backgroundColor: "#ccc",
                margin: "0 20px",
              }}
            />
            <div
              style={{
                flex: 1,
                textAlign: "center",
                position: "relative",
                minHeight: "60vh",
              }}
            >
              {!searched2 && (
                <form
                  className="container"
                  onSubmit={handleSearchSubmit2}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="search-container">
                    <input
                      type="text"
                      onChange={handleSearchInputChange2}
                      value={searchQuery2}
                      placeholder="Search college 2"
                      className="search-input"
                    />
                    <button type="submit" className="btn-search">
                      <FaSearch />
                    </button>
                  </div>
                </form>
              )}
              {renderCollegeInformation(
                searchResults2,
                handleNavigate2,
                loading2,
                searchQuery2,
                error2,
                searched2
              )}
              {searchResults2 && searchResults2.length > 0 && (
                <button
                  type="button"
                  onClick={handleRefresh2}
                  className="btn-refresh"
                  style={{
                    position: "relative",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaSync />
                    Refresh
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareColleges;
