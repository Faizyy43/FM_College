import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";

import StuProfile from "../../student/pages/StuProfile";
import StuAppliedColleges from "../pages/StuAppliedColleges";
import StuApplicationDetails from "../pages/StuApplicationDetails";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
        {/* 🔥 Student dashboard route */}
        <Route path="dashboard" element={<StuProfile />} />
        <Route path="profile" element={<StuProfile />} />

        <Route path="applied-colleges" element={<StuAppliedColleges />} />

        <Route
          path="application/:id"
          element={<StuApplicationDetails />}
        />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
