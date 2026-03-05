import api from './api';

const businessService = {
  // ─── Business ───
  getBusinesses: () => api.get('/businesses/'),
  getBusiness: (id) => api.get(`/businesses/${id}/`),
  createBusiness: (data) => api.post('/businesses/', data),
  updateBusiness: (id, data) => api.put(`/businesses/${id}/`, data),

  // ─── Branches ───
  getBranches: (businessId) => api.get(`/businesses/${businessId}/branches/`),
  getAllBranches: () => api.get('/branches/'),
  getBranch: (id) => api.get(`/branches/${id}/`),
  createBranch: (data) => api.post('/branches/', data),
  updateBranch: (id, data) => api.put(`/branches/${id}/`, data),
  deleteBranch: (id) => api.delete(`/branches/${id}/`),

  // ─── Operational Times ───
  getOperationalTimes: (branchId) => api.get(`/branches/${branchId}/operational-times/`),
  createOperationalTime: (data) => api.post('/operational-times/', data),
  updateOperationalTime: (id, data) => api.put(`/operational-times/${id}/`, data),
  deleteOperationalTime: (id) => api.delete(`/operational-times/${id}/`),

  // ─── Services ───
  getServices: (branchId) => api.get(`/branches/${branchId}/services/`),
  getAllServices: () => api.get('/services/'),
  getService: (id) => api.get(`/services/${id}/`),
  createService: (data) => api.post('/services/', data),
  updateService: (id, data) => api.put(`/services/${id}/`, data),
  deleteService: (id) => api.delete(`/services/${id}/`),

  // ─── Staff ───
  getStaff: (branchId) => api.get(`/branches/${branchId}/staff/`),
  getAllStaff: () => api.get('/staff/'),
  addStaff: (data) => api.post('/staff/', data),
  updateStaff: (id, data) => api.put(`/staff/${id}/`, data),
  removeStaff: (id) => api.delete(`/staff/${id}/`),
};

export default businessService;
