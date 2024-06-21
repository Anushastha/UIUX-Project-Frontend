import React from "react";

const AdminDashboard = () => {
  return (
    <>
      <div>
        <button
          className="btn-blue px-4 py-2 me-3 font-primary"
          style={{
            borderRadius: "8px",
            width: "100px",
          }}
        >
          Colleges
        </button>
        <button
          className="btn-blue px-4 py-2 me-3 font-primary"
          style={{
            borderRadius: "8px",
            width: "100px",
          }}
        >
          Courses
        </button>
        <button
          className="btn-blue px-4 py-2 me-3 font-primary"
          style={{
            borderRadius: "8px",
            width: "100px",
          }}
        >
          Blogs
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
