import { useState } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helpers';
import './Feedback.css';

const demoFeedbacks = [
  { id: 1, name: 'John Kamau', service: 'Wash & Iron', rating: 5, comment: 'Excellent service! Clothes came back perfectly pressed.', date: '2026-02-25' },
  { id: 2, name: 'Mary Wanjiku', service: 'Dry Cleaning', rating: 4, comment: 'Good quality, but delivery was a bit late.', date: '2026-02-24' },
  { id: 3, name: 'Peter Omondi', service: 'Wash & Fold', rating: 5, comment: '', date: '2026-02-23' },
  { id: 4, name: 'Grace Akinyi', service: 'Ironing Only', rating: 3, comment: 'Average service. Could improve turnaround time.', date: '2026-02-22' },
];

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
  const [feedbacks, setFeedbacks] = useState(demoFeedbacks);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', service: '', rating: 0, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.rating) {
      toast.error('Please provide your name and rating');
      return;
    }
    setFeedbacks((prev) => [
      { id: prev.length + 1, ...form, date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
    toast.success('Thank you for your feedback!');
    setShowForm(false);
    setForm({ name: '', service: '', rating: 0, comment: '' });
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
                <label className="form-label">Your Name</label>
                <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Service</label>
                <input className="form-input" placeholder="e.g. Wash & Iron" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
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
                <strong>{fb.name}</strong>
                <span className="text-muted"> • {fb.service}</span>
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
