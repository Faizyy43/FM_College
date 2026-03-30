import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import DataTable from "../../components/DataTable";
import api from "../../../api/axios";
import axios from "axios";

export default function StudentsPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = ["Name", "Email", "Status"];

  const handleView = (row) => {
    navigate(`/admin/students/${row._id}`);
  };

  const fetchStudents = useCallback(async () => {
    try {
      const res = await api.get("/admin/students");

      const rawData = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      const formatted = rawData.map((student) => ({
        _id: student._id,
        Name: student.basicDetails?.fullName || student.fullName || "-",
        Email: student.basicDetails?.email || student.email || "-",
        Status: student.overallStatus || "ACTIVE",
      }));

      setStudents(formatted);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (row) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please login again.");
        return;
      }

      const id = typeof row === "string" ? row : row._id;

      await api.delete(`/admin/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchStudents();
    } catch (err) {
      console.error(
        "Delete failed:",
        err?.response?.data || err.message || err,
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="space-y-6 md:space-y-8 p-4 sm:p-6">
      {loading ? (
        <p className="text-gray-500 text-sm sm:text-base">
          Loading students...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            title="Students List"
            columns={columns}
            data={students}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
