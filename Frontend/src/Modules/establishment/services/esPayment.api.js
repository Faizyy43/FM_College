// import api from "../../../api/axios";


// // Student ledger
// export const fetchStudentLedger = (establishmentId) =>
//   api.get(`/establishment/payments/students/${establishmentId}`);

// // Add payment
// export const addPayment = (studentId, data) =>
//   api.post(`/establishment/payments/${studentId}`, data);

// // Update total/paid fees
// export const updateFees = (studentId, data) =>
//   api.put(`/establishment/payments/update-fees/${studentId}`, data);

// // Finance status
// export const updateFinanceStatus = (studentId) =>
//   api.put(`/establishment/payments/update-status/${studentId}`);

// // Payment history
// export const fetchPaymentHistory = (studentId) =>
//   api.get(`/establishment/payments/history/${studentId}`);

// // Update student payment manually
// export const updateStudentPayment = (id, data) =>
//   api.put(`/establishment/payments/student/${id}`, data);


/////////////////////////////////////////////////////////////




import api from "../../../api/axios.js";

/* ================= PAYMENTS ================= */

// Add payment
export const addPayment = (studentId, data) =>
  api.post("/payments", { studentId, ...data });

// Payment history
export const fetchPaymentHistory = (studentId) =>
  api.get(`/payments/${studentId}`);

// Update student payment (only totalFees usually)
export const updateStudentPayment = (id, data) =>
  api.put(`/payments/student/${id}`, data);

// Get receipt PDF (blob)
export const fetchReceipt = (id, download = false) =>
  api.get(`/payments/receipt/${id}${download ? "?download=true" : ""}`, {
    responseType: "blob",
  });

