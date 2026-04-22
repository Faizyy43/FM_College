import React, { useState } from "react";

const EsBanner = ({ image, name }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const banner = image && !hasImageError ? image : "";

  return (
    <div className="w-full relative overflow-hidden">

      {/* Blurred Background */}
      {banner ? (
        <div
          className="absolute inset-0 bg-center bg-cover scale-110 blur-2xl"
          style={{ backgroundImage: `url(${banner})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-56 sm:h-64 lg:h-80 flex items-center justify-center px-6">

        {/* Banner Image */}
        {banner ? (
          <img
            src={banner}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            onError={() => {
              setHasImageError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800" />
        )}

      </div>
    </div>
  );
};

export default EsBanner;
