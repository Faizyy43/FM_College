import api from "../../../api/axios.js"

export const fetchCollegeDashboard = async () => {
  const response = await api.get("/college/dashboard");
  return response.data;
};