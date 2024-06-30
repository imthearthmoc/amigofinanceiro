import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { username, password })
      .then(response => {
        setToken(response.data.token);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input className='inputLogin' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nome de usuário"/>
      <input className='inputPasswordLogin' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
      <button className='enterButtonLogin' type="submit">Entrar</button>
    </form>
  );
};

export default Login;