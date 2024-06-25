import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div>
        <Link
          className="btn-blue px-4 py-2 me-3 font-primary"
          type="button"
          style={{
            borderRadius: "8px",
            width: "100px",
            border: "none",
            textDecoration: "none",
            textAlign: "center",
          }}
          to="/admin/colleges"
        >
          Colleges
        </Link>
        <Link
          className="btn-blue px-4 py-2 me-3 font-primary"
          type="button"
          style={{
            borderRadius: "8px",
            width: "100px",
            border: "none",
            textDecoration: "none",
            textAlign: "center",
          }}
          to="/admin/courses"
        >
          Courses
        </Link>
        <Link
          className="btn-blue px-4 py-2 me-3 font-primary"
          type="button"
          style={{
            borderRadius: "8px",
            width: "100px",
            border: "none",
            textDecoration: "none",
            textAlign: "center",
          }}
          to="/admin/blogs"
        >
          Blogs
        </Link>
      </div>
    </>
  );
};

export default AdminDashboard;
