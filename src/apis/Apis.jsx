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

export const sendEmailApi = (data) =>
  Api.post("/api/user/reset_password", data);
export const verifyCodeApi = (data) =>
  Api.post("/api/user/reset_code", data, config);
export const updatePasswordApi = (data) =>
  Api.post("/api/user/update_password", data);

export const changePassword = async (data, token) => {
  try {
    const response = await Api.post("/api/user/change_password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserProfileApi = () => {
  return Api.get("/api/user/get_profile", config);
};
export const updateUserProfileApi = (userId, formData) =>
  Api.put(`/api/user/update_profile/${userId}`, formData, config);

// College APIs
export const createCollegeApi = (formData) =>
  Api.post("/api/colleges/create_college", formData);
export const getAllCollegesApi = () => Api.get("/api/colleges/get_colleges");
export const getSingleCollegeApi = (id) =>
  Api.get(`/api/colleges/get_college/${id}`);
export const deleteCollegeApi = (id) =>
  Api.delete(`/api/colleges/delete_college/${id}`);
export const updateCollegeApi = (id, formData) =>
  Api.put(`/api/colleges/update_college/${id}`, formData, config);
export const searchCollegesApi = (query) =>
  Api.get(`/api/colleges/search?query=${query}`);

export const filterCollegesApi = async (filters) => {
  try {
    const response = await axios.get(`api/colleges/filter`, { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFilterOptionsApi = async () => {
  try {
    const response = await axios.get(`api/colleges/filter_options`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const downloadBrochureApi = (filename) => {
  return Api.get(`/api/colleges/download_brochure/${filename}`, {
    responseType: "blob",
  });
};

//Bookmark APIs
export const addSaveApi = (data) => Api.post("/api/user/add_save", data);
export const getSavedApi = (id) => Api.get(`/api/user/get_saved/${id}`);
export const removeSavedApi = (id) =>
  Api.delete(`/api/user/remove_saved/${id}`, config);

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
export const searchCoursesApi = (query) =>
  Api.get(`/api/courses/search?query=${query}`);

//Blogs APIs
export const createBlogApi = (formData) =>
  Api.post("/api/blogs/create_blog", formData);
export const getAllBlogsApi = () => Api.get("/api/blogs/get_blogs");
export const getSingleBlogApi = (id) => Api.get(`/api/blogs/get_blog/${id}`);
export const updateBlogApi = (id, formData) =>
  Api.put(`/api/blogs/update_blog/${id}`, formData, config);
export const deleteBlogApi = (id) =>
  Api.delete(`/api/blogs/delete_blog/${id}`, config);
