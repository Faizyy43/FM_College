import api from "../../../api/axios";


// export const fetchStudents = () => api.get("/establishment/students");
export const fetchStudents = () => {
  console.log("Calling:", "/establishment/students");
  return api.get("/establishment/students");
};

export const updateStudentStatus = (id, status) =>
  api.put(`/students/${id}/status`, { status });