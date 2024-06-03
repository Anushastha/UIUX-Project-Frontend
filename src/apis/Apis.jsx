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
export const createCollegeApi = (data) => Api.post("/api/colleges", data, config);
export const getAllCollegesApi = () => Api.get("/api/colleges", config);
export const getSingleCollegeApi = (id) => Api.get(`/api/colleges/${id}`, config);
export const updateCollegeApi = (id, data) => Api.put(`/api/colleges/${id}`, data, config);
export const deleteCollegeApi = (id) => Api.delete(`/api/colleges/${id}`, config);
export const addCourseToCollegeApi = (data) => Api.post("/api/colleges/addCourse", data, config);

// Course APIs
export const createCourseApi = (data) => Api.post("/api/courses", data, config);
export const getAllCoursesApi = () => Api.get("/api/courses", config);
export const getSingleCourseApi = (id) => Api.get(`/api/courses/${id}`, config);
export const updateCourseApi = (id, data) => Api.put(`/api/courses/${id}`, data, config);
export const deleteCourseApi = (id) => Api.delete(`/api/courses/${id}`, config);

