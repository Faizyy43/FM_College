import { useState } from "react";
import { FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UploadCard = ({ title, name, setValue, error, clearErrors }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      // Store actual file in RHF
      setValue(name, file, { shouldValidate: true });

      // Clear error once file selected
      clearErrors(name);
    }
  };

  const removeFile = () => {
    setFileName("");
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <div>
      <label
        className={`w-full h-[120px] rounded-xl border shadow-sm p-4 flex items-center cursor-pointer
        ${error ? "border-red-500" : fileName ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-blue-500 bg-white"}`}
      >
        {!fileName ? (
          <div className="flex items-center gap-4">
            <FaUser className="text-gray-400 text-2xl" />
            <div>
              <p className="font-medium text-sm text-gray-700">{title}</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG • Max 2 MB</p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <FaCheckCircle /> Uploaded
            </div>
            <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-xs text-green-700 rounded-full truncate max-w-full">
              {fileName}
            </div>
          </div>
        )}

        {/* 🚫 NO register HERE */}
        <input type="file" hidden onChange={handleFileChange} />
      </label>

      {fileName && (
        <button
          type="button"
          onClick={removeFile}
          className="mt-2 text-xs text-red-500 flex items-center gap-1"
        >
          <FaTimesCircle /> Remove file
        </button>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{title} is required</p>}
    </div>
  );
};

export default UploadCard;