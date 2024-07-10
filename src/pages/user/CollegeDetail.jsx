import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleCollegeApi } from "../../apis/Apis";

const CollegeDetail = () => {
  const { id } = useParams(); // Ensure id is correctly retrieved
  const [college, setCollege] = useState(null);

  useEffect(() => {
    getSingleCollegeApi(id)
      .then((res) => {
        setCollege(res.data.college);
      })
      .catch((err) => {
        console.error("Error fetching college:", err);
      });
  }, [id]);

  if (!college) {
    return <div>Loading...</div>;
  }

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <img
                    src={college.collegeImageUrl}
                    alt={college.collegeName}
                    className="w-40 h-auto object-cover rounded-lg float-left mr-4 mb-4"
                    style={{ maxWidth: "200px" }}
                  />
                  <div
                    style={{
                      marginLeft: "30px",
                    }}
                  >
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
                    <div
                      style={{
                        display: "flex",
                        gap: "25px",
                        marginTop: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/assets/svg/location.svg"
                          alt="phone"
                          style={{
                            height: "12px",
                          }}
                        />
                        <p
                          className="card-text font-secondary"
                          style={{
                            fontSize: "12px",
                            color: "black",
                          }}
                        >
                          {college.location.address}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/assets/svg/phone-black.svg"
                          alt="location"
                          style={{
                            height: "12px",
                          }}
                        />
                        <p
                          className="card-text font-secondary"
                          style={{
                            color: "black",
                            fontSize: "12px",
                          }}
                        >
                          {college.collegeNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <img
                    src="/assets/svg/bookmark-outlined.svg"
                    alt="save"
                    style={{
                      height: "30px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "space-between" }}>
                <div
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                    borderRadius: "0px",
                    border: "none",
                    height: "max-content",
                    width: "max-content",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      src="/assets/svg/mail-grey.svg"
                      style={{
                        height: "20px",
                      }}
                    />
                    <p
                      className="font-secondary text-grey"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {college.collegeEmail}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/svg/office-building.svg"
                      style={{
                        height: "20px",
                      }}
                    />
                    <p
                      className="font-secondary text-grey"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {college.affiliation}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/svg/institution.svg"
                      style={{
                        height: "20px",
                      }}
                    />
                    <p
                      className="font-secondary text-grey"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {college.collegeType}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/svg/web.svg"
                      style={{
                        height: "20px",
                      }}
                    />
                    <p
                      className="font-secondary text-grey"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      <a
                        href={college.collegeWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {college.collegeWebsiteUrl}
                      </a>
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "5px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/assets/svg/phone-grey.svg"
                      style={{
                        height: "20px",
                      }}
                    />
                    <p
                      className="font-secondary text-grey"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {college.collegeNumber}
                    </p>
                  </div>

                  {/* buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Link
                      className="btn btn-blue font-primary py-1"
                      style={{
                        fontSize: "12px",
                        width: "120px",
                      }}
                      href={college.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={true}
                    >
                      Download <br />
                      Brochure
                    </Link>

                    <Link
                      className="btn btn-blue font-primary py-1"
                      style={{
                        fontSize: "12px",
                        width: "120px",
                      }}
                      href={college.applyNow}
                      target="_blank"
                    >
                      Apply <br />
                      Now
                    </Link>
                  </div>
                </div>
              </div>
              <p
                className="font-secondary"
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                {college.collegeDescription}
              </p>

              <p className="font-secondary">
                <strong>Location:</strong> {college.location.address}
              </p>
              <p className="font-secondary">
                <strong>Google Maps:</strong>{" "}
                <a
                  href={college.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </p>

              <div className="font-secondary">
                <strong>Gallery:</strong>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {college.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="font-secondary">
                <strong>Courses Available:</strong>
                <ul>
                  {college.coursesAvailable.map((course, index) => (
                    <li key={index}>{course.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
