import { useState, useEffect } from "react";
import EstablishmentLayout from "../../../layout/EstablishmentLayout";

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/esProjects.api";


  const API = import.meta.env.VITE_API_URL;


const initialForm = {
  title: "",
  description: "",
  techStack: "",
  projectLink: "",
  githubLink: "",
  status: "",
};

export default function EsProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  /* ================= FETCH ================= */

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (image) formData.append("image", image);

      let res;

      if (editProject) {
        res = await updateProject(editProject._id, formData);

        setProjects((prev) =>
          prev.map((p) =>
            p._id === editProject._id ? { ...p, ...res.data } : p
          )
        );
      } else {
        res = await createProject(formData);

        setProjects((prev) => [res.data, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */

  const openEdit = (proj) => {
    setEditProject(proj);

    setForm({
      title: proj.title || "",
      description: proj.description || "",
      techStack: proj.techStack || "",
      projectLink: proj.projectLink || "",
      githubLink: proj.githubLink || "",
      status: proj.status || "",
    });

    setShowModal(true);
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setShowModal(false);
    setEditProject(null);
    setImage(null);
    setForm(initialForm);
  };

  return (
    <EstablishmentLayout>
      <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-blue-100 p-6">

        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl p-8">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              🚀 Manage Projects
            </h2>

            <button
              onClick={() => {
                setEditProject(null);
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              + Add Project
            </button>
          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((proj) => (
              <div key={proj._id} className="bg-white rounded-2xl shadow-md p-5">

                {proj.image && (
                  <img
                    src={`${API}${proj.image}`}
                    className="h-40 w-full object-cover rounded-xl mb-4"
                    alt=""
                  />
                )}

                <h3 className="font-semibold text-lg">{proj.title}</h3>

                <p className="text-sm text-gray-600 mt-2">
                  {proj.description}
                </p>

                <div className="flex justify-between mt-4 text-sm">

                  <button
                    onClick={() => openEdit(proj)}
                    className="text-indigo-600 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="text-red-500 font-medium"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* MODAL */}

      {showModal && (
        <ProjectModal
          form={form}
          image={image}
          editProject={editProject}
          handleChange={handleChange}
          setImage={setImage}
          resetForm={resetForm}
          handleSubmit={handleSubmit}
        />
      )}

    </EstablishmentLayout>
  );
}



const ProjectModal = ({
  form,
  image,
  editProject,
  handleChange,
  setImage,
  resetForm,
  handleSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

        <h3 className="text-xl font-bold mb-6">
          {editProject ? "Update Project" : "Add Project"}
        </h3>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300"
          />

          <input
            name="techStack"
            placeholder="Tech Stack"
            value={form.techStack}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="md:col-span-2 p-3 rounded-xl border border-gray-300"
          />

          <input
            name="projectLink"
            placeholder="Project Link"
            value={form.projectLink}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300"
          />

          <input
            name="githubLink"
            placeholder="Github Link"
            value={form.githubLink}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300"
          >
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-3 border border-gray-300 rounded-xl"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={resetForm}
            className="px-5 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-blue-600 text-white"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};