import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/announcements">Thông báo</Link> |{" "}
      <Link to="/documents">Tài liệu</Link> |{" "}
      <Link to="/schedules">Lịch trực</Link> |{" "}
      <Link to="/requests">Đơn từ</Link> |{" "}
      <Link to="/directory">Danh bạ</Link> |{" "}
      <Link to="/users">Người dùng</Link> |{" "}
      <Link to="/profile">Hồ sơ</Link>
    </nav>
  );
}

export default Navbar;
