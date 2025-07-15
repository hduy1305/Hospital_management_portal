import React, { useState } from 'react';

const initialDirectory = [
  { 
    id: 1, 
    name: 'BS. Nguyễn Văn A', 
    department: 'Khoa Nội',
    position: 'Trưởng khoa',
    phone: '0901234567',
    email: 'nguyen.van.a@hospital.com',
    extension: '101',
    room: 'Phòng 201',
    specialization: 'Tim mạch',
    experience: '15 năm'
  },
  { 
    id: 2, 
    name: 'BS. Trần Thị B', 
    department: 'Khoa Ngoại',
    position: 'Phó trưởng khoa',
    phone: '0901234568',
    email: 'tran.thi.b@hospital.com',
    extension: '102',
    room: 'Phòng 301',
    specialization: 'Phẫu thuật tổng quát',
    experience: '12 năm'
  },
  { 
    id: 3, 
    name: 'Y tá Lê Văn C', 
    department: 'Cấp cứu',
    position: 'Y tá trưởng',
    phone: '0901234569',
    email: 'le.van.c@hospital.com',
    extension: '103',
    room: 'Phòng cấp cứu',
    specialization: 'Cấp cứu hồi sức',
    experience: '8 năm'
  },
  { 
    id: 4, 
    name: 'BS. Phạm Thị D', 
    department: 'Khoa Nhi',
    position: 'Bác sĩ',
    phone: '0901234570',
    email: 'pham.thi.d@hospital.com',
    extension: '104',
    room: 'Phòng 401',
    specialization: 'Nhi khoa',
    experience: '6 năm'
  },
  { 
    id: 5, 
    name: 'Dược sĩ Hoàng Văn E', 
    department: 'Khoa Dược',
    position: 'Trưởng khoa',
    phone: '0901234571',
    email: 'hoang.van.e@hospital.com',
    extension: '105',
    room: 'Phòng 501',
    specialization: 'Dược lâm sàng',
    experience: '10 năm'
  },
  { 
    id: 6, 
    name: 'KTV Vũ Thị F', 
    department: 'Chẩn đoán hình ảnh',
    position: 'Kỹ thuật viên',
    phone: '0901234572',
    email: 'vu.thi.f@hospital.com',
    extension: '106',
    room: 'Phòng CT-MRI',
    specialization: 'Chụp CT, MRI',
    experience: '5 năm'
  }
];

