import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">

      {/* 404 gradient text */}
      <h1 className="text-[64px] sm:text-[96px] font-extrabold tracking-tight leading-none bg-linear-to-b from-amber-400 to-amber-500 bg-clip-text text-transparent">
        404
      </h1>

      {/* Heading in gray */}
      <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-700">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-lg text-sm sm:text-base text-gray-500 leading-relaxed">
        Sorry, the page you’re looking for doesn’t exist, has been moved,
        or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-7 inline-flex items-center justify-center rounded-xl bg-linear-to-b from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 px-9 py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        Back to Home
      </Link>

    </div>
  );
}
