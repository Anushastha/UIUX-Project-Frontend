// import React, { useState, useEffect } from "react";
// import {
//   createCourseApi,
//   getAllCoursesApi,
//   updateCourseApi,
//   deleteCourseApi,
// } from "../../apis/Apis";

// const AdminCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [currentCourse, setCurrentCourse] = useState(null);
//   const [form, setForm] = useState({
//     courseName: "",
//     expectedFees: "",
//     averageDuration: "",
//     colleges: [],
//   });

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     const response = await getAllCoursesApi();
//     setCourses(response.data.courses);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (currentCourse) {
//       await updateCourseApi(currentCourse._id, form);
//     } else {
//       await createCourseApi(form);
//     }
//     fetchCourses();
//     setForm({
//       courseName: "",
//       expectedFees: "",
//       averageDuration: "",
//       colleges: [],
//     });
//     setCurrentCourse(null);
//   };

//   const handleEdit = (course) => {
//     setCurrentCourse(course);
//     setForm(course);
//   };

//   const handleDelete = async (id) => {
//     await deleteCourseApi(id);
//     fetchCourses();
//   };

//   return (
//     <div>
//       <h1>Courses</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="courseName"
//           value={form.courseName}
//           onChange={handleChange}
//           placeholder="Course Name"
//         />
//         <input
//           type="text"
//           name="expectedFees"
//           value={form.expectedFees}
//           onChange={handleChange}
//           placeholder="Expected Fees"
//         />
//         <input
//           type="number"
//           name="averageDuration"
//           value={form.averageDuration}
//           onChange={handleChange}
//           placeholder="Average Duration (years)"
//         />
//         <button type="submit">
//           {currentCourse ? "Update Course" : "Add Course"}
//         </button>
//       </form>
//       <ul>
//         {courses.map((course) => (
//           <li key={course._id}>
//             {course.courseName}
//             <button onClick={() => handleEdit(course)}>Edit</button>
//             <button onClick={() => handleDelete(course._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminCourses;
