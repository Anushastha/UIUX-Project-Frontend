import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCourseApi } from "../../apis/Apis";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [expectedFeesMin, setExpectedFeesMin] = useState("");
  const [expectedFeesMax, setExpectedFeesMax] = useState("");
  const [averageDurationMin, setAverageDurationMin] = useState("");
  const [averageDurationMax, setAverageDurationMax] = useState("");
  const [courseImage, setCourseImage] = useState("");

  useEffect(() => {
    getSingleCourseApi(id).then((res) => {
      const courseData = res.data.course;
      setCourseName(courseData.courseName);
      setCourseDescription(courseData.courseDescription);
      setExpectedFeesMin(courseData.expectedFeesMin);
      setExpectedFeesMax(courseData.expectedFeesMax);
      setAverageDurationMin(courseData.averageDurationMin);
      setAverageDurationMax(courseData.averageDurationMax);
      setCourseImage(courseData.courseImageUrl);
    });
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="container bg-white max-w-3xl"
        style={{
          height: "max-content",
          borderRadius: "15px",
          padding: "40px 50px 40px 50px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <p
                className="font-primary text-blue"
                style={{
                  fontSize: "5vh",
                  marginBottom: "15px",
                  lineHeight: "normal",
                }}
              >
                {courseName}
              </p>
              <p
                className="font-secondary"
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                {courseDescription}
              </p>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <p
              className="font-primary"
              style={{
                fontSize: "4vh",
                marginBottom: "20px",
              }}
            >
              Colleges that offer this course
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>john@example.com</td>
                    </tr>
                    <tr>
                      <td>Mary</td>
                      <td>Moe</td>
                      <td>mary@example.com</td>
                    </tr>
                    <tr>
                      <td>July</td>
                      <td>Dooley</td>
                      <td>july@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{}}>
                <img
                  src={courseImage}
                  alt="Course Image"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "0px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
