import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DashboardIcon, 
  RequestsIcon, 
  AnnouncementsIcon, 
  SchedulesIcon, 
  DocumentsIcon, 
  DirectoryIcon, 
  UsersIcon, 
  ProfileIcon,
  HospitalIcon
} from './Icons';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: DashboardIcon },
    { path: '/announcements', label: 'Thông báo', icon: AnnouncementsIcon },
    { path: '/documents', label: 'Tài liệu', icon: DocumentsIcon },
    { path: '/schedules', label: 'Lịch trực', icon: SchedulesIcon },
    { path: '/requests', label: 'Đơn từ', icon: RequestsIcon },
    { path: '/directory', label: 'Danh bạ', icon: DirectoryIcon },
    { path: '/users', label: 'Người dùng', icon: UsersIcon },
    { path: '/profile', label: 'Hồ sơ', icon: ProfileIcon },
  ];

  return (
    <nav style={navStyles}>
      <div style={navContainerStyles}>
        <div style={logoStyles}>
          <HospitalIcon size={32} color="#ffffff" />
          <span style={logoTextStyles}>Hospital Portal</span>
        </div>
        <div style={navLinksStyles}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...linkStyles,
                  ...(isActive ? activeLinkStyles : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <Icon size={18} color={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.9)"} />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div style={userInfoStyles}>
          <span style={userNameStyles}>Admin User</span>
          <div style={avatarStyles}>
            <ProfileIcon size={20} color="#ffffff" />
          </div>
        </div>
      </div>
    </nav>
  );
}

const navStyles = {
  background: 'var(--gradient-hero)',
  color: 'white',
  padding: '0',
  boxShadow: 'var(--shadow-xl)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(20px)',
};

const navContainerStyles = {
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 32px',
  height: '80px',
};

const logoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const logoTextStyles = {
  fontSize: '1.25rem',
  fontWeight: '700',
  letterSpacing: '-0.025em',
};

const navLinksStyles = {
  display: 'flex',
  gap: '8px',
  flex: 1,
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  padding: '12px 16px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  whiteSpace: 'nowrap',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
};

const activeLinkStyles = {
  background: 'rgba(255, 255, 255, 0.25)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  transform: 'translateY(-2px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const userInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '8px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  minWidth: '160px',
  justifyContent: 'flex-end',
};

const userNameStyles = {
  fontSize: '14px',
  fontWeight: '600',
};

const avatarStyles = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 'bold',
  border: '2px solid rgba(255, 255, 255, 0.3)',
};

export default Navbar;
