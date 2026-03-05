const EmptyState = ({ icon, title, description, action }) => (
  <div className="empty-state">
    {icon && <div>{icon}</div>}
    <h3>{title || 'No data found'}</h3>
    {description && <p>{description}</p>}
    {action && <div className="mt-md">{action}</div>}
  </div>
);

export default EmptyState;
