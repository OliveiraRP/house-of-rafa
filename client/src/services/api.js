import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const checkAuth = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return { success: false };

  try {
    const response = await axios.get(`${API_URL}/auth/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, user: response.data };
  } catch (error) {
    return { success: false };
  }
};

export const loginUser = async (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const protectedRequest = async (url, options = {}) => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios({
      url,
      method: options.method || "GET",
      data: options.body,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || "Request failed"
    );
  }
};
