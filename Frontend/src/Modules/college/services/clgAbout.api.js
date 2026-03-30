import api from "../../../api/axios";

/* ================= GET ABOUT ================= */

export const fetchCollegeAbout = () => {
  return api.get("college/about");
};

/* ================= CREATE ================= */

export const createAboutSection = (data) => {
  return api.post("college/about", data);
};

/* ================= DELETE ================= */

export const deleteAboutSection = (id) => {
  return api.delete(`college/about/${id}`);
};