import api from "../../../api/axios";

/* ================= GET COLLEGES FOR AGENT ================= */

export const getAgentColleges = () => {
  return api.get("/agent/colleges");
};