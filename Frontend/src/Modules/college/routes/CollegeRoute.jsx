import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";

import ClgDashboard from "../../college/pages/ClgDashboard";
import ClgProfile from "../pages/ClgProfile";
import ClgCourses from "../pages/ClgCourses";
import ClgAdmissions from "../pages/ClgAdmissions";
import ClgPayments from "../pages/ClgPayments";
import ClgPartners from "../pages/ClgPartners";
import ClgStudentsApplications from "../pages/ClgStudentApplications";
import ClgAbout from "../pages/ClgAbout";
import ClgGallery from "../pages/ClgGallery";
import ClgContact from "../pages/ClgContact";

const CollegeRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["COLLEGE"]} />}>
        {/* 🔥 FIX: removed "/" from all paths */}

        <Route path="dashboard" element={<ClgDashboard />} />
        <Route path="profile" element={<ClgProfile />} />
        <Route path="courses" element={<ClgCourses />} />

        <Route path="stu_applications" element={<ClgStudentsApplications />} />

        <Route path="admissions" element={<ClgAdmissions />} />
        <Route path="partners" element={<ClgPartners />} />
        <Route path="payments" element={<ClgPayments />} />
        <Route path="about-us" element={<ClgAbout />} />
        <Route path="gallery" element={<ClgGallery />} />
        <Route path="contact" element={<ClgContact />} />
      </Route>
    </Routes>
  );
};

export default CollegeRoutes;
