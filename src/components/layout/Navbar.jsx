import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🫧</span>
          <span className="brand-text">LaundryMS</span>
        </Link>

        <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>

        <div className={`navbar-links ${mobileOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link to="/track-order" onClick={() => setMobileOpen(false)}>Track Order</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <div className="navbar-auth">
            <button className="btn btn-outline btn-sm" onClick={() => { navigate('/login'); setMobileOpen(false); }}>
              Log In
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => { navigate('/register'); setMobileOpen(false); }}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
