import React from "react";
import { Link } from "react-router-dom";

const Admissions = () => {
  const admission = [
    { id: "bed-admission-2025", name: "B Ed Admission 2025" },
    { id: "mba-admission-2025", name: "MBA Admission 2025" },
    { id: "mbbs-admission-2025", name: "MBBS Admission 2025" },
    { id: "ba-admission-2025", name: "BA Admission 2025" },
    { id: "mtech-admission-2025", name: "M Tech Admission 2025" },
    { id: "phd-admission-2025", name: "PhD Admission 2025" },
    { id: "llb-admission-2025", name: "LLB Admission 2025" },
    { id: "bsc-admission-2025", name: "BSc Admission 2025" },
    { id: "bpharm-admission-2025", name: "B Pharmachy 2025" },
      

    
  ];

  return (
    <div className="p-8 mb-3">
      <h2 className=" text-4xl font-bold mb-6 px-6">Admissions 2025</h2>

      <div className="flex flex-wrap gap-3 px-6 py-6 justify-center">
  {admission.map((item) => (
    <Link
      key={item.id}
      to={`/admissions-2025/${item.id}`}
      className="
        group relative overflow-hidden
        px-5 py-2.5 rounded-xl
        border border-slate-200
        bg-linear-to-bl from-gray-50 to-gray-100    hover:from-blue-700 hover:to-blue-900 hover:text-white
        text-slate-700
        shadow-sm  hover:shadow-lg
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

export default Admissions;
