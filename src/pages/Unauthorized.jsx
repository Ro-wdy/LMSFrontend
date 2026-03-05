import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className="auth-page">
    <div className="card text-center" style={{ maxWidth: 420, padding: 'var(--space-xl)' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>🔒</h1>
      <h2>Access Denied</h2>
      <p className="text-muted mt-sm mb-lg">You don't have permission to view this page.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  </div>
);

export default Unauthorized;
