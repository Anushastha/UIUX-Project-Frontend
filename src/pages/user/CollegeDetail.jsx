import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleCollegeApi, downloadBrochureApi } from "../../apis/Apis";
import "../../styles/tailwind.css";

const CollegeDetail = () => {
  const { id } = useParams();
  const [collegeName, setCollegeName] = useState("");
  const [collegeDescription, setCollegeDescription] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [collegeNumber, setCollegeNumber] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegeWebsiteUrl, setCollegeWebsiteUrl] = useState("");
  const [establishedAt, setEstablishedAt] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [collegeImage, setCollegeImage] = useState("");
  const [applyNow, setApplyNow] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [coursesAvailable, setCoursesAvailable] = useState([]);
  const [brochure, setBrochure] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getSingleCollegeApi(id).then((res) => {
      const collegeData = res.data.college;
      setCollegeName(collegeData.collegeName);
      setCollegeDescription(collegeData.collegeDescription);
      setCollegeType(collegeData.collegeType);
      setAddress(collegeData.address);
      setGoogleMapsUrl(collegeData.googleMapsUrl);
      setCollegeNumber(collegeData.collegeNumber);
      setCollegeWebsiteUrl(collegeData.collegeWebsiteUrl);
      setCollegeEmail(collegeData.collegeEmail);
      setEstablishedAt(collegeData.establishedAt);
      setAffiliation(collegeData.affiliation);
      setCollegeImage(collegeData.collegeImageUrl);
      setApplyNow(collegeData.applyNow);
      setGalleryImages(collegeData.galleryImages);
      setCoursesAvailable(collegeData.coursesAvailable);
      setBrochure(collegeData.brochure);
      setCourses(collegeData.courses);
    });
  }, [id]);

  const [college, setCollege] = useState(null);
  const [activeSection, setActiveSection] = useState("Overview");

  useEffect(() => {
    getSingleCollegeApi(id)
      .then((res) => {
        console.log("Fetched college data:", res.data.college);

        setCollege(res.data.college);
      })
      .catch((err) => {
        console.error("Error fetching college:", err);
      });
  }, [id]);

  if (!college) {
    return <div>Loading...</div>;
  }

  const descriptionSplitIndex = Math.floor(
    college.collegeDescription.length / 7
  );
  const firstPartDescription = college.collegeDescription.substring(
    0,
    descriptionSplitIndex
  );
  const secondPartDescription = college.collegeDescription.substring(
    descriptionSplitIndex
  );

  const downloadBrochure = async (brochure) => {
    try {
      const response = await downloadBrochureApi(brochure);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", brochure);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading brochure:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="container bg-white max-w-3xl"
        style={{
          height: "max-content",
          borderRadius: "15px",
          padding: "40px",
          marginBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
                <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-start">
                  <img
                    src={college.collegeImageUrl}
                    alt={college.collegeName}
                    className="tw-w-full md:tw-w-40 tw-h-auto tw-object-cover tw-rounded-lg tw-mb-4 md:tw-mr-4"
                    style={{ maxWidth: "250px" }}
                  />
                  <div className="tw-ml-0 md:tw-ml-8">
                    <p
                      className="font-primary text-blue"
                      style={{
                        fontSize: "30px",
                        marginBottom: "0px",
                        lineHeight: "normal",
                      }}
                    >
                      {college.collegeName}
                    </p>
                    <div className="tw-flex tw-gap-6 tw-mt-2">
                      <div className="tw-flex tw-gap-1 tw-items-center">
                        <img
                          src="/assets/svg/location.svg"
                          alt="location"
                          className="tw-h-3"
                        />
                        <p className="card-text font-secondary tw-text-black tw-text-xs">
                          {college.location.address}
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-1 tw-items-center">
                        <img
                          src="/assets/svg/phone-black.svg"
                          alt="phone"
                          className="tw-h-3"
                        />
                        <p className="card-text font-secondary tw-text-black tw-text-xs">
                          {college.collegeNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tw-mt-4 md:tw-mt-0">
                  <img
                    src="/assets/svg/bookmark-outlined.svg"
                    alt="save"
                    className="tw-h-8 tw-cursor-pointer"
                  />
                </div>
              </div>
              <div
                id="navigation"
                className="tw-rounded-lg tw-bg-white font-primary tw-border-none tw-cursor-pointer tw-mx-auto tw-w-full md:tw-max-w-2xl tw-flex tw-justify-center tw-gap-6 md:tw-my-8 tw-py-1 tw-my-4"
                style={{
                  borderRadius: "15px",
                  boxShadow:
                    "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                }}
              >
                <div
                  onClick={() => setActiveSection("Overview")}
                  className={`tw-text-center tw-py-2 tw-px-4 tw-text-sm md:tw-text-base ${
                    activeSection === "Overview"
                      ? "tw-text-green tw-font-bold tw-border-b-2 tw-border-green"
                      : ""
                  }`}
                >
                  Overview
                </div>
                <div
                  onClick={() => setActiveSection("Courses")}
                  className={`tw-text-center tw-py-2 tw-px-4 tw-text-sm md:tw-text-base ${
                    activeSection === "Courses"
                      ? "tw-text-green tw-font-bold tw-border-b-2 tw-border-green"
                      : ""
                  }`}
                >
                  Courses
                </div>
                <div
                  onClick={() => setActiveSection("Gallery")}
                  className={`tw-text-center tw-py-2 tw-px-4 tw-text-sm md:tw-text-base ${
                    activeSection === "Gallery"
                      ? "tw-text-green tw-font-bold tw-border-b-2 tw-border-green"
                      : ""
                  }`}
                >
                  Gallery
                </div>
                <div
                  onClick={() => setActiveSection("Blogs")}
                  className={`tw-text-center tw-py-2 tw-px-4 tw-text-sm md:tw-text-base ${
                    activeSection === "Blogs"
                      ? "tw-text-green tw-font-bold tw-border-b-2 tw-border-green"
                      : ""
                  }`}
                >
                  Blogs
                </div>
              </div>
              {activeSection === "Overview" && (
                <div>
                  <div className="tw-flex tw-flex-wrap lg:tw-flex-nowrap tw-gap-6 lg:tw-gap-8">
                    <div
                      className="info-container tw-shadow-md tw-rounded-none tw-border-none tw-p-5 tw-w-full lg:tw-w-1/3"
                      style={{
                        boxShadow:
                          "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                        borderRadius: "0px",
                        border: "none",
                        height: "max-content",
                        padding: "20px",
                      }}
                    >
                      <div className="tw-flex tw-gap-2 tw-items-center tw-mb-2.5">
                        <img
                          src="/assets/svg/mail-grey.svg"
                          className="tw-h-5"
                        />
                        <p className="font-secondary text-grey tw-text-sm">
                          {college.collegeEmail}
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-2 tw-items-center tw-mb-2.5">
                        <img
                          src="/assets/svg/office-building.svg"
                          className="tw-h-5"
                        />
                        <p className="font-secondary text-grey tw-text-sm">
                          {college.affiliation}
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-2 tw-items-center tw-mb-2.5">
                        <img
                          src="/assets/svg/institution.svg"
                          className="tw-h-5"
                        />
                        <p className="font-secondary text-grey tw-text-sm">
                          {college.collegeType}
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-2 tw-items-center tw-mb-2.5">
                        <img src="/assets/svg/web.svg" className="tw-h-5" />
                        <p className="font-secondary text-grey tw-text-sm">
                          <a
                            href={college.collegeWebsiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {college.collegeWebsiteUrl}
                          </a>
                        </p>
                      </div>

                      <div className="tw-flex tw-gap-2 tw-items-center tw-mb-2.5">
                        <img
                          src="/assets/svg/phone-grey.svg"
                          className="tw-h-5"
                        />
                        <p className="font-secondary text-grey tw-text-sm">
                          {college.collegeNumber}
                        </p>
                      </div>

                      {/* buttons */}
                      <div className="tw-flex tw-gap-2 tw-justify-center tw-items-center tw-mt-5">
                        <button
                          onClick={() => downloadBrochure(college.brochure)}
                          className="tw-bg-blue-500 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-shadow-md hover:tw-bg-blue-700 tw-transition-all tw-duration-300"
                        >
                          Download Brochure
                        </button>

                        <a
                          className="btn btn-blue font-primary tw-py-1 tw-text-xs tw-w-24"
                          href={college.applyNow}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply <br />
                          Now
                        </a>
                      </div>
                    </div>

                    <div
                      id="college-description"
                      className="tw-w-full lg:tw-w-1/2"
                    >
                      <p className="font-secondary tw-text-justify tw-break-words">
                        {firstPartDescription}
                      </p>
                    </div>

                    <div className="map-container tw-w-full lg:tw-w-1/3">
                      <iframe
                        src={college.location.googleMapsUrl}
                        className="tw-w-full tw-h-80 tw-border-0"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

                  <div id="remaining-description" className="tw-mt-10">
                    <p className="font-secondary tw-text-justify">
                      {secondPartDescription}
                    </p>
                  </div>
                </div>
              )}

              {activeSection === "Courses" && (
                <div className="font-secondary">
                  <strong>Courses Available:</strong>
                  {college.coursesAvailable
                    .map((course) => course.courseName)
                    .join(", ")}
                </div>
              )}

              {activeSection === "Gallery" && (
                <div className="container">
                  <div className="row g-2 justify-content-center">
                    {college.galleryImages.map((image, index) => (
                      <div
                        className="col-lg-2 col-md-4 col-sm-6 mb-2"
                        key={index}
                      >
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          style={{
                            height: "auto",
                            width: "250px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
