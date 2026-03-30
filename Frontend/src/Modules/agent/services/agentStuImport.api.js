import api from "../../../api/axios";

/* ================= GET ALL STUDENTS ================= */

export const getStudents = () =>
  api.get("/agent/students");

/* ================= IMPORT STUDENTS (EXCEL) ================= */

export const importStudents = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/agent/students/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* ================= DELETE SINGLE STUDENT ================= */

export const deleteStudent = (studentId) =>
  api.delete(`/agent/students/${studentId}`);

/* ================= BULK DELETE (Optional - Better Way) ================= */

export const bulkDeleteStudents = (ids) =>
  api.post("/agent/students/bulk-delete", { ids });