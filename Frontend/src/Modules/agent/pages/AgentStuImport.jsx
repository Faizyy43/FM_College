import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiTrash2, FiEdit, FiUpload } from "react-icons/fi";
import AgentLayout from "../../../layout/AgentLayout";

import {
  getStudents,
  deleteStudent,
  importStudents
} from "../services/agentStuImport.api";

const PAGE_SIZE = 5;

export default function AgentStuImport() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD STUDENTS ================= */

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await getStudents();
      setStudents(res.data || []);

    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  /* ================= IMPORT EXCEL ================= */

  const handleImport = async (file) => {

    if (!file) return;

    try {

      await importStudents(file);

      alert("Students imported successfully");

      loadStudents();

    } catch (err) {
      console.error(err);
      alert("Import failed");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this student?")) return;

    try {

      await deleteStudent(id);

      setStudents((prev) => prev.filter((s) => s._id !== id));

      setSelected((prev) => prev.filter((x) => x !== id));

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= FILTER ================= */

  const filteredStudents = useMemo(() => {

    return students.filter((s) => {

      const matchesSearch =
        s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        s.mobile?.includes(search);

      const matchesCity =
        cityFilter === "" || s.city === cityFilter;

      return matchesSearch && matchesCity;

    });

  }, [students, search, cityFilter]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  /* ================= HANDLERS ================= */

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const uniqueCities = [...new Set(students.map((s) => s.city).filter(Boolean))];

  /* ================= UI ================= */

  return (
    <AgentLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Students
          </h1>
          <p className="text-sm text-gray-500">
            Total: {students.length}
          </p>
        </div>

        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer">
          <FiUpload />
          Import Excel
          <input
            type="file"
            accept=".xlsx"
            hidden
            onChange={(e) => handleImport(e.target.files[0])}
          />
        </label>

      </div>

      {/* FILTER BAR */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          <div className="flex flex-wrap gap-4">

            <div className="relative w-64">

              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search name or mobile..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm"
              />

            </div>

            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm"
            >

              <option value="">All Cities</option>

              {uniqueCities.map((city) => (
                <option key={city}>{city}</option>
              ))}

            </select>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4"></th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Mobile</th>
                <th className="text-left p-4">City</th>
                <th className="text-right p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    Loading...
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-14 text-gray-400">
                    No students found
                  </td>
                </tr>
              ) : (

                paginatedStudents.map((student) => (

                  <tr key={student._id} className="border-t hover:bg-gray-50">

                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(student._id)}
                        onChange={() => toggleSelect(student._id)}
                      />
                    </td>

                    <td className="p-4 font-medium">
                      {student.fullName}
                    </td>

                    <td className="p-4">
                      {student.mobile}
                    </td>

                    <td className="p-4">
                      {student.city}
                    </td>

                    <td className="p-4 text-right flex justify-end gap-4">

                      <button
                        onClick={() =>
                          navigate(`/agent/studentprofile/${student._id}`)
                        }
                        className="text-blue-600"
                      >
                        <FiEdit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-600"
                      >
                        <FiTrash2 size={18} />
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-end mt-6 gap-2">

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>

          ))}

        </div>

      )}

    </AgentLayout>
  );
}