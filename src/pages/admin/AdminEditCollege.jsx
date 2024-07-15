import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleCollegeApi,
  updateCollegeApi,
  getAllCoursesApi,
} from "../../apis/Apis";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Importing the delete icon from FontAwesome

const AdminEditCollege = () => {
  const { id } = useParams(); // Receive college ID from URL
  const navigate = useNavigate();

  // State variables to hold form data and initial data retrieval
  const [collegeName, setCollegeName] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegeNumber, setCollegeNumber] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [establishedAt, setEstablishedAt] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [applyNow, setApplyNow] = useState("");
  const [collegeImage, setCollegeImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [collegeWebsiteUrl, setCollegeWebsiteUrl] = useState("");
  const [brochure, setBrochure] = useState(null); // Changed to null for file input

  useEffect(() => {
    // Fetch college details based on ID when component mounts
    getSingleCollegeApi(id).then((res) => {
      const college = res.data.college;
      setCollegeName(college.collegeName);
      setCollegeDescription(college.collegeDescription);
      setCollegeEmail(college.collegeEmail);
      setCollegeNumber(college.collegeNumber);
      setCollegeType(college.collegeType);
      setCollegeWebsiteUrl(college.collegeWebsiteUrl); // Added collegeWebsiteUrl
      setAffiliation(college.affiliation);
      setCoursesAvailable(college.coursesAvailable);
      setEstablishedAt(college.establishedAt);
      setAddress(college.location.address);
      setGoogleMapsUrl(college.location.googleMapsUrl);
      setApplyNow(college.applyNow);
      setBrochure(college.brochure); // Initialize to null for file input handling
      setOldImage(college.collegeImageUrl);
      setGalleryImages(college.galleryImages);
      setGalleryImagePreviews(
        college.galleryImages.map((image, index) => ({
          url: image,
          index,
        }))
      );
      setSelectedCourses(college.coursesAvailable);
    });

    // Fetch all courses
    getAllCoursesApi().then((res) => {
      setCourses(res.data.courses || []);
    });
  }, [id]);

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCollegeImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle gallery image upload and preview
  const handleGalleryImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setGalleryImages((prevGalleryImages) => [...prevGalleryImages, ...files]);
    const previews = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      index: galleryImages.length + index,
    }));
    setGalleryImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // Handle course selection checkbox change
  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCourses([...selectedCourses, value]);
    } else {
      setSelectedCourses(
        selectedCourses.filter((courseId) => courseId !== value)
      );
    }
  };

  // Handle deletion of gallery images
  const handleDeleteGalleryImage = (index) => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);

    const updatedPreviews = galleryImagePreviews.filter(
      (preview) => preview.index !== index
    );
    setGalleryImagePreviews(updatedPreviews);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collegeName", collegeName);
    formData.append("collegeDescription", collegeDescription);
    formData.append("collegeEmail", collegeEmail);
    formData.append("collegeNumber", collegeNumber);
    formData.append("collegeType", collegeType);
    formData.append("affiliation", affiliation);
    formData.append("establishedAt", establishedAt);
    formData.append("location[address]", address);
    formData.append("location[googleMapsUrl]", googleMapsUrl);
    formData.append("collegeWebsiteUrl", collegeWebsiteUrl);

    formData.append("applyNow", applyNow);
    if (collegeImage) {
      formData.append("collegeImage", collegeImage);
    }
    if (brochure) {
      // Append brochure if available
      formData.append("brochure", brochure);
    }
    // Append selected courses to formData
    selectedCourses.forEach((courseId) => {
      formData.append("coursesAvailable[]", courseId);
    });
    // Append galleryImages array
    galleryImages.forEach((image, index) => {
      formData.append(`galleryImages[${index}]`, image);
    });

    console.log("Form Data:", formData);
    updateCollegeApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/colleges");
        }
      })
      .catch((err) => {
        console.error("Update Error:", err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form Column */}
        <div className="col-md-6 bg-white p-4 shadow">
          <p className="text-center fs-4 fw-bold mb-4">
            Editing College - <span className="text-indigo">{collegeName}</span>
          </p>
          <form onSubmit={handleSubmit}>
            {/* College details inputs */}
            <label className="form-label">College Name</label>
            <input
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter college name"
            />

            <label className="form-label">College Description</label>
            <textarea
              value={collegeDescription}
              onChange={(e) => setCollegeDescription(e.target.value)}
              className="form-control mb-2"
              rows="3"
              placeholder="Enter college description"
            />

            <label className="form-label">College Email</label>
            <input
              value={collegeEmail}
              onChange={(e) => setCollegeEmail(e.target.value)}
              className="form-control mb-2"
              type="email"
              placeholder="Enter college email"
            />

            <label className="form-label">College Phone Number</label>
            <input
              value={collegeNumber}
              onChange={(e) => setCollegeNumber(e.target.value)}
              className="form-control mb-2"
              type="tel"
              placeholder="Enter college phone number"
            />

            <label className="form-label">College Type</label>
            <input
              value={collegeType}
              onChange={(e) => setCollegeType(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter college type"
            />

            <label className="form-label">Affiliation</label>
            <input
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter affiliation"
            />

            <label className="form-label">Established At</label>
            <input
              value={establishedAt}
              onChange={(e) => setEstablishedAt(e.target.value)}
              className="form-control mb-2"
              type="date"
            />

            <label className="form-label">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter college address"
            />

            <label className="form-label">Google Maps URL</label>
            <input
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="form-control mb-2"
              type="url"
              placeholder="Enter Google Maps URL"
            />

            <label className="form-label">Apply Now URL</label>
            <input
              value={applyNow}
              onChange={(e) => setApplyNow(e.target.value)}
              className="form-control mb-2"
              type="url"
              placeholder="Enter apply now URL"
            />

            <label className="form-label">College Website URL</label>
            <input
              value={collegeWebsiteUrl}
              onChange={(e) => setCollegeWebsiteUrl(e.target.value)}
              className="form-control mb-2"
              type="url"
              placeholder="Enter college website URL"
            />

            <label className="form-label">Brochure</label>
            <input
              onChange={(e) => setBrochure(e.target.files[0])}
              className="form-control mb-2"
              type="file"
              accept=".pdf"
            />

            {/* Courses selection */}
            <label className="form-label mt-3">Courses Available</label>
            <div className="form-check">
              {courses.map((course) => (
                <div key={course._id}>
                  <input
                    type="checkbox"
                    id={`course-${course._id}`}
                    value={course._id}
                    checked={selectedCourses.includes(course._id)}
                    onChange={handleCourseChange}
                    className="form-check-input"
                  />
                  <label
                    htmlFor={`course-${course._id}`}
                    className="form-check-label"
                  >
                    {course.courseName}
                  </label>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Update College
            </button>
          </form>
        </div>

        {/* Image Column */}
        <div className="col-md-6">
          <div className="bg-white p-4 shadow">
            {/* Image upload section */}
            <label className="form-label">College Image</label>
            <input
              onChange={handleImageUpload}
              className="form-control mb-2"
              type="file"
              accept="image/*"
            />
            {/* Display old image */}
            {oldImage && (
              <div className="mt-2">
                <p>Old Image:</p>
                <img
                  src={oldImage}
                  alt="Old College"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
            {/* Display new image preview */}
            {previewImage && (
              <div className="mt-2">
                <p>New Image Preview:</p>
                <img
                  src={previewImage}
                  alt="New College Preview"
                  className="img-fluid mb-2"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}

            {/* Gallery images upload section */}
            <label className="form-label">Gallery Images</label>
            <input
              onChange={handleGalleryImagesUpload}
              className="form-control mb-2"
              type="file"
              accept="image/*"
              multiple
            />
            {/* Display gallery images */}
            <div className="row mt-2">
              {galleryImagePreviews.map((preview, index) => (
                <div key={preview.index} className="col-6 col-md-3">
                  <div className="card h-100" style={{ height: "200px" }}>
                    <img
                      src={preview.url}
                      className="card-img-top img-fluid rounded"
                      alt={`Gallery Image ${preview.index + 1}`}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body p-2 d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteGalleryImage(preview.index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCollege;
