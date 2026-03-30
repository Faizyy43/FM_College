import { Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import ClgDashboard from "../pages/ClgDashBoard";
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
    <Route element={<ProtectedRoute allowedRoles={["COLLEGE"]} />}>
      <Route path="/college/dashboard" element={<ClgDashboard />} />
      <Route path="/college/profile" element={<ClgProfile />} />
      <Route path="/college/courses" element={<ClgCourses />} />
      <Route
        path="/college/stu_applications"
        element={<ClgStudentsApplications />}
      />
      <Route path="/college/admissions" element={<ClgAdmissions />} />
      <Route path="/college/partners" element={<ClgPartners />} />
      <Route path="/college/payments" element={<ClgPayments />} />
      <Route path="/college/about-us" element={<ClgAbout />} />
      <Route path="/college/gallery" element={<ClgGallery />} />
      <Route path="/college/contact" element={<ClgContact />} />
    </Route>
  );
};

export default CollegeRoutes;