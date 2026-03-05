const StatCard = ({ icon, iconBg, value, label }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: iconBg || 'var(--gradient-primary)' }}>
      {icon}
    </div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);

export default StatCard;
