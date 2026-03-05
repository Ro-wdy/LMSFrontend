import { ROLES } from './constants';

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date-time string
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format currency (KES)
 */
export const formatCurrency = (amount) => {
  if (amount == null) return 'KES 0.00';
  return `KES ${Number(amount).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Generate a random order number (for demo / fallback)
 */
export const generateOrderNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Truncate text to a given length
 */
export const truncateText = (text, maxLen = 50) => {
  if (!text) return '';
  return text.length > maxLen ? `${text.substring(0, maxLen)}…` : text;
};

/**
 * Get initials from a full name
 */
export const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Check if user has a specific role
 */
export const hasRole = (user, role) => {
  if (!user) return false;
  if (user.is_superadmin) return true;
  if (role === ROLES.ADMIN && user.is_admin) return true;
  return user.roles?.includes(role);
};

/**
 * Get the dashboard path for a user based on their role
 */
export const getDashboardPath = (user) => {
  if (!user) return '/login';
  if (user.is_superadmin) return '/dashboard/superadmin';
  if (user.is_admin) return '/dashboard/admin';
  if (user.roles?.includes(ROLES.OWNER)) return '/dashboard/owner';
  if (user.roles?.includes(ROLES.STAFF)) return '/dashboard/staff';
  return '/dashboard/customer';
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validate Kenyan phone number
 */
export const isValidPhone = (phone) => /^(?:\+254|0)[17]\d{8}$/.test(phone);

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce utility
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get a status badge class name based on status
 */
export const getStatusClass = (status) => {
  const map = {
    pending: 'badge-warning',
    accepted: 'badge-info',
    received: 'badge-purple',
    ongoing: 'badge-primary',
    done: 'badge-success',
    out_for_delivery: 'badge-teal',
    delivered: 'badge-success-dark',
    cancelled: 'badge-danger',
    active: 'badge-success',
    inactive: 'badge-secondary',
    completed: 'badge-success',
    failed: 'badge-danger',
    refunded: 'badge-warning',
  };
  return map[status] || 'badge-secondary';
};
