
import axios from "axios";

export const register = async (user) => {
  const URL = `/api/users`;
  try {
    const res = await axios.post(URL, user);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message || "Registration failed" };
  }
};

export const login = async (user) => {
  const URL = `/api/users/login`;
  try {
    const res = await axios.post(URL, user);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message || "Login failed" };
  }
};

export const adminLogin = async (admin) => {
  const URL = `/api/admin/login`;
  try {
    const res = await axios.post(URL, admin);
    if (res.data) {
      localStorage.setItem("admin", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message || "Admin login failed" };
  }
};

export const authService = { register, login ,adminLogin};
