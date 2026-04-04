import { Route } from "react-router-dom";
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
    <Route element={<ProtectedRoute allowedRoles={["ESTABLISHMENT"]} />}>
      {/* 🔥 FIX: removed "/" from all paths */}

      <Route path="establishment/dashboard" element={<EsDashboard />} />
      <Route path="establishment/profile" element={<EsProfile />} />
      <Route path="establishment/viewprofile" element={<EsProfileView />} />
      <Route path="establishment/courses" element={<EsCourses />} />
      <Route path="establishment/students" element={<EsStudents />} />

      {/* <Route path="establishment/add-student" element={<AddStudent />} /> */}

      <Route path="establishment/payment" element={<EsPayment />} />
      <Route
        path="establishment/payment/history"
        element={<EsPaymentHistory />}
      />

      <Route path="establishment/gallery" element={<EsGallery />} />
      <Route path="establishment/projects" element={<EsProjects />} />
      <Route path="establishment/about-us" element={<EsAbout />} />
      <Route path="establishment/contact" element={<EsContact />} />
    </Route>
  );
};

export default EstablishmentRoutes;
