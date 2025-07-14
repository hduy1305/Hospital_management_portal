import React from 'react';

const schedules = [
  { id: 1, doctor: 'Bác sĩ A', date: '2025-07-15' },
  { id: 2, doctor: 'Bác sĩ B', date: '2025-07-16' },
];

function Schedules() {
  return (
    <div>
      <h2>Lịch trực</h2>
      <ul>
        {schedules.map(s => (
          <li key={s.id}>{s.doctor} - {s.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Schedules;
