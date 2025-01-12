import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// NFT related endpoints
export const nftAPI = {
  getAllNFTs: (params) => api.get('/nfts', { params }),
  getNFTById: (id) => api.get(`/nfts/${id}`),
  createNFT: (data) => api.post('/nfts', data),
  updateNFT: (id, data) => api.patch(`/nfts/${id}`, data),
  deleteNFT: (id) => api.delete(`/nfts/${id}`),
  getFeaturedNFTs: () => api.get('/nfts/featured'),
  getTopRatedNFTs: () => api.get('/nfts/top-rated'),
  getMostViewedNFTs: () => api.get('/nfts/most-viewed'),
  getRecentlyListedNFTs: () => api.get('/nfts/recently-listed'),
};

// User related endpoints
export const userAPI = {
  login: (credentials) => api.post('/users/login', credentials),
  signup: (userData) => api.post('/users/signup', userData),
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.patch('/users/updateMe', data),
  forgotPassword: (email) => api.post('/users/forgotPassword', { email }),
  resetPassword: (token, password) => api.patch(`/users/resetPassword/${token}`, { password }),
};

// Subscription related endpoints
export const subscriptionAPI = {
  getAllPlans: () => api.get('/subscriptions'),
  getMonthlyPlans: () => api.get('/subscriptions/monthly'),
  getPlanStats: () => api.get('/subscriptions/stats'),
  getPlanById: (id) => api.get(`/subscriptions/${id}`),
  subscribeToPlan: (planId) => api.post(`/subscriptions/${planId}/subscribe`),
  cancelSubscription: () => api.post('/subscriptions/cancel'),
};

export default api;
