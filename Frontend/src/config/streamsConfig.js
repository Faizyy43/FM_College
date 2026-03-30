// src/config/streamsConfig.js

import {
  GiGearHammer,
  GiBriefcase,
  GiMoneyStack,
  GiStethoscope,
  GiMaterialsScience,
  GiChefToque,
  GiOpenBook,
  GiHeartBottle,
  GiFarmTractor,
  GiPencilRuler,
  GiScales,
  GiPill,
} from "react-icons/gi";

export const STREAM_CONFIG = {
  // ===================== ENGINEEERING =====================

  engineering: {
    key: "engineering",
    title: "Engineering",
    Icon: GiGearHammer, 
    heroTagline:
      "Discover top engineering courses, branches, colleges and career paths. Learn how engineering combines innovation, technology, and problem-solving to build the world around us.",
    aboutTitle: "About Engineering",
    aboutText: [
      "Engineering is one of India’s most preferred career choices. It blends mathematics, science, creativity, and design to solve real-world problems.",
      "Engineers build everything from software systems and machines to roads, bridges, and future technologies, with branches like Computer Science, Mechanical, Civil, Electrical, Electronics, AI and Robotics.",
    ],
    stats: [
      { label: "Avg. UG Duration", value: "4 Years" },
      { label: "Avg. PG Duration", value: "2 Years" },
      { label: "Popular Fields", value: "CS, IT, Mech, Civil, ECE" },
      { label: "Top Recruiters", value: "MNCs, PSUs, Startups" },
    ],
    courses: [
      {
        name: "B.Tech",
        level: "UG",
        desc: "4-year undergraduate engineering program.",
      },
      {
        name: "B.E",
        level: "UG",
        desc: "Bachelor of Engineering with core technical focus.",
      },
      {
        name: "M.Tech",
        level: "PG",
        desc: "Advanced postgraduate specialization degree.",
      },
      {
        name: "M.E",
        level: "PG",
        desc: "Master of Engineering with research orientation.",
      },
    ],
    careers: [
      "Software Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "AI / ML Developer",
      "Data Scientist",
      "Robotics Engineer",
      "Automobile Engineer",
    ],
  },

  // ===================== MANAGEMENT =====================
  management: {
    key: "management",
    title: "Management",
    Icon: GiBriefcase,
    heroTagline:
      "Build leadership, strategic thinking and business management skills for careers in corporates, startups and entrepreneurship.",
    aboutTitle: "About Management",
    aboutText: [
      "Management programs focus on business strategy, finance, marketing, HR, operations and leadership.",
      "Graduates work in corporate roles, consulting, banking, startups, and family businesses.",
    ],
    stats: [
      { label: "Popular Degrees", value: "BBA, MBA, PGDM" },
      { label: "Avg. UG Duration", value: "3 Years" },
      { label: "Avg. PG Duration", value: "2 Years" },
      { label: "Top Sectors", value: "IT, Finance, FMCG, Consulting" },
    ],
    courses: [
      {
        name: "BBA",
        level: "UG",
        desc: "Foundation in business administration and management.",
      },
      {
        name: "BMS / BBM",
        level: "UG",
        desc: "Undergraduate degree focused on management skills.",
      },
      {
        name: "MBA",
        level: "PG",
        desc: "Postgraduate program with specialisations like Finance, HR, Marketing, IT, etc.",
      },
      {
        name: "PGDM",
        level: "PG",
        desc: "Industry-oriented management diploma offered by top institutes.",
      },
    ],
    careers: [
      "Business Analyst",
      "Marketing Manager",
      "HR Manager",
      "Finance / Investment Analyst",
      "Operations Manager",
      "Product Manager",
      "Sales Manager",
      "Entrepreneur / Startup Founder",
    ],
  },

  // ===================== COMMERCE & BANKING =====================

  commerce_banking: {
    key: "commerce_banking",
    title: "Commerce & Banking",
    Icon: GiMoneyStack,
    heroTagline:
      "Understand accounting, taxation, finance, and banking to build a strong career in the commerce world.",
    aboutTitle: "About Commerce & Banking",
    aboutText: [
      "Commerce deals with trade, finance, accounting, taxation and business operations.",
      "Students can build careers in CA, CS, banking, stock markets, insurance and financial services.",
    ],
    stats: [
      { label: "Core Subjects", value: "Accounts, Tax, Economics" },
      { label: "Popular Degrees", value: "B.Com, M.Com" },
      { label: "Career Tracks", value: "CA, CS, CMA, Banking" },
      { label: "Job Areas", value: "Finance, Audit, Tax, Banking" },
    ],
    courses: [
      {
        name: "B.Com",
        level: "UG",
        desc: "3-year undergraduate degree in commerce and finance.",
      },
      {
        name: "B.Com (Honours)",
        level: "UG",
        desc: "Advanced specialization in commerce subjects.",
      },
      {
        name: "M.Com",
        level: "PG",
        desc: "Postgraduate degree focused on advanced commerce topics.",
      },
      {
        name: "Professional Courses",
        level: "Other",
        desc: "CA, CS, CMA and other commerce certifications.",
      },
    ],
    careers: [
      "Chartered Accountant (CA)",
      "Company Secretary (CS)",
      "Bank PO / Clerk",
      "Financial Analyst",
      "Tax Consultant",
      "Auditor",
      "Investment / Stock Market Analyst",
      "Insurance Professional",
    ],
  },

  // ===================== MEDICAL =====================

  medical: {
    key: "medical",
    title: "Medical",
    Icon: GiStethoscope,
    heroTagline:
      "Pursue medical and healthcare programs like MBBS, BDS, Physiotherapy and allied health sciences.",
    aboutTitle: "About Medical",
    aboutText: [
      "Medical programs train students to diagnose, treat and prevent diseases, improving human health.",
      "Apart from MBBS, students can choose dentistry, physiotherapy, nursing and many allied health fields.",
    ],
    stats: [
      { label: "Flagship Degree", value: "MBBS" },
      { label: "UG Duration", value: "4.5–5.5 Years" },
      { label: "Popular Fields", value: "MBBS, BDS, BPT, Nursing" },
      { label: "Work Areas", value: "Hospitals, Clinics, Research" },
    ],
    courses: [
      {
        name: "MBBS",
        level: "UG",
        desc: "Bachelor of Medicine & Surgery – core doctor degree.",
      },
      {
        name: "BDS",
        level: "UG",
        desc: "Bachelor of Dental Surgery for dental specialisation.",
      },
      {
        name: "BPT",
        level: "UG",
        desc: "Bachelor of Physiotherapy focusing on rehabilitation.",
      },
      {
        name: "Allied Health Programs",
        level: "UG / PG",
        desc: "Various paramedical and health science programmes.",
      },
    ],
    careers: [
      "Doctor / Physician",
      "Dentist",
      "Physiotherapist",
      "Medical Officer",
      "Hospital Administrator",
      "Public Health Professional",
      "Medical Researcher",
      "Clinical Practitioner",
    ],
  },

  // ===================== SCIENCE =====================
  science: {
    key: "science",
    title: "Science",
    Icon: GiMaterialsScience,
    heroTagline:
      "Explore core science subjects like Physics, Chemistry, Biology and Mathematics with strong practical exposure.",
    aboutTitle: "About Science",
    aboutText: [
      "Science programs build a strong foundation in analytical thinking, experiments and research across Physics, Chemistry, Biology and Mathematics.",
      "Students can later specialise in areas like Biotechnology, Microbiology, Data Science, Environmental Science, Research and many more.",
    ],
    stats: [
      { label: "Popular Degrees", value: "B.Sc, M.Sc" },
      { label: "Common Subjects", value: "PCM / PCB / PCMB" },
      { label: "Career Areas", value: "Research, Labs, IT, Education" },
      { label: "Study Path", value: "UG → PG → PhD" },
    ],
    courses: [
      {
        name: "B.Sc (PCM / PCB)",
        level: "UG",
        desc: "3-year undergraduate degree with core combinations like Physics-Chemistry-Maths or Physics-Chemistry-Biology.",
      },
      {
        name: "B.Sc (Microbiology / Biotechnology)",
        level: "UG",
        desc: "Specialised life-science programs with lab-based learning.",
      },
      {
        name: "M.Sc",
        level: "PG",
        desc: "Postgraduate degree for deeper expertise and research in a chosen subject.",
      },
      {
        name: "Integrated M.Sc / Research Programs",
        level: "UG+PG",
        desc: "Long-term programs focused on research and higher studies.",
      },
    ],
    careers: [
      "Research Scientist",
      "Lab Technician",
      "Data Analyst / Scientist",
      "Environmental Scientist",
      "Biotechnologist",
      "Quality Control Analyst",
      "Teacher / Lecturer",
      "Healthcare & Diagnostics Roles",
    ],
  },

  // ===================== HOTEL MANAGEMENT =====================
  "hotel-management": {
    key: "hotel-management",
    title: "Hotel Management",
    Icon: GiChefToque,
    heroTagline:
      "Learn hospitality, food production, front office and hotel operations to work in hotels, resorts and tourism.",
    aboutTitle: "About Hotel Management",
    aboutText: [
      "Hotel Management focuses on hospitality, customer service, food & beverage, housekeeping and front-office operations.",
      "Graduates work in star hotels, resorts, cruise lines, airlines catering, event management and tourism sectors.",
    ],
    stats: [
      { label: "Popular Degrees", value: "BHM, B.Sc Hospitality" },
      { label: "Avg. UG Duration", value: "3–4 Years" },
      { label: "Key Skills", value: "Communication, Service, Management" },
      { label: "Industries", value: "Hotels, Tourism, Events" },
    ],
    courses: [
      {
        name: "BHM (Bachelor of Hotel Management)",
        level: "UG",
        desc: "Comprehensive degree covering all hotel & hospitality departments.",
      },
      {
        name: "B.Sc in Hospitality & Hotel Administration",
        level: "UG",
        desc: "Focus on operations, service and hospitality management.",
      },
      {
        name: "Diploma in Hotel Management",
        level: "UG Diploma",
        desc: "Shorter programs for entry-level roles in hotels and restaurants.",
      },
      {
        name: "Master’s / MBA in Hospitality",
        level: "PG",
        desc: "Postgraduate level roles in hotel administration and management.",
      },
    ],
    careers: [
      "Hotel Operations Manager",
      "Front Office Executive",
      "Food & Beverage Manager",
      "Chef / Kitchen Professional",
      "Housekeeping Supervisor",
      "Event & Banquet Manager",
      "Restaurant Manager",
      "Travel & Tourism Executive",
    ],
  },

  // ===================== ART & HUMANITIES =====================
  "art-humanities": {
    key: "art-humanities",
    title: "Art & Humanities",
    Icon: GiOpenBook,
    heroTagline:
      "Study society, culture, languages and human behaviour through Arts & Humanities programs.",
    aboutTitle: "About Art & Humanities",
    aboutText: [
      "Arts & Humanities include subjects like History, Political Science, Economics, Psychology, Sociology, Literature and Languages.",
      "These programs help students build strong communication, analytical and critical-thinking skills for diverse career paths.",
    ],
    stats: [
      { label: "Popular Degrees", value: "B.A, M.A" },
      { label: "Key Skills", value: "Writing, Analysis, Research" },
      { label: "Career Areas", value: "Media, Education, Civil Services" },
      { label: "Study Path", value: "UG → PG → PhD / Competitive Exams" },
    ],
    courses: [
      {
        name: "B.A (General / Honours)",
        level: "UG",
        desc: "3-year degree with majors like History, Economics, Psychology, etc.",
      },
      {
        name: "B.A in Journalism / Mass Communication",
        level: "UG",
        desc: "Specialised course for media, public relations and content roles.",
      },
      {
        name: "M.A",
        level: "PG",
        desc: "Postgraduate study for deeper expertise and research in a chosen subject.",
      },
      {
        name: "Social Work / Rural Development",
        level: "UG / PG",
        desc: "Programs focused on NGOs, social sector and community work.",
      },
    ],
    careers: [
      "Teacher / Lecturer",
      "Journalist / Content Writer",
      "Social Worker / NGO Professional",
      "Civil Services Aspirant (UPSC / GPSC)",
      "Psychologist (with higher studies)",
      "Translator / Language Expert",
      "Policy / Research Associate",
      "Media & Communication Roles",
    ],
  },

  // ===================== NURSING =====================
  nursing: {
    key: "nursing",
    title: "Nursing",
    Icon: GiHeartBottle,
    heroTagline:
      "Train to become a professional nurse and support doctors, patients and healthcare systems.",
    aboutTitle: "About Nursing",
    aboutText: [
      "Nursing is a core healthcare profession responsible for patient care, medication, monitoring and emotional support.",
      "Programs combine classroom learning with hospital training, preparing students for roles in hospitals, clinics and community health.",
    ],
    stats: [
      { label: "Popular Programs", value: "B.Sc Nursing, GNM" },
      { label: "UG Duration", value: "3–4 Years" },
      { label: "Work Places", value: "Hospitals, Clinics, NGOs" },
      { label: "Shift Nature", value: "Full-time, Rotational" },
    ],
    courses: [
      {
        name: "B.Sc Nursing",
        level: "UG",
        desc: "4-year professional degree for registered nurse roles.",
      },
      {
        name: "GNM (General Nursing & Midwifery)",
        level: "Diploma",
        desc: "Diploma program focused on nursing and midwifery care.",
      },
      {
        name: "Post-Basic B.Sc Nursing",
        level: "UG (Bridge)",
        desc: "For GNM nurses to upgrade to degree level.",
      },
      {
        name: "M.Sc Nursing & Specialisations",
        level: "PG",
        desc: "Advanced practice and teaching / administrative roles.",
      },
    ],
    careers: [
      "Staff Nurse",
      "ICU / OT Nurse",
      "Community Health Nurse",
      "Nursing Tutor / Educator",
      "Clinical Instructor",
      "School / Corporate Health Nurse",
      "Nursing Superintendent (with experience)",
      "Healthcare Administrator",
    ],
  },

  // ===================== AGRICULTURE =====================
  agriculture: {
    key: "agriculture",
    title: "Agriculture",
    Icon: GiFarmTractor,
    heroTagline:
      "Learn modern farming, crop science, soil management and agri-business to support food and sustainability.",
    aboutTitle: "About Agriculture",
    aboutText: [
      "Agriculture programs focus on crop production, soil science, irrigation, pests, seeds, animal husbandry and farm management.",
      "There is also a strong focus on agri-business, food processing, research and sustainable farming technologies.",
    ],
    stats: [
      { label: "Popular Degree", value: "B.Sc Agriculture" },
      { label: "UG Duration", value: "4 Years" },
      { label: "Career Areas", value: "Govt Dept, Agri-Companies, Research" },
      { label: "Focus", value: "Food Security & Rural Development" },
    ],
    courses: [
      {
        name: "B.Sc Agriculture",
        level: "UG",
        desc: "Core degree covering crops, soil, irrigation and farm management.",
      },
      {
        name: "Diploma in Agriculture",
        level: "Diploma",
        desc: "Short-term programs for field-level jobs and farm support services.",
      },
      {
        name: "M.Sc Agriculture / Agronomy",
        level: "PG",
        desc: "Advanced studies and research for specialist and academic roles.",
      },
      {
        name: "Agri-Business Management",
        level: "PG / Diploma",
        desc: "Business-oriented programs in marketing, supply chain and finance of agri-products.",
      },
    ],
    careers: [
      "Agriculture Officer (Govt / Banks)",
      "Farm Manager",
      "Agri-Input Sales & Marketing",
      "Seed / Fertilizer / Pesticide Industry Roles",
      "Research Scientist / Lab Professional",
      "Agri-Entrepreneur / Organic Farming",
      "Food Processing & Quality Control",
      "Rural Development Officer",
    ],
  },

  // ===================== DESIGN =====================
  design: {
    key: "design",
    title: "Design",
    Icon: GiPencilRuler,
    heroTagline:
      "Build a creative career in product, communication, UI/UX, interior or fashion design.",
    aboutTitle: "About Design",
    aboutText: [
      "Design education focuses on creativity, aesthetics, user experience and problem-solving through visuals and products.",
      "Students learn sketching, 3D modelling, digital tools and portfolio building across many design specialisations.",
    ],
    stats: [
      { label: "Popular Degrees", value: "B.Des, M.Des" },
      { label: "Entry Mode", value: "Aptitude + Portfolio Tests" },
      { label: "Key Skills", value: "Creativity, Visualization, Software" },
      { label: "Industries", value: "Tech, Media, Fashion, Product" },
    ],
    courses: [
      {
        name: "B.Des (Bachelor of Design)",
        level: "UG",
        desc: "4-year design program with specialisations like product, communication, fashion, etc.",
      },
      {
        name: "B.Sc in Design / Animation",
        level: "UG",
        desc: "Courses focused on animation, VFX, graphics and multimedia.",
      },
      {
        name: "M.Des",
        level: "PG",
        desc: "Postgraduate degree for higher-level design and research roles.",
      },
      {
        name: "UI/UX & Interaction Design Programs",
        level: "UG / PG / Diploma",
        desc: "Specialised courses for digital product and interface design.",
      },
    ],
    careers: [
      "UI/UX Designer",
      "Graphic / Communication Designer",
      "Product / Industrial Designer",
      "Interior Designer",
      "Fashion Designer",
      "Animator / Motion Graphics Artist",
      "Art Director / Creative Lead",
      "Freelance Designer / Studio Owner",
    ],
  },

  // ===================== LAW =====================
  law: {
    key: "law",
    title: "Law",
    Icon: GiScales,
    heroTagline:
      "Study legal systems, justice and rights to become a lawyer, legal advisor or work in judiciary-related roles.",
    aboutTitle: "About Law",
    aboutText: [
      "Law programs teach constitutional law, criminal law, civil law, corporate law, contracts and more.",
      "Students can pursue integrated law degrees after 12th or LLB after graduation, and later specialise via LLM.",
    ],
    stats: [
      { label: "Popular Degrees", value: "BA LLB, BBA LLB, LLB" },
      { label: "Integrated Duration", value: "5 Years" },
      { label: "PG Degree", value: "LLM (1–2 Years)" },
      { label: "Work Areas", value: "Courts, Law Firms, Companies" },
    ],
    courses: [
      {
        name: "BA LLB / BBA LLB (Integrated)",
        level: "UG (5-Year)",
        desc: "Integrated law degree after 12th with arts or management subjects.",
      },
      {
        name: "LLB (3-Year)",
        level: "UG",
        desc: "Standalone law degree after completing any graduation.",
      },
      {
        name: "LLM",
        level: "PG",
        desc: "Postgraduate specialisation in fields like corporate, criminal or constitutional law.",
      },
      {
        name: "Diploma / Certificate in Law",
        level: "Diploma",
        desc: "Short courses in cyber law, IPR, labour law, etc.",
      },
    ],
    careers: [
      "Advocate / Lawyer",
      "Corporate Legal Advisor",
      "Judge / Judicial Services (after exams)",
      "Legal Consultant / Compliance Officer",
      "Public Prosecutor",
      "Legal Researcher",
      "In-House Counsel in Companies",
      "NGO / Human Rights Lawyer",
    ],
  },

  // ===================== PHARMACY =====================
  pharmacy: {
    key: "pharmacy",
    title: "Pharmacy",
    Icon: GiPill,
    heroTagline:
      "Learn about medicines, formulations and drug safety to work in pharma industry, hospitals and research.",
    aboutTitle: "About Pharmacy",
    aboutText: [
      "Pharmacy deals with the study of medicines – their discovery, formulation, dosage, side-effects and safe use.",
      "Students work with chemistry, biology and technology to support healthcare, pharma manufacturing and research.",
    ],
    stats: [
      { label: "Popular Degrees", value: "D.Pharm, B.Pharm, M.Pharm" },
      { label: "UG Duration", value: "2–4 Years" },
      { label: "Core Areas", value: "Pharmaceutics, Pharmacology, Chemistry" },
      { label: "Industries", value: "Hospitals, Pharma, Research" },
    ],
    courses: [
      {
        name: "D.Pharm (Diploma in Pharmacy)",
        level: "Diploma",
        desc: "2-year diploma for entry-level pharmacist roles.",
      },
      {
        name: "B.Pharm",
        level: "UG",
        desc: "4-year degree with in-depth pharmaceutical sciences.",
      },
      {
        name: "M.Pharm",
        level: "PG",
        desc: "Specialised postgraduate degree in areas like pharmaceutics, pharmacology, etc.",
      },
      {
        name: "Pharm.D / Clinical Pharmacy",
        level: "Professional",
        desc: "Doctor of Pharmacy focused on clinical practice and patient care.",
      },
    ],
    careers: [
      "Hospital / Retail Pharmacist",
      "Quality Control / Quality Assurance Officer",
      "Production Executive in Pharma Plants",
      "Drug Safety Associate",
      "Medical Representative / Pharma Sales",
      "Research & Development Scientist",
      "Regulatory Affairs Executive",
      "Academician / Pharmacy Lecturer",
    ],
  },
};