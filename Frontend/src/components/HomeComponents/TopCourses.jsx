import React from "react";
import { Link } from "react-router-dom";

const TopCourses = () => {
  const courses = [
    { id: "be-btech", name: "BE/B.Tech" },
    { id: "ba", name: "BA" },
    { id: "bsc", name: "B.Sc" },
    { id: "mba-pgdm", name: "MBA/PGDM" },
    { id: "msc", name: "M.Sc" },
    { id: "me-mtech", name: "ME/M.Tech" },
    { id: "ma", name: "MA" },
    { id: "polytechnic", name: "Polytechnic" },

    { id: "be-btech-lateral", name: "BE/B.Tech Lateral" },
    { id: "mphil-phd-science", name: "M.Phil/Ph.D in Science" },
    { id: "bcom", name: "B.Com" },
    { id: "md", name: "MD" },
    { id: "bba-bms", name: "BBA/BMS" },
    { id: "mphil-phd-arts", name: "M.Phil/Ph.D in Arts" },
    { id: "mphil-phd-engineerpath", name: "M.Phil/Ph.D in Engineering" },
  ];

  return (
    <div className="p-8 mb-6">
      <h2 className="text-4xl font-bold mb-6 px-6 ">Top Courses</h2>

      <div className="flex flex-wrap gap-3 px-12 py-5 justify-center">
        {courses.map((item) => (
          <Link
            key={item.id}
            to={`courses/${item.id}`}
 className="
        group relative overflow-hidden
        px-5 py-2.5 rounded-xl
        border border-slate-200
        bg-linear-to-bl from-gray-50 to-gray-100   hover:from-blue-700 hover:to-blue-900 hover:text-white
        text-slate-700
        shadow-sm hover:shadow-lg
        transition-all duration-300 ease-out
        active:scale-[0.99]
      "
    >          
            <span className="relative z-10">
        {item.name}
      </span>

     

       
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
