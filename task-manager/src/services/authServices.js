import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

// REGISTER (unchanged)
export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// LOGIN (FIXED: use email instead of username)
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,       // <-- FIXED
      password,
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data; // user object or token
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
