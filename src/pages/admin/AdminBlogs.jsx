import React, { useState, useEffect } from "react";
import { createBlogApi, deleteBlogApi, getAllBlogsApi } from "../../apis/Apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../../scss/customs.scss";

const AdminBlogs = () => {
  // Make useState
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  // make useState for image
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // image upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setBlogImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Load all blogs when page loads
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getAllBlogsApi().then((res) => {
      setBlogs(res.data.blogs);
    });
  }, []);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("createdAt", createdAt);
    formData.append("blogImage", blogImage);

    // send request to backend API
    createBlogApi(formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  //delete course function
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) {
      return;
    } else {
      deleteBlogApi(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options);
  };

  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <p className="font-primary font-bold" style={{ fontSize: "30px" }}>
            All Blogs
          </p>
          <button
            type="button"
            className="btn btn-blue px-4 py-2 me-1 text-white font-primary"
            data-bs-toggle="modal"
            data-bs-target="#blogModal"
          >
            Add Blog
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="blogModal"
            tabIndex="-1"
            aria-labelledby="blogModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-blue text-white">
                  <h1 className="modal-title fs-5" id="blogModalLabel">
                    Add a new blog!
                  </h1>
                </div>
                <div className="modal-body">
                  <label className="mb-2 font-primary">Blog Title</label>
                  <input
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter blog title"
                  />

                  <label htmlFor="" className="mb-2 font-primary">
                    Blog Description
                  </label>
                  <textarea
                    onChange={(e) => setBlogDescription(e.target.value)}
                    className="form-control mb-2"
                    placeholder={"Enter description"}
                    cols="4"
                    rows="4"
                  ></textarea>

                  <label className="mb-2 font-primary">Created Date</label>
                  <input
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="form-control mb-2"
                    type="date"
                    name=""
                    id=""
                    placeholder="Enter created date"
                  />

                  <label className="mb-2 font-primary">Blog Image</label>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="form-control"
                  />

                  {/* Preview Image */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object-cover mt-2"
                      height={10}
                      width={100}
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary font-primary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-dark text-white font-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white p-4 shadow">
          {/* Course Table */}
          <table className="table table-bordered table-hover">
            <thead className="table-dark text-center font-primary">
              <tr>
                <th scope="col">Blog Image</th>
                <th scope="col">Blog Title</th>
                <th scope="col">Blog Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {blogs.map((item) => (
                <tr key={item._id}>
                  <td className="d-flex justify-content-center">
                    <img
                      src={item.blogImageUrl}
                      alt={`Blog: ${item.blogTitle}`}
                      className="img-fluid rounded object-cover mt-2"
                      height={50}
                      width={70}
                    />
                  </td>
                  <td>{item.blogTitle.slice(0, 20)}</td>
                  <td>{item.blogDescription.slice(0, 20)}</td>
                  <td>{formatDate(item.createdAt)}</td>

                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={`/admin/blogs/editBlog/${item._id}`}
                        type="button"
                        className="btn btn-blue"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminBlogs;
