import { useState, useEffect } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helpers';
import './Feedback.css';

const StarRating = ({ rating, onRate, interactive = false }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={() => interactive && onRate?.(star)}
      >
        {star <= rating ? <IoStar /> : <IoStarOutline />}
      </span>
    ))}
  </div>
);

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ orderNumber: '', name: '', service: '', rating: 0, comment: '' });

  // Load saved feedbacks from localStorage so they survive reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem('feedbacks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFeedbacks(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load saved feedbacks', err);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.orderNumber || !form.rating) {
      toast.error('Please provide the order number and rating');
      return;
    }
    setFeedbacks((prev) => {
      const next = [
        { id: prev.length + 1, ...form, date: new Date().toISOString().split('T')[0] },
        ...prev,
      ];
      try {
        localStorage.setItem('feedbacks', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save feedbacks', err);
      }
      return next;
    });
    toast.success('Thank you for your feedback!');
    setShowForm(false);
    setForm({ orderNumber: '', name: '', service: '', rating: 0, comment: '' });
  };

  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Feedback</h1>
          <p>Customer reviews and ratings</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Leave Feedback'}
        </button>
      </div>

      {/* Summary */}
      <div className="feedback-summary card mb-lg">
        <div className="feedback-avg">
          <span className="avg-number">{avgRating}</span>
          <StarRating rating={Math.round(avgRating)} />
          <p className="text-muted">{feedbacks.length} reviews</p>
        </div>
      </div>

      {/* New Feedback Form */}
      {showForm && (
        <div className="card mb-lg">
          <h3 className="card-title mb-md">Share Your Experience</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Order Number</label>
                <input
                  className="form-input"
                  placeholder="e.g. ORD-A3F8K2P1"
                  value={form.orderNumber}
                  onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Your Name (optional)</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Service (optional)</label>
                <input
                  className="form-input"
                  placeholder="e.g. Wash & Iron"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Rating</label>
              <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
            </div>
            <div className="form-group">
              <label className="form-label">Comment (optional)</label>
              <textarea className="form-textarea" rows="3" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Tell us about your experience..." />
            </div>
            <button type="submit" className="btn btn-primary">Submit Feedback</button>
          </form>
        </div>
      )}

      {/* Feedback List */}
      <div className="feedback-list">
        {feedbacks.map((fb) => (
          <div className="card feedback-card" key={fb.id}>
            <div className="feedback-header">
              <div>
                <strong>Order {fb.orderNumber}</strong>
                {fb.name && <span className="text-muted"> • {fb.name}</span>}
                {fb.service && <span className="text-muted"> • {fb.service}</span>}
              </div>
              <small className="text-muted">{formatDate(fb.date)}</small>
            </div>
            <StarRating rating={fb.rating} />
            {fb.comment && <p className="feedback-comment">{fb.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
