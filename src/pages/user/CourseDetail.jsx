import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleCourseApi,
  getCollegesOfferingCourseApi,
} from "../../apis/Apis";
import "../../styles/tailwind.css";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [expectedFeesMin, setExpectedFeesMin] = useState("");
  const [expectedFeesMax, setExpectedFeesMax] = useState("");
  const [averageDurationMin, setAverageDurationMin] = useState("");
  const [averageDurationMax, setAverageDurationMax] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [colleges, setColleges] = useState([]);

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
    getCollegesOfferingCourseApi(id).then((res) => {
      setColleges(res.data.colleges);
    });
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center mb-5">
      <div
        className="bg-white max-w-3xl"
        style={{
          height: "max-content",
          borderRadius: "15px",
          padding: "40px 50px 40px 50px",
          margin: "30px 60px 60px 60px",
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
              className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between gap-6"
              style={{ gap: "30px" }}
            >
              <div className="table-responsive overflow-x-auto">
                <table className="table table-bordered">
                  <tbody>
                    {colleges.length > 0 ? (
                      colleges.map((college) => (
                        <tr key={college._id}>
                          <td style={{ textAlign: "center" }}>
                            <img
                              src={college.collegeImageUrl}
                              alt={college.collegeName}
                              style={{
                                height: "50px",
                                width: "auto",
                                objectFit: "cover",
                                borderRadius: "5px",
                                display: "block",
                                margin: "0 auto",
                                minWidth: "50px",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "20px",
                              width: "max-content",
                              minWidth: "350px",
                              display: "flex",
                            }}
                          >
                            <p
                              className="text-blue font-secondary"
                              style={{ textAlign: "left" }}
                            >
                              {college.collegeName}
                            </p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No colleges found for this course.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="tw-w-full md:tw-w-auto">
                <img
                  src={courseImage}
                  alt="Course Image"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "0px",
                    width: "100%",
                    minWidth: "300px",
                    margin: "0 auto",
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
