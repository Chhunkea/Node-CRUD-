import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created At</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(user.createdAt).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(user.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
