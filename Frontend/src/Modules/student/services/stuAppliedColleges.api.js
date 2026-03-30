import api from "../../../api/axios";

/* ================= APPLIED COLLEGES ================= */

export const fetchAppliedColleges = () =>
  api.get("/student/applications");

export const deleteApplication = (id) =>
  api.delete(`/student/applications/${id}`);