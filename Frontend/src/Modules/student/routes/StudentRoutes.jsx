import { Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";

import StuProfile from "../../student/pages/StuProfile";
import StuAppliedColleges from "../pages/StuAppliedColleges";
import StuApplicationDetails from "../pages/StuApplicationDetails";

const StudentRoutes = () => {
  return (
    <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
      {/* 🔥 FIX: removed "/" */}

      <Route path="student/profile" element={<StuProfile />} />

      <Route path="student/applied-colleges" element={<StuAppliedColleges />} />

      <Route
        path="student/application/:id"
        element={<StuApplicationDetails />}
      />
    </Route>
  );
};

export default StudentRoutes;
