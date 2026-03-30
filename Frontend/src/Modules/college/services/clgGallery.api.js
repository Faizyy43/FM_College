import api from "../../../api/axios";

/* FETCH */

export const fetchCollegeGallery = () =>
  api.get("/college/gallery");

/* UPLOAD */

export const uploadCollegeGallery = (data) =>
  api.put("/college/gallery", data);

/* DELETE */

export const deleteCollegeGalleryImage = (img) =>
  api.delete("/college/gallery/image", {
    data: { imageUrl: img }
  });