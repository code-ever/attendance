import API from "./api";

export const getStudents = () => {
  return API.get("/students/all");
};

export const getStudentQRCode = () => {
  return API.get("/student/qrcode");
};