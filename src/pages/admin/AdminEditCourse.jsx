import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCourseApi, updateCourseApi } from "../../apis/Apis";
import { toast } from "react-toastify";

const AdminEditCourse = () => {
  const { id } = useParams();

  useEffect(() => {
    getSingleCourseApi(id).then((res) => {
      const course = res.data.course;
      setCourseName(course.courseName);
      setCourseDescription(course.courseDescription);
      setExpectedFeesMin(course.expectedFeesMin);
      setExpectedFeesMax(course.expectedFeesMax);
      setAverageDurationMin(course.averageDurationMin);
      setAverageDurationMax(course.averageDurationMax);
      setOldImage(course.courseImageUrl);
    });
  }, [id]);

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [expectedFeesMin, setExpectedFeesMin] = useState("");
  const [expectedFeesMax, setExpectedFeesMax] = useState("");
  const [averageDurationMin, setAverageDurationMin] = useState("");
  const [averageDurationMax, setAverageDurationMax] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCourseImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();
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

    updateCourseApi(id, formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/courses");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server Error!");
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 bg-white p-4 shadow">
          <p className="text-center fs-4 fw-bold mb-4 font-primary">
            Editing Course - <span className="text-blue">{courseName}</span>
          </p>
          <form>
            <label className="form-label font-primary">Course Name</label>
            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter course name"
            />

            <label className="form-label font-primary">
              Course Description
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter description"
              rows="4"
            ></textarea>

            <label className="form-label font-primary">
              Expected Fees (Min)
            </label>
            <input
              value={expectedFeesMin}
              onChange={(e) => setExpectedFeesMin(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter minimum expected fees"
            />

            <label className="form-label font-primary">
              Expected Fees (Max)
            </label>
            <input
              value={expectedFeesMax}
              onChange={(e) => setExpectedFeesMax(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter maximum expected fees"
            />

            <label className="form-label font-primary">
              Average Duration (Min)
            </label>
            <input
              value={averageDurationMin}
              onChange={(e) => setAverageDurationMin(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter minimum average duration"
            />

            <label className="form-label font-primary">
              Average Duration (Max)
            </label>
            <input
              value={averageDurationMax}
              onChange={(e) => setAverageDurationMax(e.target.value)}
              type="number"
              className="form-control mb-2"
              placeholder="Enter maximum average duration"
            />

            <label className="form-label font-primary">Course Image</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="form-control mb-2"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-blue w-100 mt-2 font-primary"
            >
              Update Course
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <div>
            <h6 className="mb-3 font-primary">Old Image Preview</h6>
            <img
              className="img-fluid rounded-4 object-fit-cover"
              src={oldImage}
              alt=""
            />
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <h6 className="mb-3 font-primary">New Image</h6>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Course Image"
                className="img-fluid rounded-4 object-fit-cover"
              />
            ) : (
              <p className="text-danger font-primary">No new image selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditCourse;
