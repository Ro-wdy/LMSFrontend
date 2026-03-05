import { useState } from 'react';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { PAYMENT_METHOD_LABELS, TRANSACTION_STATUS } from '../../utils/constants';
import StatusBadge from '../../components/common/StatusBadge';

const demoTransactions = [
  { id: 1, request_id: 'ORD-A3F8K2P1', amount: 1200, status: 'completed', receipt_number: 'RCP-001', payment_method: 'mpesa', confirmation_code: 'QA12BC34DE', date: '2026-02-25T10:30:00' },
  { id: 2, request_id: 'ORD-B7G2M9R4', amount: 2500, status: 'completed', receipt_number: 'RCP-002', payment_method: 'card', confirmation_code: 'PSP-56789', date: '2026-02-24T14:15:00' },
  { id: 3, request_id: 'ORD-C1H5N3T8', amount: 800, status: 'pending', receipt_number: '', payment_method: 'mpesa', confirmation_code: '', date: '2026-02-23T09:00:00' },
  { id: 4, request_id: 'ORD-D4E6F7G8', amount: 600, status: 'failed', receipt_number: '', payment_method: 'bank', confirmation_code: '', date: '2026-02-22T16:45:00' },
  { id: 5, request_id: 'ORD-H9I0J1K2', amount: 960, status: 'completed', receipt_number: 'RCP-005', payment_method: 'mpesa', confirmation_code: 'QA55GH78IJ', date: '2026-02-21T11:30:00' },
];

const TransactionsPage = () => {
  const [transactions] = useState(demoTransactions);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.status === filter);

  const totalRevenue = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>Payment records and financial overview</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-secondary)' }}>💰</div>
          <div className="stat-info">
            <h3>{formatCurrency(totalRevenue)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-primary)' }}>📊</div>
          <div className="stat-info">
            <h3>{transactions.length}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-warning)' }}>⏳</div>
          <div className="stat-info">
            <h3>{transactions.filter((t) => t.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transaction History</h3>
          <select className="form-select" style={{ width: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Receipt</th>
                <th>Confirmation</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.request_id}</strong></td>
                  <td>{formatCurrency(t.amount)}</td>
                  <td>{PAYMENT_METHOD_LABELS[t.payment_method] || t.payment_method}</td>
                  <td>{t.receipt_number || '—'}</td>
                  <td><code>{t.confirmation_code || '—'}</code></td>
                  <td>{formatDateTime(t.date)}</td>
                  <td>
                    <span className={`badge ${t.status === 'completed' ? 'badge-success' : t.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
