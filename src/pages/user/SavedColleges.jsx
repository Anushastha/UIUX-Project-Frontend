import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSavedApi, removeSavedApi } from "../../apis/Apis";

const SavedColleges = ({}) => {
  const [save, setSaves] = useState([]);

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
    const confirmDialog = window.confirm(
      "Are you sure you want to remove the college from saved list?"
    );
    if (!confirmDialog) {
      return;
    } else {
      removeSavedApi(id)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error("Error removing saved item:", error);
          toast.error("Failed to remove saved item");
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div
            className="card p-3 mb-3 border"
            style={{ borderColor: "#D8812F" }}
          >
            <h5 className="mb-4">Saved Colleges</h5>
            {save.length > 0 ? (
              save.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.college?.collegeImageUrl || "placeholder.jpg"}
                        alt={item.college?.collegeName || "College Image"}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.college?.collegeName || "N/A"}
                        </h5>
                        <p className="card-text">
                          <small className="text-muted">
                            Location: {item.college?.address || "N/A"}
                          </small>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Contact: ${item.college?.collegeNumber || "N/A"}
                          </small>
                        </p>
                        <button
                          className="btn btn-sm btn-outline-danger me-2"
                          onClick={() => handleRemoveSave(item._id)}
                        >
                          <img src="/assets/svg/bookmark-outlined.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No saved colleges</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedColleges;
