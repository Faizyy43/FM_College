import api from "../../../api/axios";

// GET gallery data
export const fetchGallery = () =>
  api.get("/establishment/gallery");

// UPLOAD logo/banner/images
export const uploadGallery = (formData) =>
  api.put("/establishment/gallery", formData);

// DELETE image
export const deleteGalleryImage = (imageUrl) =>
  api.delete("/establishment/gallery/image", {
    data: { imageUrl },
  });