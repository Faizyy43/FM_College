import api from "../../../api/axios";

// GET about data
export const fetchAbout = () =>
  api.get("/establishment/about");

// SAVE about data
export const saveAbout = (data) =>
  api.post("/establishment/about", data);