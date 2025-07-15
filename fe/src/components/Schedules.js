import React, { useState } from 'react';

const initialSchedules = [
  { 
    id: 1, 
    doctor: 'BS. Nguyễn Văn A', 
    date: '2025-07-15', 
    shift: 'Ca sáng',
    department: 'Khoa Nội',
    room: 'Phòng 101',
    status: 'Đã xác nhận'
  },
  { 
    id: 2, 
    doctor: 'BS. Trần Thị B', 
    date: '2025-07-16', 
    shift: 'Ca chiều',
    department: 'Khoa Ngoại',
    room: 'Phòng 205',
    status: 'Chờ xác nhận'
  },
  { 
    id: 3, 
    doctor: 'BS. Lê Văn C', 
    date: '2025-07-15', 
    shift: 'Ca đêm',
    department: 'Cấp cứu',
    room: 'Phòng cấp cứu',
    status: 'Đã xác nhận'
  },
  { 
    id: 4, 
    doctor: 'BS. Phạm Thị D', 
    date: '2025-07-17', 
    shift: 'Ca sáng',
    department: 'Khoa Nhi',
    room: 'Phòng 301',
    status: 'Đã xác nhận'
  },
  { 
    id: 5, 
    doctor: 'BS. Hoàng Văn E', 
    date: '2025-07-16', 
    shift: 'Ca đêm',
    department: 'Khoa Nội',
    room: 'Phòng 102',
    status: 'Chờ xác nhận'
  }
];

function Schedules() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [showModal, setShowModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    shift: '',
    department: '',
    room: ''
  });
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const shifts = ['Ca sáng', 'Ca chiều', 'Ca đêm'];
  const departments = ['Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Khoa Nhi', 'Khoa Sản', 'Khoa Mắt'];
  const doctors = [
    'BS. Nguyễn Văn A', 'BS. Trần Thị B', 'BS. Lê Văn C', 
    'BS. Phạm Thị D', 'BS. Hoàng Văn E', 'BS. Vũ Thị F'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSchedule) {
      setSchedules(schedules.map(sched => 
        sched.id === editingSchedule.id 
          ? { ...sched, ...formData, status: 'Chờ xác nhận' }
          : sched
      ));
    } else {
      const newSchedule = {
        id: Date.now(),
        ...formData,
        status: 'Chờ xác nhận'
      };
      setSchedules([...schedules, newSchedule]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      doctor: '',
      date: '',
      shift: '',
      department: '',
      room: ''
    });
    setEditingSchedule(null);
    setShowModal(false);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      doctor: schedule.doctor,
      date: schedule.date,
      shift: schedule.shift,
      department: schedule.department,
      room: schedule.room
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch trực này?')) {
      setSchedules(schedules.filter(sched => sched.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setSchedules(schedules.map(sched => 
      sched.id === id ? { ...sched, status: newStatus } : sched
    ));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Chờ xác nhận': return 'status-badge status-pending';
      case 'Đã xác nhận': return 'status-badge status-approved';
      case 'Đã hủy': return 'status-badge status-rejected';
      default: return 'status-badge';
    }
  };

  const getShiftColor = (shift) => {
    switch (shift) {
      case 'Ca sáng': return '#10b981';
      case 'Ca chiều': return '#3b82f6';
      case 'Ca đêm': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const filteredSchedules = schedules.filter(sched => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return sched.date === today;
    }
    if (filter === 'week') {
      const today = new Date();
      const schedDate = new Date(sched.date);
      const diffTime = Math.abs(schedDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }
    return sched.status === filter;
  });

  // Group schedules by date for calendar view
  const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
    const date = schedule.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📅 Lịch trực</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${viewMode === 'list' ? '' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              📋 Danh sách
            </button>
            <button 
              className={`btn ${viewMode === 'calendar' ? '' : 'btn-secondary'}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Lịch
            </button>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              ➕ Thêm lịch trực
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '15px', fontWeight: '500' }}>Lọc:</span>
          <button 
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({schedules.length})
          </button>
          <button 
            className={`btn ${filter === 'today' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('today')}
          >
            Hôm nay
          </button>
          <button 
            className={`btn ${filter === 'week' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('week')}
          >
            Tuần này
          </button>
          <button 
            className={`btn ${filter === 'Chờ xác nhận' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('Chờ xác nhận')}
          >
            Chờ xác nhận ({schedules.filter(s => s.status === 'Chờ xác nhận').length})
          </button>
          <button 
            className={`btn ${filter === 'Đã xác nhận' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('Đã xác nhận')}
          >
            Đã xác nhận ({schedules.filter(s => s.status === 'Đã xác nhận').length})
          </button>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Bác sĩ</th>
                  <th>Ngày</th>
                  <th>Ca trực</th>
                  <th>Khoa</th>
                  <th>Phòng</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map(schedule => (
                  <tr key={schedule.id}>
                    <td>{schedule.doctor}</td>
                    <td>{new Date(schedule.date).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <span 
                        style={{
                          background: getShiftColor(schedule.shift),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {schedule.shift}
                      </span>
                    </td>
                    <td>{schedule.department}</td>
                    <td>{schedule.room}</td>
                    <td>
                      <span className={getStatusBadgeClass(schedule.status)}>
                        {schedule.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleEdit(schedule)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn btn-danger" 
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          onClick={() => handleDelete(schedule.id)}
                        >
                          🗑️
                        </button>
                        {schedule.status === 'Chờ xác nhận' && (
                          <button 
                            className="btn btn-success" 
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleStatusChange(schedule.id, 'Đã xác nhận')}
                          >
                            ✅
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {Object.keys(groupedSchedules).sort().map(date => (
              <div key={date} className="card" style={{ margin: 0 }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>
                  📅 {new Date(date).toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                  {groupedSchedules[date].map(schedule => (
                    <div 
                      key={schedule.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '15px',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span 
                          style={{
                            background: getShiftColor(schedule.shift),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {schedule.shift}
                        </span>
                        <span className={getStatusBadgeClass(schedule.status)}>
                          {schedule.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>
                        {schedule.doctor}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '3px' }}>
                        🏥 {schedule.department}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        📍 {schedule.room}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredSchedules.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Không có lịch trực nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingSchedule ? 'Chỉnh sửa lịch trực' : 'Thêm lịch trực mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bác sĩ</label>
                <select
                  className="form-control"
                  value={formData.doctor}
                  onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  required
                >
                  <option value="">Chọn bác sĩ</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Ngày</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Ca trực</label>
                  <select
                    className="form-control"
                    value={formData.shift}
                    onChange={(e) => setFormData({...formData, shift: e.target.value})}
                    required
                  >
                    <option value="">Chọn ca trực</option>
                    {shifts.map(shift => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                </div>
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
                  <label>Phòng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.room}
                    onChange={(e) => setFormData({...formData, room: e.target.value})}
                    placeholder="VD: Phòng 101"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingSchedule ? 'Cập nhật' : 'Thêm lịch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedules;
