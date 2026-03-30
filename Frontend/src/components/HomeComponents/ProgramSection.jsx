import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabsData = [
  "BE",
  "B.Tech",
  "MBA",
  "PGDM",
  "MBBS",
  "ME",
  "M.Tech",
  "B.Sc",
  "BA",
  "B.Com",
  "BCA",
  "BBA",
  "BMS",
  "B.Sc (IT)",
];

const labelToSlug = {
  BE: "be",
  "B.Tech": "btech",
  MBA: "mba",
  PGDM: "pgdm",
  MBBS: "mbbs",
  ME: "me",
  "M.Tech": "mtech",
  "B.Sc": "bsc",
  BA: "ba",
  "B.Com": "bcom",
  BCA: "bca",
  BBA: "bba",
  BMS: "bms",
  "B.Sc (IT)": "bsc-it",
};

const programDetails = {
  BE: {
    title: "BE Program",
    subtitle: "Bachelor of Engineering (4-year degree)",
    points: [
      "Focuses on core engineering fundamentals",
      "Specializations: Mechanical, Civil, Electrical, etc.",
      "Admission through JEE, CET & state entrance exams",
    ],
    buttonLabel: "Show Colleges for BE",
  },

  "B.Tech": {
    title: "B.Tech Program",
    subtitle: "Bachelor of Technology (4-year degree)",
    points: [
      "Technology-focused engineering program",
      "Popular branches: CSE, IT, AI, Data Science",
      "Admission via JEE Main, JEE Advanced, state exams",
    ],
    buttonLabel: "Show Colleges for B.Tech",
  },

  MBA: {
    title: "MBA Program",
    subtitle: "Master of Business Administration (2 years)",
    points: [
      "Specializations: Marketing, Finance, HR, Analytics",
      "Entrance exams: CAT, XAT, CMAT, MAT",
    ],
    buttonLabel: "Show Colleges for MBA",
  },

  PGDM: {
    title: "PGDM Program",
    subtitle: "Industry-oriented postgraduate diploma in management",
    points: ["Offered by autonomous institutes", "Corporate-driven curriculum"],
    buttonLabel: "Show Colleges for PGDM",
  },

  MBBS: {
    title: "MBBS Program",
    subtitle: "Undergraduate medical program",
    points: [
      "5.5-year course including internship",
      "Admission only through NEET UG",
    ],
    buttonLabel: "Show Colleges for MBBS",
  },

  ME: {
    title: "ME Program",
    subtitle: "Master of Engineering (Postgraduate degree)",
    points: ["Research-focused specialization", "Admission via GATE"],
    buttonLabel: "Show Colleges for ME",
  },

  "M.Tech": {
    title: "M.Tech Program",
    subtitle: "Master of Technology (Postgraduate degree)",
    points: [
      "Advanced technical program",
      "Great for research & industry roles",
    ],
    buttonLabel: "Show Colleges for M.Tech",
  },

  "B.Sc": {
    title: "B.Sc Program",
    subtitle: "3-year science undergraduate degree",
    points: ["Streams: Physics, Chemistry, Maths, Biology, CS"],
    buttonLabel: "Show Colleges for B.Sc",
  },

  BA: {
    title: "BA Program",
    subtitle: "Bachelor of Arts (3-year degree)",
    points: ["Subjects include Economics, English, History, Psychology"],
    buttonLabel: "Show Colleges for BA",
  },

  "B.Com": {
    title: "B.Com Program",
    subtitle: "Commerce & finance-focused UG degree",
    points: ["Ideal for careers in accounting, finance, CA/CS prep"],
    buttonLabel: "Show Colleges for B.Com",
  },

  BCA: {
    title: "BCA Program",
    subtitle: "Computer science & software development degree",
    points: ["Covers programming, databases, web & app development"],
    buttonLabel: "Show Colleges for BCA",
  },

  BBA: {
    title: "BBA Program",
    subtitle: "Bachelor of Business Administration",
    points: ["Entry-level management program", "Ideal for MBA preparation"],
    buttonLabel: "Show Colleges for BBA",
  },

  BMS: {
    title: "BMS Program",
    subtitle: "Bachelor of Management Studies",
    points: ["Management-focused business program"],
    buttonLabel: "Show Colleges for BMS",
  },

  "B.Sc (IT)": {
    title: "B.Sc (IT) Program",
    subtitle: "Information Technology focused UG degree",
    points: ["Covers IT, networks, software, databases"],
    buttonLabel: "Show Colleges for B.Sc (IT)",
  },
};

const ProgramSection = () => {
  const navigate = useNavigate();
  const defaultTab = "BE";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const currentProgram = programDetails[activeTab];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleShowCollegesClick = () => {
    const slug = labelToSlug[activeTab];
    navigate(`/programs/${slug}/colleges`);
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">
          Explore Programs
        </h2>

        {/* -------------------- Tabs -------------------- */}
        <div
          className="
    flex items-center gap-3 overflow-x-auto pb-3 mb-6
    [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:'none']
    [scrollbar-width:'none']
  "
        >
          {tabsData.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-5 py-2.5 rounded-2xl border text-sm font-medium whitespace-nowrap ${
                activeTab === tab
                  ? " bg-linear-to-bl from-blue-700 to-blue-900 text-white"
                  : "bg-white text-gray-800 border-slate-300 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* -------------------- Program Card -------------------- */}
        <div className="bg-linear-to-b from-gray-100 to-gray-200 rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-6">
          <h3 className="text-[22px] font-semibold text-gray-900 mb-1">
            {currentProgram?.title}
          </h3>

          <p className="text-sm text-gray-600">{currentProgram?.subtitle}</p>

          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-6">
            {currentProgram?.points?.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>

          <button
            onClick={handleShowCollegesClick}
            className="group relative overflow-hidden
  px-8 py-3 rounded-xl
  bg-linear-to-br from-amber-500 to-orange-500
  text-white font-semibold
  shadow-md shadow-orange-500/20
  hover:shadow-lg hover:shadow-orange-500/25
  transition-all duration-200
  active:scale-[0.99]"
          >
            {currentProgram?.buttonLabel}
          
          <span
      className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-white/10
        transition-opacity duration-300
      "
    />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
