import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || token === "null" || token === "undefined") {
        console.error("No token found. Please login again.");
        return;
      }

      const res = await axios.get(`${API}/api/agents`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const formatted = Array.isArray(res.data)
        ? res.data.map((agent) => ({
            _id: agent._id,
            Name: agent.name || "New Agent",
            Email: agent.email || "-",
            Agency: agent.agencyName || "-",
            Commission: agent.commissionRate
              ? agent.commissionRate + "%"
              : "0%",
            Wallet: agent.walletBalance ? "₹" + agent.walletBalance : "₹0",
            Status: agent.status || "Active",
          }))
        : [];

      setAgents(formatted);
    } catch (err) {
      console.error(
        "Error fetching agents:",
        err?.response?.data || err?.message || err,
      );
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token || token === "null" || token === "undefined") {
        console.error("No token found. Please login again.");
        return;
      }

      await axios.delete(`${API}/api/agents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      fetchAgents();
    } catch (err) {
      console.error(
        "Delete failed:",
        err?.response?.data || err?.message || err,
      );
    }
  };

  const handleView = (row) => {
    navigate(`/admin/agents/${row._id}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <DataTable
          title="Agents"
          columns={["Name", "Email", "Commission", "Status"]}
          data={agents}
          onDelete={(rowId) => handleDelete(rowId)}
          onView={handleView}
        />
      </div>
    </div>
  );
}
