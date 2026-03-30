import api from "../../../api/axios";

export const fetchAgentDashboardStats = () =>
  api.get("/agent/dashboard");