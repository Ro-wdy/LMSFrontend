import { useNavigate } from 'react-router-dom';
import { IoReceiptOutline, IoCheckmarkDoneOutline, IoTimeOutline, IoAlertCircleOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { ORDER_STATUS } from '../../utils/constants';
import './Dashboard.css';

const pendingOrders = [
  { id: 1, orderNumber: 'ORD-X1Y2Z3A4', customer: 'Alice Njeri', service: 'Wash & Iron', qty: 5, status: ORDER_STATUS.PENDING },
  { id: 2, orderNumber: 'ORD-B5C6D7E8', customer: 'Tom Muturi', service: 'Dry Cleaning', qty: 3, status: ORDER_STATUS.PENDING },
  { id: 3, orderNumber: 'ORD-F9G0H1I2', customer: 'Grace Akinyi', service: 'Wash & Fold', qty: 8, status: ORDER_STATUS.ACCEPTED },
  { id: 4, orderNumber: 'ORD-J3K4L5M6', customer: 'David Kipchoge', service: 'Ironing Only', qty: 12, status: ORDER_STATUS.RECEIVED },
  { id: 5, orderNumber: 'ORD-N7O8P9Q0', customer: 'Lucy Wambui', service: 'Bedding & Linen', qty: 2, status: ORDER_STATUS.ONGOING },
];

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Staff Dashboard</h1>
          <p>Manage and process customer orders</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/orders')}>
          View All Orders
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon={<IoAlertCircleOutline />} iconBg="var(--color-warning)" value="8" label="Pending Orders" />
        <StatCard icon={<IoTimeOutline />} iconBg="var(--color-primary)" value="12" label="In Progress" />
        <StatCard icon={<IoCheckmarkDoneOutline />} iconBg="var(--color-secondary)" value="45" label="Completed Today" />
        <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-teal)" value="65" label="Total Today" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Active Orders</h3>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/orders')}>
            Manage Orders
          </button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.orderNumber}</strong></td>
                  <td>{order.customer}</td>
                  <td>{order.service}</td>
                  <td>{order.qty}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate('/dashboard/orders')}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
