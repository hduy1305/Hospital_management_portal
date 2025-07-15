import React, { useState } from 'react';

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
    address: '123 Đường ABC, Quận 1, TP.HCM',
    bio: 'Quản trị viên hệ thống với 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin y tế.'
  });
  const [activeTab, setActiveTab] = useState('info');

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

  const getAvatarInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2);
  };

  const activities = [
    { id: 1, action: 'Đăng nhập hệ thống', time: '15/07/2025 09:30', icon: '🔐' },
    { id: 2, action: 'Tạo thông báo mới', time: '15/07/2025 09:15', icon: '📢' },
    { id: 3, action: 'Duyệt đơn nghỉ phép', time: '14/07/2025 16:20', icon: '✅' },
    { id: 4, action: 'Cập nhật lịch trực', time: '14/07/2025 14:45', icon: '📅' },
    { id: 5, action: 'Thêm tài liệu mới', time: '13/07/2025 11:30', icon: '📄' }
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
    { label: 'Thông báo đã tạo', value: 25, color: '#3b82f6', icon: '📢' },
    { label: 'Đơn đã duyệt', value: 48, color: '#10b981', icon: '✅' },
    { label: 'Tài liệu đã thêm', value: 12, color: '#f59e0b', icon: '📄' },
    { label: 'Lần đăng nhập', value: 156, color: '#8b5cf6', icon: '🔐' },
  ];

  return (
    <div className="container">
      <div className="card">
        {/* Profile Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                backdropFilter: 'blur(10px)'
              }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '❌ Hủy' : '✏️ Chỉnh sửa'}
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
            { id: 'info', label: 'Thông tin', icon: '👤' },
            { id: 'activity', label: 'Hoạt động', icon: '📊' },
            { id: 'permissions', label: 'Quyền hạn', icon: '🔐' },
            { id: 'stats', label: 'Thống kê', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
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
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>📊 Hoạt động gần đây</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {activities.map(activity => (
                <div 
                  key={activity.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ fontSize: '24px', marginRight: '15px' }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
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
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>🔐 Quyền hạn của bạn</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
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
                        <span style={{ color: perm.read ? '#10b981' : '#ef4444', fontSize: '18px' }}>
                          {perm.read ? '✅' : '❌'}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: perm.write ? '#10b981' : '#ef4444', fontSize: '18px' }}>
                          {perm.write ? '✅' : '❌'}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: perm.delete ? '#10b981' : '#ef4444', fontSize: '18px' }}>
                          {perm.delete ? '✅' : '❌'}
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
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>📈 Thống kê hoạt động</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card" 
                  style={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)` }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Additional charts or metrics could go here */}
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>📅 Hoạt động theo tháng</h4>
              <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                Biểu đồ hoạt động theo thời gian sẽ được hiển thị ở đây
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Card */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>⚡ Thao tác nhanh</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="btn">
            🔒 Đổi mật khẩu
          </button>
          <button className="btn btn-secondary">
            📱 Cài đặt thông báo
          </button>
          <button className="btn btn-secondary">
            🌙 Chế độ tối
          </button>
          <button className="btn btn-secondary">
            📊 Xuất báo cáo hoạt động
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
