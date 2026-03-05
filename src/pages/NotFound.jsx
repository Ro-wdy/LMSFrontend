import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="auth-page">
    <div className="card text-center" style={{ maxWidth: 420, padding: 'var(--space-xl)' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted mt-sm mb-lg">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
