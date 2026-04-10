import { useState } from 'react';
import { IoSearchOutline, IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import { ORDER_STATUS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ORDER_STATUS_FLOW } from '../../utils/constants';
import { formatDateTime } from '../../utils/helpers';
import './Tracking.css';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    // TODO: Replace with real API call to track order once backend endpoint is ready
    setLoading(false);
    setError('Order tracking is not yet connected to live data.');
  };

  return (
    <div className="tracking-page">
      <div className="tracking-hero">
        <div className="container text-center">
          <h1>Track Your Order</h1>
          <p>Enter your order number to see the latest status</p>

          <form className="tracking-form" onSubmit={handleTrack}>
            <div className="tracking-input-wrapper">
              <IoSearchOutline className="tracking-search-icon" />
              <input
                type="text"
                className="tracking-input"
                placeholder="Enter order number (e.g., ORD-A3F8K2P1)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching…' : 'Track'}
              </button>
            </div>
          </form>

          {error && <p className="tracking-error">{error}</p>}
        </div>
      </div>

      {order && (
        <div className="container">
          <div className="tracking-result card">
            <div className="tracking-summary">
              <div>
                <h2>{order.order_number}</h2>
                <p className="text-muted">{order.service} • Qty: {order.quantity} • {order.branch}</p>
              </div>
              <span
                className="badge"
                style={{
                  background: `${ORDER_STATUS_COLORS[order.status]}20`,
                  color: ORDER_STATUS_COLORS[order.status],
                }}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="tracking-progress">
              {ORDER_STATUS_FLOW.map((status, i) => {
                const currentIdx = ORDER_STATUS_FLOW.indexOf(order.status);
                const isCompleted = i <= currentIdx;
                const isCurrent = i === currentIdx;

                return (
                  <div
                    key={status}
                    className={`progress-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <div className="step-dot">
                      {isCompleted ? <IoCheckmarkCircle /> : <IoEllipseOutline />}
                    </div>
                    <span className="step-label">{ORDER_STATUS_LABELS[status]}</span>
                    {i < ORDER_STATUS_FLOW.length - 1 && (
                      <div className={`step-line ${isCompleted && i < currentIdx ? 'completed' : ''}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Timeline */}
            <div className="tracking-timeline">
              <h3>Order Updates</h3>
              {order.updates.map((update, i) => (
                <div className="timeline-item" key={i}>
                  <div
                    className="timeline-dot"
                    style={{ background: ORDER_STATUS_COLORS[update.status] }}
                  />
                  <div className="timeline-content">
                    <strong>{ORDER_STATUS_LABELS[update.status]}</strong>
                    <p>{update.note}</p>
                    <small>{formatDateTime(update.timestamp)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!order && !error && (
        <div className="container text-center mt-xl">
          <p className="text-muted">
            Enter your order number above to track its status once live data is connected.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
