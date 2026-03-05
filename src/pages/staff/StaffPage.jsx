import { useState } from 'react';
import { IoAddOutline, IoPersonOutline } from 'react-icons/io5';
import Modal from '../../components/common/Modal';
import { ROLES, STAFF_STATUS } from '../../utils/constants';
import { toast } from 'react-toastify';

const demoStaff = [
  { id: 1, name: 'Alice Njeri', email: 'alice@cleanexpress.co.ke', phone: '0712345678', branch: 'Westlands Branch', role: 'operator', status: 'active' },
  { id: 2, name: 'Tom Muturi', email: 'tom@cleanexpress.co.ke', phone: '0723456789', branch: 'Kilimani Branch', role: 'operator', status: 'active' },
  { id: 3, name: 'Grace Akinyi', email: 'grace@cleanexpress.co.ke', phone: '0734567890', branch: 'Westlands Branch', role: 'manager', status: 'active' },
  { id: 4, name: 'James Ochieng', email: 'james@cleanexpress.co.ke', phone: '0745678901', branch: 'CBD Branch', role: 'operator', status: 'inactive' },
];

const StaffPage = () => {
  const [staff, setStaff] = useState(demoStaff);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', branch: '', role: 'operator' });

  const handleSave = (e) => {
    e.preventDefault();
    setStaff((prev) => [...prev, { id: prev.length + 1, ...form, status: 'active' }]);
    toast.success('Staff member added!');
    setShowForm(false);
    setForm({ name: '', email: '', phone: '', branch: '', role: 'operator' });
  };

  const toggleStatus = (id) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    );
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage your laundry operators and staff</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <IoAddOutline /> Add Staff
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Branch</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.name}</strong></td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.branch}</td>
                <td><span className="badge badge-primary">{s.role}</span></td>
                <td>
                  <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => toggleStatus(s.id)}>
                    {s.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Staff Member"
        footer={<button className="btn btn-primary" onClick={handleSave}>Add Staff</button>}
      >
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Branch</label>
              <select className="form-select" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                <option value="">Select branch</option>
                <option value="Westlands Branch">Westlands Branch</option>
                <option value="Kilimani Branch">Kilimani Branch</option>
                <option value="CBD Branch">CBD Branch</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="operator">Operator</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffPage;
