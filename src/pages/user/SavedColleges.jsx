import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSavedApi, removeSavedApi } from "../../apis/Apis";
import "../../styles/tailwind.css";

const SavedColleges = () => {
  const [save, setSaves] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    const parsedUserData = JSON.parse(storedUserData);
    const userId = parsedUserData._id;

    getSavedApi(userId)
      .then((res) => {
        setSaves(res.data.save);
      })
      .catch((error) => {
        console.error("Error fetching user saves:", error);
        toast.error("Failed to fetch user saves");
      });
  }, []);

  const handleRemoveSave = (id) => {
    removeSavedApi(id)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setSaves((prevSaves) => prevSaves.filter((item) => item._id !== id));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error removing saved item:", error);
        toast.error("Failed to remove saved item");
      });
  };

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="container bg-white"
          style={{
            height: "max-content",
            padding: "30px 40px 30px 40px",
            marginBottom: "100px",
            maxWidth: "90%",
            minHeight: "400px",
          }}
        >
          <div className="container tw-px-20">
            <p
              className="mb-3 font-primary text-blue"
              style={{
                fontSize: "30px",
              }}
            >
              Saved Colleges
            </p>
            {save.length > 0 ? (
              save.map((item) => (
                <div
                  key={item._id}
                  className="card d-flex flex-column px-5 py-3"
                  style={{
                    height: "100%",
                    boxShadow:
                      "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                    borderRadius: "0px",
                    border: "none",
                    marginBottom: "20px",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.college?.collegeImageUrl || "placeholder.jpg"}
                        alt={item.college?.collegeName || "College Image"}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-8">
                      <div
                        className="card-body"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            flex: "start",
                            marginLeft: "10px",
                          }}
                        >
                          <p
                            className="font-primary text-blue"
                            style={{ fontSize: "28px" }}
                          >
                            {item.college?.collegeName || "N/A"}
                          </p>
                          <div className="tw-flex tw-gap-6 tw-mt-1">
                            <div className="tw-flex tw-gap-1 tw-items-center">
                              <img
                                src="/assets/svg/location.svg"
                                alt="location"
                                className="tw-h-4"
                              />
                              <p className="card-text font-secondary tw-text-black tw-text-sm">
                                {item.college?.location.address}
                              </p>
                            </div>

                            <div className="tw-flex tw-gap-1 tw-items-center">
                              <img
                                src="/assets/svg/phone-black.svg"
                                alt="phone"
                                className="tw-h-4"
                              />
                              <p className="card-text font-secondary tw-text-black tw-text-sm">
                                {item.college?.collegeNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: "end",
                          }}
                        >
                          <button
                            className="bookmark-button"
                            onClick={() => handleRemoveSave(item._id)}
                            onMouseEnter={() => handleMouseEnter(item._id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {hoveredItemId === item._id ? (
                              <img
                                src="/assets/svg/bookmark-outlined.svg"
                                style={{
                                  height: "35px",
                                }}
                                alt="Remove Bookmark"
                              />
                            ) : (
                              <img
                                src="/assets/svg/bookmark-filled.svg"
                                style={{
                                  height: "35px",
                                }}
                                alt="Remove Bookmark"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="my-5 text-center font-bold text-red font-primary"
                style={{ fontSize: "20px" }}
              >
                No colleges saved
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedColleges;
