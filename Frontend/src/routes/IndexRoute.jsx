import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import AdmissionPage from "../pages/AdmissionPage";
import CoursePage from "../pages/CoursePage";
import CollegePage from "../pages/CollegePage";
import CollegeDirectory from "../components/CollegePgComponent/CollegeDirectory";
import StreamColleges from "../pages/StreamCollege";
import StreamPage from "../pages/StreamPage";
import AboutUsPage from "../pages/FooterPages/AboutUsPage";
import ContactUsPage from "../pages/FooterPages/ContactUsPage";
import PrivacyPolicyPage from "../pages/FooterPages/PrivacyPolicyPage";
import TermsPage from "../pages/FooterPages/TermsPage";
import CourseCollegesPage from "../pages/CourseCollege";
import Page404 from "../components/MainComponents/Page404";
import LoginContainer from "../pages/LoginPages/LoginContainer";
import RegisterPage from "../pages/LoginPages/RegisterPage";
import RASuccess from "../components/RegisterComponents/RASuccess";
import StudentRegister from "../components/RegisterComponents/StudentRegister";
import AgentRegister from "../components/RegisterComponents/AgentRegister";
import CollegeApply from "../components/RegisterComponents/CollegeApply";
import EstablishmentApply from "../components/RegisterComponents/EstablishmentApply";
import SetPassword from "../pages/LoginPages/SetPassword";
import ForgotPassword from "../pages/LoginPages/ForgotPassword";
import ResetPassword from "../pages/LoginPages/ResetPassword";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminLoginContainer from "../pages/LoginPages/AdminLoginContainer";
import CollegeApplicationForm from "../components/CollegeApplicationForm/CollegeApplicationForm";

import EstablishmentRoutes from "../Modules/establishment/routes/EstablishmentRoutes";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import CollegeRoutes from "../Modules/college/routes/CollegeRoute";
import StudentRoutes from "../Modules/student/routes/StudentRoutes";
import AgentRoutes from "../Modules/agent/routes/AgentRoutes";

// ADMIN ROUTES
import AdminLayout from "../admin/layout/AdminLayout.jsx";
import DashboardHome from "../admin/pages/DashboardHome";
import StudentsPage from "../admin/module/Student/StudentsPage";
import AgentsPage from "../admin/module/Agent/AgentsPage";
import EstablishmentsPage from "../admin/module/Establishment/EstablishmentsPage";
import Settings from "../admin/pages/Settings";
import StudentDetails from "../admin/module/Student/StudentDetails";
import AgentProfile from "../admin/module/Agent/AgentProfile";
import RequestsPage from "../admin/pages/requests/RequestsPage";
import RequestDetailsPage from "../admin/pages/requests/RequestDetailsPage";
import CollegesPage from "../admin/module/College/CollegesPage";
import CollegeProfile from "../admin/module/College/CollegeProfile";
import EstablishmentsProfile from "../admin/module/Establishment/EstablishmentsProfile";

const IndexRoute = () => {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginContainer />
            </GuestRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <GuestRoute adminOnly>
              <AdminLoginContainer />
            </GuestRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/agent" element={<AgentRegister />} />
        <Route path="/apply/college" element={<CollegeApply />} />
        <Route path="/apply/establishment" element={<EstablishmentApply />} />

        <Route path="/register/success" element={<RASuccess />} />
        <Route path="/apply/success" element={<RASuccess />} />
      </Route>

      {/* MAIN WEBSITE */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<HomePage />} />

        <Route
          path="/programs/:programSlug/colleges"
          element={<CourseCollegesPage />}
        />

        <Route
          path="/admissions-2025/:admissionId"
          element={<AdmissionPage />}
        />

        <Route path="/courses/:courseId" element={<CoursePage />} />

        <Route path="/colleges" element={<CollegeDirectory />} />
        <Route path="/colleges/:citySlug" element={<CollegeDirectory />} />

        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route
            path="/apply/:collegeSlug"
            element={<CollegeApplicationForm />}
          />
        </Route>

        <Route
          path="/college/:citySlug/:collegeSlug"
          element={<CollegePage />}
        />

        <Route
          path="/college/:citySlug/:collegeSlug/:tabName"
          element={<CollegePage />}
        />

        <Route path="/streams/:streamKey" element={<StreamPage />} />

        <Route
          path="/streams/:streamKey/colleges"
          element={<StreamColleges />}
        />

        <Route
          path="/streams/:streamKey/courses/:courseSlug"
          element={<CourseCollegesPage />}
        />

        <Route
          path="/stream/:streamKey/:collegeSlug"
          element={<CollegePage />}
        />

        <Route
          path="/stream/:streamKey/:collegeSlug/:tabName"
          element={<CollegePage />}
        />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
      </Route>

      {/* MODULE ROUTES */}
      {EstablishmentRoutes()}
      {CollegeRoutes()}
      {StudentRoutes()}
      {AgentRoutes()}

      {/* ADMIN DASHBOARD */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardHome />} />

          {/* Agents */}
          <Route path="agents" element={<AgentsPage />} />
          <Route path="agents/:id" element={<AgentProfile />} />

          {/* Establishments */}
          <Route path="establishments" element={<EstablishmentsPage />} />
          <Route
            path="establishments/:id"
            element={<EstablishmentsProfile />}
          />

          {/* Students */}
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentDetails />} />

          {/* Colleges */}
          <Route path="colleges" element={<CollegesPage />} />
          <Route path="colleges/:id" element={<CollegeProfile />} />

          {/* Requests */}
          <Route path="requests" element={<RequestsPage />} />
          <Route path="requests/:id" element={<RequestDetailsPage />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default IndexRoute;
