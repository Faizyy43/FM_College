import api from "../../../api/axios";


/* ================= FETCH ================= */
export const fetchCollegeAdmissions = () =>
  api.get("/admissions");

/* ================= APPROVE ================= */
export const approveCollegeAdmission = (id) =>
  api.patch(`/admissions/${id}/approve`);

/* ================= REJECT ================= */
export const rejectCollegeAdmission = (id) =>
api.patch(`/admissions/${id}/reject`);

/* ================= COLLECT FEE ================= */
export const collectCollegeFee = (id) =>
  api.post(`/payments/collect/${id}`);