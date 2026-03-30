import api from "../../../api/axios";

/* ================= GET PARTNER COLLEGES ================= */

export const getPartnerColleges = () =>
  api.get("/agent/partners/colleges");

/* ================= GET APPLY OPTIONS ================= */

export const getApplyOptions = () =>
  api.get("/agent/students/apply-options");