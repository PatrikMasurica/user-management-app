import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm, deleteUser } from '../store/slices/userSlice';

function UserList() {
  const dispatch = useDispatch();
  const { list: users, searchTerm, loading, error } = useSelector(state => state.users);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (field === sortField) {

      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {

      setSortField(field);

      setSortDirection('asc');
      
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!a.phone && b.phone) return -1;
    if (a.phone && !b.phone) return 1;

    const aValue = sortField === 'company' ? a.company.name : a[sortField];
    const bValue = sortField === 'company' ? b.company.name : b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="search-input"
      />
      <div className="sort-controls">
        <button onClick={() => handleSort('name')} className="sort-button">

          Sort by Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('email')} className="sort-button">
          Sort by Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSort('company')} className="sort-button">
          Sort by Company {sortField === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>

      </div>
      <div className="user-grid">
        {sortedUsers.map(user => (
          <div key={user.id} className="user-card">
            <Link to={`/user/${user.id}`}>
              <h3>{user.name}</h3>
            </Link>
            
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>
            <button 
              onClick={() => dispatch(deleteUser(user.id))}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;