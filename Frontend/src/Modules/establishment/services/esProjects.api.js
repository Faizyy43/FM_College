import api from "../../../api/axios";

/* ================= GET ALL ================= */

export const fetchProjects = () =>
  api.get("/establishment/projects");

/* ================= CREATE ================= */

export const createProject = (formData) =>
  api.post("/establishment/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ================= UPDATE ================= */

export const updateProject = (id, formData) =>
  api.put(`/establishment/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ================= DELETE ================= */

export const deleteProject = (id) =>
  api.delete(`/establishment/projects/${id}`);