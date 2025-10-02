import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    dispatch(addUser({
      id: Date.now(),
      name,
      email,
      company: { name: company },
      address: { street: '', suite: '', city: '', zipcode: '' },
      phone: '',
      website: ''
    }));

    setName('');
    setEmail('');
    setCompany('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;