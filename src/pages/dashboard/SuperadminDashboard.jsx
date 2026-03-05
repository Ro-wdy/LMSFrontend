import { IoStorefrontOutline, IoPeopleOutline, IoLayersOutline, IoReceiptOutline, IoTrendingUpOutline } from 'react-icons/io5';
import StatCard from '../../components/common/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const barData = [
  { name: 'Jan', businesses: 12 },
  { name: 'Feb', businesses: 18 },
  { name: 'Mar', businesses: 24 },
  { name: 'Apr', businesses: 32 },
  { name: 'May', businesses: 28 },
  { name: 'Jun', businesses: 40 },
];

const pieData = [
  { name: 'Starter', value: 45 },
  { name: 'Professional', value: 35 },
  { name: 'Enterprise', value: 20 },
];

const COLORS = ['#1E90FF', '#32CD32', '#FFA500'];

const SuperadminDashboard = () => (
  <div className="dashboard-page">
    <div className="page-header">
      <div>
        <h1>Super Admin Dashboard</h1>
        <p>Platform overview and management</p>
      </div>
    </div>

    <div className="stats-grid">
      <StatCard icon={<IoStorefrontOutline />} iconBg="var(--color-primary)" value="156" label="Total Businesses" />
      <StatCard icon={<IoPeopleOutline />} iconBg="var(--color-secondary)" value="1,240" label="Total Users" />
      <StatCard icon={<IoLayersOutline />} iconBg="var(--color-teal)" value="89" label="Active Subscriptions" />
      <StatCard icon={<IoReceiptOutline />} iconBg="var(--color-warning)" value="4,520" label="Total Orders" />
    </div>

    <div className="dashboard-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Business Registrations</h3>
          <span className="badge badge-success"><IoTrendingUpOutline /> +12%</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
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
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          {pieData.map((item, i) => (
            <span key={i} className="legend-item">
              <span className="legend-dot" style={{ background: COLORS[i] }} />
              {item.name}
            </span>
          ))}
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
              <td>Clean Express Laundry</td>
              <td>Jane Mwangi</td>
              <td>3</td>
              <td><span className="badge badge-primary">Professional</span></td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td>Fresh & Clean Ltd</td>
              <td>Peter Omondi</td>
              <td>1</td>
              <td><span className="badge badge-info">Starter</span></td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td>Sparkle Wash Services</td>
              <td>Mary Wanjiku</td>
              <td>5</td>
              <td><span className="badge badge-warning">Enterprise</span></td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SuperadminDashboard;
