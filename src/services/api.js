// API configuration for future Spring Boot backend integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = {
  baseURL: API_BASE_URL,

  async request(method, endpoint, data = null, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('assessly_token');

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
      ...options,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }

    // In demo mode, we use mock data instead of real API calls
    // This will be replaced with actual fetch calls when the backend is ready
    console.info(`[API Mock] ${method} ${endpoint}`, data || '');
    return { success: true, data: null };
  },

  get(endpoint, options) {
    return this.request('GET', endpoint, null, options);
  },
  post(endpoint, data, options) {
    return this.request('POST', endpoint, data, options);
  },
  put(endpoint, data, options) {
    return this.request('PUT', endpoint, data, options);
  },
  delete(endpoint, options) {
    return this.request('DELETE', endpoint, null, options);
  },
};

export default apiClient;
