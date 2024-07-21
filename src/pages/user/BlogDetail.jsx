import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlogApi } from "../../apis/Apis";
import "../../styles/tailwind.css";

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
                  marginBottom: "0px",
                  lineHeight: "normal",
                }}
              >
                {blogTitle}
              </p>
              <p
                className="font-secondary text-green"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                {createdAt}
              </p>
              <img
                src={blogImage}
                alt={blogTitle}
                className="w-full object-cover rounded-lg"
                style={{ height: "fit-content", marginBottom: "30px" }}
              />
              <p
                className="font-secondary tw-text-lg"
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
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
