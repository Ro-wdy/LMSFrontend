import { useState } from 'react';
import { IoAddOutline, IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import { toast } from 'react-toastify';
import './Branches.css';

const demoBranches = [
  { id: 1, name: 'Westlands Branch', location: 'Westlands, Nairobi', phone_number: '0712345678', email: 'westlands@cleanexpress.co.ke', operations: true },
  { id: 2, name: 'Kilimani Branch', location: 'Kilimani, Nairobi', phone_number: '0723456789', email: 'kilimani@cleanexpress.co.ke', operations: true },
  { id: 3, name: 'CBD Branch', location: 'Kimathi Street, Nairobi', phone_number: '0734567890', email: '', operations: false },
];

const BranchesPage = () => {
  const [branches, setBranches] = useState(demoBranches);
  const [showForm, setShowForm] = useState(false);
  const [editBranch, setEditBranch] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', phone_number: '', email: '', operations: true });

  const openNew = () => {
    setEditBranch(null);
    setForm({ name: '', location: '', phone_number: '', email: '', operations: true });
    setShowForm(true);
  };

  const openEdit = (branch) => {
    setEditBranch(branch);
    setForm({ ...branch });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editBranch) {
      setBranches((prev) => prev.map((b) => (b.id === editBranch.id ? { ...b, ...form } : b)));
      toast.success('Branch updated!');
    } else {
      setBranches((prev) => [...prev, { id: prev.length + 1, ...form }]);
      toast.success('Branch created!');
    }
    setShowForm(false);
  };

  const toggleOperations = (id) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, operations: !b.operations } : b))
    );
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Branches</h1>
          <p>Manage your laundry branch locations</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><IoAddOutline /> Add Branch</button>
      </div>

      {branches.length === 0 ? (
        <EmptyState title="No branches yet" description="Add your first branch to get started." action={<button className="btn btn-primary" onClick={openNew}>Add Branch</button>} />
      ) : (
        <div className="branches-grid">
          {branches.map((branch) => (
            <div className="card branch-card" key={branch.id}>
              <div className="branch-header">
                <h3>{branch.name}</h3>
                <span className={`badge ${branch.operations ? 'badge-success' : 'badge-secondary'}`}>
                  {branch.operations ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="branch-info">
                <p><IoLocationOutline /> {branch.location}</p>
                <p><IoCallOutline /> {branch.phone_number}</p>
                {branch.email && <p><IoMailOutline /> {branch.email}</p>}
              </div>
              <div className="branch-actions">
                <button className="btn btn-outline btn-sm" onClick={() => openEdit(branch)}>Edit</button>
                <button className="btn btn-ghost btn-sm" onClick={() => toggleOperations(branch.id)}>
                  {branch.operations ? 'Close' : 'Open'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editBranch ? 'Edit Branch' : 'New Branch'}
        footer={<button className="btn btn-primary" onClick={handleSave}>Save</button>}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Branch Name</label>
            <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email (optional)</label>
              <input className="form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="form-check">
            <input type="checkbox" checked={form.operations} onChange={(e) => setForm({ ...form, operations: e.target.checked })} />
            <label>Branch is operational</label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BranchesPage;
