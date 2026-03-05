// ─── Roles ───
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  OWNER: 'owner',       // laundry owner / client
  STAFF: 'staff',       // laundry operator
  CUSTOMER: 'customer',
};

// ─── Order / Request Statuses ───
export const ORDER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  RECEIVED: 'received',
  ONGOING: 'ongoing',
  DONE: 'done',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.ACCEPTED]: 'Accepted',
  [ORDER_STATUS.RECEIVED]: 'Received',
  [ORDER_STATUS.ONGOING]: 'Ongoing',
  [ORDER_STATUS.DONE]: 'Done',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#FFA500',
  [ORDER_STATUS.ACCEPTED]: '#1E90FF',
  [ORDER_STATUS.RECEIVED]: '#9370DB',
  [ORDER_STATUS.ONGOING]: '#00BFFF',
  [ORDER_STATUS.DONE]: '#32CD32',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '#008080',
  [ORDER_STATUS.DELIVERED]: '#228B22',
  [ORDER_STATUS.CANCELLED]: '#DC143C',
};

// Order of statuses for the tracking progress bar
export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.RECEIVED,
  ORDER_STATUS.ONGOING,
  ORDER_STATUS.DONE,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

// ─── Payment Methods ───
export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  CARD: 'card',
  BANK: 'bank',
  CASH: 'cash',
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.MPESA]: 'M-Pesa',
  [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
  [PAYMENT_METHODS.BANK]: 'Bank Transfer',
  [PAYMENT_METHODS.CASH]: 'Cash',
};

// ─── Transaction Statuses ───
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// ─── Service Types ───
export const SERVICE_TYPES = {
  WASH_AND_FOLD: 'wash_and_fold',
  WASH_AND_IRON: 'wash_and_iron',
  DRY_CLEANING: 'dry_cleaning',
  IRONING_ONLY: 'ironing_only',
  STAIN_REMOVAL: 'stain_removal',
  BEDDING_AND_LINEN: 'bedding_and_linen',
  CURTAINS: 'curtains',
  SHOE_CLEANING: 'shoe_cleaning',
};

export const SERVICE_TYPE_LABELS = {
  [SERVICE_TYPES.WASH_AND_FOLD]: 'Wash & Fold',
  [SERVICE_TYPES.WASH_AND_IRON]: 'Wash & Iron',
  [SERVICE_TYPES.DRY_CLEANING]: 'Dry Cleaning',
  [SERVICE_TYPES.IRONING_ONLY]: 'Ironing Only',
  [SERVICE_TYPES.STAIN_REMOVAL]: 'Stain Removal',
  [SERVICE_TYPES.BEDDING_AND_LINEN]: 'Bedding & Linen',
  [SERVICE_TYPES.CURTAINS]: 'Curtains',
  [SERVICE_TYPES.SHOE_CLEANING]: 'Shoe Cleaning',
};

// ─── Operational Time Types ───
export const OPERATION_TIME_TYPES = {
  WEEKDAY: 'weekday',
  WEEKEND: 'weekend',
  HOLIDAY: 'holiday',
  CUSTOM: 'custom',
};

// ─── Staff Statuses ───
export const STAFF_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
};

// ─── API Base URL ───
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const SMS_API_URL = 'https://api.arierisworld.com/notify';
