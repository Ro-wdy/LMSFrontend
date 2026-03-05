import { useState } from 'react';
import { IoAddOutline, IoCheckmarkCircle } from 'react-icons/io5';
import Modal from '../../components/common/Modal';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'react-toastify';

const demoPackages = [
  { id: 1, package_name: 'Starter', amount: 0, discount: 0, features: ['1 Branch', 'Up to 50 orders/month', 'Basic dashboard', 'Email support'] },
  { id: 2, package_name: 'Professional', amount: 2500, discount: 10, features: ['Up to 5 Branches', 'Unlimited orders', 'Advanced analytics', 'Payment integration', 'SMS notifications', 'Priority support'] },
  { id: 3, package_name: 'Enterprise', amount: 7500, discount: 15, features: ['Unlimited Branches', 'Unlimited orders', 'Full analytics', 'All integrations', 'Unlimited SMS', 'Dedicated manager', 'Custom branding'] },
];

const PackagesPage = () => {
  const [packages, setPackages] = useState(demoPackages);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ package_name: '', amount: '', discount: '', features: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const newPkg = {
      id: packages.length + 1,
      ...form,
      amount: Number(form.amount),
      discount: Number(form.discount),
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
    };
    setPackages((prev) => [...prev, newPkg]);
    toast.success('Package created!');
    setShowForm(false);
    setForm({ package_name: '', amount: '', discount: '', features: '' });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Packages</h1>
          <p>Manage subscription packages</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <IoAddOutline /> Add Package
        </button>
      </div>

      <div className="stats-grid">
        {packages.map((pkg) => (
          <div className="card" key={pkg.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h3>{pkg.package_name}</h3>
            <div>
              <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>
                {pkg.amount === 0 ? 'Free' : formatCurrency(pkg.amount)}
              </span>
              {pkg.amount > 0 && <small className="text-muted"> /month</small>}
            </div>
            {pkg.discount > 0 && (
              <span className="badge badge-success">{pkg.discount}% annual discount</span>
            )}
            <ul style={{ flex: 1 }}>
              {pkg.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0', fontSize: 'var(--font-size-sm)' }}>
                  <IoCheckmarkCircle style={{ color: 'var(--color-secondary)', flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="New Package"
        footer={<button className="btn btn-primary" onClick={handleSave}>Create</button>}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Package Name</label>
            <input className="form-input" value={form.package_name} onChange={(e) => setForm({ ...form, package_name: e.target.value })} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount (KES/month)</label>
              <input type="number" className="form-input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input type="number" className="form-input" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Features (comma-separated)</label>
            <textarea className="form-textarea" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2, Feature 3" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PackagesPage;
