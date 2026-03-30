import api from "../../../api/axios";

/* ================= GET AGENT APPLICATIONS ================= */

export const getAgentApplications = () => {
  return api.get("/agent/applications");
};