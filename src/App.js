import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { store } from './store';
import { setUsers, setLoading, setError } from './store/slices/userSlice';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AddUser from './components/AddUser';
import './App.css';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
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
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
