import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";

import EsProfile from "../pages/EsProfile";
import EsProfileView from "../pages/EsProfileView";
import EsCourses from "../pages/EsCourses";
import EsStudents from "../pages/EsStudents";
import EsPayment from "../pages/EsPayment";
import EsPaymentHistory from "../pages/EsPaymentHistory";
import EsDashboard from "../pages/EsDashboard";
import EsGallery from "../pages/EsGallery";
import EsProjects from "../pages/EsProjects";
import EsAbout from "../pages/EsAbout";
import EsContact from "../pages/EsContact";

const EstablishmentRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["ESTABLISHMENT"]} />}>
        <Route path="dashboard" element={<EsDashboard />} />
        <Route path="profile" element={<EsProfile />} />
        <Route path="viewprofile" element={<EsProfileView />} />
        <Route path="courses" element={<EsCourses />} />
        <Route path="students" element={<EsStudents />} />
        <Route path="payment" element={<EsPayment />} />
        <Route
          path="payment/history"
          element={<EsPaymentHistory />}
        />
        <Route path="gallery" element={<EsGallery />} />
        <Route path="projects" element={<EsProjects />} />
        <Route path="about-us" element={<EsAbout />} />
        <Route path="contact" element={<EsContact />} />
      </Route>
    </Routes>
  );
};

export default EstablishmentRoutes;
