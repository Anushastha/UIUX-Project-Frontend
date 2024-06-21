import React, { useState, useEffect } from "react";
import {
  createCollegeApi,
  deleteCollegeApi,
  getAllCollegesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminColleges = () => {
  const [collegeName, setCollegeName] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeFees, setCollegeFees] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState("");
  const [establishedAt, setEstablishedAt] = useState("");

  const [collegeImage, setCollegeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCollegeImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    getAllCollegesApi().then((res) => {
      setColleges(res.data.colleges);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collegeName", collegeName);
    formData.append("collegeDescription", collegeDescription);
    formData.append("collegeFees", collegeFees);
    formData.append("collegeType", collegeType);
    formData.append("coursesAvailable", coursesAvailable);
    formData.append("establishedAt", establishedAt);
    formData.append("collegeImage", collegeImage);

    createCollegeApi(formData)
      .then((res) => {
        if (res.data.success === false) {
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

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this college?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCollegeApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <p
          className="font-primary font-bold"
          style={{
            fontSize: "30px",
          }}
        >
          All Colleges
        </p>
        <button
          className="btn-blue px-4 py-2 me-1 font-primary"
          data-bs-toggle="modal"
          data-bs-target="#collegeModal"
          style={{
            borderRadius: "8px",
          }}
        >
          Add College
        </button>
        <div
          className="modal fade"
          id="collegeModal"
          tabIndex="-1"
          aria-labelledby="collegeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-blue text-white">
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
                  placeholder="Enter college name"
                />
                <label className="mb-2">College Description</label>
                <textarea
                  onChange={(e) => setCollegeDescription(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Enter college description"
                  cols="4"
                  rows="4"
                ></textarea>
                <label className="mb-2">Fees</label>
                <input
                  onChange={(e) => setCollegeFees(e.target.value)}
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter college fees"
                />
                <label className="mb-2">College Type</label>
                <select
                  onChange={(e) => setCollegeType(e.target.value)}
                  className="form-select mb-2"
                >
                  <option selected>Open the select menu</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Government">Government</option>
                </select>
                <label className="mb-2">Add or select courses</label>
                <select
                  onChange={(e) => setCoursesAvailable(e.target.value)}
                  className="form-select mb-2"
                >
                  <option selected>Open the select menu</option>
                  <option value="Course">Course</option>
                </select>
                <label className="mb-2">Established At</label>
                <input
                  onChange={(e) => setEstablishedAt(e.target.value)}
                  className="form-control mb-2"
                  type="date"
                />
                <label className="mb-2">College Image</label>
                <input
                  onChange={handleImageUpload}
                  type="file"
                  className="form-control"
                />
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
                  className="btn btn-dark text-white"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow">
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
  );
};

export default AdminColleges;
