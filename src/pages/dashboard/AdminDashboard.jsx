import { IoStorefrontOutline, IoPeopleOutline, IoReceiptOutline, IoAlertCircleOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import './Dashboard.css';

const AdminDashboard = () => (
  <div className="dashboard-page">
    <div className="page-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Platform support and monitoring</p>
      </div>
    </div>

    <div className="stats-grid">
      <StatCard icon={<IoStorefrontOutline />} iconBg="var(--color-primary)" value="156" label="Businesses" />
      <StatCard icon={<IoPeopleOutline />} iconBg="var(--color-secondary)" value="1,240" label="Users" />
      <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-warning)" value="87" label="Pending Orders" />
      <StatCard icon={<IoAlertCircleOutline />} iconBg="var(--color-danger)" value="5" label="Support Tickets" />
    </div>

    <div className="dashboard-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="activity-list">
          {[
            { text: 'New business registered: Clean Express', time: '5 min ago', color: 'var(--color-primary-bg)' },
            { text: 'Payment confirmed for order #ORD-A3F8K2P1', time: '12 min ago', color: '#E8F5E9' },
            { text: 'Support ticket #142 resolved', time: '1 hour ago', color: '#FFF3E0' },
            { text: 'User Jane Doe updated profile', time: '2 hours ago', color: '#F3E5F5' },
          ].map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-icon" style={{ background: a.color }}>📋</div>
              <div className="activity-info">
                <p>{a.text}</p>
                <small>{a.time}</small>
              </div>
            </div>
          ))}
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
