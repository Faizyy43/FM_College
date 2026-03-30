import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentLayout from "../../../layout/StudentLayout";
import api from "../../../api/axios";

const StuApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = async () => {
    try {
      const res = await api.get(`/student/applications/${id}`);
      setApplication(res.data);
    } catch (err) {
      console.error("Failed to fetch application", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="p-6">Loading...</div>
      </StudentLayout>
    );
  }

  if (!application) {
    return (
      <StudentLayout>
        <div className="p-6">Application not found</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-xl font-semibold mb-6">
            Application Details
          </h2>

          <div className="space-y-3">
            <p><strong>College:</strong> {application.collegeSlug}</p>
            <p><strong>Course:</strong> {application.course}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Applied On:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default StuApplicationDetails;