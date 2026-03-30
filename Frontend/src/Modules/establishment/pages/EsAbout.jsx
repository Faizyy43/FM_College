import { useEffect, useState } from "react";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

import { fetchAbout, saveAbout } from "../services/esAbout.api";

export default function EsAbout() {
  const [about, setAbout] = useState({
    title: "",
    subtitle: "",
    description: "",
    mission: "",
    vision: "",
    highlights: [],
    heroImage: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const res = await fetchAbout();
      const data = res.data;

      if (data) {
        setAbout({
          ...data,
          highlights: data.highlights || [],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const handleHighlightChange = (value, index) => {
    const updated = [...about.highlights];
    updated[index] = value;
    setAbout({ ...about, highlights: updated });
  };

  const addHighlight = () => {
    setAbout({
      ...about,
      highlights: [...about.highlights, ""],
    });
  };

  const removeHighlight = (index) => {
    const updated = about.highlights.filter((_, i) => i !== index);
    setAbout({ ...about, highlights: updated });
  };

  /* ================= SAVE ================= */

  const save = async () => {
    try {
      setLoading(true);

      await saveAbout(about);

      alert("Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EstablishmentLayout>
      <div className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6">

        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-purple-50" />

        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-12 space-y-10">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              About Company
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your public About page content
            </p>
          </div>

          {/* GENERAL INFO */}

          <div className="space-y-6">
            <Input label="Title" name="title" value={about.title} onChange={handleChange} />
            <Input label="Subtitle" name="subtitle" value={about.subtitle} onChange={handleChange} />
            <Textarea label="Description" name="description" value={about.description} onChange={handleChange} />
          </div>

          {/* MISSION / VISION */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea label="Mission" name="mission" value={about.mission} onChange={handleChange} />
            <Textarea label="Vision" name="vision" value={about.vision} onChange={handleChange} />
          </div>

          {/* HIGHLIGHTS */}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Highlights</h2>

            {about.highlights.map((h, i) => (
              <div key={i} className="flex gap-3">
                <input
                  value={h}
                  onChange={(e) =>
                    handleHighlightChange(e.target.value, i)
                  }
                  className="flex-1 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={() => removeHighlight(i)}
                  className="p-3 bg-red-50 text-red-600 rounded-xl"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button
              onClick={addHighlight}
              className="flex items-center gap-2 text-indigo-600"
            >
              <FiPlus /> Add Highlight
            </button>
          </div>

          {/* SAVE */}

          <div className="flex justify-end">
            <button
              onClick={save}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white"
            >
              <FiSave />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </EstablishmentLayout>
  );
}

/* INPUT */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

/* TEXTAREA */

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        rows="4"
        {...props}
        className="w-full p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}