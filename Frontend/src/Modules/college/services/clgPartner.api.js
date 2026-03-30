import api from "../../../api/axios";

export const getPartnerRequests = () =>
  api.get("/college/partners");

export const updatePartnerStatus = (id, status) =>
  api.patch(`/college/partners/${id}`, { status });