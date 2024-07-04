import React, { useEffect, useState } from "react";
import { getAllBlogsApi } from "../../apis/Apis";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="bg-white p-5 max-w-3xl"
        style={{
          margin: "50px",
          height: "max-content",
        }}
      >
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {blogs.map((item) => (
              <div key={item.blogId} className="col mb-4">
                <Link
                  to={`/user/blogs/blogDetails/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card d-flex flex-column"
                    style={{
                      border: "none",
                      borderRadius: "0px",
                      boxShadow:
                        "rgba(60, 64, 67, 0.15) 0px 1px 2px 0px, rgba(60, 64, 67, 0.1) 0px 2px 6px 2px",
                    }}
                  >
                    <img
                      src={item.blogImageUrl}
                      className="card-img-top  img-fluid"
                      alt={item.blogTitle}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "0px",
                      }}
                    />
                    <div className="card-body">
                      <p
                        className="card-title font-primary text-blue"
                        style={{
                          fontSize: "18px",
                          minHeight: "3em",
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
