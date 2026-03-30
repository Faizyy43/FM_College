import api from "../../../api/axios";


// GET all courses
export const fetchCourses = () => api.get("/establishment/courses");

// CREATE course
export const createCourse = (data) =>
  api.post("/establishment/courses", data);

// UPDATE course
export const updateCourse = (id, data) =>
  api.put(`/establishment/courses/${id}`, data);

// DELETE course
export const deleteCourse = (id) =>
  api.delete(`/establishment/courses/${id}`);
