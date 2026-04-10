import { useNavigate } from 'react-router-dom';
import { IoReceiptOutline, IoTimeOutline, IoCheckmarkDoneOutline, IoStarOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import { ORDER_STATUS } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/helpers';
import './Dashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="page-header" style={{
        background: 'var(--gradient-subtle-blue)',
        padding: 'var(--space-xl) var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        color: '#fff',
        boxShadow: 'var(--shadow-md)',
        marginBottom: 'var(--space-2xl)'
      }}>
        <div>
          <h1 style={{ color: '#fff' }}>My Dashboard</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Track your laundry orders and activity</p>
        </div>
        <button className="btn" style={{ background: '#fff', color: 'var(--color-primary)', fontWeight: 'bold' }} onClick={() => navigate('/dashboard/orders')}>
          Place New Order
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-primary)" value="0" label="Total Orders" />
        <StatCard icon={<IoTimeOutline />} iconBg="var(--color-warning)" value="0" label="In Progress" />
        <StatCard icon={<IoCheckmarkDoneOutline />} iconBg="var(--color-secondary)" value="0" label="Completed" />
        <StatCard icon={<IoStarOutline />} iconBg="var(--color-teal)" value="0" label="Feedbacks Given" />
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h3 className="card-title">My Recent Orders</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/orders')}>
              View All
            </button>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Service</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <span className="text-muted">You have no orders yet.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mt-lg" style={{ borderTop: '4px solid var(--color-primary)' }}>
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions" style={{ gap: 'var(--space-md)' }}>
          <button className="btn btn-primary" onClick={() => navigate('/track-order')}>
            Track an Order
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard/orders')}>
            New Order
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/dashboard/feedback')}>
            Leave Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
