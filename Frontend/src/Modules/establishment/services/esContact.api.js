import api from "../../../api/axios";

// GET contact info
export const fetchContact = () =>
  api.get("/establishment/contact");

// UPDATE contact info
export const updateContact = (data) =>
  api.put("/establishment/contact", data);