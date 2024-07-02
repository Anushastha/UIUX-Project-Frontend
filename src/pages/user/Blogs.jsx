import React, { useEffect, useState } from "react";
import { getAllBlogsApi } from "../../apis/Apis";
import { Link } from "react-router-dom";

//try table-responsive in adminblogs

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogsApi()
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  return (
    <div>
      <div
        className="bg-white rounded-lg p-4 tw-w-5 max-w-lg"
        style={{
          margin: "50px",
          height: "max-content",
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <div className="custom-container mt-3">
                <div className="row row-cols-1 row-cols-md-3 g-3">
                  {blogs.map((item) => (
                    <div key={item.blogId} className="col">
                      <Link
                        to={`/user/blogs/blogDetails/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="card d-flex flex-column"
                          style={{
                            height: "100%",
                            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
                            borderRadius: "0px",
                            border: "none",
                          }}
                        >
                          <img
                            src={item.blogImageUrl}
                            className="card-img-top img-fluid"
                            alt={item.blogTitle}
                            style={{
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-body d-flex flex-column">
                            <div
                              style={{
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                className="card-title mb-3 font-primary text-blue"
                                style={{
                                  fontSize: "18px",
                                  minHeight: "3em", // Adjust based on your needs
                                  overflow: "hidden",
                                }}
                              >
                                {item.blogTitle.length > 50
                                  ? item.blogTitle.slice(0, 60) + "..."
                                  : item.blogTitle}
                              </p>
                              <p
                                className="card-text font-secondary text-green"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
