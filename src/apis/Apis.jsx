import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
//configuration for axios

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Auth APIs
export const loginApi = (data) => Api.post("/api/user/login", data);
export const registerApi = (data) => Api.post("/api/user/create", data);

// College APIs
export const createCollegeApi = (formData) =>
  Api.post("/api/colleges/create_college", formData);
export const getAllCollegesApi = () => Api.get("/api/colleges/get_colleges");
export const getSingleCollegeApi = (id) =>
  Api.get(`/api/colleges/get_college/${id}`);
export const updateCollegeApi = (id, formData) =>
  Api.put(`/api/colleges/update_college/${id}`, formData, config);
export const deleteCollegeApi = (id) =>
  Api.delete(`/api/colleges/delete_college/${id}`, config);
export const addCourseToCollegeApi = (data) =>
  Api.post("/api/colleges/addCourse", data);

//Courses APIs
export const createCourseApi = (formData) =>
  Api.post("/api/courses/create_course", formData);
export const getAllCoursesApi = () => Api.get("/api/courses/get_courses");
export const getSingleCourseApi = (id) =>
  Api.get(`/api/courses/get_course/${id}`);
export const updateCourseApi = (id, formData) =>
  Api.put(`/api/courses/update_course/${id}`, formData, config);
export const deleteCourseApi = (id) =>
  Api.delete(`/api/courses/delete_course/${id}`, config);
