import { useState } from "react";
import { FiX } from "react-icons/fi";

const EsGalleryTab = ({ gallery }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery?.images?.length) {
    return (
      <div className="py-24 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          No Images Available
        </h3>
        <p className="text-gray-500 mt-2 text-sm">
          Gallery images will appear here.
        </p>
      </div>
    );
  }

  const API = import.meta.env.VITE_API_URL;


  return (
    <>
      {/* GALLERY SECTION */}
      <div className="py-12 px-6 bg-gray-50">

        <div className="max-w-6xl mx-auto">

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {gallery.images.map((img, index) => (

              <div
                key={index}
                onClick={() =>
                  setSelectedImage(`${API}${img}`)
                }
                className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
              >

                <img
                  src={`${API}${img}`}
                  alt="gallery"
                  className="w-full h-52 object-cover hover:scale-110 transition duration-300"
                />

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* MODAL VIEW */}
      {selectedImage && (

        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
            >
              <FiX size={20} />
            </button>

            {/* IMAGE */}
            <img
              src={selectedImage}
              alt="preview"
              className="w-full max-h-[75vh] object-contain bg-black"
            />

          </div>

        </div>

      )}

    </>
  );
};

export default EsGalleryTab;