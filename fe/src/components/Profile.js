import React from 'react';

function Profile({ user }) {
  return (
    <div>
      <h2>Hồ sơ cá nhân</h2>
      <p>Tên đăng nhập: {user.username}</p>
      <p>Vai trò: {user.role}</p>
    </div>
  );
}

export default Profile;
