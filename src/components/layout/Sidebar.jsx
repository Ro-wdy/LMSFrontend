import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  IoGridOutline,
  IoReceiptOutline,
  IoStorefrontOutline,
  IoPeopleOutline,
  IoCutOutline,
  IoStarOutline,
  IoCardOutline,
  IoSettingsOutline,
  IoChevronBack,
  IoChevronForward,
  IoLayersOutline,
  IoTimeOutline,
  IoStatsChartOutline,
} from 'react-icons/io5';
import { ROLES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const menuItems = {
  [ROLES.SUPERADMIN]: [
    { label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard/superadmin' },
    { label: 'Businesses', icon: <IoStorefrontOutline />, path: '/dashboard/businesses' },
    { label: 'Users', icon: <IoPeopleOutline />, path: '/dashboard/users' },
    { label: 'Packages', icon: <IoLayersOutline />, path: '/dashboard/packages' },
    { label: 'Subscriptions', icon: <IoCardOutline />, path: '/dashboard/subscriptions' },
    { label: 'Analytics', icon: <IoStatsChartOutline />, path: '/dashboard/analytics' },
    { label: 'Settings', icon: <IoSettingsOutline />, path: '/dashboard/settings' },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard/admin' },
    { label: 'Businesses', icon: <IoStorefrontOutline />, path: '/dashboard/businesses' },
    { label: 'Users', icon: <IoPeopleOutline />, path: '/dashboard/users' },
    { label: 'Orders', icon: <IoReceiptOutline />, path: '/dashboard/orders' },
    { label: 'Settings', icon: <IoSettingsOutline />, path: '/dashboard/settings' },
  ],
  [ROLES.OWNER]: [
    { label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard/owner' },
    { label: 'Branches', icon: <IoStorefrontOutline />, path: '/dashboard/branches' },
    { label: 'Services', icon: <IoCutOutline />, path: '/dashboard/services' },
    { label: 'Staff', icon: <IoPeopleOutline />, path: '/dashboard/staff' },
    { label: 'Orders', icon: <IoReceiptOutline />, path: '/dashboard/orders' },
    { label: 'Hours', icon: <IoTimeOutline />, path: '/dashboard/operational-times' },
    { label: 'Transactions', icon: <IoCardOutline />, path: '/dashboard/transactions' },
    { label: 'Feedback', icon: <IoStarOutline />, path: '/dashboard/feedback' },
    { label: 'Subscription', icon: <IoLayersOutline />, path: '/dashboard/subscription' },
    { label: 'Settings', icon: <IoSettingsOutline />, path: '/dashboard/settings' },
  ],
  [ROLES.STAFF]: [
    { label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard/staff' },
    { label: 'Orders', icon: <IoReceiptOutline />, path: '/dashboard/orders' },
    { label: 'Services', icon: <IoCutOutline />, path: '/dashboard/services' },
    { label: 'Settings', icon: <IoSettingsOutline />, path: '/dashboard/settings' },
  ],
  [ROLES.CUSTOMER]: [
    { label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard/customer' },
    { label: 'My Orders', icon: <IoReceiptOutline />, path: '/dashboard/orders' },
    { label: 'Track Order', icon: <IoTimeOutline />, path: '/track-order' },
    { label: 'Feedback', icon: <IoStarOutline />, path: '/dashboard/feedback' },
    { label: 'Settings', icon: <IoSettingsOutline />, path: '/dashboard/settings' },
  ],
};

const getUserRole = (user) => {
  if (user?.is_superadmin) return ROLES.SUPERADMIN;
  if (user?.is_admin) return ROLES.ADMIN;
  if (user?.roles?.includes(ROLES.OWNER)) return ROLES.OWNER;
  if (user?.roles?.includes(ROLES.STAFF)) return ROLES.STAFF;
  return ROLES.CUSTOMER;
};

const Sidebar = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const role = getUserRole(user);
  const items = menuItems[role] || menuItems[ROLES.CUSTOMER];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-brand">🫧 LaundryMS</span>}
        <button className="btn btn-ghost btn-icon sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <IoChevronForward /> : <IoChevronBack />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
