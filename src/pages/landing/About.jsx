import './About.css';

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="container text-center">
        <h1>About LaundryMS</h1>
        <p>Building the future of laundry management — one load at a time.</p>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              LaundryMS is a multitenant laundry management system designed to help laundries
              manage customer orders and collect feedback efficiently. We enable integration
              with payment gateways, allowing laundries to receive payments from different
              customers and users seamlessly.
            </p>
            <p>
              Our platform provides real-time notifications about orders, with constant updates
              on order status from placement to completion. Whether you run a single shop or
              a chain of laundry outlets, LaundryMS scales with your business.
            </p>

            <h2 className="mt-xl">What We Offer</h2>
            <ul className="about-list">
              <li><strong>Order Management</strong> — Full lifecycle tracking from pending to delivered</li>
              <li><strong>Multi-Branch Support</strong> — Each branch with its own staff, services, and hours</li>
              <li><strong>Payment Integration</strong> — Pesapal, M-Pesa, and more</li>
              <li><strong>SMS Notifications</strong> — Keep customers informed at every step</li>
              <li><strong>Role-Based Dashboards</strong> — Tailored views for owners, staff, and customers</li>
              <li><strong>Feedback System</strong> — Collect and act on customer reviews</li>
              <li><strong>Subscription Packages</strong> — Flexible plans for businesses of all sizes</li>
            </ul>
          </div>

          <div className="about-visual">
            <img src="/l3.jpeg" alt="About LaundryMS" className="about-image" />
            <div className="about-stats">
              <div>
                <strong>5+</strong>
                <span>Active Laundries</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>Orders Processed</span>
              </div>
              <div>
                <strong>99.9%</strong>
                <span>Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
