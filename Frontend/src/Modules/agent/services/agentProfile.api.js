import api from "../../../api/axios";

/* ================= FETCH PROFILE ================= */

export const fetchAgentProfile = () =>
  api.get("/agent/profile");

/* ================= STEP 1 ================= */

export const saveAgentStep1 = (data) =>
  api.post("/agent/profile/step/1", data);

/* ================= STEP 2 ================= */

export const saveAgentStep2 = (data) =>
  api.post("/agent/profile/step/2", data);

/* ================= STEP 3 ================= */

export const saveAgentStep3 = (data) =>
  api.post("/agent/profile/step/3", data);

/* ================= STEP 4 ================= */

export const saveAgentStep4 = (formData) =>
  api.post("/agent/profile/step/4", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* ================= STEP 5 ================= */

export const saveAgentStep5 = (data) =>
  api.post("/agent/profile/step/5", data);

/* ================= STEP 6 ================= */

export const saveAgentStep6 = (data) =>
  api.post("/agent/profile/step/6", data);