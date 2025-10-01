import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <h1>User Management App</h1>
          <div>
            <Link to="/" className="nav-link">Users</Link>
            <Link to="/add" className="nav-link">Add User</Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <UserList 
                users={users} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
              />
            } />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/add" element={<AddUser onAddUser={handleAddUser} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
