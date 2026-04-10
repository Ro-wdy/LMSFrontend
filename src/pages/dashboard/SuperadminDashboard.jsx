import { IoStorefrontOutline, IoPeopleOutline, IoLayersOutline, IoReceiptOutline, IoTrendingUpOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const SuperadminDashboard = () => (
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
        <h1 style={{ color: '#fff' }}>Super Admin Dashboard</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Platform overview and management</p>
      </div>
    </div>

    <div className="stats-grid">
      <StatCard icon={<IoStorefrontOutline />} iconBg="var(--color-primary)" value="0" label="Total Businesses" />
      <StatCard icon={<IoPeopleOutline />} iconBg="var(--color-secondary)" value="0" label="Total Users" />
      <StatCard icon={<IoLayersOutline />} iconBg="var(--color-teal)" value="0" label="Active Subscriptions" />
      <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-warning)" value="0" label="Total Orders" />
    </div>

    <div className="dashboard-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Business Registrations</h3>
          <span className="badge badge-success"><IoTrendingUpOutline /> 0%</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="businesses" fill="#1E90FF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Subscription Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={[]} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          <span className="text-muted" style={{ padding: 'var(--space-md)' }}>
            No subscription data yet.
          </span>
        </div>
      </div>
    </div>

    <div className="card mt-lg">
      <div className="card-header">
        <h3 className="card-title">Recent Businesses</h3>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Owner</th>
              <th>Branches</th>
              <th>Package</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <span className="text-muted">No businesses to display yet.</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SuperadminDashboard;
