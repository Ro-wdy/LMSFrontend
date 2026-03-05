import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🫧 LaundryMS</h3>
            <p>
              Multitenant laundry management system. Manage orders, payments,
              and customers — all in one place.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/track-order">Track Order</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div className="footer-col">
            <h4>Get Started</h4>
            <Link to="/register">Create Account</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} LaundryMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
