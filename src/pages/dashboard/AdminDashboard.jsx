import { IoStorefrontOutline, IoPeopleOutline, IoReceiptOutline, IoAlertCircleOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import './Dashboard.css';

const AdminDashboard = () => (
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
        <h1 style={{ color: '#fff' }}>Admin Dashboard</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Platform support and monitoring</p>
      </div>
    </div>

    <div className="stats-grid">
      <StatCard icon={<IoStorefrontOutline />} iconBg="var(--color-primary)" value="0" label="Businesses" />
      <StatCard icon={<IoPeopleOutline />} iconBg="var(--color-secondary)" value="0" label="Users" />
      <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-warning)" value="0" label="Pending Orders" />
      <StatCard icon={<IoAlertCircleOutline />} iconBg="var(--color-danger)" value="0" label="Support Tickets" />
    </div>

    <div className="dashboard-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="activity-list">
          <p className="text-muted" style={{ padding: 'var(--space-md)' }}>
            No recent activity yet. Platform events will appear here.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <button className="btn btn-outline btn-sm">View Businesses</button>
          <button className="btn btn-outline btn-sm">Manage Users</button>
          <button className="btn btn-outline btn-sm">View All Orders</button>
          <button className="btn btn-outline btn-sm">Platform Settings</button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
