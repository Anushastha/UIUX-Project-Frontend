import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlogApi } from "../../apis/Apis";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    getSingleBlogApi(id).then((res) => {
      const blogData = res.data.blog;
      setBlogTitle(blogData.blogTitle);
      setBlogDescription(blogData.blogDescription);
      setBlogImage(blogData.blogImageUrl);
      setCreatedAt(blogData.createdAt);
    });
  }, [id]);

  return (
    <div>
      <div
        className="bg-white rounded-lg p-4 tw-w-5 max-w-lg"
        style={{
          margin: "50px",
          height: "max-content",
          borderRadius: "1rem",
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-20">
              <p
                className="font-primary text-blue"
                style={{
                  fontSize: "190%",
                  marginBottom: "0px",
                }}
              >
                {blogTitle}
              </p>
              <p
                className="font-secondary text-green"
                style={{
                  fontSize: "100%",
                  fontWeight: "bold",
                }}
              >
                {createdAt}
              </p>
              <img
                src={blogImage}
                alt={blogTitle}
                style={{
                  width: "100%",
                  height: "fit-content",
                  marginBottom: "10px",
                  borderRadius: "1rem", // rounding the image corners
                }}
              />
              <p className="font-secondary" style={{ textAlign: "justify" }}>
                {blogDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
