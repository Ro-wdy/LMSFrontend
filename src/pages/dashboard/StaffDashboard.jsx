import { useNavigate } from 'react-router-dom';
import { IoReceiptOutline, IoCheckmarkDoneOutline, IoTimeOutline, IoAlertCircleOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { ORDER_STATUS } from '../../utils/constants';
import './Dashboard.css';

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
        <StatCard icon={<IoAlertCircleOutline />} iconBg="var(--color-warning)" value="0" label="Pending Orders" />
        <StatCard icon={<IoTimeOutline />} iconBg="var(--color-primary)" value="0" label="In Progress" />
        <StatCard icon={<IoCheckmarkDoneOutline />} iconBg="var(--color-secondary)" value="0" label="Completed Today" />
        <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-teal)" value="0" label="Total Today" />
      </div>

      <div className="card mb-lg" style={{ borderTop: '4px solid var(--color-primary)' }}>
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions" style={{ gap: 'var(--space-md)' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard/orders')}>
            Process Next Order
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/dashboard/branches')}>
            Manage Branch
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/dashboard/branches')}>
            Operational Hours
          </button>
        </div>
      </div>

      <div className="card" style={{ borderTop: '4px solid var(--color-secondary)' }}>
        <div className="card-header">
          <h3 className="card-title">Active Orders (Requests)</h3>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/orders')}>
            Manage All Orders
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
              <tr>
                <td colSpan={6}>
                  <span className="text-muted">No active orders to display.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
