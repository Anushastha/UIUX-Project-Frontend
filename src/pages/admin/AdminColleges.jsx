import React, { useState, useEffect } from "react";
import {
  createCollegeApi,
  getAllCollegesApi,
  updateCollegeApi,
  deleteCollegeApi,
} from "../../apis/Apis";

const AdminColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [form, setForm] = useState({
    collegeName: "",
    collegeDescription: "",
    collegeFees: "",
    collegeType: "",
    courseName: "",
    collegeImageUrl: "",
    establishedAt: "",
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    const response = await getAllCollegesApi();
    setColleges(response.data.colleges);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentCollege) {
      await updateCollegeApi(currentCollege._id, form);
    } else {
      await createCollegeApi(form);
    }
    fetchColleges();
    setForm({
      collegeName: "",
      collegeDescription: "",
      collegeFees: "",
      collegeType: "",
      courseName: "",
      collegeImageUrl: "",
      establishedAt: "",
    });
    setCurrentCollege(null);
  };

  const handleEdit = (college) => {
    setCurrentCollege(college);
    setForm(college);
  };

  const handleDelete = async (id) => {
    await deleteCollegeApi(id);
    fetchColleges();
  };

  return (
    <div>
      <h1>Colleges</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="collegeName"
          value={form.collegeName}
          onChange={handleChange}
          placeholder="College Name"
        />
        <input
          type="text"
          name="collegeDescription"
          value={form.collegeDescription}
          onChange={handleChange}
          placeholder="College Description"
        />
        <input
          type="number"
          name="collegeFees"
          value={form.collegeFees}
          onChange={handleChange}
          placeholder="College Fees"
        />
        <input
          type="text"
          name="collegeType"
          value={form.collegeType}
          onChange={handleChange}
          placeholder="College Type"
        />
        <input
          type="text"
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <input
          type="text"
          name="collegeImageUrl"
          value={form.collegeImageUrl}
          onChange={handleChange}
          placeholder="College Image URL"
        />
        <input
          type="date"
          name="establishedAt"
          value={form.establishedAt}
          onChange={handleChange}
          placeholder="Established At"
        />
        <button type="submit">
          {currentCollege ? "Update College" : "Add College"}
        </button>
      </form>
      <ul>
        {colleges.map((college) => (
          <li key={college._id}>
            {college.collegeName}
            <button onClick={() => handleEdit(college)}>Edit</button>
            <button onClick={() => handleDelete(college._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminColleges;
