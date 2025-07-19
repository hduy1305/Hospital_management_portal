import React, { useState } from 'react';
import {
  EditIcon,
  CloseIcon,
  InfoIcon,
  ActivityIcon,
  ShieldIcon,
  ChartIcon,
  LockIcon,
  NotificationIcon,
  DownloadIcon,
  EmailIcon,
  PhoneIcon,
  ClockIcon,
  CheckIcon
} from './Icons';

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || 'admin',
    fullName: 'Quản trị viên hệ thống',
    email: 'admin@hospital.com',
    phone: '0901234567',
    department: 'Ban Giám đốc',
    position: 'Quản trị viên',
    joinDate: '01/01/2025',
    address: '123 Đường Nguyễn Trãi, Quận Hà Đông, Hà Nội',
    bio: 'Quản trị viên hệ thống với 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin y tế.'
  });
  const [activeTab, setActiveTab] = useState('info');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReport: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would call API to update profile
    alert('Cập nhật thông tin thành công!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    // In real app, this would call API to change password
    alert('Đổi mật khẩu thành công!');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationSave = () => {
    // In real app, this would call API to save notification settings
    alert('Cập nhật cài đặt thông báo thành công!');
    setShowNotificationModal(false);
  };

  const exportActivityReport = () => {
    // In real app, this would generate and download report
    const reportData = activities.map(activity => 
      `${activity.time},${activity.action}`
    ).join('\n');
    
    const blob = new Blob([`Thời gian,Hoạt động\n${reportData}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao-cao-hoat-dong-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2);
  };

  const activities = [
    { id: 1, action: 'Đăng nhập hệ thống', time: '15/07/2025 09:30', icon: LockIcon },
    { id: 2, action: 'Tạo thông báo mới', time: '15/07/2025 09:15', icon: NotificationIcon },
    { id: 3, action: 'Duyệt đơn nghỉ phép', time: '14/07/2025 16:20', icon: CheckIcon },
    { id: 4, action: 'Cập nhật lịch trực', time: '14/07/2025 14:45', icon: ClockIcon },
    { id: 5, action: 'Thêm tài liệu mới', time: '13/07/2025 11:30', icon: EditIcon }
  ];

  const permissions = [
    { module: 'Dashboard', read: true, write: true, delete: true },
    { module: 'Thông báo', read: true, write: true, delete: true },
    { module: 'Tài liệu', read: true, write: true, delete: true },
    { module: 'Lịch trực', read: true, write: true, delete: true },
    { module: 'Đơn từ', read: true, write: true, delete: true },
    { module: 'Danh bạ', read: true, write: true, delete: true },
    { module: 'Người dùng', read: true, write: true, delete: true },
  ];

  const stats = [
    { label: 'Thông báo đã tạo', value: 25, color: 'var(--medical-primary)', icon: NotificationIcon },
    { label: 'Đơn đã duyệt', value: 48, color: 'var(--medical-success)', icon: CheckIcon },
    { label: 'Tài liệu đã thêm', value: 12, color: 'var(--medical-warning)', icon: EditIcon },
    { label: 'Lần đăng nhập', value: 156, color: 'var(--medical-secondary)', icon: LockIcon },
  ];

  return (
    <div className="container">
      <style>{`
        :root {
          --medical-primary: #059669;
          --medical-primary-light: #10b981;
          --medical-primary-dark: #047857;
          --medical-secondary: #0891b2;
          --medical-accent: #7c3aed;
          --medical-success: #059669;
          --medical-warning: #d97706;
          --medical-error: #dc2626;
          --medical-gray-50: #f9fafb;
          --medical-gray-100: #f3f4f6;
          --medical-gray-200: #e5e7eb;
          --medical-gray-300: #d1d5db;
          --medical-gray-500: #6b7280;
          --medical-gray-700: #374151;
          --medical-gray-900: #111827;
        }

        .activity-card {
          display: flex;
          align-items: center;
          padding: 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--medical-gray-200);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }

        .activity-card:hover {
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.15);
          transform: translateY(-2px);
          border-color: var(--medical-primary-light);
        }

        .permissions-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .permissions-table th {
          background: linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-primary-dark) 100%);
          color: white;
          padding: 16px;
          font-weight: 600;
          text-align: left;
        }

        .permissions-table td {
          padding: 16px;
          border-bottom: 1px solid var(--medical-gray-200);
          color: var(--medical-gray-700);
        }

        .permissions-table tr:hover {
          background-color: var(--medical-gray-50);
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--medical-gray-200);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-color);
        }

        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .quick-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 2px solid var(--medical-gray-200);
          border-radius: 10px;
          background: white;
          color: var(--medical-gray-700);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 14px;
        }

        .quick-action-btn:hover {
          border-color: var(--medical-primary);
          background: var(--medical-gray-50);
          color: var(--medical-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
        }

        .quick-action-btn.primary {
          background: var(--medical-primary);
          border-color: var(--medical-primary);
          color: white;
        }

        .quick-action-btn.primary:hover {
          background: var(--medical-primary-dark);
          border-color: var(--medical-primary-dark);
          color: white;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
          }
          
          .activity-card {
            padding: 16px;
          }
          
          .permissions-table th,
          .permissions-table td {
            padding: 12px 8px;
            font-size: 14px;
          }
          
          .modal-content {
            width: 95%;
            padding: 20px;
          }
        }
      `}</style>
      <div className="card">
        {/* Profile Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-secondary) 100%)',
          margin: '-24px -24px 24px -24px',
          padding: '40px 24px',
          borderRadius: '12px 12px 0 0',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              backdropFilter: 'blur(10px)'
            }}>
              {getAvatarInitials(formData.fullName)}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>
                {formData.fullName}
              </h1>
              <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '8px' }}>
                {formData.position} - {formData.department}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                @{formData.username} • Tham gia từ {formData.joinDate}
              </div>
            </div>
            <button 
              className="btn"
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <CloseIcon size={16} color="white" />
                  Hủy
                </>
              ) : (
                <>
                  <EditIcon size={16} color="white" />
                  Chỉnh sửa
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '24px'
        }}>
          {[
            { id: 'info', label: 'Thông tin', icon: InfoIcon },
            { id: 'activity', label: 'Hoạt động', icon: ActivityIcon },
            { id: 'permissions', label: 'Quyền hạn', icon: ShieldIcon },
            { id: 'stats', label: 'Thống kê', icon: ChartIcon }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === tab.id ? 'var(--medical-primary)' : 'var(--medical-gray-500)',
                borderBottom: activeTab === tab.id ? '2px solid var(--medical-primary)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} color={activeTab === tab.id ? 'var(--medical-primary)' : 'var(--medical-gray-500)'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Information Tab */}
        {activeTab === 'info' && (
          <div>
            {!isEditing ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Thông tin cơ bản</h3>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Email
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280' }}>{formData.email}</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Điện thoại
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280' }}>{formData.phone}</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Khoa/Phòng ban
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280' }}>{formData.department}</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Chức vụ
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280' }}>{formData.position}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Thông tin khác</h3>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Địa chỉ
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.5' }}>{formData.address}</div>
                    </div>
                    <div>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '5px' }}>
                        Giới thiệu
                      </label>
                      <div style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.5' }}>{formData.bio}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Thông tin cơ bản</h3>
                    <div style={{ display: 'grid', gap: '15px' }}>
                      <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Điện thoại</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Chức vụ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.position}
                          onChange={(e) => setFormData({...formData, position: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Thông tin khác</h3>
                    <div style={{ display: 'grid', gap: '15px' }}>
                      <div className="form-group">
                        <label>Địa chỉ</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Giới thiệu</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-success">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ActivityIcon size={20} color="var(--medical-primary)" />
              Hoạt động gần đây
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {activities.map(activity => (
                <div key={activity.id} className="activity-card">
                  <div style={{ marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: 'var(--medical-gray-50)', borderRadius: '10px' }}>
                    <activity.icon size={20} color="var(--medical-primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px', color: 'var(--medical-gray-900)' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--medical-gray-500)' }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldIcon size={20} color="var(--medical-primary)" />
              Quyền hạn của bạn
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="permissions-table">
                <thead>
                  <tr>
                    <th>Chức năng</th>
                    <th>Xem</th>
                    <th>Chỉnh sửa</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((perm, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: '500' }}>{perm.module}</td>
                      <td>
                        <span style={{ color: perm.read ? 'var(--medical-success)' : 'var(--medical-error)', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon size={16} color={perm.read ? 'var(--medical-success)' : 'var(--medical-error)'} />
                        </span>
                      </td>
                      <td>
                        <span style={{ color: perm.write ? 'var(--medical-success)' : 'var(--medical-error)', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon size={16} color={perm.write ? 'var(--medical-success)' : 'var(--medical-error)'} />
                        </span>
                      </td>
                      <td>
                        <span style={{ color: perm.delete ? 'var(--medical-success)' : 'var(--medical-error)', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon size={16} color={perm.delete ? 'var(--medical-success)' : 'var(--medical-error)'} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ChartIcon size={20} color="var(--medical-primary)" />
              Thống kê hoạt động
            </h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stats-card"
                  style={{ '--card-color': stat.color }}
                >
                  <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                    <stat.icon size={32} color={stat.color} />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '8px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--medical-gray-500)', fontWeight: '500' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional charts or metrics could go here */}
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--medical-gray-50)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 15px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ClockIcon size={16} color="var(--medical-primary)" />
                Hoạt động theo tháng
              </h4>
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--medical-gray-500)' }}>
                Biểu đồ hoạt động theo thời gian sẽ được hiển thị ở đây
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Card */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <EditIcon size={20} color="var(--medical-primary)" />
          Thao tác nhanh
        </h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            className="quick-action-btn primary"
            onClick={() => setShowPasswordModal(true)}
          >
            <LockIcon size={16} />
            Đổi mật khẩu
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => setShowNotificationModal(true)}
          >
            <NotificationIcon size={16} />
            Cài đặt thông báo
          </button>
          <button 
            className="quick-action-btn"
            onClick={exportActivityReport}
          >
            <DownloadIcon size={16} />
            Xuất báo cáo hoạt động
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LockIcon size={20} color="var(--medical-primary)" />
              Đổi mật khẩu
            </h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--medical-gray-700)' }}>
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid var(--medical-gray-200)', borderRadius: '8px', background: 'white', color: 'var(--medical-gray-900)' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--medical-gray-700)' }}>
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                  minLength="6"
                  style={{ width: '100%', padding: '12px', border: '2px solid var(--medical-gray-200)', borderRadius: '8px', background: 'white', color: 'var(--medical-gray-900)' }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: 'var(--medical-gray-700)' }}>
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid var(--medical-gray-200)', borderRadius: '8px', background: 'white', color: 'var(--medical-gray-900)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="quick-action-btn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="quick-action-btn primary">
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showNotificationModal && (
        <div className="modal-overlay" onClick={() => setShowNotificationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px 0', color: 'var(--medical-gray-900)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <NotificationIcon size={20} color="var(--medical-primary)" />
              Cài đặt thông báo
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <EmailIcon size={16} color="var(--medical-primary)" />
                <span style={{ color: 'var(--medical-gray-700)' }}>Nhận thông báo qua email</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <NotificationIcon size={16} color="var(--medical-primary)" />
                <span style={{ color: 'var(--medical-gray-700)' }}>Nhận thông báo đẩy</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <PhoneIcon size={16} color="var(--medical-primary)" />
                <span style={{ color: 'var(--medical-gray-700)' }}>Nhận thông báo SMS</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyReport}
                  onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReport: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <ChartIcon size={16} color="var(--medical-primary)" />
                <span style={{ color: 'var(--medical-gray-700)' }}>Báo cáo hoạt động hàng tuần</span>
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button 
                className="quick-action-btn"
                onClick={() => setShowNotificationModal(false)}
              >
                Hủy
              </button>
              <button 
                className="quick-action-btn primary"
                onClick={handleNotificationSave}
              >
                Lưu cài đặt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
