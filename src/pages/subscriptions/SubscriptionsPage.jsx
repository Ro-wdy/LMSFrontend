import { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const demoSubscriptions = [
  { id: 1, user: 'Clean Express Laundry', package: 'Professional', amount: 2500, expiry_date: '2026-06-25', payment_method: 'mpesa', receipt_number: 'SUB-001', confirmation_code: 'MPESA123' },
  { id: 2, user: 'Fresh & Clean Ltd', package: 'Starter', amount: 0, expiry_date: '2026-12-31', payment_method: '-', receipt_number: '-', confirmation_code: '-' },
  { id: 3, user: 'Sparkle Wash Services', package: 'Enterprise', amount: 7500, expiry_date: '2026-08-15', payment_method: 'card', receipt_number: 'SUB-003', confirmation_code: 'PSP-99887' },
];

const SubscriptionsPage = () => {
  const [subscriptions] = useState(demoSubscriptions);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Subscriptions</h1>
          <p>Active subscription plans</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Package</th>
              <th>Amount</th>
              <th>Expiry</th>
              <th>Payment</th>
              <th>Receipt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => {
              const isExpired = new Date(sub.expiry_date) < new Date();
              return (
                <tr key={sub.id}>
                  <td><strong>{sub.user}</strong></td>
                  <td><span className="badge badge-primary">{sub.package}</span></td>
                  <td>{sub.amount > 0 ? formatCurrency(sub.amount) : 'Free'}</td>
                  <td>{formatDate(sub.expiry_date)}</td>
                  <td>{sub.payment_method}</td>
                  <td>{sub.receipt_number}</td>
                  <td>
                    <span className={`badge ${isExpired ? 'badge-danger' : 'badge-success'}`}>
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
