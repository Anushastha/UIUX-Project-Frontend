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

// // Course APIs
// export const createCourseApi = (data) => Api.post("/api/courses", data, config);
// export const getAllCoursesApi = () => Api.get("/api/courses", config);
// export const getSingleCourseApi = (id) => Api.get(`/api/courses/${id}`, config);
// export const updateCourseApi = (id, data) =>
//   Api.put(`/api/courses/${id}`, data, config);
// export const deleteCourseApi = (id) => Api.delete(`/api/courses/${id}`, config);
