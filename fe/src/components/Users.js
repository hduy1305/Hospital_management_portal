import React from 'react';

const users = [
  { id: 1, username: 'admin', role: 'Admin' },
  { id: 2, username: 'doctor1', role: 'Doctor' },
];

function Users() {
  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
