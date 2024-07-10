import React, { useState, useEffect } from "react";
import {
  createCollegeApi,
  deleteCollegeApi,
  getAllCollegesApi,
  getAllCoursesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminColleges = () => {
  const [collegeName, setCollegeName] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegeNumber, setCollegeNumber] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [collegeWebsiteUrl, setCollegeWebsiteUrl] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [establishedAt, setEstablishedAt] = useState("");
  const [collegeImage, setCollegeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [applyNow, setApplyNow] = useState("");
  const [brochure, setBrochure] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCollegesApi().then((res) => {
      console.log("Colleges API response:", res.data.colleges);
      setColleges(res.data.colleges);
    });

    getAllCoursesApi().then((res) => {
      setCourses(res.data.courses || []);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCollegeImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleBrochureUpload = (event) => {
    const file = event.target.files[0];
    setBrochure(file);
  };

  const handleGalleryImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setGalleryImages(files);
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCoursesAvailable([...coursesAvailable, value]);
    } else {
      setCoursesAvailable(
        coursesAvailable.filter((courseId) => courseId !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collegeName", collegeName);
    formData.append("collegeDescription", collegeDescription);
    formData.append("collegeEmail", collegeEmail);
    formData.append("collegeNumber", collegeNumber);
    formData.append("collegeType", collegeType);
    formData.append("affiliation", affiliation);
    formData.append("collegeWebsiteUrl", collegeWebsiteUrl);
    coursesAvailable.forEach((course) => {
      formData.append("coursesAvailable[]", course);
    });
    formData.append("establishedAt", establishedAt);
    formData.append("location[address]", address);
    formData.append("location[googleMapsUrl]", googleMapsUrl);
    formData.append("applyNow", applyNow);
    formData.append("collegeImage", collegeImage);
    formData.append("brochure", brochure);
    galleryImages.forEach((image) => {
      formData.append("galleryImages", image);
    });

    createCollegeApi(formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setColleges([...colleges, res.data.college]);
          setCollegeName("");
          setCollegeDescription("");
          setCollegeEmail("");
          setCollegeNumber("");
          setCollegeType("");
          setAffiliation("");
          setCollegeWebsiteUrl("");
          setCoursesAvailable([]);
          setEstablishedAt("");
          setAddress("");
          setGoogleMapsUrl("");
          setApplyNow("");
          setCollegeImage(null);
          setPreviewImage(null);
          setBrochure(null);
          setGalleryImages([]);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    console.log("College ID to delete:", id); // Verify the ID being passed
    if (window.confirm("Are you sure you want to delete this college?")) {
      deleteCollegeApi(id)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setColleges(colleges.filter((college) => college._id !== id));
          }
        })
        .catch((error) => {
          console.error("Error deleting college:", error);
          toast.error("Internal Server Error!");
        });
    }
  };
  

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between mb-4 align-items-center">
        <p className="font-primary font-bold" style={{ fontSize: "30px" }}>
          All Colleges
        </p>
        <button
          className="btn-blue px-4 py-2 me-1 font-primary"
          data-bs-toggle="modal"
          data-bs-target="#collegeModal"
          style={{ borderRadius: "8px" }}
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
                <h1 className="modal-title fs-5" id="collegeModalLabel">
                  Add a new college
                </h1>
              </div>
              <div className="modal-body">
                <label className="mb-2 font-primary">College Name</label>
                <input
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter college name"
                />
                <label className="mb-2 font-primary">College Description</label>
                <textarea
                  onChange={(e) => setCollegeDescription(e.target.value)}
                  className="form-control mb-2"
                  placeholder="Enter college description"
                  cols="4"
                  rows="4"
                ></textarea>
                <label className="mb-2 font-primary">Email</label>
                <input
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  className="form-control mb-2"
                  type="email"
                  placeholder="Enter college email"
                />
                <label className="mb-2 font-primary">Contact Number</label>
                <input
                  onChange={(e) => setCollegeNumber(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter college contact number"
                />
                <label className="mb-2 font-primary">College Type</label>
                <select
                  onChange={(e) => setCollegeType(e.target.value)}
                  className="form-select mb-2"
                >
                  <option selected>Open the select menu</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Government">Government</option>
                </select>
                <label className="mb-2 font-primary">Affiliation</label>
                <input
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter college affiliation"
                />
                <label className="mb-2 font-primary">College Website URL</label>
                <input
                  onChange={(e) => setCollegeWebsiteUrl(e.target.value)}
                  className="form-control mb-2"
                  type="url"
                  placeholder="Enter college website URL"
                />
                <label className="mb-2 font-primary">
                  Add or select courses
                </label>
                <div className="mb-2">
                  {courses.map((course) => (
                    <div key={course._id}>
                      <input
                        type="checkbox"
                        id={course._id}
                        value={course._id}
                        onChange={handleCourseChange}
                        checked={coursesAvailable.includes(course._id)}
                      />
                      <label htmlFor={course._id} className="ms-2">
                        {course.courseName}
                      </label>
                    </div>
                  ))}
                </div>
                <label className="mb-2 font-primary">Established At</label>
                <input
                  onChange={(e) => setEstablishedAt(e.target.value)}
                  className="form-control mb-2"
                  type="date"
                />
                <label className="mb-2 font-primary">Address</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter college address"
                />
                <label className="mb-2 font-primary">Google Maps URL</label>
                <input
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Enter Google Maps URL"
                />
                <label className="mb-2 font-primary">Apply Now URL</label>
                <input
                  onChange={(e) => setApplyNow(e.target.value)}
                  className="form-control mb-2"
                  type="url"
                  placeholder="Enter apply now URL"
                />
                <label className="mb-2 font-primary">
                  Upload College Image
                </label>
                <input
                  onChange={handleImageUpload}
                  className="form-control mb-2"
                  type="file"
                />
                {previewImage && (
                  <div>
                    <img
                      src={previewImage}
                      alt="College Preview"
                      className="img-thumbnail mb-2"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
                <label className="mb-2 font-primary">Upload Brochure</label>
                <input
                  onChange={handleBrochureUpload}
                  className="form-control mb-2"
                  type="file"
                />
                <label className="mb-2 font-primary">
                  Upload Gallery Images
                </label>
                <input
                  onChange={handleGalleryImagesUpload}
                  className="form-control mb-2"
                  type="file"
                  multiple
                />
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
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add College
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Type</th>
              <th scope="col">Affiliation</th>
              <th scope="col">Courses</th>
              <th scope="col">Established</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => {
              console.log("College object:", college); // Check the structure of each college object
              return (
                <tr key={college._id}>
                  <td>{college.collegeName}</td>
                  <td>{college.collegeEmail}</td>
                  <td>{college.collegeNumber}</td>
                  <td>{college.collegeType}</td>
                  <td>{college.affiliation}</td>
                  <td>
                    {college.coursesAvailable
                      .map((course) => course.courseName)
                      .join(", ")}
                  </td>
                  <td>
                    {new Date(college.establishedAt).toLocaleDateString()}
                  </td>
                  <td>{college.location.address}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/colleges/editCollege/${college._id}`}
                        type="button"
                        className="btn btn-blue"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(college._id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminColleges;
