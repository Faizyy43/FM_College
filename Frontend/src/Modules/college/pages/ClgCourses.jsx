import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

import {
  fetchCollegeCourses,
  createCollegeCourse,
  updateCollegeCourse,
  deleteCollegeCourse,
} from "../services/clgCourses.api";

import CollegeLayout from "../../../layout/CollegeLayout";

export default function ClgCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    totalSeats: "",
    semesters: "",
    fees: "",
  });

  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    fetchCollegeCourses()
      .then((res) => setCourses(res.data || []))
      .catch(() => alert("Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setForm({
      name: "",
      totalSeats: "",
      semesters: "",
      fees: "",
    });
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (course) => {
    setEditingId(course._id);
    setForm({
      name: course.name || "",
      totalSeats: course.totalSeats || "",
      semesters: course.semesters || "",
      fees: course.fees || "",
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (
      !form.name ||
      !form.totalSeats ||
      !form.semesters ||
      !form.fees
    )
      return alert("All fields are required");

    if (Number(form.semesters) <= 0)
      return alert("Semesters must be at least 1");

    if (Number(form.totalSeats) <= 0)
      return alert("Seats must be greater than 0");

    const payload = {
      name: form.name,
      totalSeats: Number(form.totalSeats),
      semesters: Number(form.semesters),
      fees: Number(form.fees),
    };

    try {
      if (editingId) {
        const res = await updateCollegeCourse(editingId, payload);
        setCourses((prev) =>
          prev.map((c) => (c._id === editingId ? res.data : c))
        );
      } else {
        const res = await createCollegeCourse(payload);
        setCourses((prev) => [res.data, ...prev]);
      }

      setOpen(false);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  /* ================= DELETE ================= */
  const deleteConfirmed = async () => {
    try {
      await deleteCollegeCourse(deleteId);
      setCourses((prev) => prev.filter((c) => c._id !== deleteId));
      setDeleteId(null);
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */
  const input =
    "w-full h-[52px] rounded-xl border border-gray-300 bg-white px-4 " +
    "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";

  return (
    <CollegeLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Courses</h2>
            <p className="text-sm text-gray-500">
              Manage programs, pricing, and seat capacity
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <FiPlus /> Add Course
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-sm text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-sm text-gray-500">No courses added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => {
              const filled = c.totalSeats - (c.availableSeats || 0);
              const percent =
                Math.round((filled / c.totalSeats) * 100) || 0;

              return (
                <div
                  key={c._id}
                  className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm"
                >
                  <h3 className="font-semibold text-lg">{c.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {c.semesters} Semesters
                  </p>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹{c.fees?.toLocaleString()}
                  </p>

                  {/* Seat Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Seats</span>
                      <span>
                        {filled}/{c.totalSeats}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className="bg-blue-600 h-2 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => openEdit(c)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => setDeleteId(c._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">
                {editingId ? "Edit Course" : "Add Course"}
              </h2>
              <button onClick={() => setOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="space-y-4">
              <input
                className={input}
                placeholder="Course Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className={input}
                placeholder="Total Seats"
                type="number"
                value={form.totalSeats}
                onChange={(e) =>
                  setForm({ ...form, totalSeats: e.target.value })
                }
              />

              <input
                className={input}
                placeholder="Semesters"
                type="number"
                value={form.semesters}
                onChange={(e) =>
                  setForm({ ...form, semesters: e.target.value })
                }
              />

              <input
                className={input}
                placeholder="Fees (₹)"
                type="number"
                value={form.fees}
                onChange={(e) =>
                  setForm({ ...form, fees: e.target.value })
                }
              />
            </div>

            <button
              onClick={save}
              className="w-full mt-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Course
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-lg font-semibold text-center">
              Delete Course?
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={deleteConfirmed}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </CollegeLayout>
  );
}