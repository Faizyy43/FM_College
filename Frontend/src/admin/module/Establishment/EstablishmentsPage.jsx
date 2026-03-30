import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import axios from "axios";

export default function EstablishmentsPage() {
  const [establishments, setEstablishments] = useState([]);
  const navigate = useNavigate();

  const fetchEstablishments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/admin/establishment-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch establishments");
      }

      const data = await res.json();

      /* ✅ FIX: format data for DataTable */
      const formatted = Array.isArray(data)
        ? data.map((est) => ({
            _id: est._id,
            name: est.establishmentName,
            email: est.email,
            mobile: est.mobile,
            Status: est.status, // FIX HERE
          }))
        : [];

      setEstablishments(formatted);
    } catch (error) {
      console.error("Fetch establishments error:", error);
    }
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const handleView = (row) => {
    navigate(`/admin/establishments/${row._id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/establishments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchEstablishments();
    } catch (error) {
      console.error("Delete establishment error:", error);
    }
  };

  const handleCreateAccount = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/admin/establishment/create-account/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Account created successfully");

      fetchEstablishments();
    } catch (error) {
      console.error(error);
      alert("Failed to create account");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <DataTable
          title="Establishments"
          columns={["name", "email", "mobile", "status"]}
          data={establishments}
          onView={handleView}
          onDelete={handleDelete}
          onCreateAccount={handleCreateAccount}
        />
      </div>
    </div>
  );
}
