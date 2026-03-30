// import api from "../../../api/axios";


// export const fetchCollegeProfile = async () => {
//   const res = await api.get("/college/profile");
//   return res;
// };

// export const saveCollegeProfile = async (data) => {
//   const res = await api.post("/college/profile", data);
//   return res;
// };





import api from "../../../api/axios";

/* ================= FETCH PROFILE ================= */

export const fetchCollegeProfile = () => {
  return api.get("/college/profile");
};

/* ================= STEP 1 ================= */

export const saveCollegeStep1 = (data) => {
  return api.post("/college/profile/step/1", data);
};

/* ================= STEP 2 ================= */

export const saveCollegeStep2 = (data) => {
  return api.post("/college/profile/step/2", data);
};

/* ================= STEP 3 ================= */

export const saveCollegeStep3 = (data) => {
  return api.post("/college/profile/step/3", data);
};

/* ================= STEP 4 (DOCUMENTS) ================= */

export const saveCollegeStep4 = (formData) => {
  return api.post("/college/profile/step/4", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= STEP 5 (FINAL SUBMIT) ================= */

export const saveCollegeStep5 = (data) => {
  return api.post("/college/profile/step/5", data);
};
