import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users, searchTerm, setSearchTerm }) {
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="user-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <Link to={`/user/${user.id}`}>
              <h3>{user.name}</h3>
            </Link>
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;