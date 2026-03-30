import api from "../../../api/axios";


export const fetchCollegePayments = () =>
  api.get("/payments");
