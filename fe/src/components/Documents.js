import React from 'react';

const documents = [
  { id: 1, name: 'Tài liệu 1', url: '#' },
  { id: 2, name: 'Tài liệu 2', url: '#' },
];

function Documents() {
  return (
    <div>
      <h2>Tài liệu</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}><a href={doc.url}>{doc.name}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;
