import { Route } from "react-router-dom";
import ProtectedRoute from "../../../routes/ProtectedRoute";
import AgentDashboard from "../pages/AgentDashboard";
import AgentProfile from "../pages/AgentProfile";
import AgentStuApplications from "../pages/AgentStuApplications";
import AgentColleges from "../pages/AgentColleges";
import AgentStuImport from "../pages/AgentStuImport";
import AgentStuApply from "../pages/AgentStuApply";






const AgentRoutes = () => {
  return (
    <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>
           <Route path="/agent/dashboard" element={<AgentDashboard />} />
           <Route path="/agent/profile" element={<AgentProfile />} />
            <Route path="/agent/students" element={<AgentStuImport />} />
               <Route path="/agent/studentprofile/:id" element={<AgentStuApply />} />
             <Route path="/agent/applications" element={<AgentStuApplications />} />
               <Route path="/agent/colleges" element={<AgentColleges />} />
    </Route>

  );
};

export default AgentRoutes;
