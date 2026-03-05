import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { isValidEmail, isValidPhone } from '../../utils/helpers';
import { ROLES } from '../../utils/constants';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    role: ROLES.CUSTOMER,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.fullname.trim()) errs.fullname = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!isValidEmail(form.email)) errs.email = 'Invalid email format';
    if (!form.phone_number) errs.phone_number = 'Phone number is required';
    else if (!isValidPhone(form.phone_number)) errs.phone_number = 'Enter a valid Kenyan number (e.g., 0712345678)';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm_password) errs.confirm_password = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(form);
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        toast.error(Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey]);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card card" style={{ maxWidth: 520 }}>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Get started with LaundryMS today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="John Doe"
              value={form.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <span className="form-error">{errors.fullname}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                className="form-input"
                placeholder="0712345678"
                value={form.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && <span className="form-error">{errors.phone_number}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">I want to…</label>
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value={ROLES.CUSTOMER}>Place orders as a customer</option>
              <option value={ROLES.OWNER}>Register my laundry business</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                className="form-input"
                placeholder="Repeat password"
                value={form.confirm_password}
                onChange={handleChange}
              />
              {errors.confirm_password && <span className="form-error">{errors.confirm_password}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
