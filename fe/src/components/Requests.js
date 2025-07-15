import React, { useState } from 'react';

const initialRequests = [
  { id: 1, creator: 'Nguyễn Văn A', type: 'Nghỉ phép', status: 'Chờ duyệt', date: '15/07/2025', reason: 'Việc gia đình cấp bách', department: 'Khoa Nội' },
  { id: 2, creator: 'Trần Thị B', type: 'Tăng ca', status: 'Đã duyệt', date: '14/07/2025', reason: 'Hỗ trợ ca đêm', department: 'Khoa Ngoại' },
  { id: 3, creator: 'Lê Văn C', type: 'Đổi ca', status: 'Từ chối', date: '13/07/2025', reason: 'Đổi ca với đồng nghiệp', department: 'Cấp cứu' },
  { id: 4, creator: 'Phạm Thị D', type: 'Nghỉ ốm', status: 'Chờ duyệt', date: '15/07/2025', reason: 'Bị cảm cúm', department: 'Khoa Nhi' },
];

function Requests() {
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [formData, setFormData] = useState({
    creator: '',
    type: '',
    reason: '',
    department: ''
  });
  const [filter, setFilter] = useState('all');

  const requestTypes = ['Nghỉ phép', 'Tăng ca', 'Đổi ca', 'Nghỉ ốm', 'Khác'];
  const departments = ['Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Khoa Nhi', 'Khoa Sản', 'Khoa Mắt'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRequest) {
      setRequests(requests.map(req => 
        req.id === editingRequest.id 
          ? { ...req, ...formData }
          : req
      ));
    } else {
      const newRequest = {
        id: Date.now(),
        ...formData,
        status: 'Chờ duyệt',
        date: new Date().toLocaleDateString('vi-VN')
      };
      setRequests([...requests, newRequest]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      creator: '',
      type: '',
      reason: '',
      department: ''
    });
    setEditingRequest(null);
    setShowModal(false);
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setFormData({
      creator: request.creator,
      type: request.type,
      reason: request.reason,
      department: request.department
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn này?')) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Chờ duyệt': return 'status-badge status-pending';
      case 'Đã duyệt': return 'status-badge status-approved';
      case 'Từ chối': return 'status-badge status-rejected';
      default: return 'status-badge';
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📝 Quản lý Đơn từ</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            ➕ Tạo đơn mới
          </button>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '15px', fontWeight: '500' }}>Lọc theo trạng thái:</span>
          <button 
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('all')}
          >
            Tất cả ({requests.length})
          </button>
          <button 
            className={`btn ${filter === 'Chờ duyệt' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('Chờ duyệt')}
          >
            Chờ duyệt ({requests.filter(r => r.status === 'Chờ duyệt').length})
          </button>
          <button 
            className={`btn ${filter === 'Đã duyệt' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('Đã duyệt')}
          >
            Đã duyệt ({requests.filter(r => r.status === 'Đã duyệt').length})
          </button>
          <button 
            className={`btn ${filter === 'Từ chối' ? '' : 'btn-secondary'}`}
            onClick={() => setFilter('Từ chối')}
          >
            Từ chối ({requests.filter(r => r.status === 'Từ chối').length})
          </button>
        </div>

        {/* Requests Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Người tạo</th>
                <th>Loại đơn</th>
                <th>Khoa</th>
                <th>Lý do</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.creator}</td>
                  <td>{request.type}</td>
                  <td>{request.department}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {request.reason}
                  </td>
                  <td>{request.date}</td>
                  <td>
                    <span className={getStatusBadgeClass(request.status)}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleEdit(request)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        onClick={() => handleDelete(request.id)}
                      >
                        🗑️
                      </button>
                      {request.status === 'Chờ duyệt' && (
                        <>
                          <button 
                            className="btn btn-success" 
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleStatusChange(request.id, 'Đã duyệt')}
                          >
                            ✅
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            onClick={() => handleStatusChange(request.id, 'Từ chối')}
                          >
                            ❌
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--neutral-600)' }}>
            Không có đơn từ nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingRequest ? 'Chỉnh sửa đơn từ' : 'Tạo đơn từ mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Người tạo đơn</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.creator}
                  onChange={(e) => setFormData({...formData, creator: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Loại đơn</label>
                <select
                  className="form-control"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">Chọn loại đơn</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

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
                <label>Lý do</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingRequest ? 'Cập nhật' : 'Tạo đơn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;
