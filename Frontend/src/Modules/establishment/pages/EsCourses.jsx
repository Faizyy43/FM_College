import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/esCourses.api";
import EsCard from "../../establishment/EsCard";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";

export default function EsCourses() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    duration: "",
    fees: "",
    mode: [],
  });

  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res.data || []))
      .catch(() => alert("Failed to load courses"));
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setForm({ title: "", duration: "", fees: "", mode: [] });
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title || "",
      duration: course.duration || "",
      fees: course.fees || "",
      mode: course.mode || [],
    });
    setOpen(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!form.title || !form.duration || !form.fees || form.mode.length === 0)
      return alert("All fields required");

    const payload = {
      title: form.title,
      duration: form.duration,
      fees: Number(form.fees),
      mode: form.mode,
    };

    try {
      if (editingId) {
        const res = await updateCourse(editingId, payload);
        setCourses((prev) =>
          prev.map((c) => (c._id === editingId ? res.data : c))
        );
      } else {
        const res = await createCourse(payload);
        setCourses((prev) => [res.data, ...prev]);
      }

      setOpen(false);
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = (id) => setDeleteId(id);

  const deleteCourseConfirmed = async () => {
    try {
      await deleteCourse(deleteId);
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
    <EstablishmentLayout>
      <EsCard
        title="Courses"
        subtitle="Manage your offered programs"
        footer={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            <FiPlus /> Add Course
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div
              key={c._id}
              className="rounded-2xl border border-gray-200 p-5 bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {c.duration} • {(c.mode || []).join("/")}
              </p>

              <p className="text-blue-600 font-bold mt-2">₹{c.fees}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => openEdit(c)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() => confirmDelete(c._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </EsCard>

      {/* ADD / EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
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
                placeholder="Course Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <input
                className={input}
                placeholder="Duration (e.g. 6 Months)"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />

              <input
                className={input}
                placeholder="Fees (₹)"
                value={form.fees}
                onChange={(e) => setForm({ ...form, fees: e.target.value })}
              />

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Mode</p>
                <div className="flex gap-6">
                  {["ONLINE", "OFFLINE"].map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.mode.includes(m)}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            mode: e.target.checked
                              ? [...p.mode, m]
                              : p.mode.filter((x) => x !== m),
                          }))
                        }
                        className="accent-blue-600"
                      />
                      <span className="text-sm text-gray-700">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
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
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/30">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
              <FiTrash2 size={28} />
            </div>

            <h2 className="text-lg font-semibold text-center">Delete Course?</h2>

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
                onClick={deleteCourseConfirmed}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </EstablishmentLayout>
  );
}
