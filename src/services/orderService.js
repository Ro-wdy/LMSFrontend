import api from './api';

const orderService = {
  // ─── Requests / Orders ───
  getOrders: (params) => api.get('/requests/', { params }),
  getOrder: (id) => api.get(`/requests/${id}/`),
  createOrder: (data) => api.post('/requests/', data),
  updateOrder: (id, data) => api.put(`/requests/${id}/`, data),
  updateOrderStatus: (id, status) => api.patch(`/requests/${id}/status/`, { status }),
  trackOrder: (orderNumber) => api.get(`/requests/track/${orderNumber}/`),
  deleteOrder: (id) => api.delete(`/requests/${id}/`),

  // ─── Transactions ───
  getTransactions: (params) => api.get('/transactions/', { params }),
  getTransaction: (id) => api.get(`/transactions/${id}/`),
  createTransaction: (data) => api.post('/transactions/', data),
  initiatePayment: (data) => api.post('/payments/initiate/', data),

  // ─── Feedback ───
  getFeedbacks: (params) => api.get('/feedbacks/', { params }),
  createFeedback: (data) => api.post('/feedbacks/', data),
  deleteFeedback: (id) => api.delete(`/feedbacks/${id}/`),

  // ─── Packages ───
  getPackages: () => api.get('/packages/'),
  getPackage: (id) => api.get(`/packages/${id}/`),
  createPackage: (data) => api.post('/packages/', data),
  updatePackage: (id, data) => api.put(`/packages/${id}/`, data),
  deletePackage: (id) => api.delete(`/packages/${id}/`),

  // ─── Subscriptions ───
  getSubscriptions: (params) => api.get('/subscriptions/', { params }),
  createSubscription: (data) => api.post('/subscriptions/', data),
  cancelSubscription: (id) => api.post(`/subscriptions/${id}/cancel/`),
};

export default orderService;
