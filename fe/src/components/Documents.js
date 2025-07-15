import React, { useState } from 'react';

const initialDocuments = [
  { 
    id: 1, 
    name: 'Quy trình khám bệnh mới', 
    type: 'PDF',
    size: '2.5 MB',
    category: 'Quy trình',
    department: 'Khoa Nội',
    uploadedBy: 'BS. Nguyễn Văn A',
    uploadDate: '15/07/2025',
    description: 'Tài liệu hướng dẫn quy trình khám bệnh mới áp dụng từ tháng 8/2025'
  },
  { 
    id: 2, 
    name: 'Biểu mẫu xét nghiệm', 
    type: 'DOCX',
    size: '1.2 MB',
    category: 'Biểu mẫu',
    department: 'Xét nghiệm',
    uploadedBy: 'Y tá Trần Thị B',
    uploadDate: '14/07/2025',
    description: 'Các biểu mẫu xét nghiệm tiêu chuẩn mới'
  },
  { 
    id: 3, 
    name: 'Hướng dẫn sử dụng thiết bị MRI', 
    type: 'PDF',
    size: '5.8 MB',
    category: 'Hướng dẫn',
    department: 'Chẩn đoán hình ảnh',
    uploadedBy: 'Kỹ thuật viên Lê Văn C',
    uploadDate: '13/07/2025',
    description: 'Tài liệu hướng dẫn vận hành và bảo trì thiết bị MRI'
  },
  { 
    id: 4, 
    name: 'Báo cáo chất lượng tháng 6', 
    type: 'XLSX',
    size: '3.1 MB',
    category: 'Báo cáo',
    department: 'Khoa Quản lý chất lượng',
    uploadedBy: 'Phạm Thị D',
    uploadDate: '12/07/2025',
    description: 'Báo cáo chi tiết về chất lượng dịch vụ bệnh viện tháng 6/2025'
  }
];

function Documents() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [showModal, setShowModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    department: '',
    uploadedBy: '',
    description: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Quy trình', 'Biểu mẫu', 'Hướng dẫn', 'Báo cáo', 'Chính sách', 'Khác'];
  const departments = ['Khoa Nội', 'Khoa Ngoại', 'Cấp cứu', 'Xét nghiệm', 'Chẩn đoán hình ảnh', 'Khoa Quản lý chất lượng'];
  const fileTypes = ['PDF', 'DOCX', 'XLSX', 'PPTX', 'TXT'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDocument) {
      setDocuments(documents.map(doc => 
        doc.id === editingDocument.id 
          ? { ...doc, ...formData }
          : doc
      ));
    } else {
      const newDocument = {
        id: Date.now(),
        ...formData,
        size: '1.0 MB', // Mock size
        uploadDate: new Date().toLocaleDateString('vi-VN')
      };
      setDocuments([newDocument, ...documents]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      category: '',
      department: '',
      uploadedBy: '',
      description: ''
    });
    setEditingDocument(null);
    setShowModal(false);
  };

  const handleEdit = (document) => {
    setEditingDocument(document);
    setFormData({
      name: document.name,
      type: document.type,
      category: document.category,
      department: document.department,
      uploadedBy: document.uploadedBy,
      description: document.description
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleDownload = (document) => {
    // Mock download - in real app, this would trigger actual download
    alert(`Đang tải xuống: ${document.name}`);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'DOCX': return '📝';
      case 'XLSX': return '📊';
      case 'PPTX': return '📋';
      case 'TXT': return '📃';
      default: return '📁';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'PDF': return 'var(--medical-700)';
      case 'DOCX': return 'var(--medical-600)';
      case 'XLSX': return 'var(--medical-500)';
      case 'PPTX': return 'var(--medical-400)';
      case 'TXT': return 'var(--neutral-600)';
      default: return 'var(--neutral-600)';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'all' || doc.category === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📄 Quản lý Tài liệu</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            ➕ Thêm tài liệu
          </button>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', marginBottom: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>Danh mục:</span>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value="all">Tất cả</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredDocuments.map(document => (
            <div key={document.id} className="card" style={{ margin: 0, position: 'relative' }}>
              {/* Document Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ fontSize: '40px', marginRight: '15px' }}>
                  {getFileIcon(document.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    {document.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span 
                      style={{
                        background: getFileTypeColor(document.type),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    >
                      {document.type}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--neutral-600)' }}>
                      {document.size}
                    </span>
                    <span 
                      style={{
                        background: 'var(--medical-100)',
                        color: 'var(--medical-700)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }}
                    >
                      {document.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Info */}
              <div style={{ marginBottom: '15px' }}>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--neutral-600)', 
                  margin: '0 0 10px 0',
                  lineHeight: '1.4'
                }}>
                  {document.description}
                </p>
                <div style={{ fontSize: '12px', color: 'var(--neutral-500)' }}>
                  <div>📂 {document.department}</div>
                  <div>👤 {document.uploadedBy}</div>
                  <div>📅 {document.uploadDate}</div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => handleDownload(document)}
                >
                  📥 Tải xuống
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => handleEdit(document)}
                >
                  ✏️
                </button>
                <button 
                  className="btn btn-danger" 
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                  onClick={() => handleDelete(document.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--neutral-600)' }}>
            {searchTerm || filter !== 'all' ? 
              'Không tìm thấy tài liệu phù hợp' : 
              'Chưa có tài liệu nào'
            }
          </div>
        )}

        {/* Summary Stats */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>📊 Thống kê</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'var(--medical-50)', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--medical-600)' }}>
                {documents.length}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--neutral-600)' }}>Tổng tài liệu</div>
            </div>
            {categories.map(category => {
              const count = documents.filter(doc => doc.category === category).length;
              return count > 0 ? (
                <div key={category} style={{ textAlign: 'center', padding: '15px', backgroundColor: 'var(--medical-50)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--medical-600)' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--neutral-600)' }}>{category}</div>
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
              <h3>{editingDocument ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên tài liệu</label>
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
                  <label>Loại file</label>
                  <select
                    className="form-control"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Chọn loại file</option>
                    {fileTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

                <div className="form-group">
                  <label>Người tải lên</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.uploadedBy}
                    onChange={(e) => setFormData({...formData, uploadedBy: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-success">
                  {editingDocument ? 'Cập nhật' : 'Thêm tài liệu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
