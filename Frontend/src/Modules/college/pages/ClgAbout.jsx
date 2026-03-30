import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  fetchCollegeAbout,
  createAboutSection,
  deleteAboutSection,
} from "../services/clgAbout.api";
import CollegeLayout from "../../../layout/CollegeLayout"

export default function ClgAbout() {

  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState([]);
  const [sections, setSections] = useState([]);

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  /* ================= LOAD ABOUT ================= */

  const loadAbout = async () => {

    try {

      const res = await fetchCollegeAbout();

      const data = res.data;

      setInfo(data.filter((d) => d.type === "INFO"));
      setSections(data.filter((d) => d.type === "CARD"));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadAbout();
  }, []);

  /* ================= SAVE INFO ================= */

  const saveInfo = async (e) => {

    e.preventDefault();

    try {

      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("type", "INFO");

      await createAboutSection(fd);

      setShowInfoForm(false);

      setForm({
        title: "",
        description: "",
        image: null,
      });

      loadAbout();

    } catch (err) {
      console.error(err);
    }

  };

  /* ================= SAVE CARD ================= */

  const saveCard = async (e) => {

    e.preventDefault();

    try {

      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("type", "CARD");

      if (form.image) {
        fd.append("image", form.image);
      }

      await createAboutSection(fd);

      setShowCardForm(false);

      setForm({
        title: "",
        description: "",
        image: null,
      });

      loadAbout();

    } catch (err) {
      console.error(err);
    }

  };

  /* ================= DELETE ================= */

  const deleteSection = async () => {

    try {

      await deleteAboutSection(deleteId);

      setDeleteId(null);

      loadAbout();

    } catch (err) {
      console.error(err);
    }

  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading college about page...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <CollegeLayout>

    <div className="relative py-12 px-6">

      <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-purple-50" />

      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-10 space-y-12">

        {/* HEADER */}

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            College About Page
          </h1>

          <p className="text-gray-500 mt-2">
            Manage information shown on your public college page
          </p>

        </div>

        {/* ABOUT INFO */}

        <section className="space-y-6">

          <div className="flex justify-between">

            <h2 className="text-xl font-semibold">
              About Information
            </h2>

            <button
              onClick={() => setShowInfoForm(true)}
              className="text-indigo-600 text-sm"
            >
              + Add Info
            </button>

          </div>

          {info.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              No information added yet.
            </div>
          )}

          {info.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >

              <h3 className="font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {item.description}
              </p>

              <button
                onClick={() => setDeleteId(item._id)}
                className="text-red-500 text-xs mt-3"
              >
                Delete
              </button>

            </div>

          ))}

        </section>

        {/* SECTIONS */}

        <section className="space-y-6">

          <div className="flex justify-between">

            <h2 className="text-xl font-semibold">
              Departments & Facilities
            </h2>

            <button
              onClick={() => setShowCardForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Add Section
            </button>

          </div>

          {sections.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
              No sections added yet.
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">

            {sections.map((sec) => (

              <div
                key={sec._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >

                {sec.image && (
                  <img
                    src={`http://localhost:5000/${sec.image.path}`}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-4">

                  <h3 className="font-semibold">
                    {sec.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {sec.description}
                  </p>

                  <button
                    onClick={() => setDeleteId(sec._id)}
                    className="text-red-500 text-xs mt-3"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

      {/* INFO MODAL */}

      {showInfoForm && createPortal(

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-full max-w-lg">

            <h2 className="text-lg font-semibold mb-4">
              Add About Information
            </h2>

            <form onSubmit={saveInfo} className="space-y-4">

              <input
                required
                placeholder="Title"
                className="w-full p-3 rounded-xl bg-gray-50"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                rows="4"
                required
                placeholder="Description"
                className="w-full p-3 rounded-xl bg-gray-50"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowInfoForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>,
        document.body
      )}

      {/* CARD MODAL */}

      {showCardForm && createPortal(

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-full max-w-lg">

            <h2 className="text-lg font-semibold mb-4">
              Add Department / Facility
            </h2>

            <form onSubmit={saveCard} className="space-y-4">

              <input
                required
                placeholder="Title"
                className="w-full p-3 rounded-xl bg-gray-50"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                rows="4"
                required
                placeholder="Description"
                className="w-full p-3 rounded-xl bg-gray-50"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setShowCardForm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>,
        document.body
      )}

      {/* DELETE MODAL */}

      {deleteId && createPortal(

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h3 className="font-semibold text-lg">
              Delete item?
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={deleteSection}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        </div>,
        document.body
      )}

    </div>
    </CollegeLayout>
  );
}