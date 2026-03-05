import { useNavigate } from 'react-router-dom';
import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoNotificationsOutline,
  IoCardOutline,
  IoAnalyticsOutline,
  IoPeopleOutline,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import './Home.css';

const features = [
  {
    icon: <IoRocketOutline />,
    title: 'Streamlined Orders',
    desc: 'Manage customer orders from placement to delivery with real-time status tracking.',
  },
  {
    icon: <IoNotificationsOutline />,
    title: 'SMS Notifications',
    desc: 'Customers receive instant updates on their order status via SMS notifications.',
  },
  {
    icon: <IoCardOutline />,
    title: 'Integrated Payments',
    desc: 'Accept payments seamlessly via M-Pesa, card, and bank through Pesapal integration.',
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    title: 'Multi-Branch Support',
    desc: 'Manage multiple branches, each with their own staff, services, and operating hours.',
  },
  {
    icon: <IoAnalyticsOutline />,
    title: 'Insightful Analytics',
    desc: 'Functional dashboards with essential metrics tailored to each user role.',
  },
  {
    icon: <IoPeopleOutline />,
    title: 'Role-Based Access',
    desc: 'Dedicated portals for owners, staff, customers, admins, and super admins.',
  },
];

const steps = [
  { num: '01', title: 'Register Your Business', desc: 'Sign up as a laundry owner and set up your business profile.' },
  { num: '02', title: 'Configure Branches', desc: 'Add branches, set operating hours, assign staff, and list your services.' },
  { num: '03', title: 'Accept Orders', desc: 'Customers place orders online. Your staff gets notified in real-time.' },
  { num: '04', title: 'Track & Deliver', desc: 'Update order statuses, manage pickups and deliveries, collect payments.' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <span className="hero-badge">🫧 Multitenant Laundry Platform</span>
            <h1>All-in-One Software for Modern <span className="text-gradient">Laundry Businesses</span></h1>
            <p>
              Track orders, accept payments, and automate customer updates — all from one powerful dashboard built for growing laundry businesses.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
                Start Free Trial
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/login')}>
                Log In
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/l1.jpeg" alt="Laundry business management" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header text-center">
            <h2>Everything You Need to Run Your Laundry</h2>
            <p>Powerful features built for efficiency, simplicity, and growth.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2>How It Works</h2>
            <p>Get started in minutes — it's that simple.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={i}>
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2>Ready to Transform Your Laundry Business?</h2>
          <p>Join hundreds of laundry operators already using LaundryMS.</p>
          <button className="btn btn-primary btn-lg mt-lg" onClick={() => navigate('/register')}>
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
