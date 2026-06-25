import API from "./api";
import { setToken, removeToken } from "../utils/auth";

/**
 * REGISTER USER
 */
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

/**
 * LOGIN USER
 */
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);

  const result = res.data;

  // assuming backend returns:
  // { token, user }

  if (result.token) {
    setToken(result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
  }

  return result;
};

/**
 * GET PROFILE
 */
export const getProfile = async () => {
  const res = await API.get("/student/profile");
  return res.data;
};

/**
 * LOGOUT (OPTIONAL BUT IMPORTANT)
 */
export const logoutUser = () => {
  removeToken();
  localStorage.removeItem("user");
};