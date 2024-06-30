import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { username, password })
      .then(response => {
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registrar</h2>
        <input className='inputRegister' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nome de usuário"/>
        <input className='inputPasswordRegister' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha"/>
        <button className='registerButton' type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;