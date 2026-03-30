import { FiExternalLink, FiGithub } from "react-icons/fi";

const EsProjectsTab = ({ projects }) => {
  if (!projects?.length) {
    return (
      <div className="py-24 text-center">
        <h3 className="text-xl font-semibold text-gray-800">
          No Projects Available
        </h3>
        <p className="text-gray-500 mt-2 text-sm">
          Projects from this establishment will appear here.
        </p>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-10">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden md:flex"
          >

            {/* IMAGE */}
            {project.image && (
              <div className="md:w-1/2 h-60 md:h-auto">
                <img
                  src={`http://localhost:5000${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">

              <div className="space-y-6">

                {/* TITLE */}
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                  {project.title}
                </h2>

                {/* ABOUT PROJECT */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    ABOUT PROJECT :
                  </p>

                  <p className="sm:col-span-2 text-gray-600 sm:text-right text-sm leading-relaxed">
                    {project.description || "Project description not available"}
                  </p>
                </div>

                {/* TECHNOLOGIES USED */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">

                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    TECHNOLOGIES USED :
                  </p>

                  <div className="sm:col-span-2 flex sm:justify-end flex-wrap gap-2">

                    {project.techStack?.length ? (
                      project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">
                        Not specified
                      </span>
                    )}

                  </div>
                </div>

                {/* PROJECT STATUS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">

                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    PROJECT STATUS :
                  </p>

                  <div className="sm:col-span-2 flex sm:justify-end">

                    <span
                      className={`px-4 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                        project.status
                      )}`}
                    >
                      {project.status || "Unknown"}
                    </span>

                  </div>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-8">

                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:scale-105 transition"
                  >
                    <FiExternalLink size={16} />
                    Live Demo
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm shadow-md hover:scale-105 transition"
                  >
                    <FiGithub size={16} />
                    GitHub
                  </a>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
};

export default EsProjectsTab;