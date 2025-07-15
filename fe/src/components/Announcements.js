import React, { useState } from 'react';

const initialAnnouncements = [
  { 
    id: 1, 
    title: 'Thông báo họp giao ban tuần', 
    content: 'Tất cả bác sĩ và y tá họp giao ban lúc 8h00 sáng thứ 2 hàng tuần tại phòng họp tầng 2.',
    author: 'Ban Giám đốc',
    date: '15/07/2025',
    priority: 'high',
    department: 'Toàn bệnh viện'
  },
  { 
    id: 2, 
    title: 'Cập nhật quy trình tiêm vaccine COVID-19', 
    content: 'Tài liệu hướng dẫn quy trình tiêm vaccine mới đã được cập nhật. Vui lòng tải về và nghiên cứu kỹ.',
    author: 'Phòng Y tế dự phòng',
    date: '14/07/2025',
    priority: 'medium',
    department: 'Khoa Nội'
  },
  { 
    id: 3, 
    title: 'Lịch nghỉ lễ Quốc khánh 2/9', 
    content: 'Bệnh viện sẽ nghỉ lễ từ ngày 1/9 đến 3/9. Chỉ duy trì khoa Cấp cứu và các ca trực cần thiết.',
    author: 'Phòng Tổ chức',
    date: '13/07/2025',
    priority: 'low',
    department: 'Toàn bệnh viện'
  }
];

function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    priority: 'medium',
    department: ''
  });
  const [filter, setFilter] = useState('all');

  const priorities = [
    { value: 'high', label: 'Cao', color: 'var(--medical-700)' },
    { value: 'medium', label: 'Trung bình', color: 'var(--medical-500)' },
    { value: 'low', label: 'Thấp', color: 'var(--medical-400)' }
  ];

  const departments = ['Toàn bệnh viện', 'Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Khoa Nhi', 'Khoa Sản', 'Khoa Mắt'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(ann => 
        ann.id === editingAnnouncement.id 
          ? { ...ann, ...formData }
          : ann
      ));
    } else {
      const newAnnouncement = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('vi-VN')
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      priority: 'medium',
      department: ''
    });
    setEditingAnnouncement(null);
    setShowModal(false);
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      author: announcement.author,
      priority: announcement.priority,
      department: announcement.department
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const getPriorityInfo = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const filteredAnnouncements = announcements.filter(ann => {
    if (filter === 'all') return true;
    return ann.priority === filter;
  });

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📢 Thông báo</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            ➕ Tạo thông báo
          </button>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '15px', fontWeight: '500' }}>Lọc theo độ ưu tiên:</span>
          <button 
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({announcements.length})
          </button>
          {priorities.map(priority => (
            <button 
              key={priority.value}
              className={`btn ${filter === priority.value ? '' : 'btn-secondary'}`}
              onClick={() => setFilter(priority.value)}
            >
              {priority.label} ({announcements.filter(a => a.priority === priority.value).length})
            </button>
          ))}
        </div>

        {/* Announcements List */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredAnnouncements.map(announcement => {
            const priorityInfo = getPriorityInfo(announcement.priority);
            return (
              <div key={announcement.id} className="card" style={{ margin: 0, borderLeft: `4px solid ${priorityInfo.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: 'var(--neutral-800)' }}>
                      {announcement.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{
                        background: priorityInfo.color,
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {priorityInfo.label}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--neutral-600)' }}>
                        📅 {announcement.date}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--neutral-600)' }}>
                        👤 {announcement.author}
                      </span>
                      <span style={{ fontSize: '14px', color: 'var(--neutral-600)' }}>
                        🏥 {announcement.department}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleEdit(announcement)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                      onClick={() => handleDelete(announcement.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.6', 
                  color: 'var(--neutral-700)',
                  padding: '15px',
                  backgroundColor: 'var(--neutral-50)',
                  borderRadius: '8px'
                }}>
                  {announcement.content}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--neutral-600)' }}>
            Không có thông báo nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingAnnouncement ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  className="form-control"
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Người tạo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Độ ưu tiên</label>
                  <select
                    className="form-control"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    required
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
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

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingAnnouncement ? 'Cập nhật' : 'Tạo thông báo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcements;
