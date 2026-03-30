import api from "../../../api/axios";

/* ================= FETCH PROFILE ================= */

// Used in Student Profile.jsx to pre-fill form
export const fetchProfile = () =>
  api.get("/student/profile");

// Used if you need full read-only profile view
export const getFullProfile = () =>
  api.get("/student/profile/full");


/* ================= STEP SAVES ================= */

export const saveStep1 = (data) =>
  api.post("/student/profile/step/1", data);

export const saveStep2 = (data) =>
  api.post("/student/profile/step/2", data);

export const saveStep3 = (data) =>
  api.post("/student/profile/step/3", data);

export const saveStep4 = (formData) =>
  api.post("/student/profile/step/4", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const saveStep5 = (data) =>
  api.post("/student/profile/step/5", data);
