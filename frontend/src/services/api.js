import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post('/auth/authenticate', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

export const orderApi = {
  placeOrder: (order) => api.post('/orders', order),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status?status=${status}`),
};

export default api;
