import React, { useState, useMemo } from 'react';
import { 
  UsersIcon, 
  EditIcon, 
  DeleteIcon, 
  LockIcon, 
  UnlockIcon, 
  SearchIcon,
  FilterIcon,
  SortIcon,
  AddIcon
} from './Icons';

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
    createdDate: '01/01/2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
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
    createdDate: '05/01/2025',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face'
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
    createdDate: '10/01/2025',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face'
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
    createdDate: '15/01/2025',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
  },
  { 
    id: 5, 
    username: 'doctor2', 
    fullName: 'BS. Lê Văn D',
    role: 'Doctor',
    email: 'doctor2@hospital.com',
    department: 'Cấp cứu',
    status: 'active',
    lastLogin: '14/07/2025 22:30',
    createdDate: '20/01/2025',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face'
  },
  { 
    id: 6, 
    username: 'nurse2', 
    fullName: 'Y tá Nguyễn Thị E',
    role: 'Nurse',
    email: 'nurse2@hospital.com',
    department: 'Khoa Nhi',
    status: 'active',
    lastLogin: '15/07/2025 07:45',
    createdDate: '25/01/2025',
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=80&h=80&fit=crop&crop=face'
  },
  { 
    id: 7, 
    username: 'staff2', 
    fullName: 'Trần Văn F',
    role: 'Staff',
    email: 'staff2@hospital.com',
    department: 'Xét nghiệm',
    status: 'active',
    lastLogin: '13/07/2025 16:20',
    createdDate: '30/01/2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
  },
  { 
    id: 8, 
    username: 'doctor3', 
    fullName: 'BS. Phạm Thị G',
    role: 'Doctor',
    email: 'doctor3@hospital.com',
    department: 'Khoa Ngoại',
    status: 'inactive',
    lastLogin: '08/07/2025 11:15',
    createdDate: '05/02/2025',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&h=80&fit=crop&crop=face'
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
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const roles = [
    { value: 'Admin', label: 'Quản trị viên', color: 'var(--error-600)', bgColor: 'var(--error-50)', borderColor: 'var(--error-200)' },
    { value: 'Doctor', label: 'Bác sĩ', color: 'var(--medical-600)', bgColor: 'var(--medical-50)', borderColor: 'var(--medical-200)' },
    { value: 'Nurse', label: 'Y tá', color: 'var(--primary-600)', bgColor: 'var(--primary-50)', borderColor: 'var(--primary-200)' },
    { value: 'Staff', label: 'Nhân viên', color: 'var(--neutral-600)', bgColor: 'var(--neutral-50)', borderColor: 'var(--neutral-200)' }
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesFilter = filter === 'all' || user.role === filter || user.status === filter;
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [users, filter, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginationNumbers = () => {
    const numbers = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  return (
    <div className="container">
      <div className="card fade-in">
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, var(--medical-50), var(--primary-50))',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--medical-200)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              padding: '16px',
              background: 'linear-gradient(135deg, var(--medical-500), var(--primary-500))',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 4px 8px rgba(22, 163, 74, 0.3)'
            }}>
              <UsersIcon size={32} color="white" />
            </div>
            <div>
              <h2 style={{ 
                margin: 0, 
                color: 'var(--neutral-800)', 
                fontSize: '2rem',
                fontWeight: '800'
              }}>
                Quản lý Người dùng
              </h2>
              <p style={{ 
                margin: 0, 
                color: 'var(--neutral-600)', 
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Quản lý tài khoản và phân quyền nhân viên
              </p>
            </div>
          </div>
          <button 
            className="btn" 
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, var(--medical-500), var(--medical-600))',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 8px rgba(22, 163, 74, 0.3)',
              transition: 'all var(--transition)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(22, 163, 74, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 8px rgba(22, 163, 74, 0.3)';
            }}
          >
            <AddIcon size={20} color="white" />
            Thêm người dùng
          </button>
        </div>

        {/* Search, Filter and Items per page */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr auto', 
          gap: '20px', 
          marginBottom: '24px',
          alignItems: 'end'
        }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '8px',
              color: 'var(--neutral-700)',
              fontWeight: '600'
            }}>
              <SearchIcon size={16} color="var(--medical-600)" />
              Tìm kiếm
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm theo tên, email, khoa..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '12px 16px',
                fontSize: '1rem',
                border: '2px solid var(--neutral-200)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition)'
              }}
            />
          </div>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '8px',
              color: 'var(--neutral-700)',
              fontWeight: '600'
            }}>
              <FilterIcon size={16} color="var(--primary-600)" />
              Lọc theo
            </label>
            <select
              className="form-control"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '12px 16px',
                fontSize: '1rem',
                border: '2px solid var(--neutral-200)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition)'
              }}
            >
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm khóa</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '8px',
              color: 'var(--neutral-700)',
              fontWeight: '600'
            }}>
              📄 Hiển thị
            </label>
            <select
              className="form-control"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{
                padding: '12px 16px',
                fontSize: '1rem',
                border: '2px solid var(--neutral-200)',
                borderRadius: 'var(--radius-lg)',
                transition: 'all var(--transition)',
                minWidth: '100px'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div style={{ 
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <button 
            className={`btn ${filter === 'all' ? '' : 'btn-secondary'}`}
            onClick={() => {
              setFilter('all');
              setCurrentPage(1);
            }}
            style={{
              background: filter === 'all' ? 'var(--medical-500)' : 'var(--neutral-100)',
              color: filter === 'all' ? 'white' : 'var(--neutral-600)',
              border: `2px solid ${filter === 'all' ? 'var(--medical-500)' : 'var(--neutral-200)'}`,
              padding: '8px 16px',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all var(--transition)'
            }}
          >
            Tất cả ({users.length})
          </button>
          <button 
            className={`btn ${filter === 'active' ? '' : 'btn-secondary'}`}
            onClick={() => {
              setFilter('active');
              setCurrentPage(1);
            }}
            style={{
              background: filter === 'active' ? 'var(--success-500)' : 'var(--neutral-100)',
              color: filter === 'active' ? 'white' : 'var(--neutral-600)',
              border: `2px solid ${filter === 'active' ? 'var(--success-500)' : 'var(--neutral-200)'}`,
              padding: '8px 16px',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all var(--transition)'
            }}
          >
            Hoạt động ({users.filter(u => u.status === 'active').length})
          </button>
          <button 
            className={`btn ${filter === 'inactive' ? '' : 'btn-secondary'}`}
            onClick={() => {
              setFilter('inactive');
              setCurrentPage(1);
            }}
            style={{
              background: filter === 'inactive' ? 'var(--warning-500)' : 'var(--neutral-100)',
              color: filter === 'inactive' ? 'white' : 'var(--neutral-600)',
              border: `2px solid ${filter === 'inactive' ? 'var(--warning-500)' : 'var(--neutral-200)'}`,
              padding: '8px 16px',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all var(--transition)'
            }}
          >
            Tạm khóa ({users.filter(u => u.status === 'inactive').length})
          </button>
          {roles.map(role => (
            <button 
              key={role.value}
              className={`btn ${filter === role.value ? '' : 'btn-secondary'}`}
              onClick={() => {
                setFilter(role.value);
                setCurrentPage(1);
              }}
              style={{
                background: filter === role.value ? role.color : 'var(--neutral-100)',
                color: filter === role.value ? 'white' : 'var(--neutral-600)',
                border: `2px solid ${filter === role.value ? role.color : 'var(--neutral-200)'}`,
                padding: '8px 16px',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all var(--transition)'
              }}
            >
              {role.label} ({users.filter(u => u.role === role.value).length})
            </button>
          ))}
        </div>

        {/* Enhanced Users Table */}
        <div style={{ 
          overflowX: 'auto',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--neutral-200)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95rem'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, var(--medical-50), var(--primary-50))',
                borderBottom: '2px solid var(--neutral-200)'
              }}>
                <th 
                  onClick={() => handleSort('fullName')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)',
                    minWidth: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Người dùng
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('fullName')}</span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('role')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Vai trò
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('role')}</span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('department')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Khoa/Phòng ban
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('department')}</span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('email')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Email
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('email')}</span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('status')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    Trạng thái
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('status')}</span>
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('lastLogin')}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    borderRight: '1px solid var(--neutral-200)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--medical-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Lần cuối đăng nhập
                    <span style={{ fontSize: '0.8rem' }}>{getSortIcon('lastLogin')}</span>
                  </div>
                </th>
                <th style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: 'var(--neutral-800)'
                }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr 
                    key={user.id}
                    style={{
                      borderBottom: '1px solid var(--neutral-100)',
                      transition: 'all var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--neutral-25)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '20px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: `3px solid ${roleInfo.borderColor}`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          flexShrink: 0
                        }}>
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.fullName}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              background: `linear-gradient(135deg, ${roleInfo.color}, ${roleInfo.color}aa)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}>
                              {getAvatarInitials(user.fullName)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div style={{ 
                            fontWeight: '700', 
                            color: 'var(--neutral-800)',
                            fontSize: '1rem',
                            marginBottom: '4px'
                          }}>
                            {user.fullName}
                          </div>
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: 'var(--neutral-500)',
                            fontWeight: '500'
                          }}>
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                      <span style={{
                        background: roleInfo.bgColor,
                        color: roleInfo.color,
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        border: `1px solid ${roleInfo.borderColor}`,
                        display: 'inline-block'
                      }}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '20px 16px',
                      color: 'var(--neutral-700)',
                      fontWeight: '500'
                    }}>
                      {user.department}
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                      <a 
                        href={`mailto:${user.email}`} 
                        style={{ 
                          color: 'var(--primary-600)', 
                          textDecoration: 'none',
                          fontWeight: '500',
                          transition: 'all var(--transition)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--primary-700)';
                          e.target.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--primary-600)';
                          e.target.style.textDecoration = 'none';
                        }}
                      >
                        {user.email}
                      </a>
                    </td>
                    <td style={{ padding: '20px 16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        ...(user.status === 'active' ? {
                          background: 'var(--success-50)',
                          color: 'var(--success-700)',
                          border: '1px solid var(--success-200)'
                        } : {
                          background: 'var(--warning-50)',
                          color: 'var(--warning-700)',
                          border: '1px solid var(--warning-200)'
                        })
                      }}>
                        {user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '20px 16px', 
                      fontSize: '0.875rem', 
                      color: 'var(--neutral-500)',
                      fontWeight: '500'
                    }}>
                      {user.lastLogin}
                    </td>
                    <td style={{ padding: '20px 16px' }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px',
                        justifyContent: 'center'
                      }}>
                        <button 
                          onClick={() => handleEdit(user)}
                          title="Chỉnh sửa"
                          style={{
                            padding: '8px 12px',
                            border: '2px solid var(--primary-200)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--primary-50)',
                            color: 'var(--primary-600)',
                            cursor: 'pointer',
                            transition: 'all var(--transition)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--primary-100)';
                            e.target.style.borderColor = 'var(--primary-300)';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'var(--primary-50)';
                            e.target.style.borderColor = 'var(--primary-200)';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <EditIcon size={14} color="var(--primary-600)" />
                        </button>
                        <button 
                          onClick={() => handleStatusToggle(user.id)}
                          title={user.status === 'active' ? 'Tạm khóa' : 'Kích hoạt'}
                          style={{
                            padding: '8px 12px',
                            border: `2px solid ${user.status === 'active' ? 'var(--warning-200)' : 'var(--success-200)'}`,
                            borderRadius: 'var(--radius-lg)',
                            background: user.status === 'active' ? 'var(--warning-50)' : 'var(--success-50)',
                            color: user.status === 'active' ? 'var(--warning-600)' : 'var(--success-600)',
                            cursor: 'pointer',
                            transition: 'all var(--transition)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}
                          onMouseEnter={(e) => {
                            if (user.status === 'active') {
                              e.target.style.background = 'var(--warning-100)';
                              e.target.style.borderColor = 'var(--warning-300)';
                            } else {
                              e.target.style.background = 'var(--success-100)';
                              e.target.style.borderColor = 'var(--success-300)';
                            }
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            if (user.status === 'active') {
                              e.target.style.background = 'var(--warning-50)';
                              e.target.style.borderColor = 'var(--warning-200)';
                            } else {
                              e.target.style.background = 'var(--success-50)';
                              e.target.style.borderColor = 'var(--success-200)';
                            }
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          {user.status === 'active' ? 
                            <LockIcon size={14} color="var(--warning-600)" /> : 
                            <UnlockIcon size={14} color="var(--success-600)" />
                          }
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          title="Xóa"
                          style={{
                            padding: '8px 12px',
                            border: '2px solid var(--error-200)',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--error-50)',
                            color: 'var(--error-600)',
                            cursor: 'pointer',
                            transition: 'all var(--transition)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--error-100)';
                            e.target.style.borderColor = 'var(--error-300)';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'var(--error-50)';
                            e.target.style.borderColor = 'var(--error-200)';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <DeleteIcon size={14} color="var(--error-600)" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            padding: '20px',
            background: 'var(--neutral-50)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--neutral-200)'
          }}>
            <div style={{
              color: 'var(--neutral-600)',
              fontWeight: '500',
              fontSize: '0.875rem'
            }}>
              Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredAndSortedUsers.length)} / {filteredAndSortedUsers.length} người dùng
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  border: '2px solid var(--neutral-200)',
                  borderRadius: 'var(--radius-lg)',
                  background: currentPage === 1 ? 'var(--neutral-100)' : 'white',
                  color: currentPage === 1 ? 'var(--neutral-400)' : 'var(--neutral-700)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition)',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = 'var(--neutral-50)';
                    e.target.style.borderColor = 'var(--neutral-300)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = 'var(--neutral-200)';
                  }
                }}
              >
                ← Trước
              </button>
              
              {getPaginationNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '8px 12px',
                    border: `2px solid ${page === currentPage ? 'var(--medical-300)' : 'var(--neutral-200)'}`,
                    borderRadius: 'var(--radius-lg)',
                    background: page === currentPage ? 'var(--medical-500)' : 'white',
                    color: page === currentPage ? 'white' : 'var(--neutral-700)',
                    cursor: 'pointer',
                    transition: 'all var(--transition)',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    minWidth: '44px'
                  }}
                  onMouseEnter={(e) => {
                    if (page !== currentPage) {
                      e.target.style.background = 'var(--medical-50)';
                      e.target.style.borderColor = 'var(--medical-200)';
                      e.target.style.color = 'var(--medical-600)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (page !== currentPage) {
                      e.target.style.background = 'white';
                      e.target.style.borderColor = 'var(--neutral-200)';
                      e.target.style.color = 'var(--neutral-700)';
                    }
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  border: '2px solid var(--neutral-200)',
                  borderRadius: 'var(--radius-lg)',
                  background: currentPage === totalPages ? 'var(--neutral-100)' : 'white',
                  color: currentPage === totalPages ? 'var(--neutral-400)' : 'var(--neutral-700)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition)',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = 'var(--neutral-50)';
                    e.target.style.borderColor = 'var(--neutral-300)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.background = 'white';
                    e.target.style.borderColor = 'var(--neutral-200)';
                  }
                }}
              >
                Sau →
              </button>
            </div>
          </div>
        )}

        {filteredAndSortedUsers.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 40px', 
            color: 'var(--neutral-500)',
            background: 'var(--neutral-50)',
            borderRadius: 'var(--radius-xl)',
            border: '2px dashed var(--neutral-200)',
            marginTop: '24px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>
              {searchTerm || filter !== 'all' ? 
                'Không tìm thấy người dùng phù hợp' : 
                'Chưa có người dùng nào'
              }
            </div>
            <div style={{ fontSize: '1rem' }}>
              {searchTerm || filter !== 'all' ? 
                'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' : 
                'Hãy thêm người dùng đầu tiên'
              }
            </div>
          </div>
        )}

        {/* Enhanced Summary Stats */}
        <div style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, var(--medical-50), var(--primary-50))',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid var(--medical-200)',
          padding: '24px'
        }}>
          <h3 style={{ 
            margin: '0 0 24px 0',
            color: 'var(--neutral-800)',
            fontSize: '1.5rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              padding: '8px',
              background: 'var(--medical-500)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1rem'
            }}>📊</span>
            Thống kê người dùng
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'white', 
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--neutral-200)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'all var(--transition)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
            }}
            >
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                color: 'var(--medical-600)',
                marginBottom: '8px'
              }}>
                {users.length}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--neutral-600)',
                fontWeight: '600'
              }}>
                👥 Tổng người dùng
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'white', 
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--success-200)',
              boxShadow: '0 4px 8px rgba(16, 185, 129, 0.1)',
              transition: 'all var(--transition)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.1)';
            }}
            >
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                color: 'var(--success-600)',
                marginBottom: '8px'
              }}>
                {users.filter(u => u.status === 'active').length}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--neutral-600)',
                fontWeight: '600'
              }}>
                ✅ Đang hoạt động
              </div>
            </div>
            {roles.map(role => {
              const count = users.filter(user => user.role === role.value).length;
              return count > 0 ? (
                <div 
                  key={role.value} 
                  style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'white', 
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${role.borderColor}`,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    transition: 'all var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '900', 
                    color: role.color,
                    marginBottom: '8px'
                  }}>
                    {count}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--neutral-600)',
                    fontWeight: '600'
                  }}>
                    {role.label}
                  </div>
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
