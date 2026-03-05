import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import Modal from '../../components/common/Modal';
import { SERVICE_TYPE_LABELS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'react-toastify';
import './Services.css';

const demoServices = [
  { id: 1, name: 'wash_and_fold', branch: 'Westlands Branch', amount: 200, units: 'per kg', timeline: '24 hours', extras: 'Folding included' },
  { id: 2, name: 'wash_and_iron', branch: 'Westlands Branch', amount: 300, units: 'per kg', timeline: '24 hours', extras: 'Ironing, Folding' },
  { id: 3, name: 'dry_cleaning', branch: 'Kilimani Branch', amount: 500, units: 'per piece', timeline: '48 hours', extras: 'Stain treatment' },
  { id: 4, name: 'ironing_only', branch: 'Kilimani Branch', amount: 100, units: 'per piece', timeline: '12 hours', extras: '' },
  { id: 5, name: 'bedding_and_linen', branch: 'Westlands Branch', amount: 800, units: 'per piece', timeline: '48 hours', extras: 'Deep clean, Sanitize' },
];

const ServicesPage = () => {
  const [services, setServices] = useState(demoServices);
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState({ name: 'wash_and_fold', branch: '', amount: '', units: 'per kg', timeline: '', extras: '' });

  const openNew = () => {
    setEditService(null);
    setForm({ name: 'wash_and_fold', branch: '', amount: '', units: 'per kg', timeline: '', extras: '' });
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditService(service);
    setForm({ ...service });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editService) {
      setServices((prev) => prev.map((s) => (s.id === editService.id ? { ...s, ...form } : s)));
      toast.success('Service updated!');
    } else {
      setServices((prev) => [...prev, { id: prev.length + 1, ...form, amount: Number(form.amount) }]);
      toast.success('Service created!');
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service deleted');
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Services</h1>
          <p>Manage your laundry service offerings</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><IoAddOutline /> Add Service</button>
      </div>

      <div className="services-grid">
        {services.map((svc) => (
          <div className="card service-card" key={svc.id}>
            <div className="service-badge">
              <span className="badge badge-primary">{SERVICE_TYPE_LABELS[svc.name] || svc.name}</span>
            </div>
            <h3>{formatCurrency(svc.amount)} <small className="text-muted">/ {svc.units}</small></h3>
            <p className="text-muted">{svc.branch}</p>
            <div className="service-meta">
              <span>⏱ {svc.timeline}</span>
              {svc.extras && <span>✨ {svc.extras}</span>}
            </div>
            <div className="branch-actions">
              <button className="btn btn-outline btn-sm" onClick={() => openEdit(svc)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(svc.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editService ? 'Edit Service' : 'New Service'}
        footer={<button className="btn btn-primary" onClick={handleSave}>Save</button>}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Service Type</label>
            <select className="form-select" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}>
              {Object.entries(SERVICE_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount (KES)</label>
              <input type="number" className="form-input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Units</label>
              <select className="form-select" value={form.units} onChange={(e) => setForm({ ...form, units: e.target.value })}>
                <option value="per kg">Per Kg</option>
                <option value="per piece">Per Piece</option>
                <option value="per load">Per Load</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Timeline</label>
            <input className="form-input" placeholder="e.g. 24 hours" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Extras (comma-separated)</label>
            <input className="form-input" placeholder="Ironing, Folding, etc." value={form.extras} onChange={(e) => setForm({ ...form, extras: e.target.value })} />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesPage;
