import React from "react";

const EsBanner = ({ image, name }) => {
  const fallback =
    "https://via.placeholder.com/1400x500?text=Establishment+Banner";

  const banner = image || fallback;

  return (
    <div className="w-full relative overflow-hidden">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-110 blur-2xl"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-56 sm:h-64 lg:h-80 flex items-center justify-center px-6">

        {/* Banner Image */}
        <img
          src={banner}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onError={(e) => {
            e.target.src = fallback;
          }}
        />

      

      </div>
    </div>
  );
};

export default EsBanner;