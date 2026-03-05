import { useNavigate } from 'react-router-dom';
import { IoMenu, IoNotificationsOutline, IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { getInitials } from '../../utils/helpers';
import './DashboardHeader.css';

const DashboardHeader = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="dash-header">
      <button className="btn btn-ghost dash-menu-btn" onClick={onToggleSidebar}>
        <IoMenu size={22} />
      </button>

      <div className="dash-header-right">
        <button className="btn btn-ghost btn-icon notification-btn" title="Notifications">
          <IoNotificationsOutline size={20} />
          {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
        </button>

        <div className="dash-user">
          <div className="user-avatar">{getInitials(user?.fullname)}</div>
          <div className="user-info">
            <span className="user-name">{user?.fullname || 'User'}</span>
            <span className="user-role">{user?.is_superadmin ? 'Super Admin' : user?.roles?.[0] || 'Customer'}</span>
          </div>
        </div>

        <button className="btn btn-ghost btn-icon" onClick={handleLogout} title="Logout">
          <IoLogOutOutline size={20} />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
