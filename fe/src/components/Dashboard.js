import React from 'react';
import { 
  UsersIcon, 
  DocumentsIcon, 
  CalendarIcon,
  RequestsIcon,
  AnnouncementsIcon,
  AddIcon,
  SchedulesIcon,
  DirectoryIcon,
  HospitalIcon
} from './Icons';

// Mock data cho recent activities với avatar thực tế
const recentActivities = [
  { 
    id: 1, 
    action: 'Bác sĩ Nguyễn Văn A đã duyệt đơn nghỉ phép', 
    time: '5 phút trước', 
    type: 'approval',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
    employee: 'BS. Nguyễn Văn A'
  },
  { 
    id: 2, 
    action: 'Y tá Trần Thị B đã nộp đơn tăng ca', 
    time: '15 phút trước', 
    type: 'request',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
    employee: 'YT. Trần Thị B'
  },
  { 
    id: 3, 
    action: 'Cập nhật tài liệu quy trình mới', 
    time: '1 giờ trước', 
    type: 'document',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face',
    employee: 'Quản lý Y tế'
  },
  { 
    id: 4, 
    action: 'Lịch trực tuần tới đã được phê duyệt', 
    time: '2 giờ trước', 
    type: 'schedule',
    avatar: 'https://images.unsplash.com/photo-1594824783208-b08e8c022424?w=80&h=80&fit=crop&crop=face',
    employee: 'Trưởng khoa'
  },
];

const upcomingSchedules = [
  { 
    id: 1, 
    doctor: 'BS. Nguyễn Văn A', 
    shift: 'Ca sáng', 
    date: '16/07/2025', 
    department: 'Khoa Nội',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
    status: 'confirmed'
  },
  { 
    id: 2, 
    doctor: 'BS. Trần Thị B', 
    shift: 'Ca chiều', 
    date: '16/07/2025', 
    department: 'Khoa Ngoại',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
    status: 'pending'
  },
  { 
    id: 3, 
    doctor: 'BS. Lê Văn C', 
    shift: 'Ca đêm', 
    date: '16/07/2025', 
    department: 'Cấp cứu',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face',
    status: 'urgent'
  },
];

