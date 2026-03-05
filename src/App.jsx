import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import LandingLayout from './components/layout/LandingLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Landing Pages
import Home from './pages/landing/Home';
import Pricing from './pages/landing/Pricing';
import About from './pages/landing/About';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import SuperadminDashboard from './pages/dashboard/SuperadminDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import SettingsPage from './pages/dashboard/SettingsPage';

// Feature Pages
import OrdersPage from './pages/orders/OrdersPage';
import BranchesPage from './pages/branches/BranchesPage';
import ServicesPage from './pages/services/ServicesPage';
import StaffPage from './pages/staff/StaffPage';
import TrackOrder from './pages/tracking/TrackOrder';
import FeedbackPage from './pages/feedback/FeedbackPage';
import TransactionsPage from './pages/payments/TransactionsPage';
import PackagesPage from './pages/packages/PackagesPage';
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage';

// Utility Pages
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* ─── Public / Landing Routes ─── */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* ─── Public Track Order ─── */}
            <Route element={<LandingLayout />}>
              <Route path="/track-order" element={<TrackOrder />} />
            </Route>

            {/* ─── Auth Routes ─── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ─── Dashboard Routes (Protected) ─── */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Role-Specific Dashboards */}
              <Route path="/dashboard/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperadminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/owner" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/staff" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />

              {/* Shared Dashboard Pages */}
              <Route path="/dashboard/orders" element={<OrdersPage />} />
              <Route path="/dashboard/branches" element={<ProtectedRoute allowedRoles={['owner', 'admin', 'superadmin']}><BranchesPage /></ProtectedRoute>} />
              <Route path="/dashboard/services" element={<ServicesPage />} />
              <Route path="/dashboard/staff" element={<ProtectedRoute allowedRoles={['owner', 'admin', 'superadmin']}><StaffPage /></ProtectedRoute>} />
              <Route path="/dashboard/feedback" element={<FeedbackPage />} />
              <Route path="/dashboard/transactions" element={<ProtectedRoute allowedRoles={['owner', 'admin', 'superadmin']}><TransactionsPage /></ProtectedRoute>} />
              <Route path="/dashboard/packages" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><PackagesPage /></ProtectedRoute>} />
              <Route path="/dashboard/subscriptions" element={<ProtectedRoute allowedRoles={['admin', 'superadmin']}><SubscriptionsPage /></ProtectedRoute>} />
              <Route path="/dashboard/subscription" element={<SubscriptionsPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>

            {/* ─── Utility Routes ─── */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
