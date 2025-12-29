import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getUserProfile = (id) => API.get(`/users/profile/${id}`);

export const getActors = (params = {}) => API.get("/users/actors", { params });
export const getDirectors = (params = {}) => API.get("/users/directors", { params });
export const getSuccessStories = () => API.get("/success-stories");
export const createSuccessStory = (story) => API.post("/success-stories", story);
export const getNotifications = (userId) => API.get(`/notifications/${userId}`);
export const markNotificationRead = (id) => API.put(`/notifications/${id}/read`);
export const applyForAudition = (application) => API.post("/applications", application);
export const getApplications = (actorId) => API.get(`/applications/actor/${actorId}`);
export const updateApplicationStatus = (id, status) => API.put(`/applications/${id}/status`, { status });
export const followUser = (id, followerId) => API.post(`/users/${id}/follow`, { followerId });
export const unfollowUser = (id, followerId) => API.post(`/users/${id}/unfollow`, { followerId });
export const uploadResume = (userId, file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return API.post(`/upload/resume/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const getAuditions = (params = {}) => API.get("/auditions", { params });
export const getAudition = (id) => API.get(`/auditions/${id}`);
export const createAudition = (auditionData) => API.post("/auditions", auditionData);
export const updateAudition = (id, auditionData) => API.put(`/auditions/${id}`, auditionData);
export const deleteAudition = (id) => API.delete(`/auditions/${id}`);
export const getApplicationsByAudition = (auditionId) => API.get(`/applications/audition/${auditionId}`);