function Directory() {
  const [directory, setDirectory] = useState(initialDirectory);
  const [showModal, setShowModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    extension: '',
    room: '',
    specialization: '',
    experience: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  const departments = ['Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Khoa Nhi', 'Khoa Sản', 'Khoa Dược', 'Chẩn đoán hình ảnh', 'Xét nghiệm'];
  const positions = ['Trưởng khoa', 'Phó trưởng khoa', 'Bác sĩ', 'Y tá trưởng', 'Y tá', 'Kỹ thuật viên', 'Dược sĩ'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPerson) {
      setDirectory(directory.map(person => 
        person.id === editingPerson.id 
          ? { ...person, ...formData }
          : person
      ));
    } else {
      const newPerson = {
        id: Date.now(),
        ...formData
      };
      setDirectory([...directory, newPerson]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      position: '',
      phone: '',
      email: '',
      extension: '',
      room: '',
      specialization: '',
      experience: ''
    });
    setEditingPerson(null);
    setShowModal(false);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      department: person.department,
      position: person.position,
      phone: person.phone,
      email: person.email,
      extension: person.extension,
      room: person.room,
      specialization: person.specialization,
      experience: person.experience
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông tin nhân sự này?')) {
      setDirectory(directory.filter(person => person.id !== id));
    }
  };

  const handleCall = (phone) => {
    alert(`Đang gọi: ${phone}`);
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 'Trưởng khoa': return '#ef4444';
      case 'Phó trưởng khoa': return '#f59e0b';
      case 'Bác sĩ': return '#3b82f6';
      case 'Y tá trưởng': return '#10b981';
      case 'Y tá': return '#06b6d4';
      case 'Kỹ thuật viên': return '#8b5cf6';
      case 'Dược sĩ': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2);
  };

  const filteredDirectory = directory.filter(person => {
    const matchesFilter = filter === 'all' || person.department === filter;
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>👥 Danh bạ nhân sự</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${viewMode === 'grid' ? '' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
            >
              📋 Thẻ
            </button>
            <button 
              className={`btn ${viewMode === 'table' ? '' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              📊 Bảng
            </button>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              ➕ Thêm nhân sự
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Tìm kiếm theo tên, khoa, chức vụ, chuyên môn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>Khoa:</span>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value="all">Tất cả</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredDirectory.map(person => (
              <div key={person.id} className="card" style={{ margin: 0 }}>
                {/* Header with Avatar and Basic Info */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${getPositionColor(person.position)} 0%, ${getPositionColor(person.position)}aa 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginRight: '15px'
                  }}>
                    {getAvatarInitials(person.name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>
                      {person.name}
                    </h3>
                    <div style={{ 
                      background: getPositionColor(person.position),
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'inline-block'
                    }}>
                      {person.position}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: '15px', fontSize: '14px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>🏥 Khoa:</strong> {person.department}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📍 Phòng:</strong> {person.room}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>🎯 Chuyên môn:</strong> {person.specialization}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>⏱️ Kinh nghiệm:</strong> {person.experience}
                  </div>
                </div>

                {/* Contact Actions */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                  <button 
                    className="btn" 
                    style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                    onClick={() => handleCall(person.phone)}
                  >
                    📞 {person.phone}
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '8px', fontSize: '12px' }}
                    onClick={() => handleEmail(person.email)}
                  >
                    ✉️
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '8px', fontSize: '12px' }}
                    title={`Nhánh ${person.extension}`}
                  >
                    📟 {person.extension}
                  </button>
                </div>

                {/* Edit/Delete Actions */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() => handleEdit(person)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn btn-danger" 
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() => handleDelete(person.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Chức vụ</th>
                  <th>Khoa</th>
                  <th>Phòng</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th>Nhánh</th>
                  <th>Chuyên môn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredDirectory.map(person => (
                  <tr key={person.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: getPositionColor(person.position),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginRight: '10px'
                        }}>
                          {getAvatarInitials(person.name)}
                        </div>
                        {person.name}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        background: getPositionColor(person.position),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {person.position}
                      </span>
                    </td>
                    <td>{person.department}</td>
                    <td>{person.room}</td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => handleCall(person.phone)}
                      >
                        📞 {person.phone}
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => handleEmail(person.email)}
                      >
                        ✉️
                      </button>
                    </td>
                    <td>{person.extension}</td>
                    <td>{person.specialization}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          onClick={() => handleEdit(person)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          onClick={() => handleDelete(person.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredDirectory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            {searchTerm || filter !== 'all' ? 
              'Không tìm thấy nhân sự phù hợp' : 
              'Chưa có thông tin nhân sự'
            }
          </div>
        )}

        {/* Summary Stats */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>📊 Thống kê nhân sự</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>
                {directory.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Tổng nhân sự</div>
            </div>
            {departments.map(dept => {
              const count = directory.filter(person => person.department === dept).length;
              return count > 0 ? (
                <div key={dept} style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{dept}</div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{editingPerson ? 'Chỉnh sửa thông tin nhân sự' : 'Thêm nhân sự mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Khoa</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Chọn khoa</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Chức vụ</label>
                  <select
                    className="form-control"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  >
                    <option value="">Chọn chức vụ</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
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
                  <label>Nhánh</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.extension}
                    onChange={(e) => setFormData({...formData, extension: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phòng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.room}
                    onChange={(e) => setFormData({...formData, room: e.target.value})}
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
                  <label>Chuyên môn</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Kinh nghiệm</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="VD: 5 năm"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingPerson ? 'Cập nhật' : 'Thêm nhân sự'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Directory;
