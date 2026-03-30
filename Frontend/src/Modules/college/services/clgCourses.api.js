

/* ================= GET COURSES ================= */

import api from "../../../api/axios";

export const fetchCollegeCourses = () => {
  return  api.get("/college/courses");
};

/* ================= CREATE COURSE ================= */

export const createCollegeCourse = (data) => {
  return  api.post("/college/courses", data);
};

/* ================= UPDATE COURSE ================= */

export const updateCollegeCourse = (id, data) => {
  return  api.patch(`/college/courses/${id}`, data);
};

/* ================= DELETE COURSE ================= */

export const deleteCollegeCourse = (id) => {
  return api.delete(`/college/courses/${id}`);
};