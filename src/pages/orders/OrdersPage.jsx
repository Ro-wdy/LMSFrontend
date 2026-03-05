import { useState } from 'react';
import { IoAddOutline, IoSearchOutline, IoFunnelOutline } from 'react-icons/io5';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { ORDER_STATUS, ORDER_STATUS_LABELS, SERVICE_TYPE_LABELS } from '../../utils/constants';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { toast } from 'react-toastify';
import './Orders.css';

const demoOrders = [
  { id: 1, order_number: 'ORD-A3F8K2P1', customer_name: 'John Kamau', email: 'john@mail.com', phone_number: '0712345678', location: 'Westlands, Nairobi', service: 'Wash & Iron', quantity: 5, amount: 1200, status: 'pending', is_delivery: true, is_pickup: true, created_at: '2026-02-25T10:30:00' },
  { id: 2, order_number: 'ORD-B7G2M9R4', customer_name: 'Mary Wanjiku', email: 'mary@mail.com', phone_number: '0723456789', location: 'Kilimani, Nairobi', service: 'Dry Cleaning', quantity: 3, amount: 2500, status: 'accepted', is_delivery: false, is_pickup: true, created_at: '2026-02-24T14:15:00' },
  { id: 3, order_number: 'ORD-C1H5N3T8', customer_name: 'Peter Omondi', email: 'peter@mail.com', phone_number: '0734567890', location: 'Langata, Nairobi', service: 'Wash & Fold', quantity: 8, amount: 800, status: 'received', is_delivery: true, is_pickup: false, created_at: '2026-02-23T09:00:00' },
  { id: 4, order_number: 'ORD-D4E6F7G8', customer_name: 'Grace Akinyi', email: 'grace@mail.com', phone_number: '0745678901', location: 'Karen, Nairobi', service: 'Ironing Only', quantity: 12, amount: 600, status: 'ongoing', is_delivery: false, is_pickup: true, created_at: '2026-02-22T16:45:00' },
  { id: 5, order_number: 'ORD-H9I0J1K2', customer_name: 'David Kipchoge', email: 'david@mail.com', phone_number: '0756789012', location: 'CBD, Nairobi', service: 'Wash & Iron', quantity: 4, amount: 960, status: 'done', is_delivery: true, is_pickup: true, created_at: '2026-02-21T11:30:00' },
  { id: 6, order_number: 'ORD-L3M4N5O6', customer_name: 'Lucy Wambui', email: 'lucy@mail.com', phone_number: '0767890123', location: 'Lavington, Nairobi', service: 'Bedding & Linen', quantity: 2, amount: 3000, status: 'delivered', is_delivery: true, is_pickup: false, created_at: '2026-02-20T08:00:00' },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(demoOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_name: '', email: '', phone_number: '', location: '',
    service: 'wash_and_iron', quantity: 1, is_delivery: false, is_pickup: true,
  });

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.order_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order status updated to ${ORDER_STATUS_LABELS[newStatus]}`);
    setSelectedOrder(null);
  };

  const getNextStatus = (currentStatus) => {
    const flow = ['pending', 'accepted', 'received', 'ongoing', 'done', 'out_for_delivery', 'delivered'];
    const idx = flow.indexOf(currentStatus);
    return idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null;
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const newOrd = {
      id: orders.length + 1,
      order_number: orderNumber,
      ...newOrder,
      amount: newOrder.quantity * 240,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setOrders((prev) => [newOrd, ...prev]);
    toast.success(`Order ${orderNumber} created!`);
    setShowNewOrder(false);
    setNewOrder({
      customer_name: '', email: '', phone_number: '', location: '',
      service: 'wash_and_iron', quantity: 1, is_delivery: false, is_pickup: true,
    });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all laundry requests</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>
          <IoAddOutline /> New Order
        </button>
      </div>

      {/* Filters */}
      <div className="orders-filters card">
        <div className="search-box">
          <IoSearchOutline />
          <input
            type="text"
            className="form-input"
            placeholder="Search by name or order number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <IoFunnelOutline />
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {filtered.length === 0 ? (
        <EmptyState title="No orders found" description="Try adjusting your search or filter." />
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.order_number}</strong></td>
                  <td>
                    <div>{order.customer_name}</div>
                    <small className="text-muted">{order.phone_number}</small>
                  </td>
                  <td>{order.service}</td>
                  <td>{order.quantity}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>{formatDateTime(order.created_at)}</td>
                  <td>
                    <div className="flex gap-sm">
                      <button className="btn btn-outline btn-sm" onClick={() => setSelectedOrder(order)}>
                        View
                      </button>
                      {getNextStatus(order.status) && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status))}
                        >
                          {ORDER_STATUS_LABELS[getNextStatus(order.status)]}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.order_number}`}
        footer={
          <>
            {selectedOrder && getNextStatus(selectedOrder.status) && (
              <button
                className="btn btn-primary"
                onClick={() => handleStatusUpdate(selectedOrder.id, getNextStatus(selectedOrder.status))}
              >
                Mark as {ORDER_STATUS_LABELS[getNextStatus(selectedOrder.status)]}
              </button>
            )}
            {selectedOrder?.status !== 'cancelled' && selectedOrder?.status !== 'delivered' && (
              <button
                className="btn btn-danger"
                onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
              >
                Cancel Order
              </button>
            )}
          </>
        }
      >
        {selectedOrder && (
          <div className="order-details">
            <div className="detail-row">
              <span>Customer</span>
              <strong>{selectedOrder.customer_name}</strong>
            </div>
            <div className="detail-row">
              <span>Email</span>
              <strong>{selectedOrder.email}</strong>
            </div>
            <div className="detail-row">
              <span>Phone</span>
              <strong>{selectedOrder.phone_number}</strong>
            </div>
            <div className="detail-row">
              <span>Location</span>
              <strong>{selectedOrder.location}</strong>
            </div>
            <div className="detail-row">
              <span>Service</span>
              <strong>{selectedOrder.service}</strong>
            </div>
            <div className="detail-row">
              <span>Quantity</span>
              <strong>{selectedOrder.quantity}</strong>
            </div>
            <div className="detail-row">
              <span>Amount</span>
              <strong>{formatCurrency(selectedOrder.amount)}</strong>
            </div>
            <div className="detail-row">
              <span>Pickup</span>
              <strong>{selectedOrder.is_pickup ? 'Yes' : 'No'}</strong>
            </div>
            <div className="detail-row">
              <span>Delivery</span>
              <strong>{selectedOrder.is_delivery ? 'Yes' : 'No'}</strong>
            </div>
            <div className="detail-row">
              <span>Status</span>
              <StatusBadge status={selectedOrder.status} />
            </div>
          </div>
        )}
      </Modal>

      {/* New Order Modal */}
      <Modal
        isOpen={showNewOrder}
        onClose={() => setShowNewOrder(false)}
        title="Create New Order"
        footer={
          <button className="btn btn-primary" onClick={handleCreateOrder}>
            Create Order
          </button>
        }
      >
        <form onSubmit={handleCreateOrder}>
          <div className="form-group">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Full name"
              value={newOrder.customer_name}
              onChange={(e) => setNewOrder({ ...newOrder, customer_name: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="email@example.com"
                value={newOrder.email}
                onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="0712345678"
                value={newOrder.phone_number}
                onChange={(e) => setNewOrder({ ...newOrder, phone_number: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              placeholder="Pickup/Delivery location"
              value={newOrder.location}
              onChange={(e) => setNewOrder({ ...newOrder, location: e.target.value })}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Service</label>
              <select
                className="form-select"
                value={newOrder.service}
                onChange={(e) => setNewOrder({ ...newOrder, service: e.target.value })}
              >
                {Object.entries(SERVICE_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                min="1"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-check">
              <input
                type="checkbox"
                checked={newOrder.is_pickup}
                onChange={(e) => setNewOrder({ ...newOrder, is_pickup: e.target.checked })}
              />
              <label>Pickup from customer</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                checked={newOrder.is_delivery}
                onChange={(e) => setNewOrder({ ...newOrder, is_delivery: e.target.checked })}
              />
              <label>Deliver to customer</label>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OrdersPage;
