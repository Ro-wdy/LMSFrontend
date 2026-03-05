const Spinner = ({ size = 40, className = '' }) => (
  <div className={`loading-container ${className}`}>
    <div className="spinner" style={{ width: size, height: size }} />
    <span>Loading…</span>
  </div>
);

export default Spinner;
