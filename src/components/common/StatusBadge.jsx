import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants';
import { getStatusClass } from '../../utils/helpers';

const StatusBadge = ({ status }) => {
  const label = ORDER_STATUS_LABELS[status] || status;
  const badgeClass = getStatusClass(status);

  return (
    <span className={`badge ${badgeClass}`}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: ORDER_STATUS_COLORS[status] || '#999',
          display: 'inline-block',
          marginRight: 6,
        }}
      />
      {label}
    </span>
  );
};

export default StatusBadge;
