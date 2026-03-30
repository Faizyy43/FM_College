// import api from "../../../api/axios";


// export const saveStep1 = (data) =>
//   api.post("/establishment/profile/step/1", data);

// export const saveStep2 = (data) =>
//   api.post("/establishment/profile/step/2", data);

// export const saveStep3 = (data) =>
//   api.post("/establishment/profile/step/3", data);

// export const saveStep4 = (data) =>
//   api.post("/establishment/profile/step/4", data);

// export const saveStep5 = (formData) =>
//   api.post("/establishment/profile/step/5", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const saveStep6 = (data) =>
//   api.post("/establishment/profile/step/6", data);

// export const getProfile = () =>
//   api.get("/establishment/profile");

// export const getFullProfile = () => 
//   api.get("/establishment/profile/full")




import api from "../../../api/axios";

/* ================= FETCH PROFILE ================= */

// Used in EsProfile.jsx to pre-fill form fields
export const fetchProfile = () =>
  api.get("/establishment/profile");

// Used in ProfileView page (read-only full profile display)
export const getFullProfile = () =>
  api.get("/establishment/profile/full");


/* ================= STEP SAVES ================= */

export const saveStep1 = (data) =>
  api.post("/establishment/profile/step/1", data);

export const saveStep2 = (data) =>
  api.post("/establishment/profile/step/2", data);

export const saveStep3 = (data) =>
  api.post("/establishment/profile/step/3", data);

export const saveStep4 = (data) =>
  api.post("/establishment/profile/step/4", data);

export const saveStep5 = (formData) =>
  api.post("/establishment/profile/step/5", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const saveStep6 = (data) =>
  api.post("/establishment/profile/step/6", data);


 