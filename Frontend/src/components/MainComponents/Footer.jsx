import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const topCourses = ["M.B.A", "B.E/B.Tech", "MCA", "BCA", "M.E/M.Tech","B.Sc/M.Sc"];
  const topUniversities = ["Engineering", "Management", "Medical", "Law", "Commerce", "Science"];
  const studyAreas = ["Ahmedabad", "Gandhinagar", "Vadodara", "Rajkot", "Mahesana", "Surat"];
  const topUniversitiesGujarat = [
    "Gujarat University",
    "Dhirubhai Ambani University",
    "Nirma University",
    "Parul University",
    "Pandit Deendayal Energy University (PDEU)",
    "Ganpat University"
  ];

  return (
    <div className="bg-linear-to-b from-gray-100 to-gray-300 px-6 md:px-16 py-10 w-full border-t border-gray-300">

      {/* ---------------- NEWSLETTER SECTION ---------------- */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold">Subscribe To Our News Letter</h2>
        <p className="text-gray-600 mt-1">
          Get College Notifications, Exam Notifications and News Updates
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">

          <input
            type="email"
            placeholder="Enter your email id"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-64 outline-amber-400"
          />

          <input
            type="text"
            placeholder="Enter your mobile no"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-64 outline-amber-400"
          />

          <select className="border border-gray-300 bg-white rounded-lg px-4 py-2 w-64 outline-amber-400 ">
            <option value="">Choose your course</option>
            <option>MBA</option>
            <option>B.E/B.Tech</option>
            <option>M.E/M.Tech</option>
            <option>MCA</option>
            <option>BCA</option>
          </select>

          <button className="group relative overflow-hidden
  px-8 py-3 rounded-lg
  bg-linear-to-br from-amber-500 to-orange-500
  text-white font-semibold
  shadow-md shadow-orange-500/20
  hover:shadow-lg hover:shadow-orange-500/25
  transition-all duration-200
  active:scale-[0.99]">
            Submit

             <span
      className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-white/10
        transition-opacity duration-300
      "
    />
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER SECTIONS ---------------- */}
      <footer className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Top Courses */}
        <div>
          <h4 className="font-semibold  text-lg  mb-2">Top Courses</h4>
          {topCourses.map((item) => (
            <Link 
              key={item} 
              to={`/courses/${item.replace(/\s|\./g, "-").toLowerCase()}`}
              className="text-gray-700 mb-1 block hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Top Universities */}
        <div>
          <h4 className="font-semibold  text-lg  mb-2">Top Universities</h4>
          {topUniversities.map((item) => (
            <Link 
              key={item} 
              to={`/universities/${item.toLowerCase()}`}
              className="text-gray-700 mb-1 block hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Study in your area */}
        <div>
          <h4 className="font-semibold  text-lg  mb-2">Study in your area</h4>
          {studyAreas.map((item) => (
            <Link 
              key={item} 
              to={`/location/${item.toLowerCase()}`}
              className="text-gray-700 mb-1 block hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Top Universities in Gujarat */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Top Universities in Gujarat</h4>
          {topUniversitiesGujarat.map((item) => (
            <Link 
              key={item} 
              to={`/gujarat-universities/${item.replace(/\s|\./g, "-").toLowerCase()}`}
              className="text-gray-700 mb-1 block hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>
      </footer>

      {/* ---------------- BOTTOM LINKS ---------------- */}
      <div className="text-center mt-10 text-sm text-gray-600">
        <p>
          <Link to="/about-us" className="hover:text-blue-600">About Us</Link> | 
          <Link to="/contact-us" className="hover:text-blue-600"> Contact Us</Link> | 
          <Link to="/privacy-policy" className="hover:text-blue-600"> Privacy Policy</Link> | 
          <Link to="/terms-and-conditions" className="hover:text-blue-600"> Terms & Conditions</Link>
        </p>
        <p className="mt-2">© 2025 Way to Web Pvt. Ltd. All Rights Reserved</p>
      </div>

    </div>
  );
};

export default Footer;
