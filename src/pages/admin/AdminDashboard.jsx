import React, { useState, useEffect } from "react";
import {
  createCollegeApi,
  deleteCollegeApi,
  getAllCollegesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Make useState
  const [collegeName, setCollegeName] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeFees, setCollegeFees] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [courses, setCourses] = useState("");

  // make useState for image
  const [collegeImage, setCollegeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // image upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCollegeImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Load all colleges when page loads
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    getAllCollegesApi().then((res) => {
      setColleges(res.data.colleges);
    });
  }, []);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collegeName", collegeName);
    formData.append("collegeDescription", collegeDescription);
    formData.append("collegeFees", collegeFees);
    formData.append("collegeType", collegeType);
    formData.append("courses", courses);
    formData.append("collegeImage", collegeImage);

    // send request to backend API
    createCollegeApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  //delete function
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete this college?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCollegeApi(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h1 className="text-indigo">Admin Dashboard</h1>

          <button
            type="button"
            className="btn btn-warning text-white"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add College
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-warning text-white">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add a new college
                  </h1>
                </div>
                <div className="modal-body">
                  <label className="mb-2">College Name</label>
                  <input
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter college name"
                  />

                  <label htmlFor="" className="mb-2">
                    College Description
                  </label>
                  <textarea
                    onChange={(e) => setCollegeDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter college description"}
                    cols="4"
                    rows="4"
                  ></textarea>

                  <label htmlFor="" className="mb-2">
                    Fees
                  </label>
                  <input
                    onChange={(e) => setCollegeFees(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter college fees"
                  />

                  <label htmlFor="" className="mb-2">
                    College Type
                  </label>
                  <select
                    onChange={(e) => setCollegeType(e.target.value)}
                    className="form-select mb-2"
                  >
                    <option selected>Open the select menu</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="Government">Government</option>
                  </select>

                  <label htmlFor="" className="mb-2">
                    Add or select courses
                  </label>
                  <select
                    onChange={(e) => setCourses(e.target.value)}
                    className="form-select mb-2"
                  >
                    <option selected>Open the select menu</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                    <option value="Course">Course</option>
                  </select>

                  <label className="mb-2">College Image</label>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="form-control"
                  />

                  {/* Preview Image */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover mt-2"
                      height={10}
                      width={100}
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-blue text-white"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white p-4 shadow">
          {/* College Table */}
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th scope="col">College Image</th>
                <th scope="col">College Name</th>
                <th scope="col">College Description</th>
                <th scope="col">College Fees</th>
                <th scope="col">College Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {colleges.map((item) => (
                <tr key={item._id}>
                  <td className="d-flex justify-content-center">
                    <img
                      src={item.collegeImageUrl}
                      alt={`College: ${item.collegeName}`}
                      className="img-fluid rounded object-cover mt-2"
                      height={50}
                      width={70}
                    />
                  </td>
                  <td>{item.collegeName}</td>
                  <td>{item.collegeDescription.slice(0, 20)}</td>
                  <td>Rs. {item.collegeFees}</td>
                  <td>{item.collegeType}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/edit/${item._id}`}
                        type="button"
                        className="btn btn-blue"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