function Dashboard() {
  const stats = [
    { 
      label: 'Số bác sĩ', 
      value: 5, 
      color: 'var(--medical-600)', 
      icon: UsersIcon,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    { 
      label: 'Số y tá', 
      value: 8, 
      color: 'var(--medical-600)', 
      icon: UsersIcon,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    { 
      label: 'Đơn chưa duyệt', 
      value: 3, 
      color: 'var(--medical-600)', 
      icon: RequestsIcon,
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100&h=100&fit=crop'
    },
    { 
      label: 'Lịch trực hôm nay', 
      value: 10, 
      color: 'var(--medical-600)', 
      icon: SchedulesIcon,
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=100&h=100&fit=crop'
    },
  ];

  return (
    <div className="container">
      {/* Enhanced Hero Header với hình ảnh thực tế */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(14, 165, 233, 0.9) 100%), url("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=400&fit=crop") center/cover',
        borderRadius: 'var(--radius-2xl)',
        padding: '40px',
        marginBottom: '32px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(22, 163, 74, 0.2)'
      }}>
        {/* Overlay patterns */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.8) 0%, rgba(14, 165, 233, 0.6) 100%)',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 1
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--radius-xl)',
            backdropFilter: 'blur(10px)'
          }}>
            <HospitalIcon size={64} color="white" />
          </div>
          <div>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '2.5rem',
              fontWeight: '800',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              🏥 Bệnh viện Đa khoa Trung ương
            </h1>
            <p style={{ 
              margin: '0', 
              fontSize: '1.25rem',
              opacity: 0.95,
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              	78 Giải Phóng, Đống Đa, Hà Nội
            </p>
          </div>
        </div>
      </div>

      <div className="card fade-in">
        {/* <h1 style={{ 
          margin: '0 0 24px 0', 
          color: 'var(--neutral-800)', 
          fontSize: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontWeight: '800'
        }}>
          <DashboardIcon size={40} color="var(--medical-600)" />
          Dashboard - Quản lý Bệnh viện
        </h1> */}
        <p style={{ 
          color: 'var(--neutral-600)', 
          margin: '0 0 40px 0', 
          fontSize: '1.125rem',
          fontWeight: '500'
        }}>
          Chào mừng trở lại! Đây là tổng quan hoạt động hôm nay.
        </p>

        {/* Statistics Cards với Enhanced Design */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card scale-in" 
              style={{ 
                background: '#fff',
                animationDelay: `${index * 0.15}s`,
                border: `2px solid var(--medical-200)`,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                padding: '20px',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center'
              }}
            >
              <div className="stat-number" style={{
                color: 'var(--medical-700)',
                fontSize: '3rem',
                fontWeight: '900',
                lineHeight: '1',
                marginBottom: '10px'
              }}>
                {stat.value}
              </div>
              <div className="stat-label" style={{
                color: 'var(--medical-600)',
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>


        {/* Recent Activities với Enhanced Design */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '48px' }}>
          <div className="card slide-up" style={{ 
            margin: 0,
            background: 'linear-gradient(145deg, #ffffff 0%, var(--neutral-50) 100%)',
            border: '3px solid var(--medical-200)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              margin: '0 0 32px 0', 
              color: 'var(--neutral-800)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              <div style={{
                padding: '12px',
                background: 'linear-gradient(135deg, var(--medical-100), var(--medical-200))',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--medical-300)',
                boxShadow: '0 4px 8px rgba(22, 163, 74, 0.2)'
              }}>
                <AnnouncementsIcon size={28} color="var(--medical-600)" />
              </div>
              Hoạt động gần đây
            </h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
              {recentActivities.map(activity => (
                <div 
                  key={activity.id} 
                  style={{
                    padding: '20px',
                    borderLeft: `6px solid ${getActivityColor(activity.type)}`,
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, white 0%, var(--neutral-50) 100%)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--neutral-200)',
                    transition: 'all var(--transition)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(8px) translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                    e.target.style.borderColor = 'var(--medical-300)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0) translateY(0)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
                    e.target.style.borderColor = 'var(--neutral-200)';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: `3px solid ${getActivityColor(activity.type)}`,
                    flexShrink: 0,
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={activity.avatar} 
                      alt={activity.employee}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', color: 'var(--neutral-800)', marginBottom: '4px', fontWeight: '600' }}>
                      {activity.action}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--medical-600)', fontWeight: '600', marginBottom: '4px' }}>
                      👤 {activity.employee}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--neutral-500)', fontWeight: '500' }}>
                      🕒 {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Schedules với Enhanced Design */}
          <div className="card slide-up" style={{ 
            margin: 0, 
            animationDelay: '0.3s',
            background: 'linear-gradient(145deg, #ffffff 0%, var(--neutral-50) 100%)',
            border: '3px solid var(--medical-200)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              margin: '0 0 32px 0', 
              color: 'var(--neutral-800)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              <div style={{
                padding: '12px',
                background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid var(--primary-300)',
                boxShadow: '0 4px 8px rgba(14, 165, 233, 0.2)'
              }}>
                <CalendarIcon size={28} color="var(--primary-600)" />
              </div>
              Lịch trực sắp tới
            </h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
              {upcomingSchedules.map(schedule => (
                <div 
                  key={schedule.id}
                  style={{
                    padding: '20px',
                    border: '3px solid var(--neutral-200)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, white 0%, var(--neutral-50) 100%)',
                    transition: 'all var(--transition)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                    e.target.style.borderColor = 'var(--primary-300)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
                    e.target.style.borderColor = 'var(--neutral-200)';
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '3px solid var(--primary-300)',
                    flexShrink: 0,
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    <img 
                      src={schedule.avatar} 
                      alt={schedule.doctor}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--neutral-800)' }}>
                        {schedule.doctor}
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        ...(schedule.status === 'urgent' ? {
                          background: 'var(--error-100)',
                          color: 'var(--error-700)',
                          border: '1px solid var(--error-300)'
                        } : schedule.status === 'pending' ? {
                          background: 'var(--warning-100)',
                          color: 'var(--warning-700)',
                          border: '1px solid var(--warning-300)'
                        } : {
                          background: 'var(--success-100)',
                          color: 'var(--success-700)',
                          border: '1px solid var(--success-300)'
                        })
                      }}>
                        {schedule.status === 'urgent' ? '🚨 KHẨN' : 
                         schedule.status === 'pending' ? '⏳ CHỜ' : '✅ OK'}
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--neutral-600)', marginBottom: '8px', fontWeight: '600' }}>
                      🕒 {schedule.shift} - 📅 {schedule.date}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'var(--primary-600)',
                      fontWeight: '600',
                      padding: '6px 12px',
                      background: 'var(--primary-50)',
                      borderRadius: 'var(--radius-md)',
                      display: 'inline-block',
                      border: '1px solid var(--primary-200)'
                    }}>
                      🏥 {schedule.department}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Statistics Chart */}
        <div className="card fade-in" style={{ 
          marginTop: '48px',
          background: 'linear-gradient(145deg, #ffffff 0%, var(--neutral-50) 100%)',
          border: '3px solid var(--medical-200)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 40px 0', 
            color: 'var(--neutral-800)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--primary-500))',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 4px 8px rgba(99, 102, 241, 0.3)'
            }}>
              📊
            </div>
            Thống kê hoạt động chi tiết
          </h3>
          
          {/* Animated Pie Charts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px',
            marginBottom: '40px'
          }}>
            {[
              { label: 'Đơn đã duyệt', value: 85, color: 'var(--medical-500)', icon: '✅', total: 100 },
              { label: 'Đơn chờ xử lý', value: 12, color: 'var(--warning-500)', icon: '⏳', total: 100 },
              { label: 'Đơn từ chối', value: 3, color: 'var(--error-500)', icon: '❌', total: 100 }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '32px',
                background: 'linear-gradient(135deg, white 0%, var(--neutral-50) 100%)',
                borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--neutral-200)',
                textAlign: 'center',
                transition: 'all var(--transition)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05) translateY(-8px)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                e.target.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                e.target.style.borderColor = 'var(--neutral-200)';
              }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-30%',
                  width: '120px',
                  height: '120px',
                  background: `${item.color}20`,
                  borderRadius: '50%',
                  filter: 'blur(30px)'
                }}></div>
                
                {/* Animated Pie Chart */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    ${item.color} 0deg ${item.value * 3.6}deg, 
                    var(--neutral-200) ${item.value * 3.6}deg 360deg
                  )`,
                  margin: '0 auto 20px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: `0 8px 20px ${item.color}40`,
                  animation: `spin-${index} 2s ease-out`,
                  zIndex: 2
                }}>
                  {/* Inner circle */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      color: item.color
                    }}>
                      {item.value}%
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  color: 'var(--neutral-700)',
                  marginBottom: '8px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--neutral-500)',
                  fontWeight: '600',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {item.value} trên {item.total} đơn
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Statistics */}
          <div style={{
            padding: '32px',
            background: 'linear-gradient(135deg, var(--medical-50), var(--primary-50))',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--medical-200)'
          }}>
            <h4 style={{ 
              margin: '0 0 24px 0', 
              color: 'var(--neutral-800)', 
              fontSize: '1.25rem',
              fontWeight: '700',
              textAlign: 'center'
            }}>
              📈 Hiệu suất tuần này
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px'
            }}>
              {[
                { label: '🏥 Bệnh nhân khám', value: '234', change: '+12%', positive: true },
                { label: '⚕️ Ca phẫu thuật', value: '18', change: '+5%', positive: true },
                { label: '🚑 Cấp cứu', value: '45', change: '-8%', positive: false },
                { label: '💊 Đơn thuốc', value: '567', change: '+23%', positive: true }
              ].map((stat, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  border: '2px solid var(--neutral-200)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--neutral-800)', marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '8px' }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: stat.positive ? 'var(--success-600)' : 'var(--error-600)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    background: stat.positive ? 'var(--success-50)' : 'var(--error-50)'
                  }}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions
        <div className="card fade-in" style={{ 
          marginTop: '32px',
          background: 'linear-gradient(145deg, #ffffff 0%, var(--primary-50) 100%)',
          border: '3px solid var(--primary-200)',
          boxShadow: '0 20px 40px rgba(14, 165, 233, 0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 32px 0', 
            color: 'var(--neutral-800)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, var(--primary-500), var(--medical-500))',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 4px 8px rgba(14, 165, 233, 0.3)'
            }}>
              <AddIcon size={24} color="white" />
            </div>
            ⚡ Thao tác nhanh
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { 
                icon: AddIcon, 
                label: 'Thêm thông báo mới', 
                desc: 'Tạo thông báo cho toàn bệnh viện',
                color: 'var(--medical-500)',
                bg: 'var(--medical-50)',
                bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop&opacity=0.3'
              },
              { 
                icon: CalendarIcon, 
                label: 'Xem lịch trực tuần', 
                desc: 'Quản lý lịch làm việc nhân viên',
                color: 'var(--primary-500)',
                bg: 'var(--primary-50)',
                bgImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=100&fit=crop&opacity=0.3'
              },
              { 
                icon: DocumentsIcon, 
                label: 'Báo cáo tháng', 
                desc: 'Xem báo cáo hoạt động hàng tháng',
                color: 'var(--accent-teal)',
                bg: 'var(--neutral-50)',
                bgImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=100&fit=crop&opacity=0.3'
              },
              { 
                icon: DirectoryIcon, 
                label: 'Quản lý nhân sự', 
                desc: 'Thêm/sửa thông tin nhân viên',
                color: 'var(--accent-indigo)',
                bg: 'var(--neutral-50)',
                bgImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=100&fit=crop&opacity=0.3'
              }
            ].map((action, index) => (
              <button 
                key={index}
                style={{
                  padding: '24px',
                  background: `linear-gradient(135deg, ${action.bg} 0%, rgba(255,255,255,0.95) 100%), url("${action.bgImage}") center/cover`,
                  border: `3px solid ${action.color}30`,
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'pointer',
                  transition: 'all var(--transition)',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px) scale(1.03)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  e.target.style.borderColor = action.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                  e.target.style.borderColor = `${action.color}30`;
                }}
              >
                // Background decoration 
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-20%',
                  width: '100px',
                  height: '100px',
                  background: `${action.color}15`,
                  borderRadius: '50%',
                  filter: 'blur(20px)'
                }}></div>
                
                <div style={{
                  padding: '16px',
                  background: `linear-gradient(135deg, ${action.color}, ${action.color}CC)`,
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 8px ${action.color}40`,
                  position: 'relative',
                  zIndex: 2
                }}>
                  <action.icon size={24} color="white" />
                </div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--neutral-800)',
                    marginBottom: '4px'
                  }}>
                    {action.label}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--neutral-600)',
                    fontWeight: '500',
                    lineHeight: '1.4'
                  }}>
                    {action.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

function getActivityColor(type) {
  switch (type) {
    case 'approval': return 'var(--medical-500)';
    case 'request': return 'var(--accent-teal)';
    case 'document': return 'var(--primary-500)';
    case 'schedule': return 'var(--accent-indigo)';
    default: return 'var(--neutral-500)';
  }
}

export default Dashboard;
