import React from 'react';

const announcements = [
  { id: 1, title: 'Thông báo 1', content: 'Nội dung 1' },
  { id: 2, title: 'Thông báo 2', content: 'Nội dung 2' },
];

function Announcements() {
  return (
    <div>
      <h2>Thông báo</h2>
      <ul>
        {announcements.map(a => (
          <li key={a.id}><strong>{a.title}</strong>: {a.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;
