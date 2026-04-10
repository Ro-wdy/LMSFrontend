import { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const SubscriptionsPage = () => {
  const [subscriptions] = useState([]);

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
