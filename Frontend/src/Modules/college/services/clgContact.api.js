import api from "../../../api/axios";

/* ================= FETCH ================= */

export const fetchCollegeContact = () => {
  return api.get("/college/contact");
};

/* ================= UPDATE ================= */

export const updateCollegeContact = (data) => {
  return api.put("/college/contact", data);
};