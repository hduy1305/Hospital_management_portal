import React from 'react';

const directory = [
  { id: 1, name: 'Nguyễn Văn A', department: 'Khoa Nội' },
  { id: 2, name: 'Trần Thị B', department: 'Khoa Ngoại' },
];

function Directory() {
  return (
    <div>
      <h2>Danh bạ nhân sự</h2>
      <ul>
        {directory.map(p => (
          <li key={p.id}>{p.name} - {p.department}</li>
        ))}
      </ul>
    </div>
  );
}

export default Directory;
