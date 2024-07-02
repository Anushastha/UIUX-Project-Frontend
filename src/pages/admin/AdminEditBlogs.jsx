import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlogApi, updateBlogApi } from "../../apis/Apis";
import { toast } from "react-toastify";

const AdminEditBlog = () => {
  const { id } = useParams();

  useEffect(() => {
    getSingleBlogApi(id).then((res) => {
      const blog = res.data.blog;
      setBlogTitle(blog.blogTitle);
      setBlogDescription(blog.blogDescription);
      setCreatedAt(blog.createdAt);
      setOldImage(blog.blogImageUrl);
    });
  }, [id]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBlogImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("createdAt", createdAt);
    formData.append("blogImage", blogImage);

    updateBlogApi(id, formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/blogs");
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
            Editing Blog - <span className="text-blue">{blogTitle}</span>
          </p>
          <form>
            <label className="form-label font-primary">Blog Title</label>
            <input
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="form-control mb-2"
              type="text"
              placeholder="Enter blog title"
            />

            <label className="form-label font-primary">Blog Description</label>
            <textarea
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter description"
              rows="4"
            ></textarea>

            <label className="form-label font-primary">Created Date</label>
            <input
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              type="date"
              className="form-control mb-2"
              placeholder="Enter created date"
            />

            <label className="form-label font-primary">Blog Image</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="form-control mb-2"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-blue w-100 mt-2 font-primary"
            >
              Update Blog
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
                alt="Blog Image"
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

export default AdminEditBlog;
