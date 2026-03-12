import { useNavigate } from 'react-router-dom';
import {
  IoReceiptOutline,
  IoStorefrontOutline,
  IoCutOutline,
  IoPeopleOutline,
  IoCardOutline,
  IoStarOutline,
  IoTrendingUpOutline,
} from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '../../utils/helpers';
import './Dashboard.css';

const revenueData = [
  { name: 'Mon', revenue: 12400 },
  { name: 'Tue', revenue: 15800 },
  { name: 'Wed', revenue: 11200 },
  { name: 'Thu', revenue: 18600 },
  { name: 'Fri', revenue: 22100 },
  { name: 'Sat', revenue: 28400 },
  { name: 'Sun', revenue: 16300 },
];

const ordersData = [
  { name: 'Mon', orders: 24 },
  { name: 'Tue', orders: 32 },
  { name: 'Wed', orders: 18 },
  { name: 'Thu', orders: 38 },
  { name: 'Fri', orders: 42 },
  { name: 'Sat', orders: 56 },
  { name: 'Sun', orders: 30 },
];

const OwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Business Dashboard</h1>
          <p>Overview of your laundry operations</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/orders')}>
          View All Orders
        </button>
      </div>

      <div className="stats-grid">
        <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-primary)" value="240" label="Total Orders" />
        <StatCard icon={<IoCardOutline />} iconBg="var(--color-secondary)" value="KES 125,400" label="This Month Revenue" />
        <StatCard icon={<IoStarOutline />} iconBg="var(--color-warning)" value="4.7" label="Avg Rating" />
        <StatCard icon={<IoStorefrontOutline />} iconBg="var(--color-teal)" value="3" label="Active Subscriptions" />
      </div>

      <div className="card mb-lg" style={{ borderTop: '4px solid var(--color-primary)' }}>
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div className="quick-actions" style={{ gap: 'var(--space-md)' }}>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard/services')}>
            Manage Services
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard/packages')}>
            Manage Packages
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/dashboard/feedback')}>
            View Feedback
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Revenue</h3>
            <span className="badge badge-success"><IoTrendingUpOutline /> +18%</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#1E90FF" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Orders This Week</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#32CD32" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card mt-lg" style={{ borderTop: '4px solid var(--color-secondary)' }}>
        <div className="card-header">
          <h3 className="card-title">Recent Orders</h3>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/dashboard/orders')}>
            View All
          </button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ORD-A3F8K2P1</strong></td>
                <td>John Kamau</td>
                <td>Wash & Iron</td>
                <td>{formatCurrency(1200)}</td>
                <td><span className="badge badge-warning">Pending</span></td>
              </tr>
              <tr>
                <td><strong>ORD-B7G2M9R4</strong></td>
                <td>Mary Wanjiku</td>
                <td>Dry Cleaning</td>
                <td>{formatCurrency(2500)}</td>
                <td><span className="badge badge-info">Accepted</span></td>
              </tr>
              <tr>
                <td><strong>ORD-C1H5N3T8</strong></td>
                <td>Peter Omondi</td>
                <td>Wash & Fold</td>
                <td>{formatCurrency(800)}</td>
                <td><span className="badge badge-success">Delivered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
