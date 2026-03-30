import api from "../../../api/axios";

/* ================= GET STUDENT ================= */

export const getStudent = (id) =>
  api.get(`/agent/students/${id}`);

/* ================= STEP 1 ================= */

export const savePersonal = (id, data) =>
  api.put(`/agent/students/${id}/personal`, data);

/* ================= STEP 2 ================= */

export const saveEducation = (id, data) =>
  api.put(`/agent/students/${id}/education`, data);

/* ================= STEP 3 ================= */

export const uploadDocuments = (id, formData) =>
  api.post(`/agent/students/${id}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ================= STEP 4 ================= */

export const saveColleges = (id, data) =>
  api.post(`/agent/students/${id}/select-colleges`, data);

/* ================= STEP 5 ================= */

export const finalSubmit = (id) =>
  api.post(`/agent/students/${id}/final-submit`);

/* ================= COLLEGE OPTIONS ================= */

export const getApplyOptions = () =>
  api.get("/agent/partners/colleges");