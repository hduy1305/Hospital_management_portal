import React, { useState } from 'react';

const initialUsers = [
  { 
    id: 1, 
    username: 'admin', 
    fullName: 'Quản trị viên',
    role: 'Admin',
    email: 'admin@hospital.com',
    department: 'Ban Giám đốc',
    status: 'active',
    lastLogin: '15/07/2025 09:30',
    createdDate: '01/01/2025'
  },
  { 
    id: 2, 
    username: 'doctor1', 
    fullName: 'BS. Nguyễn Văn A',
    role: 'Doctor',
    email: 'doctor1@hospital.com',
    department: 'Khoa Nội',
    status: 'active',
    lastLogin: '15/07/2025 08:15',
    createdDate: '05/01/2025'
  },
  { 
    id: 3, 
    username: 'nurse1', 
    fullName: 'Y tá Trần Thị B',
    role: 'Nurse',
    email: 'nurse1@hospital.com',
    department: 'Khoa Ngoại',
    status: 'active',
    lastLogin: '14/07/2025 16:45',
    createdDate: '10/01/2025'
  },
  { 
    id: 4, 
    username: 'staff1', 
    fullName: 'Phạm Thị C',
    role: 'Staff',
    email: 'staff1@hospital.com',
    department: 'Khoa Dược',
    status: 'inactive',
    lastLogin: '10/07/2025 14:20',
    createdDate: '15/01/2025'
  }
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    role: '',
    email: '',
    department: '',
    password: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const roles = [
    { value: 'Admin', label: 'Quản trị viên', color: '#ef4444' },
    { value: 'Doctor', label: 'Bác sĩ', color: '#3b82f6' },
    { value: 'Nurse', label: 'Y tá', color: '#10b981' },
    { value: 'Staff', label: 'Nhân viên', color: '#6b7280' }
  ];

  const departments = ['Ban Giám đốc', 'Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Khoa Nhi', 'Khoa Dược', 'Xét nghiệm'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              ...formData,
              // Don't update password if it's empty during edit
              ...(formData.password ? {} : { password: undefined })
            }
          : user
      ));
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        status: 'active',
        lastLogin: 'Chưa đăng nhập',
        createdDate: new Date().toLocaleDateString('vi-VN')
      };
      setUsers([...users, newUser]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      username: '',
      fullName: '',
      role: '',
      email: '',
      department: '',
      password: ''
    });
    setEditingUser(null);
    setShowModal(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      department: user.department,
      password: '' // Don't show current password
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleInfo = (role) => {
    return roles.find(r => r.value === role) || roles[3];
  };

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'status-badge status-approved' : 'status-badge status-rejected';
  };

  const getAvatarInitials = (fullName) => {
    return fullName.split(' ').map(word => word[0]).join('').substring(0, 2);
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter || user.status === filter;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>👤 Quản lý Người dùng</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            ➕ Thêm người dùng
          </button>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Tìm kiếm theo tên, email, khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>Lọc:</span>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ minWidth: '120px' }}
            >
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm khóa</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({users.length})
          </button>
          <button 
            className={`btn ${filter === 'active' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('active')}
          >
            Hoạt động ({users.filter(u => u.status === 'active').length})
          </button>
          <button 
            className={`btn ${filter === 'inactive' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('inactive')}
          >
            Tạm khóa ({users.filter(u => u.status === 'inactive').length})
          </button>
          {roles.map(role => (
            <button 
              key={role.value}
              className={`btn ${filter === role.value ? '' : 'btn-secondary'}`}
              onClick={() => setFilter(role.value)}
            >
              {role.label} ({users.filter(u => u.role === role.value).length})
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Vai trò</th>
                <th>Khoa/Phòng ban</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Lần cuối đăng nhập</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${roleInfo.color} 0%, ${roleInfo.color}aa 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          marginRight: '12px'
                        }}>
                          {getAvatarInitials(user.fullName)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>{user.fullName}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        background: roleInfo.color,
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <a href={`mailto:${user.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        {user.email}
                      </a>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(user.status)}>
                        {user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#6b7280' }}>
                      {user.lastLogin}
                    </td>
                    <td style={{ fontSize: '12px', color: '#6b7280' }}>
                      {user.createdDate}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleEdit(user)}
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                        <button 
                          className={`btn ${user.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleStatusToggle(user.id)}
                          title={user.status === 'active' ? 'Tạm khóa' : 'Kích hoạt'}
                        >
                          {user.status === 'active' ? '🔒' : '🔓'}
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleDelete(user.id)}
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            {searchTerm || filter !== 'all' ? 
              'Không tìm thấy người dùng phù hợp' : 
              'Chưa có người dùng nào'
            }
          </div>
        )}

        {/* Summary Stats */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>📊 Thống kê người dùng</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
                {users.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Tổng người dùng</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                {users.filter(u => u.status === 'active').length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Đang hoạt động</div>
            </div>
            {roles.map(role => {
              const count = users.filter(user => user.role === role.value).length;
              return count > 0 ? (
                <div key={role.value} style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: role.color }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{role.label}</div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    disabled={editingUser} // Can't change username when editing
                    required
                  />
                </div>

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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Vai trò</label>
                  <select
                    className="form-control"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  >
                    <option value="">Chọn vai trò</option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Khoa/Phòng ban</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Chọn khoa/phòng ban</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {editingUser ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu'}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!editingUser} // Only required for new users
                  placeholder={editingUser ? 'Để trống nếu không thay đổi' : ''}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingUser ? 'Cập nhật' : 'Thêm người dùng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
