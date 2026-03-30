import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const navigate = useNavigate();

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/admin/colleges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /* support both API formats */
      const rawData = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      /* keep only valid colleges */
      const filtered = rawData.filter((college) =>
        ["VERIFIED", "ACCOUNT_CREATED"].includes(
          (college.status || "").toUpperCase(),
        ),
      );

      const formatted = filtered.map((college) => ({
        _id: college._id,

        /* supports both Request schema and CollegeApplication schema */
        Name: college.collegeName || college.fullName,
        Email: college.email,
        Mobile: college.mobile || college.contactNumber,

        Status: (college.status || "").toUpperCase(),
      }));

      setColleges(formatted);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleView = (row) => {
    navigate(`/admin/colleges/${row._id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/admin/colleges/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchColleges();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/admin/colleges/create-account/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Account created successfully");

      fetchColleges();
    } catch (error) {
      console.error(error);
      alert("Failed to create account");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <DataTable
          title="Colleges"
          columns={["Name", "Email", "Mobile", "Status"]}
          data={colleges}
          onView={handleView}
          onDelete={handleDelete}
          onCreateAccount={handleCreateAccount}
        />
      </div>
    </div>
  );
}
