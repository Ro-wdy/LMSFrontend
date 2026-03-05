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

  // Demo data — in real app, this calls orderService.trackOrder(orderNumber)
  const demoOrderData = {
    'ORD-A3F8K2P1': {
      order_number: 'ORD-A3F8K2P1',
      customer_name: 'John Kamau',
      service: 'Wash & Iron',
      quantity: 5,
      status: 'ongoing',
      branch: 'Westlands Branch',
      created_at: '2026-02-25T10:30:00',
      updates: [
        { status: 'pending', timestamp: '2026-02-25T10:30:00', note: 'Order placed successfully' },
        { status: 'accepted', timestamp: '2026-02-25T10:45:00', note: 'Order accepted by operator' },
        { status: 'received', timestamp: '2026-02-25T14:00:00', note: 'Items received at branch' },
        { status: 'ongoing', timestamp: '2026-02-25T15:00:00', note: 'Cleaning in progress' },
      ],
    },
    'ORD-B7G2M9R4': {
      order_number: 'ORD-B7G2M9R4',
      customer_name: 'Mary Wanjiku',
      service: 'Dry Cleaning',
      quantity: 3,
      status: 'delivered',
      branch: 'Kilimani Branch',
      created_at: '2026-02-24T14:15:00',
      updates: [
        { status: 'pending', timestamp: '2026-02-24T14:15:00', note: 'Order placed' },
        { status: 'accepted', timestamp: '2026-02-24T14:30:00', note: 'Order accepted' },
        { status: 'received', timestamp: '2026-02-24T16:00:00', note: 'Items received' },
        { status: 'ongoing', timestamp: '2026-02-24T17:00:00', note: 'Processing' },
        { status: 'done', timestamp: '2026-02-25T10:00:00', note: 'Items ready for pickup' },
        { status: 'delivered', timestamp: '2026-02-25T14:00:00', note: 'Items delivered. Thank you!' },
      ],
    },
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    // Simulate API call
    setTimeout(() => {
      const found = demoOrderData[orderNumber.toUpperCase()];
      if (found) {
        setOrder(found);
      } else {
        setError('Order not found. Please check your order number and try again.');
      }
      setLoading(false);
    }, 800);
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
            Try tracking: <strong>ORD-A3F8K2P1</strong> or <strong>ORD-B7G2M9R4</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
