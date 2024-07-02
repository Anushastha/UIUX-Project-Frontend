import React, { useState, useEffect } from "react";
import {
  createCourseApi,
  deleteCourseApi,
  getAllCoursesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../../scss/customs.scss";

const AdminCourses = () => {
  // Make useState
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [expectedFeesMin, setExpectedFeesMin] = useState("");
  const [expectedFeesMax, setExpectedFeesMax] = useState("");
  const [averageDurationMin, setAverageDurationMin] = useState("");
  const [averageDurationMax, setAverageDurationMax] = useState("");

  // make useState for image
  const [courseImage, setCourseImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // image upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setCourseImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Load all courses when page loads
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCoursesApi().then((res) => {
      setCourses(res.data.courses);
    });
  }, []);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseDescription", courseDescription);
    formData.append("expectedFeesMin", expectedFeesMin);
    formData.append("expectedFeesMax", expectedFeesMax);
    formData.append("averageDurationMin", averageDurationMin);
    formData.append("averageDurationMax", averageDurationMax);
    formData.append("courseImage", courseImage);

    // send request to backend API
    createCourseApi(formData)
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

  //delete course function
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCourseApi(id).then((res) => {
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
          <p className="font-primary font-bold" style={{ fontSize: "30px" }}>
            All Courses
          </p>
          <button
            type="button"
            className="btn btn-blue px-4 py-2 me-1 text-white font-primary"
            data-bs-toggle="modal"
            data-bs-target="#courseModal"
          >
            Add Course
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="courseModal"
            tabIndex="-1"
            aria-labelledby="courseModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-blue text-white">
                  <h1 className="modal-title fs-5" id="courseModalLabel">
                    Add a new course!
                  </h1>
                </div>
                <div className="modal-body">
                  <label className="mb-2 font-primary">Course Name</label>
                  <input
                    onChange={(e) => setCourseName(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter course name"
                  />

                  <label htmlFor="" className="mb-2 font-primary">
                    Course Description
                  </label>
                  <textarea
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter description"}
                    cols="4"
                    rows="4"
                  ></textarea>

                  <label htmlFor="" className="mb-2 font-primary">
                    Expected Fees (Min)
                  </label>
                  <input
                    onChange={(e) => setExpectedFeesMin(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Enter the minimum fees"
                  />

                  <label htmlFor="" className="mb-2 font-primary">
                    Expected Fees (Max)
                  </label>
                  <input
                    onChange={(e) => setExpectedFeesMax(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Enter the maximum fees"
                  />

                  <label htmlFor="" className="mb-2 font-primary">
                    Average Duration (Min)
                  </label>
                  <input
                    onChange={(e) => setAverageDurationMin(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter minimum average duration"
                  />

                  <label htmlFor="" className="mb-2 font-primary">
                    Average Duration (Max)
                  </label>
                  <input
                    onChange={(e) => setAverageDurationMax(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter maximum average duration"
                  />

                  <label className="mb-2 font-primary">Course Image</label>
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
                    className="btn btn-secondary font-primary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-dark text-white font-primary"
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
          {/* Course Table */}
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center font-primary">
              <tr>
                <th scope="col">Course Image</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Description</th>
                <th scope="col">Expected Fees</th>
                <th scope="col">Average Duration</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {courses.map((item) => (
                <tr key={item._id}>
                  <td className="d-flex justify-content-center">
                    <img
                      src={item.courseImageUrl}
                      alt={`Course: ${item.courseName}`}
                      className="img-fluid rounded object-cover mt-2"
                      height={50}
                      width={70}
                    />
                  </td>
                  <td>{item.courseName}</td>
                  <td>{item.courseDescription.slice(0, 20)}</td>
                  <td>
                    Rs. {item.expectedFeesMin}-{item.expectedFeesMax}
                  </td>
                  <td>
                    {item.averageDurationMin}-{item.averageDurationMax} years
                  </td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/courses/editCourse/${item._id}`}
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

export default AdminCourses;
