import React from 'react';

const requests = [
  { id: 1, creator: 'Nguyễn Văn A', type: 'Nghỉ phép', status: 'Chờ duyệt' },
  { id: 2, creator: 'Trần Thị B', type: 'Tăng ca', status: 'Đã duyệt' },
];

function Requests() {
  return (
    <div>
      <h2>Đơn từ</h2>
      <ul>
        {requests.map(r => (
          <li key={r.id}>{r.creator} - {r.type} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;
