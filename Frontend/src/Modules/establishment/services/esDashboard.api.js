import api from "../../../api/axios";

export const fetchDashboardStats = () =>
  api.get("/establishment/dashboard");
