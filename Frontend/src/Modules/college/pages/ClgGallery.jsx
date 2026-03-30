import { useState, useEffect } from "react";
import CollegeLayout from "../../../layout/CollegeLayout"

import {
  fetchCollegeGallery,
  uploadCollegeGallery,
  deleteCollegeGalleryImage,
} from "../services/clgGallery.api";

const BASE_URL = "http://localhost:5000";

export default function ClgGallery() {

  const [gallery, setGallery] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const res = await fetchCollegeGallery();
      setGallery(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetModal = () => {
    setModalType(null);
    setFiles([]);
  };

  const handleUpload = async () => {

    if (!files.length) return;

    try {

      setLoading(true);

      const formData = new FormData();

      if (modalType === "images") {

        Array.from(files).forEach((file) =>
          formData.append("images", file)
        );

      } else {

        formData.append(modalType, files[0]);

      }

      await uploadCollegeGallery(formData);

      resetModal();
      loadGallery();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  const handleDelete = async (img) => {

    if (!window.confirm("Delete this image?")) return;

    try {

      await deleteCollegeGalleryImage(img);

      loadGallery();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <CollegeLayout>

      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-6 md:p-10">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="mb-12">

            <h2 className="text-4xl font-bold text-indigo-600">
              Gallery Management
            </h2>

            <p className="text-gray-500 mt-2">
              Manage logo, banner & showcase images
            </p>

          </div>

          {/* LOGO & BANNER */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            <GalleryCard
              title="College Logo"
              image={gallery?.logo}
              onAdd={() => setModalType("logo")}
            />

            <GalleryCard
              title="College Banner"
              image={gallery?.banner}
              onAdd={() => setModalType("banner")}
            />

          </div>

          {/* GALLERY IMAGES */}

          <div className="glass-card">

            <div className="flex justify-between items-center mb-8">

              <h3 className="text-xl font-semibold">
                Gallery Images
              </h3>

              <button
                onClick={() => setModalType("images")}
                className="primary-btn"
              >
                Add Images
              </button>

            </div>

            {gallery?.images?.length ? (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {gallery.images.map((img, i) => (

                  <GalleryItem
                    key={i}
                    img={img}
                    onPreview={() => setPreviewImage(img)}
                    onDelete={() => handleDelete(img)}
                  />

                ))}

              </div>

            ) : (

              <EmptyState />

            )}

          </div>

        </div>

        {/* IMAGE PREVIEW */}

        {previewImage && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

            <div className="relative max-w-4xl w-full">

              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg"
              >
                ✕
              </button>

              <img
                src={`${BASE_URL}${previewImage}`}
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />

            </div>

          </div>

        )}

        {/* UPLOAD MODAL */}

        {modalType && (

          <UploadModal
            modalType={modalType}
            files={files}
            setFiles={setFiles}
            loading={loading}
            onCancel={resetModal}
            onUpload={handleUpload}
          />

        )}

      </div>

    </CollegeLayout>

  );

}

/* COMPONENTS */

const GalleryCard = ({ title, image, onAdd }) => (

  <div className="glass-card">

    <h3 className="text-lg font-semibold mb-4">{title}</h3>

    {image ? (

      <img
        src={`http://localhost:5000${image}`}
        className="h-48 w-full object-cover rounded-xl mb-4"
      />

    ) : (

      <EmptyState />

    )}

    <button onClick={onAdd} className="primary-btn w-full">
      Add / Update
    </button>

  </div>

);

const GalleryItem = ({ img, onPreview, onDelete }) => (

  <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">

    <div className="aspect-square">

      <img
        src={`http://localhost:5000${img}`}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

    </div>

    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

      <button
        onClick={onPreview}
        className="px-3 py-1 bg-white text-sm rounded-lg"
      >
        View
      </button>

      <button
        onClick={onDelete}
        className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg"
      >
        Delete
      </button>

    </div>

  </div>

);

const UploadModal = ({
  modalType,
  files,
  setFiles,
  loading,
  onCancel,
  onUpload,
}) => (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">

      <h3 className="text-lg font-semibold mb-6 capitalize">
        Upload {modalType}
      </h3>

      <input
        type="file"
        multiple={modalType === "images"}
        onChange={(e) => setFiles(e.target.files)}
        className="mb-6 w-full"
      />

      <div className="flex justify-end gap-4">

        <button onClick={onCancel} className="secondary-btn">
          Cancel
        </button>

        <button
          onClick={onUpload}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>

    </div>

  </div>

);

const EmptyState = () => (
  <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">
    No Image
  </div>
);