import API from "./api";

export const getAttendanceHistory = () => {
  return API.get("/attendance/history");
};

export const scanAttendance = (data) => {
  return API.post("/attendance/scan", data);
};

export const getAllAttendance = () => {
  return API.get("/attendance/all");
};