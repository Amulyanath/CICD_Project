import axios from "axios";

// Local Spring Boot runs on 8082; Docker Compose exposes the backend on host port 8081.
const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8082"}/api/tasks`;

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Toggle task completion (mark as done/undone)
export const toggleTaskCompletion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
